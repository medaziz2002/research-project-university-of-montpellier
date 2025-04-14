package ter.behome.microservice_authentification.security;

import jdk.jshell.execution.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ter.behome.microservice_authentification.entities.Utilisateur;
import ter.behome.microservice_authentification.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private UserRepository userRepo;




    @Autowired
    public CustomUserDetailsService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws
            UsernameNotFoundException {
        Utilisateur user = userRepo.findByEmail(email).get();

        if (user==null)
            throw new UsernameNotFoundException("Utilisateur introuvable !");

        List<GrantedAuthority> auths = new ArrayList<>();

        //auths = user.getRole().getPermissions().stream().map((p) -> new SimpleGrantedAuthority(p.getNomPermission()))
        // .collect(Collectors.toList());






        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getMotdepasse().getValeurMotdepasse(),
                auths
        );
    }









}


