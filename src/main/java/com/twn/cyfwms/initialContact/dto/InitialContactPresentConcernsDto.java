package com.twn.cyfwms.initialContact.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.Column;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class InitialContactPresentConcernsDto {
    @Getter
    @Setter
    private Long fileDetailsId;
    @Getter
    @Setter
    private Long presentConcernsId;


    @Getter @Setter
    private String selectPresentConcerns;

    @Getter @Setter
    private String situation;

    @Getter @Setter
    private String substanceAbuse;

    @Getter @Setter
    private String explainMentalHealth;

}
