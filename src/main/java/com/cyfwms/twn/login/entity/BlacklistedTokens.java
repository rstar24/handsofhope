package com.cyfwms.twn.login.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "BlacklistedTokens")
@IdClass(BlacklistedTokensId.class)
public class BlacklistedTokens implements Serializable {
    @Id @Getter @Setter @Column(name = "username")
    private String username;
    @Id @Getter @Setter @Column(name = "jwt_token")
    private String jwtToken;
    @Getter @Setter @Column(name = "blacklisted_date")
    private Date blacklistedDate;
}
