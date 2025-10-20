package com.garytracey.beat_sequencer.service;

import com.garytracey.beat_sequencer.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public JpaUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 1. Fetch the user from the database
        return userRepository.findByUsername(username)
                // 2. If found, wrap it in our SecurityUser adapter
                .map(SecurityUser::new)
                // 3. If not found, throw an exception
                .orElseThrow(() -> new UsernameNotFoundException("Username not found: " + username));
    }
}