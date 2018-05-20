package ch.fhnw.wodss.tournament.service;

import ch.fhnw.wodss.tournament.repository.TeamRepository;
import ch.fhnw.wodss.tournament.service.dto.TeamDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TeamService {

	private final Logger log = LoggerFactory.getLogger(TeamService.class);

	@Autowired
	private TeamRepository teamRepository;

	/**
	 * Gets all teams (except dummy teams) from database and returns them as list
	 * 
	 * @return list of all real teams
	 */
	public List<TeamDTO> getAllRealTeams() {
		log.info("loading all teams from database");
		return TeamDTO.fromList(teamRepository.findAllByCountryFifaCodeNotOrderByName(""));
	}

	/**
	 * Gets a team by provided id
	 *
	 * @param id of team
	 * @return team object
	 */
	public TeamDTO getTeamById(long id) {
		log.info("loading team by id {}", id);
		return new TeamDTO(teamRepository.findTeamById(id));
	}
}
