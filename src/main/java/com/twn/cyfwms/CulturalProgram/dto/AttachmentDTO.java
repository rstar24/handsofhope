package com.twn.cyfwms.CulturalProgram.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AttachmentDTO {
  private long culturalProgImageId;
  private byte[] file;
  private String name;
  private long culturalProgramId;
  private String type;
  private String imageType;
  private  String culturalimagename;
}
