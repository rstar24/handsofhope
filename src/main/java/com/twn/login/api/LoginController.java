package com.twn.login.api;


import com.twn.login.dto.LoginRequest;
import com.twn.login.dto.LoginResponse;
import com.twn.login.service.BlacklistedTokensService;
import com.twn.login.service.CustomUserDetailsService;
import com.twn.login.util.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

/**
 * DOCUMENTATION :::
 * https://sopheamak.medium.com/springboot-how-to-invalidate-jwt-token-such-as-logout-or-reset-all-active-tokens-73f55289d47b
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/login")
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


    //Only Admin can access this
    @GetMapping("/admin-home")
    @PreAuthorize("hasAuthority ('admin')")
       public String adminPing(){

        return "This is admin home";
    }

    //Only CaseWorker can access this
    @GetMapping("/cw-home")
    @PreAuthorize("hasAuthority ('caseworker')")
    public String caseWorkerHome(){

        return "This is CW home";
    }


    /*@PostMapping("/signout")
    public ResponseEntity<?> logout(@RequestBody LogoutRequest logoutRequest) throws Exception{
        BlacklistedTokens blacklistedTokens = new BlacklistedTokens();
        blacklistedTokens.setBlacklistedDate(LocalDate.now());
        blacklistedTokens.setJwtToken(logoutRequest.getJwtToken());
        //blacklistedTokens.setUsername(logoutRequest.getUsername());
        Optional<BlacklistedTokens> blacklistedTokensOpt =
                blacklistedTokensService.findByUsernameAndJwtToken(blacklistedTokens);
        if(!blacklistedTokensOpt.isPresent()) {
            blacklistedTokensService.createBlacklistedTokens(blacklistedTokens);
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }*/
}
