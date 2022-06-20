package com.twn.login.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Users",
    uniqueConstraints = @UniqueConstraint(
            name = "username_unique",
            columnNames = "username"
    )
)

public class Users implements Serializable {
    @Getter @Setter @Column(name = "firstname")
    private String firstname;
    @Getter @Setter @Column(name = "surname")
    private String surname;
    @Getter @Setter @Column(name = "middlename")
    private String middleName;
    @Id @Getter @Setter @Column(name = "username", nullable = false)
    private String username;
    @Getter @Setter @Column(name = "email")
    private String email;
    @Getter @Setter @Column(name = "password")
    private String password;
    @Getter @Setter @Column(name = "dateOfBirth")
    private LocalDate dateOfBirth;
    @Getter @Setter @Column(name = "creationdate")
    private LocalDate creationDate;
    @Getter @Setter @Column(name = "lastaccessdate")
    private LocalDate lastAccessDate;
    @Getter @Setter @Column(name = "updatedat")
    private LocalDate updatedAt;
    @Getter @Setter @Column(name = "profiletype")
    private String profileType;
    @Getter @Setter @Column(name = "title")
    private String title;
    @Getter @Setter @Column(name = "status")
    private String status;
    @Getter @Setter @Column(name = "phone")
    private String phone;
    @Getter @Setter @Column(name = "location")
    private String location;
    @Getter @Setter @Column(name = "role")
    private String role;
    @Getter @Setter @Column(name = "preferredlanguage")
    private String preferredLanguage;

}
