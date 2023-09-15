package com.driagon.springreact.usersapp.repositories;

import com.driagon.springreact.usersapp.models.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface IRoleRepository extends CrudRepository<Role, Long> {

    Optional<Role> findByName(String name);
}