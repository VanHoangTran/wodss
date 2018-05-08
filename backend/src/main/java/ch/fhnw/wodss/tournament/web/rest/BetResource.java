package ch.fhnw.wodss.tournament.web.rest;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.wodss.tournament.service.BetService;
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

	/**
	 * PUT /bet : creates or updates a new bet
	 */
	@PutMapping
	public ResponseEntity<String> createOrUpdateBet(@Valid @RequestBody BetVM vm) {
		if (!vm.isValid()) {
			log.info("provided view model was invalid, sending bad request");
			return new ResponseEntity<String>("Illegal state of view model", HttpStatus.BAD_REQUEST);
		}

		log.info("new call to PUT /bet for match={} and account={}", vm.getGameId(), vm.getAccountId());

		try {
			betService.createOrUpdate(vm);
			return new ResponseEntity<>("Bet accepted", HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (IllegalArgumentException re) {
			log.warn("failed to create bet");
			return new ResponseEntity<>(re.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
