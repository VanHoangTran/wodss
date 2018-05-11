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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.fhnw.wodss.tournament.domain.BettingPool;
import ch.fhnw.wodss.tournament.service.BettingPoolService;
import ch.fhnw.wodss.tournament.service.dto.BettingPoolDTO;
import ch.fhnw.wodss.tournament.util.SecurityUtil;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.BettingPoolVM;

/**
 * REST controller to manage the betting pool requests
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@RestController
@RequestMapping("/api/betting-pool")
public class BettingPoolResource {

	private final Logger log = LoggerFactory.getLogger(BettingPoolResource.class);

	@Autowired
	private BettingPoolService bettingPoolService;

	@GetMapping
	public ResponseEntity<List<BettingPoolDTO>> getAllPools() {
		log.info("new call to GET betting pools");

		try {
			return new ResponseEntity<>(bettingPoolService.getAllPools(), HttpStatus.OK);
		} catch (IllegalArgumentException iae) {
			log.info("failed to GET all phases", iae);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping
	public ResponseEntity<String> createNewPool(@Valid @RequestBody BettingPoolVM vm) {
		log.info("call to POST betting pool. username:{}", SecurityUtil.getUsername());

		if (!vm.isValid()) {
			log.info("provided view model was invalid, sending bad request");
			return new ResponseEntity<String>("Illegal state of view model", HttpStatus.BAD_REQUEST);
		}

		try {
			bettingPoolService.createPool(vm.getName());
			return new ResponseEntity<>("success", HttpStatus.CREATED);
		} catch (IllegalArgumentException iae) {
			log.info("failed to POST betting pool", iae);
			return new ResponseEntity<>(iae.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping
	public ResponseEntity<String> deleteGroup(@Valid @RequestBody BettingPoolVM vm) {
		log.info("call to DELETE betting pool. username:{}", SecurityUtil.getUsername());

		if (!vm.isValid()) {
			log.info("provided view model was invalid, sending bad request");
			return new ResponseEntity<String>("Illegal state of view model", HttpStatus.BAD_REQUEST);
		}

		try {
			bettingPoolService.deletePool(vm.getName());
			return new ResponseEntity<>("success", HttpStatus.OK);
		} catch (IllegalArgumentException iae) {
			log.info("failed to POST betting pool", iae);
			return new ResponseEntity<>(iae.getMessage(), HttpStatus.BAD_REQUEST);
		}

	}

	@PutMapping
	public ResponseEntity<BettingPoolDTO> updatePool(@Valid @RequestBody BettingPoolVM vm) {
		log.info("call to PUT betting pool (leave pool). username:{}", SecurityUtil.getUsername());

		try {
			BettingPoolDTO updated = null;

			if (vm.getAction() == null) {
				log.warn("called a with no action on PUT updatePool");
				throw new IllegalArgumentException("no action was found");
			}

			if (vm.getAction().equals(BettingPool.leaveAction)) {
				bettingPoolService.leaveGroup(vm.getName());
			} else if (vm.getAction().equals(BettingPool.joinAction)) {
				bettingPoolService.joinGroup(vm.getName());
			} else {
				log.warn("called a unsupported action on PUT updatePool");
				throw new IllegalArgumentException("unsupported operation");
			}

			return new ResponseEntity<>(updated, HttpStatus.OK);
		} catch (IllegalArgumentException iae) {
			log.info("failed to POST betting pool");
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
}
