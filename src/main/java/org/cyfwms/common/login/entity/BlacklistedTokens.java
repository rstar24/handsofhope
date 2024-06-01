package org.cyfwms.common.login.entity;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "BlacklistedTokens")
@IdClass(BlacklistedTokensId.class)
public class BlacklistedTokens implements Serializable {
	@Id
	@Getter
	@Setter
	@Column(name = "username")
	private String username;

	@Id
	@Getter
	@Setter
	@Column(name = "jwttoken")
	private String jwtToken;

	@Getter
	@Setter
	@Column(name = "blacklisteddate")
	private LocalDate blacklistedDate;
}
