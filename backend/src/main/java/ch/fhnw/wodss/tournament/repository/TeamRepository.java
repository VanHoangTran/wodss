package ch.fhnw.wodss.tournament.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.wodss.tournament.domain.Team;

public interface TeamRepository extends JpaRepository<Team, Long> {

    public Team findTeamById(Long id);

    public List<Team> findAllByCountryFifaCodeNotOrderByName(String countryFifaCode);

}
