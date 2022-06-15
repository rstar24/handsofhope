package com.cyfwms.twn.login.model;

import lombok.*;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse implements Serializable {
    @Getter @Setter
    private String jwtToken;
}
