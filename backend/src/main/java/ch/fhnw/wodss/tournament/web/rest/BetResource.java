package ch.fhnw.wodss.tournament.web.rest;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.wodss.tournament.service.BetService;
import ch.fhnw.wodss.tournament.service.dto.BetDTO;
import ch.fhnw.wodss.tournament.util.SecurityUtil;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.BetVM;

/**
 * REST controller to manage the bet requests
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@RestController
@RequestMapping("/api/bet")
public class BetResource {

	private final Logger log = LoggerFactory.getLogger(BetResource.class);

	@Autowired
	private BetService betService;

	@Autowired
	private SecurityUtil securityUtil;

	/**
	 * PUT /bet : creates or updates a new bet
	 */
	@PutMapping
	public ResponseEntity<String> createOrUpdateBet(@Valid @RequestBody BetVM vm) {
		log.info("call to PUT bets. username:{}", securityUtil.getUsername());

		if (!vm.isValid()) {
			log.info("provided view model was invalid, sending bad request");
			return new ResponseEntity<String>("Illegal state of view model", HttpStatus.BAD_REQUEST);
		}

		log.info("create or update bet for match={}", vm.getGameId());

		try {
			betService.createOrUpdate(vm);
			return new ResponseEntity<>("Bet accepted", HttpStatus.CREATED);
		} catch (IllegalArgumentException re) {
			log.warn("failed to create bet");
			return new ResponseEntity<>(re.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * GET /bet : gets all bets beloning to the user
	 */
	@GetMapping
	public ResponseEntity<List<BetDTO>> getBets() {
		log.info("call to GET bets. username:{}", securityUtil.getUsername());

		try {
			List<BetDTO> result = betService.getBetsForUser();
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (IllegalArgumentException re) {
			log.warn("failed to get bets");
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}

	}

	/**
	 * GET /bet/{id} : gets bet by id beloning to the user
	 */
	@GetMapping("/{id}")
	public ResponseEntity<BetDTO> getBetsById(@PathVariable Long id) {
		log.info("call to GET bets by id. username:{}", securityUtil.getUsername());

		try {
			BetDTO result = betService.getBetsForUserById(id);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (IllegalArgumentException re) {
			log.warn("failed to get bet");
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteBet(@PathVariable Long id) {
		log.info("call to DELETE bet. username:{}", securityUtil.getUsername());

		try {
			betService.deleteByGameId(id);
			return new ResponseEntity<>("success", HttpStatus.OK);
		} catch (IllegalArgumentException iae) {
			log.info("failed to DELETE bet", iae);
			return new ResponseEntity<>(iae.getMessage(), HttpStatus.BAD_REQUEST);
		}

	}

}
