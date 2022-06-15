package com.cyfwms.twn.login.service;

import com.cyfwms.twn.login.entity.Users;
import com.cyfwms.twn.login.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UsersService {
    @Autowired
    private UsersRepository userRepository;

    public Users findByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepository.findByUsername(username);
        return user;
    }
}
