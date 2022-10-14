package org.cyfwms.caregiver.dto;
import lombok.*;
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CapacityDto {
    @Getter @Setter
    private Long cgCapacityId;

    @Getter @Setter
    private Long maximumCap;

    @Getter @Setter
    private Long currUtil;

    @Getter @Setter
    private String currUtilDetails;

    @Getter @Setter
    private String preferences;

    @Getter @Setter
    private Long cgProviderId;
}
