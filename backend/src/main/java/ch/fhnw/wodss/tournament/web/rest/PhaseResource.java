package ch.fhnw.wodss.tournament.web.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.wodss.tournament.domain.Phase;
import ch.fhnw.wodss.tournament.service.PhaseService;

/**
 * REST controller to manage the phase requests
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@RestController
@RequestMapping("/api")
public class PhaseResource {

	private final Logger log = LoggerFactory.getLogger(PhaseResource.class);

	@Autowired
	private PhaseService phaseService;

	@GetMapping("/phases")
	public ResponseEntity<List<Phase>> getAllPhases() {
		log.info("new call to GET phases");

		try {
			return new ResponseEntity<>(phaseService.getAllPhases(), HttpStatus.OK);
		} catch (RuntimeException re) {
			log.info("failed to GET all phases");
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
