package com.driagon.springreact.usersapp.services;

import com.driagon.springreact.usersapp.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JpaUserDetailService implements UserDetailsService {

    @Autowired
    private IUserRepository repository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<com.driagon.springreact.usersapp.models.User> o = this.repository.findByUsername(username);

        if (o.isEmpty()) {
            throw new UsernameNotFoundException(String.format("El Username %s no existe en el sistema!", username));
        }

        com.driagon.springreact.usersapp.models.User user = o.orElseThrow();

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));

        return new User(user.getUsername(), user.getPassword(), true, true, true, true, authorities);
    }
}