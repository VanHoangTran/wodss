package ch.fhnw.wodss.tournament.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.wodss.tournament.persistance.AccountRepository;

@RestController
@RequestMapping("/matches")
public class MatchController {

	@Autowired
	AccountRepository userRepo;

	@GetMapping("/list")
	public List<String> register() {
		List<String> m = new ArrayList<>();
		m.add("Deutschland vs. Italien");
		m.add("Schweiz vs. Greichen");
		return m;
	}

}
