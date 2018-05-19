package ch.fhnw.wodss.tournament.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ch.fhnw.wodss.tournament.domain.Account;
import ch.fhnw.wodss.tournament.domain.Bet;
import ch.fhnw.wodss.tournament.domain.Game;
import ch.fhnw.wodss.tournament.repository.BetRepository;
import ch.fhnw.wodss.tournament.repository.GameRepository;
import ch.fhnw.wodss.tournament.service.dto.BetDTO;
import ch.fhnw.wodss.tournament.util.SecurityUtil;
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
	private AccountService accountService;

	@Autowired
	private GameRepository gameRepository;

	@Autowired
	private BetRepository betRepository;

	@Autowired
	private SecurityUtil securityUtil;

	/**
	 * Creates or updates a bet using provided BetVM
	 * 
	 * @param vm to use for "PUT request"
	 */
	public void createOrUpdate(BetVM vm) {

		final String username = securityUtil.getUsername();

		Account foundAccount = accountService.getAccountByName(username);
		if (foundAccount == null) {
			log.warn("sombody obviously manipulated the token / authority");
			throw new IllegalArgumentException("invalid arguments provided");
		}

		// does match exist?
		Optional<Game> foundGame = gameRepository.findById(vm.getGameId());
		if (!foundGame.isPresent()) {
			log.warn("could not PUT bet since game was not found");
			throw new IllegalArgumentException("invalid arguments provided");
		}

		// is match ready for betting?
		if (!foundGame.get().isReady()) {
			log.warn("could not PUT bet since game was not ready yet");
			throw new IllegalArgumentException("invalid arguments provided");
		}

		// check if there is already a bet for this game
		List<Bet> bets = betRepository.findAllByGameId(vm.getGameId());
		List<Bet> userBets = bets.stream().filter(b -> b.getAccount().equals(foundAccount))
				.collect(Collectors.toList());
		Bet bet = userBets.size() == 0 ? null : userBets.get(0);
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

	/**
	 * Returns all bets for current user
	 */
	public List<BetDTO> getBetsForUser() {
		Account account = accountService.getAccountByName(securityUtil.getUsername());
		if (account == null) {
			log.warn("sombody obviously manipulated the token / authority");
			throw new IllegalArgumentException("invalid arguments provided");
		}

		List<Bet> userBets = betRepository.findAllByAccount(account);

		return BetDTO.fromList(userBets);
	}

	/**
	 * Returns a bets by id for current user
	 */
	public BetDTO getBetsForUserById(Long betId) {
		Account account = accountService.getAccountByName(securityUtil.getUsername());
		if (account == null) {
			log.warn("sombody obviously manipulated the token / authority");
			throw new IllegalArgumentException("invalid arguments provided");
		}

		Optional<Bet> userBets = betRepository.findById(betId);

		if (!userBets.isPresent()) {
			throw new IllegalArgumentException("invalid arguments provided");
		} else if (!userBets.get().getAccount().getId().equals(account.getId())) {
			log.warn("sombody obviously manipulated the token / authority");
			throw new IllegalArgumentException("invalid arguments provided");
		}

		return new BetDTO(userBets.get());
	}

	/**
	 * Returns all bets for a given userID
	 */
	public List<BetDTO> getBetsByUserId(Long userId) {
		Account account = accountService.getAccountById(userId);
		if (account == null) {
			log.warn("account with id {} could not be found", userId);
			throw new IllegalArgumentException("invalid arguments provided");
		}

		List<Bet> userBets = betRepository.findAllByAccount(account);

		return BetDTO.fromList(userBets);
	}

	/**
	 * Deletes a bet by it's id
	 * 
	 * @param betId to delete
	 */
	public void deleteByGameId(Long gameId) {
		final String username = securityUtil.getUsername();
		Account foundAccount = accountService.getAccountByName(username);

		List<Bet> bet = betRepository.findAllByGameId(gameId);
		for(Bet b : bet) {
			if(!b.getAccount().equals(foundAccount)) {
				continue;
			}
			
			betRepository.delete(b);
		}
	}
}
