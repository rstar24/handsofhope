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
}
