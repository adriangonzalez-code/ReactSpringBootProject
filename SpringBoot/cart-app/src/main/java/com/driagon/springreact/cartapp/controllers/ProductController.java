package com.driagon.springreact.cartapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.driagon.springreact.cartapp.models.Product;
import com.driagon.springreact.cartapp.services.IProductService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/products")
public class ProductController {
    
    @Autowired
    private IProductService service;

    @GetMapping
    public List<Product> list() {
        return this.service.findAll();
    }
}