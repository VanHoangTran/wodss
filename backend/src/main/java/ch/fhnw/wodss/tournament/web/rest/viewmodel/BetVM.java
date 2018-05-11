package ch.fhnw.wodss.tournament.web.rest.viewmodel;

import ch.fhnw.wodss.tournament.domain.Game;

public class BetVM {

	private long gameId;

	private int homeGoals;

	private int awayGoals;

	public long getGameId() {
		return gameId;
	}

	public void setGameId(long gameId) {
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

	public boolean isValid() {
		return this.gameId != 0 && homeGoals >= 0 && homeGoals <= Game.MAX_GOALS && awayGoals >= 0 && awayGoals <= Game.MAX_GOALS;
	}

}
