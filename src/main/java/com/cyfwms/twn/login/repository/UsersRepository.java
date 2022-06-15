package com.cyfwms.twn.login.repository;

import com.cyfwms.twn.login.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, String> {

    Users findByUsername(String username);
}
