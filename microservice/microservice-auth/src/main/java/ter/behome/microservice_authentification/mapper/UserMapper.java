package ter.behome.microservice_authentification.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ter.behome.microservice_authentification.entities.Utilisateur;
import ter.behome.microservice_authentification.repository.ImageRepository;
import ter.behome.microservice_authentification.repository.MotdepasseRepository;
import ter.behome.microservice_authentification.request.RoleRequest;
import ter.behome.microservice_authentification.request.UserRequest;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserMapper {

    private final ImageRepository imageRepository;
    private final MotdepasseRepository motdepasseRepository;




    public Utilisateur mapToUserEntity(UserRequest userRequest) {
        if (userRequest == null) {
            throw new IllegalArgumentException("UserRequest cannot be null");
        }

        Utilisateur.UtilisateurBuilder userBuilder = Utilisateur.builder()
                .id(userRequest.getId())
                .etat(false)
                .nom(userRequest.getNom())
                .prenom(userRequest.getPrenom())
                .role(userRequest.getRole())
                .dateNaissance(userRequest.getDateNaissance())
                .email(userRequest.getEmail());


        Optional.ofNullable(userRequest.getImageId())
                .flatMap(imageRepository::findById)
                .ifPresent(userBuilder::image);




        Optional.ofNullable(userRequest.getMotdepasseId())
                .flatMap(motdepasseRepository::findById)
                .ifPresent(userBuilder::motdepasse);

        return userBuilder.build();
    }





    public UserRequest convertEntityToDto(Utilisateur u) {
        if (u == null) {
            return null;
        }

        UserRequest userRequest = new UserRequest();
        userRequest.setId(u.getId());
        userRequest.setNom(u.getNom());
        userRequest.setPrenom(u.getPrenom());
        userRequest.setEmail(u.getEmail());
        userRequest.setEtat(u.isEtat());
        userRequest.setPassword(null);

        if (u.getImage() != null) {
            userRequest.setImageId(u.getImage().getId());
        }


        if(u.getLocataireId()!=null)
        {
            userRequest.setLoc_id(u.getLocataireId());
        }


        if(u.getProprietaire_id()!=null)
        {
            userRequest.setProp_id(u.getProprietaire_id());
        }



        if (u.getMotdepasse() != null) {
            userRequest.setMotdepasseId(u.getMotdepasse().getId());
        }

        userRequest.setDateNaissance(u.getDateNaissance());
        userRequest.setRole(u.getRole());


        return userRequest;
    }








}