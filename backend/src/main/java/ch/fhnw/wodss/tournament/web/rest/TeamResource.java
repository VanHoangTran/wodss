package ch.fhnw.wodss.tournament.web.rest;

import ch.fhnw.wodss.tournament.service.TeamService;
import ch.fhnw.wodss.tournament.service.dto.TeamDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST controller to manage the team requests
 */
@RestController
@RequestMapping("/api/teams")
public class TeamResource {

    private final Logger log = LoggerFactory.getLogger(TeamResource.class);

    @Autowired
    private TeamService teamService;

    /**
     * GET /teams : returns all teams
     *
     * @return list of all games
     */
    @GetMapping
    public ResponseEntity<List<TeamDTO>> getTeams() {
        log.info("new call to GET teams");

        try {
            List<TeamDTO> allTeams = teamService.getAllRealTeams();
            return new ResponseEntity<>(allTeams, HttpStatus.OK);

        } catch (IllegalArgumentException re) {
            log.info("failed to GET all teams");
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
