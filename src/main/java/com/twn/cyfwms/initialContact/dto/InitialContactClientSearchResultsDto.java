package com.twn.cyfwms.initialContact.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class InitialContactClientSearchResultsDto {
    @Getter
    @Setter
    private String firstname;
    @Getter @Setter
    private String surname;

    public InitialContactClientSearchResultsDto(String firstname, String surname) {
        this.firstname = firstname;
        this.surname = surname;
    }
}
