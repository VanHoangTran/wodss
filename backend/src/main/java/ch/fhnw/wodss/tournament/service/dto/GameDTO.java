package ch.fhnw.wodss.tournament.service.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import ch.fhnw.wodss.tournament.domain.Game;

public class GameDTO {

	private Long id;

	private Long phase_id;

	private Date date;

	private TeamDTO home;

	private TeamDTO away;

	private StadiumDTO stadium;

	private int homeGoals;

	private int awayGoals;

	public GameDTO(Game g) {
		this.id = g.getId();
		this.phase_id = g.getPhase().getId();
		this.date = g.getDate();
		this.home = new TeamDTO(g.getHome());
		this.away = new TeamDTO(g.getAway());
		this.stadium = new StadiumDTO(g.getStadium());
		this.homeGoals = g.getHomeGoals();
		this.awayGoals = g.getAwayGoals();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPhase_id() {
		return phase_id;
	}

	public void setPhase_id(Long phase_id) {
		this.phase_id = phase_id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public TeamDTO getHome() {
		return home;
	}

	public void setHome(TeamDTO home) {
		this.home = home;
	}

	public TeamDTO getAway() {
		return away;
	}

	public void setAway(TeamDTO away) {
		this.away = away;
	}

	public StadiumDTO getStadium() {
		return stadium;
	}

	public void setStadium(StadiumDTO stadium) {
		this.stadium = stadium;
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

	/**
	 * Converts a list of @Entity game to gameDTOs
	 * 
	 * @param list of JPA games
	 * @return list of game DTOs
	 */
	public static List<GameDTO> fromList(List<Game> list) {
		List<GameDTO> dtoList = new ArrayList<>();
		for (Game g : list) {
			dtoList.add(new GameDTO(g));
		}
		return dtoList;
	}

}
