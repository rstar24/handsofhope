package com.twn.cyfwms.CulturalProgram.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class CulturalProgramSearchCriteriaDto {
    @Getter
    @Setter
    private String data;
}
