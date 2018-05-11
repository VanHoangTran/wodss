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

import ch.fhnw.wodss.tournament.service.RankingService;
import ch.fhnw.wodss.tournament.service.dto.RankingDTO;
import ch.fhnw.wodss.tournament.util.SecurityUtil;

/**
 * REST controller to manage the ranking requests
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@RestController
@RequestMapping("/api/ranking")
public class RankingResource {

	private final Logger log = LoggerFactory.getLogger(RankingResource.class);

	@Autowired
	private RankingService rankingService;

	@GetMapping
	public ResponseEntity<List<RankingDTO>> createOrUpdateBet(@RequestParam Long poolId) {
		log.info("call to GET ranking. username:{}", SecurityUtil.getUsername());

		try {
			List<RankingDTO> rankingOfPool = rankingService.getRankingOfPool(poolId);
			return new ResponseEntity<>(rankingOfPool, HttpStatus.OK);
		} catch (IllegalArgumentException re) {
			log.warn("failed to create bet");
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

}
