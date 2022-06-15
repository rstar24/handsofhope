package com.cyfwms.twn.login.service;

import com.cyfwms.twn.login.entity.Users;
import com.cyfwms.twn.login.util.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsersService usersService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //return new Users("admin", "password", new ArrayList<>());
        Users user = usersService.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("Users Not Found.");
        }
        return new CustomUserDetails(user);
    }
}
