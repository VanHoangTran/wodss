package ch.fhnw.wodss.tournament.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.wodss.tournament.domain.Game;

public interface GameRepository extends JpaRepository<Game, Long> {

}
