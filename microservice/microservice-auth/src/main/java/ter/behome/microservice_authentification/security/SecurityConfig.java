package ter.behome.microservice_authentification.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import ter.behome.microservice_authentification.repository.UserRepository;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig  {




    @Autowired
    UserRepository userRepository;





    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity httpSecurity, UserDetailsService userDetailsService) throws Exception {
        return httpSecurity.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder()) // Use the injected passwordEncoder
                .and()
                .build();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, AuthenticationManager authenticationManager) throws Exception {
        httpSecurity
                .cors(withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers(
                            "/api/v1/users/add",
                            "/api/v1/users/add/**",
                            "/api/v1/users/generateToken/**",
                            "/api/v1/users/checkIfPasswordIsValid/**",
                            "/api/v1/users/getByEmail/**",
                            "/api/v1/users", 
                            "/api/v1/users/**",  
                            "/auth/login/",
                            "/**",
                            "/api/auth/**",
                            "/login",
                            "/getUser",
                            "/getUser/**",
                            "/api/v1/users/**",
                            "/reset/**",
                            "/changePassword/**",
                            "/google",
                            "/api/v1/users/change-password/**",
                            "/authentification/",
                            "/v2/api-docs",
                            "/actuator/**",
                            "/v3/api-docs",
                            "/v3/api-docs/**",
                            "/swagger-resources",
                            "/swagger-resources/**",
                            "/configuration/ui",
                            "/configuration/security",
                            "/swagger-ui/**",
                            "/webjars/**",
                            "/swagger-ui.html",
                            "index.html"
                        ).permitAll()
                        .anyRequest()
                        .authenticated())

                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(new JWTAuthenticationFilter(authenticationManager), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new JWTAuthorizationFilter(userRepository), UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }







}

