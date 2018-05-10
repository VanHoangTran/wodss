package ch.fhnw.wodss.tournament.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.wodss.tournament.domain.Team;

public interface TeamRepository extends JpaRepository<Team, Long> {

}
