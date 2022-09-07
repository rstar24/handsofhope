package com.twn.cyfwms.CulturalProgram.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class CulturalProgAndActSearchCriteriaDto {
    @Getter
    @Setter
    private String data;
}
