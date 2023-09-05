package com.driagon.springreact.cartapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.driagon.springreact.cartapp.models.Product;
import com.driagon.springreact.cartapp.repositories.IProductRepository;

@Service
public class ProductServiceImpl implements IProductService {

    @Autowired
    private IProductRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<Product> findAll() {
        return (List<Product>)this.repository.findAll();
    }   
}