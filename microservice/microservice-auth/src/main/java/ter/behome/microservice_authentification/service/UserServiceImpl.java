package ter.behome.microservice_authentification.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ter.behome.microservice_authentification.entities.*;
import ter.behome.microservice_authentification.mapper.UserMapper;
import ter.behome.microservice_authentification.openfeign.LogementFeign;
import ter.behome.microservice_authentification.repository.MotdepasseRepository;
import ter.behome.microservice_authentification.repository.UserRepository;
import ter.behome.microservice_authentification.request.UserPageDTO;
import ter.behome.microservice_authentification.request.UserRequest;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl  {

 private final UserRepository userRepository;

 private final MotdepasseRepository motdepasseRepository;

 private final UserMapper userMapper;

 private final PasswordEncoder passwordEncoder;

 private final LogementFeign logementFeign;




    public ResponseEntity<UserRequest> save(UserRequest userDto) {

        userRepository.findByEmail(userDto.getEmail())
                .ifPresent(u -> {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email existe déjà");
                });


        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        MotDePasse motdepasse = MotDePasse.builder()
                .valeurMotdepasse(bCryptPasswordEncoder.encode(userDto.getPassword()))
                .dateCreation(new Date())
                .build();


        userDto.setEtat(true);


        Utilisateur u = userMapper.mapToUserEntity(userDto);

        MotDePasse savedMotDePasse = motdepasseRepository.save(motdepasse);
        motdepasse.setUser(u);
        userDto.setMotdepasseId(savedMotDePasse.getId());
        u.setMotdepasse(savedMotDePasse);


        UUID id = null;
        if ("LOCATAIRE".equalsIgnoreCase(userDto.getRole())) {
            Locataire locataire = Locataire.builder().build();
            id = logementFeign.saveLocataire(locataire);
            u.setLocataireId(id);
        }

        if ("PROPRIETAIRE".equalsIgnoreCase(userDto.getRole())) {
            Proprietaire proprietaire = Proprietaire.builder().build();
            id = logementFeign.saveProprietaire(proprietaire);
            u.setProprietaire_id(id);
        }


        u = userRepository.save(u);


        if ("LOCATAIRE".equalsIgnoreCase(userDto.getRole())) {
            logementFeign.saveLocataireUserId(id, u.getId());
        }

        if ("PROPRIETAIRE".equalsIgnoreCase(userDto.getRole())) {
            logementFeign.saveProprietaireUserId(id, u.getId());
        }


        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userMapper.convertEntityToDto(u));
    }



    public ResponseEntity<UserRequest> updateUser(Long userId, UserRequest userDto) {
        Utilisateur existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur non trouvé"));
        if (!existingUser.getEmail().equalsIgnoreCase(userDto.getEmail())) {
            userRepository.findByEmail(userDto.getEmail())
                    .ifPresent(u -> {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email déjà utilisé par un autre utilisateur");
                    });
        }
        existingUser.setNom(userDto.getNom());
        existingUser.setPrenom(userDto.getPrenom());
        existingUser.setEmail(userDto.getEmail());
        existingUser.setDateNaissance(userDto.getDateNaissance());
        Utilisateur updatedUser = userRepository.save(existingUser);
        return ResponseEntity.ok(userMapper.convertEntityToDto(updatedUser));
    }


    public ResponseEntity<Boolean> checkIfPasswordIsValid(String email) {
        Optional<Utilisateur> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return new ResponseEntity<>(false, null, 404);
        }

        Utilisateur user = optionalUser.get();

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -6);

        Date sixMonthsAgo = calendar.getTime();
        Date passwordCreationDate = user.getMotdepasse().getDateCreation();

        boolean isValid = !passwordCreationDate.before(sixMonthsAgo);

        return new ResponseEntity<>(isValid, null, 200);
    }

    public ResponseEntity<UUID> generateToken(String email) {
        Optional<Utilisateur> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return new ResponseEntity<>(null, null, 404);
        }

        Utilisateur user = optionalUser.get();

        UUID token = UUID.randomUUID();
        user.setTokenToResetPassword(token);
        userRepository.save(user);

        return new ResponseEntity<>(token, null, 200);
    }


    public UserRequest getUserByEmail(String email) {
        Optional<Utilisateur> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Utilisateur non trouvé avec l'email : " + email);
        }

        return userMapper.convertEntityToDto(optionalUser.get());
    }



    public ResponseEntity<UserRequest> getUserByLocataireId(UUID locataireId) {

        Optional<Utilisateur> userOpt = userRepository.findByLocataireId(locataireId);

        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userMapper.convertEntityToDto(userOpt.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public boolean blockUser(Long id) {
        Utilisateur user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setEtat(false);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean unblockUser(Long id) {
        Utilisateur user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setEtat(true);
            userRepository.save(user);
            return true;
        }
        return false;
    }


    public UserPageDTO getUsersByPage(Integer pageNumber, Integer nbUsersPerPage) {

        pageNumber = (pageNumber != null && pageNumber > 0) ? pageNumber : 1;
        nbUsersPerPage = (nbUsersPerPage != null && nbUsersPerPage > 0) ? nbUsersPerPage : 10;

        Pageable pageable = PageRequest.of(pageNumber - 1, nbUsersPerPage);


        Page<Utilisateur> usersPage = userRepository.findAll(pageable);

        List<UserRequest> userRequestList = usersPage.getContent().stream()
                .map(userMapper::convertEntityToDto)
                .collect(Collectors.toList());


        return UserPageDTO.builder()
                .users(userRequestList)
                .totalElements(usersPage.getTotalElements())
                .totalPages(usersPage.getTotalPages())
                .currentPage(pageNumber)
                .build();
    }




    public Long getNombreUtilisateur() {
        return  userRepository.count();
    }



    public void changeUserPassword(Long userId, String oldPassword, String newPassword) {
        Utilisateur user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MotDePasse currentPassword = user.getMotdepasse();
        if (currentPassword == null) {
            throw new RuntimeException("No password set for this user");
        }


        if (!passwordEncoder.matches(oldPassword, currentPassword.getValeurMotdepasse())) {
            throw new RuntimeException("Old password is incorrect");
        }


        if (passwordEncoder.matches(newPassword, currentPassword.getValeurMotdepasse())) {
            throw new RuntimeException("New password must be different from old password");
        }


        String encodedPassword = passwordEncoder.encode(newPassword);
        currentPassword.setValeurMotdepasse(encodedPassword);
        currentPassword.setDateCreation(new Date());

        motdepasseRepository.save(currentPassword);
        user.setMotdepasse(currentPassword);
        userRepository.save(user);
    }




}