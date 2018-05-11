package ch.fhnw.wodss.tournament.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.wodss.tournament.domain.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {

	public Account findByUsername(String username);

	public Account findByMail(String mail);

	public Account findByActivationKey(String username);
}
