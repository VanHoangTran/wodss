package ch.fhnw.wodss.tournament.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ch.fhnw.wodss.tournament.service.dto.AccountDTO;
import ch.fhnw.wodss.tournament.service.dto.BetDTO;
import ch.fhnw.wodss.tournament.service.dto.BettingPoolDTO;
import ch.fhnw.wodss.tournament.service.dto.GameDTO;
import ch.fhnw.wodss.tournament.service.dto.RankingDTO;

/**
 * Service responsible for managing ranking.
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@Service
@Transactional
public class RankingService {

	private final Logger log = LoggerFactory.getLogger(RankingService.class);

	@Autowired
	private BettingPoolService bettingPoolService;

	@Autowired
	private BetService betService;

	@Autowired
	private GameService gameService;

	/**
	 * Calculates the ranking of a given pool.
	 * 
	 * @param poolId of desired betting pool
	 * @return list of rank objects
	 */
	public List<RankingDTO> getRankingOfPool(Long poolId) {
		if (poolId == null) {
			throw new IllegalArgumentException("can't calculate pool ranking for null value");
		}

		List<RankingDTO> ranking = new ArrayList<>();

		// does the pool actually exists?
		BettingPoolDTO foundById = bettingPoolService.getPoolById(poolId);

		// calculate points of members
		List<AccountDTO> members = foundById.getMembers();
		for (AccountDTO member : members) {
			// find all bets by given account
			List<BetDTO> bets = betService.getBetsByUserId(member.getId());

			for (BetDTO bet : bets) {
				GameDTO actual = gameService.getGameById(bet.getGameId());

				// only points for passed games can be given
				if (actual.isOpen()) {
					continue;
				}

				boolean correctWinner = false;

				// 1) winning team correct (10pt)
				if (actual.getAwayGoals() == actual.getHomeGoals()) {
					if (bet.getAwayGoals() == bet.getHomeGoals()) {
						member.setPoints(member.getPoints() + 10);
						correctWinner = true;
					}
				} else {
					if (actual.getAwayGoals() > actual.getHomeGoals()) {
						if (bet.getAwayGoals() > bet.getHomeGoals()) {
							member.setPoints(member.getPoints() + 10);
							correctWinner = true;
						}
					} else if (actual.getAwayGoals() < actual.getHomeGoals()) {
						if (bet.getAwayGoals() < bet.getHomeGoals()) {
							member.setPoints(member.getPoints() + 10);
							correctWinner = true;
						}
					}
				}

				// 2) correct goal difference - winner must be correct (6pt)
				if (correctWinner) {
					int actualDifference = actual.getAwayGoals() - actual.getHomeGoals();
					int betDifference = bet.getAwayGoals() - bet.getHomeGoals();
					if (actualDifference == betDifference) {
						member.setPoints(member.getPoints() + 6);
					}
				}

				// 3) correct number of away goals (2pt)
				if (bet.getAwayGoals() == actual.getAwayGoals()) {
					member.setPoints(member.getPoints() + 2);
				}

				// 4) correct number of home goals (2pt)
				if (bet.getHomeGoals() == bet.getHomeGoals()) {
					member.setPoints(member.getPoints() + 2);
				}
			}

			// add account's result to ranking
			RankingDTO rank = new RankingDTO();
			rank.setAccount(member);
			rank.setPoints(member.getPoints());
			ranking.add(rank);
		}

		// sort members by their points
		Collections.sort(ranking, new Comparator<RankingDTO>() {
			@Override
			public int compare(RankingDTO o1, RankingDTO o2) {
				return o2.getPoints() - o1.getPoints();
			}
		});

		// update member position
		int pos = 1;
		for (RankingDTO dto : ranking) {
			dto.setPosition(pos++);
		}

		return ranking;
	}
}
