package ch.fhnw.wodss.tournament.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.wodss.tournament.domain.TournamentGroup;

public interface TournamentGroupRepository extends JpaRepository<TournamentGroup, Long> {

	TournamentGroup findByName(String name);

}
