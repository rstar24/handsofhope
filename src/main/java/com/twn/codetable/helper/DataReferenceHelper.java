package com.twn.codetable.helper;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
@ConfigurationProperties(prefix = "codetablevalues")
@AllArgsConstructor
@Data
public class DataReferenceHelper {
    private Map<String,Map<String,String>> gender;
    private Map<String,Map<String,String>> maritalStatus;
    private Map<String,Map<String,String>> Province;
    private Map<String,Map<String,String>> role;
    private Map<String,Map<String,String>> education;
    private Map<String,Map<String,String>> typeOfEmployee;
    private Map<String,Map<String,String>> initialContactStatus;
    private Map<String,Map<String,String>> initialContactReferral;
    private Map<String,Map<String,String>> presentConcerns;
    private Map<String,Map<String,String>> mentalHealthOrSubstanceAbuse;
    private Map<String,Map<String,String>> typeOfPatient;
    private Map<String,Map<String,String>> risk;


}
