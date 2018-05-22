package ch.fhnw.wodss.tournament.service.dto;

public class BetStatisticsDTO {

	private String homeTeamWins;

	private String awayTeamWins;

	private String draw;

	public BetStatisticsDTO(String homeTeamWins, String awayTeamWins, String draw) {
		this.homeTeamWins = homeTeamWins;
		this.awayTeamWins = awayTeamWins;
		this.draw = draw;
	}

	public String getDraw() {
		return draw;
	}

	public void setDraw(String draw) {
		this.draw = draw;
	}

	public String getHomeTeamWins() {
		return homeTeamWins;
	}

	public void setHomeTeamWins(String homeTeamWins) {
		this.homeTeamWins = homeTeamWins;
	}

	public String getAwayTeamWins() {
		return awayTeamWins;
	}

	public void setAwayTeamWins(String awayTeamWins) {
		this.awayTeamWins = awayTeamWins;
	}

}
