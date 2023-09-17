package com.driagon.springreact.usersapp.filters;

import com.driagon.springreact.usersapp.auth.SimpleGrantedAuthoritiyJsonCreator;
import com.driagon.springreact.usersapp.constants.AuthConstants;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
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

        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(AuthConstants.SECRET_KEY).build().parseClaimsJws(token).getBody();
            String username = claims.getSubject();
            Object authoritiesClaims = claims.get("authorities");

            Collection<? extends GrantedAuthority> authorities = Arrays.asList(new ObjectMapper().addMixIn(SimpleGrantedAuthority.class, SimpleGrantedAuthoritiyJsonCreator.class).readValue(authoritiesClaims.toString().getBytes(), SimpleGrantedAuthority[].class));

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            chain.doFilter(request, response);
        } catch (JwtException ex){
            Map<String, String> body = new HashMap<>();

            body.put("error", ex.getMessage());
            body.put("message", "El token no es válido");

            response.getWriter().write(new ObjectMapper().writeValueAsString(body));
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(AuthConstants.HEADER_APPLICATION_JSON);
        }
    }
}
