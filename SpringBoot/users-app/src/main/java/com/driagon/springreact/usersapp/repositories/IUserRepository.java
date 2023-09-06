package com.driagon.springreact.usersapp.repositories;

import org.springframework.data.repository.CrudRepository;

import com.driagon.springreact.usersapp.models.User;

public interface IUserRepository extends CrudRepository<User, Long> {
}