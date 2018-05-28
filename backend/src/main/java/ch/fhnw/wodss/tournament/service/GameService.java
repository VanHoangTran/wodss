package ch.fhnw.wodss.tournament.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ch.fhnw.wodss.tournament.domain.Game;
import ch.fhnw.wodss.tournament.domain.Team;
import ch.fhnw.wodss.tournament.repository.GameRepository;
import ch.fhnw.wodss.tournament.repository.TeamRepository;
import ch.fhnw.wodss.tournament.service.dto.GameDTO;
import ch.fhnw.wodss.tournament.service.dto.TeamDTO;

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

	@Autowired
	private TeamRepository teamRepository;

	@Autowired
	private BetService betService;

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
		return new GameDTO(findGameById(id));
	}

	/**
	 * Gets all games in specified phase
	 * 
	 * @param phaseId
	 * @return list of games
	 */
	public List<GameDTO> getGamesByPhase(Long phaseId) {
		log.info("loading games by phase_id {}", phaseId);
		List<Game> result = gameRepository.findAllByPhaseIdOrderByDate(phaseId);
		List<GameDTO> dtos = GameDTO.fromList(result);

		// special case byPhase -> serve also statistics
		for (GameDTO dto : dtos) {
			// fetch stats for this game
			dto.setBetStats(betService.getBetStatisticsByGameId(dto.getId()));
		}

		return dtos;
	}

	/**
	 * Updates the result of a game.
	 * 
	 * @param gameId of game to update
	 * @param homeGoals
	 * @param awayGoals
	 * @return true if sucessful, false otherwise
	 */
	public boolean updateGameResult(Long gameId, int homeGoals, int awayGoals) {
		log.info("updating game with id: {} to homeGoals={} and awayGoals={}", gameId, homeGoals, awayGoals);

		if (homeGoals > Game.MAX_GOALS || awayGoals > Game.MAX_GOALS) {
			throw new IllegalArgumentException("invalid goals count");
		}

		Game game = findGameById(gameId);
		game.setHomeGoals(homeGoals);
		game.setAwayGoals(awayGoals);
		game.setResultsEntered(true);
		gameRepository.save(game);
		return true;
	}

	public List<TeamDTO> getGroupRanking(Long groupId) {
		List<Game> allGames = gameRepository.findAll();

		// get games which are in group
		List<Game> gamesInGroup = allGames.stream().filter(
				g -> g.getHome().getGroup().getId().equals(groupId) || g.getAway().getGroup().getId().equals(groupId))
				.collect(Collectors.toList());

		List<GameDTO> dtoList = GameDTO.fromList(gamesInGroup);

		// determine best teams of group
		List<TeamDTO> weightedTeams = new ArrayList<>();
		for (GameDTO game : dtoList) {
			TeamDTO home = game.getHome();
			TeamDTO away = game.getAway();

			home.updateGoalDifference(game.getHomeGoals() - game.getAwayGoals());
			away.updateGoalDifference(game.getAwayGoals() - game.getHomeGoals());

			if (game.getAwayGoals() == game.getHomeGoals()) {
				home.addPointsInGroup(1);
				away.addPointsInGroup(1);
			} else if (game.getAwayGoals() > game.getHomeGoals()) {
				away.addPointsInGroup(3);
			} else {
				home.addPointsInGroup(3);
			}

			// update away team in list
			if (weightedTeams.contains(away)) {
				int pos = weightedTeams.indexOf(away);
				TeamDTO last = weightedTeams.get(pos);
				away.addPointsInGroup(last.getPointsInGroup());
				away.updateGoalDifference(last.getGoalDifferenceInGroup());
				weightedTeams.set(pos, away);
			} else {
				weightedTeams.add(away);
			}

			// update home team in list
			if (weightedTeams.contains(home)) {
				int pos = weightedTeams.indexOf(home);
				TeamDTO last = weightedTeams.get(pos);
				home.addPointsInGroup(last.getPointsInGroup());
				home.updateGoalDifference(last.getGoalDifferenceInGroup());
				weightedTeams.set(pos, home);
			} else {
				weightedTeams.add(home);
			}

		}

		// order teams by their points
		Collections.sort(weightedTeams, new Comparator<TeamDTO>() {
			@Override
			public int compare(TeamDTO o1, TeamDTO o2) {
				if (o1.getPointsInGroup() == o2.getPointsInGroup()) {
					return o2.getGoalDifferenceInGroup() - o1.getGoalDifferenceInGroup();
				} else {
					return o2.getPointsInGroup() - o1.getPointsInGroup();
				}
			}
		});

		return weightedTeams;
	}

	public void updateOpponents(Long gameId, TeamDTO homeDTO, TeamDTO awayDTO) {
		Game game = findGameById(gameId);

		Team home = findTeamById(homeDTO.getId());
		Team away = findTeamById(awayDTO.getId());

		game.setHome(home);
		game.setAway(away);

		gameRepository.save(game);
	}

	/**
	 * Code to reuse which finds a game by id, throws exception if not found.
	 * 
	 * @param id of game
	 * @return game found
	 */
	private Game findGameById(long id) {
		Optional<Game> result = gameRepository.findById(id);
		if (!result.isPresent()) {
			throw new IllegalArgumentException("game with id: " + id + " does not exist");
		}
		return result.get();
	}

	/**
	 * Code to reuse which finds a team by id, throws exception if not found.
	 * 
	 * @param id of game
	 * @return game found
	 */
	private Team findTeamById(long id) {
		Optional<Team> result = teamRepository.findById(id);
		if (!result.isPresent()) {
			throw new IllegalArgumentException("team with id: " + id + " does not exist");
		}
		return result.get();
	}

	public void gameFromKO(Long gameId, Long leftGameId, Long rightGameId) {
		Game nextGame = findGameById(gameId);
		Game leftGame = findGameById(leftGameId);
		Game rightGame = findGameById(rightGameId);

		// determine which teams are in next match - no draw here!
		Team home = leftGame.getHomeGoals() > leftGame.getAwayGoals() ? leftGame.getHome() : leftGame.getAway();
		Team away = rightGame.getHomeGoals() > rightGame.getAwayGoals() ? rightGame.getHome() : rightGame.getAway();

		nextGame.setHome(home);
		nextGame.setAway(away);
		gameRepository.save(nextGame);
	}

	public void luckyLooserGameFromKO(Long gameId, Long leftGameId, Long rightGameId) {
		Game nextGame = findGameById(gameId);
		Game leftGame = findGameById(leftGameId);
		Game rightGame = findGameById(rightGameId);

		// determine which teams are in next match - no draw here!
		Team home = leftGame.getHomeGoals() < leftGame.getAwayGoals() ? leftGame.getHome() : leftGame.getAway();
		Team away = rightGame.getHomeGoals() < rightGame.getAwayGoals() ? rightGame.getHome() : rightGame.getAway();

		nextGame.setHome(home);
		nextGame.setAway(away);
		gameRepository.save(nextGame);
	}

}
