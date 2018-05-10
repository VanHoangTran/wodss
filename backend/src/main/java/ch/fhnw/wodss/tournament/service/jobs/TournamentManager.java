package ch.fhnw.wodss.tournament.service.jobs;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ch.fhnw.wodss.tournament.domain.Game;
import ch.fhnw.wodss.tournament.domain.Phase;
import ch.fhnw.wodss.tournament.domain.TournamentGroup;
import ch.fhnw.wodss.tournament.service.GameService;
import ch.fhnw.wodss.tournament.service.GroupService;
import ch.fhnw.wodss.tournament.service.dto.GameDTO;
import ch.fhnw.wodss.tournament.service.dto.GroupDTO;
import ch.fhnw.wodss.tournament.service.dto.TeamDTO;

/**
 * This job is responsible to manage the tournament. It therefore checks if
 * phase is over and calculates the next round. Invoked by a TaskScheduler.
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
public class TournamentManager implements Runnable {

	private final Logger log = LoggerFactory.getLogger(TournamentManager.class);

	private final GameService gameService;
	private final GroupService groupService;

	public TournamentManager(GameService gameService, GroupService groupService) {
		this.gameService = gameService;
		this.groupService = groupService;
	}

	@Override
	public void run() {
		log.info("checking if next phase can be updated");

		final Date currentDate = new Date();

		// determine current tournament phase
		List<GameDTO> allGames = gameService.getAllGames();

		// get all upcomming games
		List<GameDTO> upcommingGames = allGames.stream().filter(g -> g.getDate().after(currentDate))
				.sorted((d1, d2) -> d1.getDate().compareTo(d2.getDate())).collect(Collectors.toList());

		// only perform action if any game is upcomming
		if (upcommingGames.size() != 0) {

			// get next scheduled gamne
			GameDTO nextGame = upcommingGames.get(0);

			// current phase = phase of next match
			long currentPhaseId = nextGame.getPhaseId();

			// calculate games which are:
			// - not yet played
			// - not in group phase
			// - in same phase as current phase
			if (Phase.GROUP_PHASE != currentPhaseId) {
				List<GameDTO> currentPhaseGames = upcommingGames.stream()
						.filter(g -> g.getPhaseId().equals(currentPhaseId)).collect(Collectors.toList());

				// phase of last sixteen
				if (Phase.LAST_SIXTEEN == currentPhaseId) {
					for (GameDTO game : currentPhaseGames) {
						if (!game.getHome().getGroup().equals(TournamentGroup.DUMMY_NAME)) {
							continue; // game has already been set!
						}

						// extract group names from dummy groups
						String home = game.getHome().getName().substring(1);
						String away = game.getAway().getName().substring(1);

						// get DTOs in order to get real group id
						GroupDTO homeGroup = groupService.getGroupByName(home);
						GroupDTO awayGroup = groupService.getGroupByName(away);

						// get winner of group (first versus second)
						TeamDTO homeTeam = gameService.getGroupRanking(homeGroup.getId()).get(0);
						TeamDTO awayTeam = gameService.getGroupRanking(awayGroup.getId()).get(1);

						// actually update the game!
						gameService.updateOpponents(game.getId(), homeTeam, awayTeam);
					}
				} else if (Phase.QUATER_FINAL == currentPhaseId) {
					gameService.gameFromKO(57l, 49l, 50l);
					gameService.gameFromKO(58l, 53l, 54l);
					gameService.gameFromKO(59l, 51l, 52l);
					gameService.gameFromKO(60l, 55l, 56l);
				} else if (Phase.SEMI_FINAL == currentPhaseId) {
					gameService.gameFromKO(61l, 57l, 58l);
					gameService.gameFromKO(62l, 59l, 60l);
				} else if (Phase.THIRD_PLACE == currentPhaseId) {
					gameService.luckyLooserGameFromKO(63l, 61l, 62l);
				} else if (Phase.FINAL == currentPhaseId) {
					gameService.gameFromKO(64l, 61l, 62l);
				}
			} else {
				log.info("noting to update");
			}

		}

	}

}
