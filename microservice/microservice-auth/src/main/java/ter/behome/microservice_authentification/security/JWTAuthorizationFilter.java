package ter.behome.microservice_authentification.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.filter.OncePerRequestFilter;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ter.behome.microservice_authentification.entities.Utilisateur;
import ter.behome.microservice_authentification.repository.UserRepository;


public class JWTAuthorizationFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;


    public JWTAuthorizationFilter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String jwt = request.getHeader("Authorization");

        if (jwt == null || !jwt.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Vérification du JWT
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SecParams.SECRET)).build();
        jwt = jwt.substring(7); // Supprime "Bearer "

        DecodedJWT decodedJWT = verifier.verify(jwt);
        String username = decodedJWT.getSubject();
        Collection<GrantedAuthority> authorities = new ArrayList<>();

        // Récupération des rôles de l'utilisateur
        // Récupération du rôle de l'utilisateur
        Optional<Utilisateur> userOptional = userRepository.findByEmail(username);

        if (userOptional.isPresent()) {
            Utilisateur user = userOptional.get();
            String role = user.getRole(); // Maintenant getRole() retourne un String

            if (role != null && !role.isEmpty()) {
                System.out.println("Role: " + role);
                authorities.add(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
                // Conversion en majuscules pour uniformité
            }
        } else {
            throw new UsernameNotFoundException("Utilisateur non trouvé avec l'email: " + username);
        }

        UsernamePasswordAuthenticationToken user =
                new UsernamePasswordAuthenticationToken(username,null,authorities);


        SecurityContextHolder.getContext().setAuthentication(user);
        filterChain.doFilter(request, response);
    }

}
