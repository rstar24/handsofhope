package org.cyfwms.common.exception;

import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

public class MessageUtil {
	@Autowired
	private final MessageSource messageSource;

	public MessageUtil(MessageSource messageSource) {
		this.messageSource = messageSource;
	}

	@Bean
	public String getLocalMessage(String key, String... params) {
		return messageSource.getMessage(key, params, Locale.ENGLISH);
	}
}
