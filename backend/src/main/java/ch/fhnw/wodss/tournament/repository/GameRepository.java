package ch.fhnw.wodss.tournament.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.wodss.tournament.domain.Game;

public interface GameRepository extends JpaRepository<Game, Long> {

	public List<Game> findAllByPhaseId(Long id);

}
