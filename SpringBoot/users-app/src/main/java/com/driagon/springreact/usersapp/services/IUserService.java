package com.driagon.springreact.usersapp.services;

import java.util.List;
import java.util.Optional;

import com.driagon.springreact.usersapp.dto.UserRequest;
import com.driagon.springreact.usersapp.dto.UserResponse;
import com.driagon.springreact.usersapp.models.User;

public interface IUserService {
    
    List<UserResponse> findAll();

    Optional<UserResponse> findById(Long id);

    UserResponse save(User user);
    
    Optional<UserResponse> update(UserRequest user, Long id);

    void remove(Long id);
}
