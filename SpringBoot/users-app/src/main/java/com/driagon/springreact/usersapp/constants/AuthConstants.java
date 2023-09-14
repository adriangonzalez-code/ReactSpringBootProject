package com.driagon.springreact.usersapp.constants;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;

public class AuthConstants {
    public static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    public static final String PREFIX_TOKEN = "Bearer ";
    public static final String HEADER_AUTHORIZATION = "Authorization";
    public static final String HEADER_APPLICATION_JSON = "application/json";
}