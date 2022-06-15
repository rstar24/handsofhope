package com.cyfwms.twn.login.controller;

import com.cyfwms.twn.login.entity.BlacklistedTokens;
import com.cyfwms.twn.login.model.LoginRequest;
import com.cyfwms.twn.login.model.LoginResponse;
import com.cyfwms.twn.login.model.LogoutRequest;
import com.cyfwms.twn.login.service.BlacklistedTokensService;
import com.cyfwms.twn.login.service.CustomUserDetailsService;
import com.cyfwms.twn.login.util.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

/**
 * DOCUMENTATION :::
 * https://sopheamak.medium.com/springboot-how-to-invalidate-jwt-token-such-as-logout-or-reset-all-active-tokens-73f55289d47b
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/login")
public class LoginController {

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private BlacklistedTokensService blacklistedTokensService;

    @PostMapping("/authenticate")
    public LoginResponse authenticate(@RequestBody LoginRequest loginRequest) throws Exception{
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
        }catch (BadCredentialsException ex){
            throw new Exception("Bad Credential Exception", ex);
        }

        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(
                loginRequest.getUsername());
        final String token = jwtUtil.generateToken(userDetails);

        return new LoginResponse(token);
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logout(@RequestBody LogoutRequest logoutRequest) throws Exception{
        BlacklistedTokens blacklistedTokens = new BlacklistedTokens();
        blacklistedTokens.setBlacklistedDate(new Date());
        blacklistedTokens.setJwtToken(logoutRequest.getJwtToken());
        blacklistedTokens.setUsername(logoutRequest.getUsername());
        Optional<BlacklistedTokens> blacklistedTokensOpt =
                blacklistedTokensService.findByUsernameAndJwtToken(blacklistedTokens);
        if(!blacklistedTokensOpt.isPresent()) {
            blacklistedTokensService.createBlacklistedTokens(blacklistedTokens);
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/home")
    public String home(){
        return "Welcome, This is user page.";
    }
}
