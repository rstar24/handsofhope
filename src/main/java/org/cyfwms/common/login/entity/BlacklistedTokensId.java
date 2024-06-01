package org.cyfwms.common.login.entity;

import java.io.Serializable;
import javax.persistence.Column;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlacklistedTokensId implements Serializable {
	@Getter
	@Setter
	@Column(name = "username")
	private String username;

	@Getter
	@Setter
	@Column(name = "jwttoken")
	private String jwtToken;
}
