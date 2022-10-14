package org.cyfwms.caregiver.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.aspectj.lang.annotation.DeclareAnnotation;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class CGAttachmentDto {
    private long cgImageId;
    private byte[] cgImagefile;
    private String name;
    private long cgProviderId;
    private String type;
    private String cgImageType;
    private  String cgImagename;
}
