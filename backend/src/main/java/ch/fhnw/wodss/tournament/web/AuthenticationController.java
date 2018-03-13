package ch.fhnw.wodss.tournament.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authenticate")
public class AuthenticationController {

	@RequestMapping(method = RequestMethod.POST)
	public String authenticate() {
		return "success"; // just a message to be sure ;-)
	}

}
