package com.testTask.service.impl;

import com.testTask.entity.User;
import com.testTask.repository.UserRepository;
import com.testTask.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository repository;

    @Override
    public Long createUser(User user) {
        LocalDateTime now = LocalDateTime.now();
        log.info("Create user: {}", user.toString());
        return repository.createUser(new User(
                user.getId(),
                user.getLogin(),
                user.getPassword(),
                user.getNick(),
                java.sql.Timestamp.valueOf(now)));
    }

    @Override
    @Cacheable("users")
    public User getUserById(Long userId) {
        log.info("Get user by id: {}", userId);
        return repository.getUserById(userId);
    }

    @Override
    public User getUserByLogin(String userLogin) {
        log.info("Get user by login: {}", userLogin);
        return repository.getUserByLogin(userLogin);
    }

    @Override
    @CachePut(value = "users", key = "#user.id")
    public User updateUser(User user) {
        log.info("Update user: {}", user.toString());
        return repository.updateUser(user);
    }

    @Override
    @CacheEvict(value = "users")
    public void removeUser(Long userId) {
        log.info("Remove user: {}", userId);
        repository.removeUser(userId);
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        UserDetails user = getUserByLogin(login);
        org.springframework.security.core.userdetails.User.UserBuilder builder;
        builder = org.springframework.security.core.userdetails.User.withUsername(user.getUsername());
        builder.password(new BCryptPasswordEncoder().encode(user.getPassword()));
        builder.roles("USER");
        return builder.build();
    }
}
