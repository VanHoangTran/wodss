package ch.fhnw.wodss.tournament.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ch.fhnw.wodss.tournament.domain.TournamentGroup;
import ch.fhnw.wodss.tournament.repository.TournamentGroupRepository;
import ch.fhnw.wodss.tournament.service.dto.GroupDTO;

/**
 * Service responsible for interaction with groups
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@Service
@Transactional
public class GroupService {

	@Autowired
	private TournamentGroupRepository groupRepository;

	/**
	 * Returns the group with provided name
	 * 
	 * @param name
	 * @return
	 */
	public GroupDTO getGroupByName(String name) {
		TournamentGroup foundGroup = groupRepository.findByName(name);

		if (foundGroup == null) {
			throw new IllegalArgumentException("group with name " + name + " could not be found!");
		}

		return new GroupDTO(foundGroup);
	}

}
