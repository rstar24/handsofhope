package org.cyfwms.common.login.dto;

import java.io.Serializable;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogoutRequest implements Serializable {
	@Getter
	@Setter
	private String username;

	@Getter
	@Setter
	private String jwtToken;
}
