package ch.fhnw.wodss.tournament.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Game {

	public static final int MAX_GOALS = 20;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	private Phase phase;

	private Date date;

	@OneToOne
	private Team home;

	@OneToOne
	private Team away;

	@OneToOne
	private Stadium stadium;

	private int homeGoals;

	private int awayGoals;

	private boolean resultsEntered;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Phase getPhase() {
		return phase;
	}

	public void setPhase(Phase phase) {
		this.phase = phase;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Team getHome() {
		return home;
	}

	public void setHome(Team home) {
		this.home = home;
	}

	public Team getAway() {
		return away;
	}

	public void setAway(Team away) {
		this.away = away;
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

	public Stadium getStadium() {
		return stadium;
	}

	public void setStadium(Stadium stadium) {
		this.stadium = stadium;
	}

	public boolean isResultsEntered() {
		return resultsEntered;
	}

	public void setResultsEntered(boolean resultsEntered) {
		this.resultsEntered = resultsEntered;
	}

	public boolean isReady() {
		return !home.getGroup().getName().equals(TournamentGroup.DUMMY_NAME)
				&& !away.getGroup().getName().equals(TournamentGroup.DUMMY_NAME);
	}

}
