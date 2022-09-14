package com.twn.cyfwms.CulturalProgram.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@AllArgsConstructor
@NoArgsConstructor

public class CulturalProgImageDto {
    @Getter
    @Setter
    private long culturalProgImageId;
    @Getter
    @Setter
    private byte[] file;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private long culturalProgramId;
    @Getter
    @Setter
    private String type;

    @Getter
    @Setter
    private String imageType;
}
