package org.cyfwms.common.login.repository;

import java.util.Optional;
import org.cyfwms.common.login.entity.BlacklistedTokens;
import org.cyfwms.common.login.entity.BlacklistedTokensId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlacklistedTokensRepository
	extends JpaRepository<BlacklistedTokens, BlacklistedTokensId> {
	Optional<BlacklistedTokens> findByUsernameAndJwtToken(String username, String jwtToken);
}
