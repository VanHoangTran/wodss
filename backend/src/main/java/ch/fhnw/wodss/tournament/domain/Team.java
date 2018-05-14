package ch.fhnw.wodss.tournament.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Team {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	private TournamentGroup group;

	private String name;

	private String countryFifaCode;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public TournamentGroup getGroup() {
		return group;
	}

	public void setGroup(TournamentGroup group) {
		this.group = group;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCountryFifaCode() {
		return countryFifaCode;
	}

	public void setCountryFifaCode(String countryFifaCode) {
		this.countryFifaCode = countryFifaCode;
	}

}
