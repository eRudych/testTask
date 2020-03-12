package com.testTask.repository;

import com.testTask.entity.User;

public interface UserRepository {

    Long createUser(User user);

    User getUserById(Long userId);

    User getUserByLogin(String userLogin);

    User updateUser(User user);

    void removeUser(Long userId);
}
