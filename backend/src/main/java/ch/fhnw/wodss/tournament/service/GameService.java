package ch.fhnw.wodss.tournament.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ch.fhnw.wodss.tournament.domain.Game;
import ch.fhnw.wodss.tournament.repository.GameRepository;

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
	public List<Game> getAllGames() {
		log.info("loading all games from database");
		return gameRepository.findAll();
	}
}
