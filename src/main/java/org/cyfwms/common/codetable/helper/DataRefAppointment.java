package org.cyfwms.common.codetable.helper;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "appointment")
@AllArgsConstructor
@Data
public class DataRefAppointment {
	private Map<String, Map<String, String>> frequency;
	private Map<String, Map<String, String>> appointmentStatus;
	private Map<String, Map<String, String>> reminderstatus;
}
