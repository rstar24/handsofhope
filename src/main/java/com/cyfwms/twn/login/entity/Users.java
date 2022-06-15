package com.cyfwms.twn.login.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "USERS")
public class Users implements Serializable {
    @Getter @Setter @Column(name = "first_name")
    private String firstname;
    @Getter @Setter @Column(name = "sur_name")
    private String surname;
    @Getter @Setter @Column(name = "middle_name")
    private String middleName;
    @Id @Getter @Setter @Column(name = "username")
    private String username;
    @Getter @Setter @Column(name = "email")
    private String email;
    @Getter @Setter @Column(name = "password")
    private String password;
    @Getter @Setter @Column(name = "date_of_birth")
    private Date dateOfBirth;
    @Getter @Setter @Column(name = "creation_date")
    private Date creation_date;
    @Getter @Setter @Column(name = "last_access_date")
    private Date last_access_date;
    @Getter @Setter @Column(name = "updated_at")
    private Date updated_at;
    @Getter @Setter @Column(name = "profile_type")
    private String profile_type;
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
    @Getter @Setter @Column(name = "preferred_language")
    private String preferredLanguage;

}
