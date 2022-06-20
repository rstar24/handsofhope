package com.twn.login.model;

import lombok.*;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogoutRequest implements Serializable {
    @Getter @Setter
    private String username;
    @Getter @Setter
    private String jwtToken;
}
