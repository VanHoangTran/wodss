package ch.fhnw.wodss.tournament.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.wodss.tournament.domain.BettingPool;

public interface BettingPoolRepository extends JpaRepository<BettingPool, Long> {

}
