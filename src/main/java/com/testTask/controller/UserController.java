package com.testTask.controller;

import com.testTask.entity.User;
import com.testTask.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE})
    public long createUser(@RequestBody User user) {
        log.info("Create user {}", user.toString());
        return userService.createUser(user);
    }

    @DeleteMapping("/{userId}")
    public void removeUser(@PathVariable("userId") long userId) {
        log.info("Remove user {}", userId);
        userService.removeUser(userId);
    }

    @PutMapping(consumes = {MediaType.APPLICATION_JSON_VALUE})
    public User updateUser(@RequestBody User user) {
        log.info("Update user {}", user.toString());
        return userService.updateUser(user);
    }

    @GetMapping("/{userId}")
    public User getUser(@PathVariable("userId") long userId) {
        log.info("Get user {}", userId);
        return userService.getUserById(userId);
    }
}
