package com.testTask.service;

import com.testTask.entity.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService {

    Long createUser(User user);

    User getUserById(Long userId);

    User getUserByLogin(String userLogin);

    User updateUser(User user);

    void removeUser(Long userId);

    UserDetails loadUserByUsername(String login);
}
