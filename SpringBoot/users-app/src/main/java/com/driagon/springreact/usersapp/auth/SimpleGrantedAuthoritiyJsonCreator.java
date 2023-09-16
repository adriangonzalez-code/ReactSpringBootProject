package com.driagon.springreact.usersapp.auth;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class SimpleGrantedAuthoritiyJsonCreator {

    @JsonCreator
    public SimpleGrantedAuthoritiyJsonCreator(@JsonProperty("authority") String role) {
    }
}