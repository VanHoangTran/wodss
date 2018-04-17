package ch.fhnw.wodss.tournament.web.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class GameResource {

	@GetMapping("/game")
	public String getActiveProfiles() {
		return "you see some secured text!";
	}

}
