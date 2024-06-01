package org.cyfwms.common.codetable.helper;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "culturalprogandact")
@AllArgsConstructor
@Data
public class DataRefCluturalProgAndAct {
	private Map<String, Map<String, String>> culturalType;
	private Map<String, Map<String, String>> culturalStatus;
}
