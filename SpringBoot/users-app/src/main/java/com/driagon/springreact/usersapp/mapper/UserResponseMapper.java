package com.driagon.springreact.usersapp.mapper;

import com.driagon.springreact.usersapp.dto.UserResponse;
import com.driagon.springreact.usersapp.models.User;

public class UserResponseMapper {

    private User user;

    private UserResponseMapper() {
    }

    public static UserResponseMapper builder() {
        return new UserResponseMapper();
    }

    public UserResponseMapper setUser(User user) {
        this.user = user;
        return this;
    }

    public UserResponse build() {
        if (user == null) {
            throw new RuntimeException("Debe pasar el entity User!");
        }

        return new UserResponse(this.user.getId(), this.user.getUsername(), this.user.getEmail());
    }
}