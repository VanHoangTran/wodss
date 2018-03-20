package ch.fhnw.wodss.tournament.persistance;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.wodss.tournament.model.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {

	public Account findByUsername(String username);
	
}
