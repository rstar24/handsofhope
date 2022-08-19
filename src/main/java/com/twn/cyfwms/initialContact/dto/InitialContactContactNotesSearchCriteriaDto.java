package com.twn.cyfwms.initialContact.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class InitialContactContactNotesSearchCriteriaDto {
    @Getter
    @Setter
    private String data;
}
