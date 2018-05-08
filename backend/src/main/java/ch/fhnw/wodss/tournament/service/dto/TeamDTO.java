package ch.fhnw.wodss.tournament.service.dto;

import ch.fhnw.wodss.tournament.domain.Team;

public class TeamDTO {

	private Long id;

	private String group;

	private String name;

	private String countryFifaCode;

	public TeamDTO(Team team) {
		this.id = team.getId();
		this.group = team.getGroup().getName();
		this.name = team.getName();
		this.countryFifaCode = team.getCountryFifaCode();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
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
