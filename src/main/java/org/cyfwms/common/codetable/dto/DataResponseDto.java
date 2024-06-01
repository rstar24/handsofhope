package org.cyfwms.common.codetable.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.Map;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DataResponseDto {
	private String type;
	private Map<String, String> values;
	Map<String, Map<String, String>> valuesMap;
}
