package com.driagon.springreact.cartapp.repositories;

import org.springframework.data.repository.CrudRepository;

import com.driagon.springreact.cartapp.models.Product;

public interface IProductRepository extends CrudRepository<Product, Long> {

}