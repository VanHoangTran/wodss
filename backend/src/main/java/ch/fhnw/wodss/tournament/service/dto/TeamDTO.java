package ch.fhnw.wodss.tournament.service.dto;

import ch.fhnw.wodss.tournament.domain.Team;

public class TeamDTO {

	private Long id;

	private String group;

	private String name;

	private String countryFifaCode;

	private int goalDifferenceInGroup;

	private int pointsInGroup;

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

	public int getGoalDifferenceInGroup() {
		return goalDifferenceInGroup;
	}

	public void updateGoalDifference(int difference) {
		this.goalDifferenceInGroup += difference;
	}

	public int getPointsInGroup() {
		return pointsInGroup;
	}

	public void addPointsInGroup(int pointsInGroup) {
		this.pointsInGroup += pointsInGroup;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj instanceof TeamDTO) {
			return ((TeamDTO) obj).countryFifaCode.equals(countryFifaCode);
		} else {
			return false;
		}
	}

	@Override
	public String toString() {
		return name;
	}

}
