package org.cyfwms.caregiver.dto;
import lombok.Getter;
import lombok.Setter;

public class CareProviderDto {
    @Getter @Setter
    private Long cgProviderId;
    @Getter @Setter
    private String name;
    @Getter @Setter
    private String status;
    @Getter @Setter
    private String type;
    @Getter @Setter
    private String otherType;
    @Getter @Setter
    private String address;
    @Getter @Setter
    private String city;
    @Getter @Setter
    private String postalCode;
    @Getter @Setter
    private String province;
    @Getter @Setter
    private String phoneNumber;
    @Getter @Setter
    private String email;
    @Getter @Setter
    private String priCaregiver;
    @Getter @Setter
    private String secCaregiver;
    @Getter @Setter
    private Long referenceId;
}
