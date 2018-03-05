package ch.fhnw.wodss.tournament.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.wodss.tournament.model.User;
import ch.fhnw.wodss.tournament.persistance.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	UserRepository userRepo;

	public ResponseEntity<User> register() {
		throw new IllegalStateException("not yet implemented");
	}

}
