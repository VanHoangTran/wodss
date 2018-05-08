package ch.fhnw.wodss.tournament.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ch.fhnw.wodss.tournament.domain.Account;
import ch.fhnw.wodss.tournament.domain.Bet;
import ch.fhnw.wodss.tournament.domain.Game;
import ch.fhnw.wodss.tournament.repository.AccountRepository;
import ch.fhnw.wodss.tournament.repository.BetRepository;
import ch.fhnw.wodss.tournament.repository.GameRepository;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.BetVM;

/**
 * Service responsible for interaction with bets
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@Service
@Transactional
public class BetService {

	private final Logger log = LoggerFactory.getLogger(BetService.class);

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private GameRepository gameRepository;

	@Autowired
	private BetRepository betRepository;

	/**
	 * Creates or updates a bet using provided BetVM
	 * 
	 * @param vm to use for "PUT request"
	 */
	public void createOrUpdate(BetVM vm) {

		// first of all, check if JWT token authentication is requested account
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		final String username = authentication.getName();

		Account foundAccount = accountRepository.findByUsername(username);
		if (foundAccount == null || !foundAccount.getId().equals(vm.getAccountId())) {
			log.warn("sombody tried to PUT a bet for another user");
			throw new IllegalArgumentException("invalid arguments provided");
		}

		// does match exist?
		Optional<Game> foundGame = gameRepository.findById(vm.getGameId());
		if (!foundGame.isPresent()) {
			log.warn("could not PUT bet since game was not found");
			throw new IllegalArgumentException("invalid arguments provided");
		}

		// check if there is already a bet for this game
		Bet bet = betRepository.findByGameId(vm.getGameId());

		if (bet == null) {
			// just create a new bet
			bet = new Bet();
			bet.setAccount(foundAccount);
			bet.setGame(foundGame.get());
		}

		bet.setHomeGoals(vm.getHomeGoals());
		bet.setAwayGoals(vm.getAwayGoals());

		betRepository.save(bet);
	}

}
