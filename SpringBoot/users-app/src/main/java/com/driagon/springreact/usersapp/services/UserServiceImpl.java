package com.driagon.springreact.usersapp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.driagon.springreact.usersapp.dto.UserResponse;
import com.driagon.springreact.usersapp.mapper.UserResponseMapper;
import com.driagon.springreact.usersapp.models.Role;
import com.driagon.springreact.usersapp.repositories.IRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.driagon.springreact.usersapp.dto.UserRequest;
import com.driagon.springreact.usersapp.models.User;
import com.driagon.springreact.usersapp.repositories.IUserRepository;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private IUserRepository repository;

    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> findAll() {
        List<User> users = (List<User>) this.repository.findAll();

        return users.stream().map(u -> UserResponseMapper.builder().setUser(u).build()).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UserResponse> findById(Long id) {
        return this.repository.findById(id).map(u -> UserResponseMapper.builder().setUser(u).build());
    }

    @Override
    @Transactional
    public UserResponse save(User user) {
        user.setPasword(this.passwordEncoder.encode(user.getPassword()));

        Optional<Role> o = this.roleRepository.findByName("ROLE_USER");
        List<Role> roles = new ArrayList<>();

        if (o.isPresent()) {
            roles.add(o.orElseThrow());

            user.setRoles(roles);
        }


        return UserResponseMapper.builder().setUser(this.repository.save(user)).build();
    }
    
    @Override
    @Transactional
    public Optional<UserResponse> update(UserRequest user, Long id) {

        Optional<User> o = this.repository.findById(id);
        User userOptional = null;

        if (o.isPresent()) {
            User userDb = o.orElseThrow();
            userDb.setUsername(user.getUsername());
            userDb.setEmail(user.getEmail());

            userOptional = this.repository.save(userDb);
        }

        return Optional.ofNullable(UserResponseMapper.builder().setUser(userOptional).build());
    }

    @Override
    @Transactional
    public void remove(Long id) {
        this.repository.deleteById(id);
    }
}