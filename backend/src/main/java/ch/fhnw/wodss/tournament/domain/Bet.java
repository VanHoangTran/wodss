package ch.fhnw.wodss.tournament.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 * Representation of a user's bet
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@Entity
public class Bet {

	@Id
	@GeneratedValue
	private Long id;

	@OneToOne
	private Account account;

	@OneToOne
	private Game game;

	private int homeGoals;

	private int awayGoals;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public Game getGame() {
		return game;
	}

	public void setGame(Game game) {
		this.game = game;
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

}
