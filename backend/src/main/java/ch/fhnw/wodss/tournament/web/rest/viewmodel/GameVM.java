package ch.fhnw.wodss.tournament.web.rest.viewmodel;

import ch.fhnw.wodss.tournament.domain.Game;

public class GameVM {

	private Long id;

	private int homeGoals;

	private int awayGoals;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
		return id != null && id != 0 && homeGoals >= 0 && homeGoals <= Game.MAX_GOALS && awayGoals >= 0
				&& awayGoals <= Game.MAX_GOALS;
	}

}
