package com.driagon.springreact.usersapp.filters;

import com.driagon.springreact.usersapp.constants.AuthConstants;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;
import java.util.*;

public class JwtValidationFilter extends BasicAuthenticationFilter {

    public JwtValidationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String headers = request.getHeader(AuthConstants.HEADER_AUTHORIZATION);

        if (headers == null || !headers.startsWith(AuthConstants.PREFIX_TOKEN)) {
            chain.doFilter(request, response);
            return;
        }

        String token = headers.replace(AuthConstants.PREFIX_TOKEN, "");
        byte[] tokenDecodeBytes = Base64.getDecoder().decode(token);
        String tokenDecode = new String(tokenDecodeBytes);
        String[] tokenArr = tokenDecode.split("\\.");
        String secret = tokenArr[0];
        String username = tokenArr[1];

        if (AuthConstants.SECRET_KEY.equals(secret)) {
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            chain.doFilter(request, response);
        } else {
            Map<String, String> body = new HashMap<>();
            body.put("message", "El token no es válido");
            response.getWriter().write(new ObjectMapper().writeValueAsString(body));
            response.setStatus(HttpStatus.FORBIDDEN.value());
            response.setContentType(AuthConstants.HEADER_APPLICATION_JSON);
        }
    }
}
