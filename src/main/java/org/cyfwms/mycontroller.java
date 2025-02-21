package org.cyfwms;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class mycontroller {

	@GetMapping("/")
	public String getMethodName() {
		System.err.println("MyController");
		return "Hello World";
	}
}
