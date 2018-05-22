package ch.fhnw.wodss.tournament.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.wodss.tournament.domain.BettingPool;

public interface BettingPoolRepository extends JpaRepository<BettingPool, Long> {

	BettingPool findByName(String name);

	List<BettingPool> findAllBySpecial(boolean value);
}
