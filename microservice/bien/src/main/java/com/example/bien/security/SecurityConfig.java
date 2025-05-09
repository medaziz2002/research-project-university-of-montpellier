package com.example.bien.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.UUID;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig  {




    private final JWTAuthorizationFilter jwtAuthFilter;





    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults())
                .csrf(csrf -> csrf
                        .disable())
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers(
                                "/actuator/**",
                         "/api/v1/locataires/add",
                                "/api/v1/annonces/getLast4Annonces/**",
                              "/api/v1/proprietaires/add",
                                "/api/v1/annonces/**",
                                "/api/v1/typebiens/**",                   
                                "/api/v1/reservations/**",             
                                "/api/v1/users/**",                     
                                "/api/v1/proprietaires/modUserId",
                                "/api/auth/**",
                                "/auth/login/**",
                                "/authentification/**",
                                "/api/v1/locataires/modUserId",
                                "/v2/api-docs",
                                "/file/**",
                                "/v3/api-docs",
                                "/v3/api-docs/**",
                                "/swagger-resources",
                                "/swagger-resources/**",
                                "/configuration/ui",
                                "/configuration/security",
                                "/AgentSupport/conge/**",
                                "/AgentSupport/reactivate/**",
                                "/swagger-ui/**",
                                "/webjars/**",
                                "/swagger-ui.html",
                                "index.html"
                        )
                        .permitAll()
                        .requestMatchers(HttpMethod.GET, "/priorite/last-degree").permitAll()
                        .requestMatchers(HttpMethod.GET, "/FAQ/public").permitAll()

                        //.requestMatchers(HttpMethod.POST, "AgentSupport/conge/{agent_id}").permitAll()
                        .anyRequest()
                        .authenticated())
                .sessionManagement(management -> management
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }



}

