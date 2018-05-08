package ch.fhnw.wodss.tournament.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.wodss.tournament.domain.Bet;

public interface BetRepository extends JpaRepository<Bet, Long> {
	
	public Bet findByGameId(Long id);
	
}
