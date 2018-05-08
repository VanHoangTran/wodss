package ch.fhnw.wodss.tournament.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ch.fhnw.wodss.tournament.domain.Game;
import ch.fhnw.wodss.tournament.repository.GameRepository;
import ch.fhnw.wodss.tournament.service.dto.GameDTO;

/**
 * Service responsible for interaction with games
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@Service
@Transactional
public class GameService {

	private final Logger log = LoggerFactory.getLogger(GameService.class);

	@Autowired
	private GameRepository gameRepository;

	/**
	 * Gets all games from database and returns them as list
	 * 
	 * @return list of all games
	 */
	public List<GameDTO> getAllGames() {
		log.info("loading all games from database");
		return GameDTO.fromList(gameRepository.findAll());
	}

	/**
	 * Gets a game by provided id
	 * 
	 * @param id of game
	 * @return game object
	 */
	public GameDTO getGameById(long id) {
		log.info("loading game by id {}", id);

		Optional<Game> result = gameRepository.findById(id);
		if (!result.isPresent()) {
			throw new IllegalArgumentException("game with id: " + id + " does not exist");
		}

		return new GameDTO(result.get());
	}

	/**
	 * Gets all games in specified phase
	 * 
	 * @param phaseId
	 * @return list of games
	 */
	public List<GameDTO> getGamesByPhase(Long phaseId) {
		List<Game> result = gameRepository.findAllByPhaseId(phaseId);
		return GameDTO.fromList(result);
	}
}
