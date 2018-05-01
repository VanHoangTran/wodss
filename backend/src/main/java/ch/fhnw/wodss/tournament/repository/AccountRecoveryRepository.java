package ch.fhnw.wodss.tournament.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.fhnw.wodss.tournament.domain.Account;
import ch.fhnw.wodss.tournament.domain.AccountRecovery;

public interface AccountRecoveryRepository extends JpaRepository<AccountRecovery, Long> {

	public AccountRecovery findByRecoveryKey(String key);

	public List<AccountRecovery> findAllByAccount(Account account);

}
