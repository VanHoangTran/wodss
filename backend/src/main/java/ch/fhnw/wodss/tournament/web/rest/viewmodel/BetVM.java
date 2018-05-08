package ch.fhnw.wodss.tournament.web.rest.viewmodel;

public class BetVM {

	private long gameId;

	private long accountId;

	private int homeGoals;

	private int awayGoals;

	public long getGameId() {
		return gameId;
	}

	public void setGameId(long gameId) {
		this.gameId = gameId;
	}

	public long getAccountId() {
		return accountId;
	}

	public void setAccountId(long accountId) {
		this.accountId = accountId;
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
		return this.gameId != 0 && this.accountId != 0 && homeGoals > 0 && homeGoals < 20 && awayGoals > 0
				&& awayGoals < 20;
	}

}
