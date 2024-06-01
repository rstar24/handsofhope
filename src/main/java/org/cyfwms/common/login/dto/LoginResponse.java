package org.cyfwms.common.login.dto;

import java.io.Serializable;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse implements Serializable {
	@Getter
	@Setter
	private String jwtToken;
}
