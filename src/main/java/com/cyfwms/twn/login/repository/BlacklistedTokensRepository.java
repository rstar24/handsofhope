package com.cyfwms.twn.login.repository;

import com.cyfwms.twn.login.entity.BlacklistedTokensId;
import com.cyfwms.twn.login.entity.BlacklistedTokens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlacklistedTokensRepository extends JpaRepository<BlacklistedTokens, BlacklistedTokensId> {
    Optional<BlacklistedTokens> findByUsernameAndJwtToken(String username, String jwtToken);
}
