package com.driagon.springreact.usersapp.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.driagon.springreact.usersapp.dto.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.driagon.springreact.usersapp.dto.UserRequest;
import com.driagon.springreact.usersapp.models.User;
import com.driagon.springreact.usersapp.services.IUserService;

import jakarta.validation.Valid;

@CrossOrigin(originPatterns = "*")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private IUserService service;
    
    @GetMapping
    public List<UserResponse> list() {
        return this.service.findAll();
    }

    @GetMapping("/page/{page}")
    public Page<UserResponse> list(@PathVariable Integer page) {
        Pageable pageable = PageRequest.of(page, 4);
        return this.service.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable("id") Long id) {
        Optional<UserResponse> usrOptional = this.service.findById(id);

        if (usrOptional.isPresent()) {
            return ResponseEntity.ok(usrOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody User user, BindingResult result) {

        if (result.hasErrors()) {
            return validation(result);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(this.service.save(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @Valid @RequestBody UserRequest user, BindingResult result) {

        if (result.hasErrors()) {
            return validation(result);
        }

        Optional<UserResponse> o = this.service.update(user, id);

        if (o.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(o.orElseThrow());
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable("id") Long id) {

        Optional<UserResponse> o = this.service.findById(id);

        if (o.isPresent()) {
            this.service.remove(id);
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();

        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
        });

        return ResponseEntity.badRequest().body(errors);
    }
}