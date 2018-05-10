package ch.fhnw.wodss.tournament.web.rest;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.wodss.tournament.service.GameService;
import ch.fhnw.wodss.tournament.service.dto.GameDTO;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.GameVM;

/**
 * REST controller to manage the game requests
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@RestController
@RequestMapping("/api/games")
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
	@GetMapping
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

	/**
	 * PUT /games : updates a game's result
	 *
	 * @param vm to update for
	 * @return message if operation was successful
	 */
	@PutMapping
	public ResponseEntity<String> updateGame(@Valid @RequestBody GameVM vm) {
		log.info("new call to PUT games");

		if (!vm.isValid()) {
			log.info("provided view model was invalid, sending bad request");
			return new ResponseEntity<String>("Illegal state of view model", HttpStatus.BAD_REQUEST);
		}

		try {
			gameService.updateGameResult(vm.getId(), vm.getHomeGoals(), vm.getAwayGoals());
			return new ResponseEntity<>("Game updated", HttpStatus.CREATED);
		} catch (IllegalArgumentException re) {
			log.warn("failed to update game");
			return new ResponseEntity<>(re.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
}
