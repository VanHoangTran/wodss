package ch.fhnw.wodss.tournament.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ch.fhnw.wodss.tournament.domain.Phase;
import ch.fhnw.wodss.tournament.repository.PhaseRepository;

/**
 * Service responsible for managing the user accounts.
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@Service
@Transactional
public class PhaseService {

	private final Logger log = LoggerFactory.getLogger(PhaseService.class);

	@Autowired
	private PhaseRepository phaseRepository;

	/**
	 * Gets all phases from database and returns them as list
	 * 
	 * @return list of all phases
	 */
	public List<Phase> getAllPhases() {
		log.info("loading all phases from database");
		return phaseRepository.findAll();
	}

	/**
	 * Determines if a phase exists
	 * 
	 * @param phaseId
	 * @return true if exists, false otherwise
	 */
	public boolean existsPhase(long phaseId) {
		return phaseRepository.findById(phaseId).isPresent();
	}
}
