package ch.fhnw.wodss.tournament.service.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ch.fhnw.wodss.tournament.domain.Bet;
import ch.fhnw.wodss.tournament.service.RankingService;

public class BetDTO {

	@Autowired
	@JsonIgnore
	private RankingService rankService;

	private Long id;

	private Long gameId;

	private int homeGoals;

	private int awayGoals;

	private int points;

	public BetDTO(Bet bet) {
		this.id = bet.getId();
		this.gameId = bet.getGame().getId();
		this.homeGoals = bet.getHomeGoals();
		this.awayGoals = bet.getAwayGoals();

		// get points from service for this bet
		if (bet.getGame().isResultsEntered() && !bet.getGame().isReady()) {
			setPoints(rankService.getBetPoints(bet.getId()));
		}
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getGameId() {
		return gameId;
	}

	public void setGameId(Long gameId) {
		this.gameId = gameId;
	}

	public int getHomeGoals() {
		return homeGoals;
	}

	public void setHomeGoals(int homeGoals) {
		this.homeGoals = homeGoals;
	}

	public int getAwayGoals() {
		return awayGoals;
	}

	public void setAwayGoals(int awayGoals) {
		this.awayGoals = awayGoals;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

	/**
	 * Converts a list of @Entity bet to betDTOs
	 * 
	 * @param list of JPA bet
	 * @return list of bet DTOs
	 */
	public static List<BetDTO> fromList(List<Bet> list) {
		List<BetDTO> dtoList = new ArrayList<>();
		for (Bet g : list) {
			dtoList.add(new BetDTO(g));
		}
		return dtoList;
	}
}
