package com.cyfwms.twn.login.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlacklistedTokensId implements Serializable {
    @Getter @Setter @Column(name = "username")
    private String username;
    @Getter @Setter @Column(name = "jwt_token")
    private String jwtToken;
}
