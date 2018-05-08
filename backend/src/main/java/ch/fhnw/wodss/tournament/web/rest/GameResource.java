package ch.fhnw.wodss.tournament.web.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.wodss.tournament.service.GameService;
import ch.fhnw.wodss.tournament.service.dto.GameDTO;

/**
 * REST controller to manage the game requests
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@RestController
@RequestMapping("/api")
public class GameResource {

	private final Logger log = LoggerFactory.getLogger(GameResource.class);

	@Autowired
	private GameService gameService;

	/**
	 * GET /games : returns all games
	 * 
	 * @param phaseId to filter games for
	 * @return list of all games
	 */
	@GetMapping("/games")
	public ResponseEntity<List<GameDTO>> getGames(@RequestParam(required = false) Long phaseId) {
		log.info("new call to GET games");

		try {
			// accept filtering by parameter phaseId
			if (phaseId != null) {
				log.info("phaseId parameter provided - returing a filtered list of games by phaseId");
				return new ResponseEntity<>(gameService.getGamesByPhase(phaseId), HttpStatus.OK);
			}

			return new ResponseEntity<>(gameService.getAllGames(), HttpStatus.OK);
		} catch (IllegalArgumentException re) {
			log.info("failed to GET all games");
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
