package ch.fhnw.wodss.tournament.service;

import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ch.fhnw.wodss.tournament.domain.Account;
import ch.fhnw.wodss.tournament.domain.AccountRecovery;
import ch.fhnw.wodss.tournament.repository.AccountRecoveryRepository;
import ch.fhnw.wodss.tournament.repository.AccountRepository;
import ch.fhnw.wodss.tournament.util.Argon2Util;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.RegisterViewModel;

/**
 * Service responsible for managing the user accounts.
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@Service
@Transactional
public class AccountService {

	private final Logger log = LoggerFactory.getLogger(AccountService.class);

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private AccountRecoveryRepository accountRecoveryRepository;

	@Autowired
	private Argon2Util passwordEncoder;

	/**
	 * Registers a new account which is inactive and not verified
	 * 
	 * @param registerViewModel containing account informations
	 * @return created account
	 */
	public Account register(RegisterViewModel registerViewModel) {
		log.info("registration of new user {}", registerViewModel.getUsername());

		Account newAccount = new Account();
		newAccount.setAdmin(false);
		newAccount.setActive(false);
		newAccount.setVerified(false);
		newAccount.setMail(registerViewModel.getMail());
		newAccount.setUsername(registerViewModel.getUsername());

		// Encode password with salt
		log.info("salting and hashing user's password with argon2");
		String salt = RandomStringUtils.randomAlphanumeric(20);
		String hash = passwordEncoder.hash(salt + registerViewModel.getPassword());
		newAccount.setPassword(hash);
		newAccount.setSalt(salt);

		// create and set a random activation key
		newAccount.setActivationKey(RandomStringUtils.randomNumeric(20));

		// persist user
		accountRepository.save(newAccount);

		log.info("new account registered for {}", newAccount);

		return newAccount;
	}

	/**
	 * Creates a account recovery entry for given account.
	 * 
	 * @param account to create recovery for
	 * @return the created account recovery
	 */
	public AccountRecovery createRecovery(Account account) {
		log.info("creating a new account recovery for {}", account);

		AccountRecovery recovery = new AccountRecovery();
		recovery.setAccount(account);

		String key = RandomStringUtils.randomAlphanumeric(50);
		recovery.setRecoveryKey(key);

		accountRecoveryRepository.save(recovery);

		log.info("account recovery created");

		return recovery;
	}

	/**
	 * Removes all existing recoveries for given account-
	 * 
	 * @param account to invalidate recoveries for
	 */
	public void invalidateRecovieries(Account account) {
		log.info("invalidating all recovery entries for {}", account);

		List<AccountRecovery> active = accountRecoveryRepository.findAllByAccount(account);
		accountRecoveryRepository.deleteAll(active);

		log.info("invalidated {} account recovery entries", active.size());
	}

}
