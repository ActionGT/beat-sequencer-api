package com.garytracey.beat_sequencer.config;

import com.garytracey.beat_sequencer.service.JpaUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity // Explicitly enables web security
public class SecurityConfig {

    private final JpaUserDetailsService jpaUserDetailsService;

    // We inject our custom UserDetailsService
    public SecurityConfig(JpaUserDetailsService jpaUserDetailsService) {
        this.jpaUserDetailsService = jpaUserDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        // This is the bridge between Spring Security and our user details
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(jpaUserDetailsService); // (1) Tell it to use our service
        provider.setPasswordEncoder(passwordEncoder()); // (2) Tell it to use our password encoder
        return provider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable()) // (A) Disable CSRF for our stateless API
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**", "/api/health").permitAll() // (B) Make auth/health public
                        .anyRequest().authenticated() // (C) Secure everything else
                )
                .authenticationProvider(authenticationProvider()) // (D) Set our custom auth provider
                .httpBasic(Customizer.withDefaults()) // (E) Enable HTTP Basic Auth for Postman
                .build();
    }
}