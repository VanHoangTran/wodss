package ch.fhnw.wodss.tournament.web.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.wodss.tournament.domain.Game;
import ch.fhnw.wodss.tournament.service.GameService;

@RestController
@RequestMapping("/api")
public class GameResource {

	private final Logger log = LoggerFactory.getLogger(GameResource.class);

	@Autowired
	private GameService gameService;

	@GetMapping("/games/{id}")
	public ResponseEntity<List<Game>> getGamesInPhase(@PathVariable String id) {
		log.info("new call to GET games");

		try {
			return new ResponseEntity<>(gameService.getAllGames(), HttpStatus.OK);
		} catch (RuntimeException re) {
			log.info("failed to GET all phases");
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
