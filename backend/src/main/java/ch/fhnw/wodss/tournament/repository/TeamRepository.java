package ch.fhnw.wodss.tournament.repository;

import ch.fhnw.wodss.tournament.domain.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {

    public List<Team> findAllByCountryFifaCodeNotOrderByName(String countryFifaCode);

}
