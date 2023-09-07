package com.driagon.springreact.usersapp.services;

import java.util.List;
import java.util.Optional;

import com.driagon.springreact.usersapp.models.User;

public interface IUserService {
    
    List<User> findAll();

    Optional<User> findById(Long id);

    User save(User user);
    
    Optional<User> update(User user, Long id);

    void remove(Long id);
}
