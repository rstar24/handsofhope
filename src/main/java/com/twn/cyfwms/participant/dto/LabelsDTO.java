package com.twn.cyfwms.participant.dto;

import java.util.List;

import lombok.*;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class LabelsDTO {
  @Getter
  @Setter
  private List<LabelDTO> register;

  @Getter
  @Setter
  private List<LabelDTO> contact;

  @Getter
  @Setter
  private List<LabelDTO> householdMembers;

  @Getter
  @Setter
  private List<LabelDTO> educationAndEmployment;

  @Getter
  @Setter
  private List<LabelDTO> criminalHistoryRecord;

  @Getter
  @Setter
  private List<LabelDTO> criminalHistory;

  @Getter
  @Setter
  private List<LabelDTO> familyPhysicians;

  @Getter
  @Setter
  private List<LabelDTO> counselors;

  @Getter
  @Setter
  private List<LabelDTO> otherInformation;
}
