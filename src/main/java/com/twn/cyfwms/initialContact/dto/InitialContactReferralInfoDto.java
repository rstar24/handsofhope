package com.twn.cyfwms.initialContact.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class InitialContactReferralInfoDto {
    @Getter
    @Setter
    private Long fileDetailsId;

    @Getter
    @Setter
    private Long referralInfoId;

    @Getter
    @Setter
    private String referral;

    @Getter
    @Setter
    private Boolean selfReferred;

    @Getter
    @Setter
    private String agencyName;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private String address;

    @Getter
    @Setter
    private String phone;

    @Getter
    @Setter
    private String email;
}
