package com.driagon.springreact.usersapp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public List<User> findAll() {
        return (List<User>) this.repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(Long id) {
        return this.repository.findById(id);
    }

    @Override
    @Transactional
    public User save(User user) {
        user.setPasword(this.passwordEncoder.encode(user.getPassword()));

        Optional<Role> o = this.roleRepository.findByName("ROLE_USER");
        List<Role> roles = new ArrayList<>();

        if (o.isPresent()) {
            roles.add(o.orElseThrow());

            user.setRoles(roles);
        }


        return this.repository.save(user);
    }
    
    @Override
    @Transactional
    public Optional<User> update(UserRequest user, Long id) {

        Optional<User> o = this.findById(id);
        User userOptional = null;

        if (o.isPresent()) {
            User userDb = o.orElseThrow();
            userDb.setUsername(user.getUsername());
            userDb.setEmail(user.getEmail());

            userOptional = this.repository.save(userDb);
        }

        return Optional.ofNullable(userOptional);
    }

    @Override
    @Transactional
    public void remove(Long id) {
        this.repository.deleteById(id);
    }
}