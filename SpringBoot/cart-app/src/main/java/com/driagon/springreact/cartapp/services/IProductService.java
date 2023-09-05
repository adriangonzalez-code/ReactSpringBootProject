package com.driagon.springreact.cartapp.services;

import java.util.List;

import com.driagon.springreact.cartapp.models.Product;

public interface IProductService {

    List<Product> findAll();
}