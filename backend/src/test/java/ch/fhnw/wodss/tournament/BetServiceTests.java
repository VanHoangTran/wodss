package ch.fhnw.wodss.tournament;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import ch.fhnw.wodss.tournament.domain.Account;
import ch.fhnw.wodss.tournament.domain.Bet;
import ch.fhnw.wodss.tournament.domain.Game;
import ch.fhnw.wodss.tournament.repository.BetRepository;
import ch.fhnw.wodss.tournament.repository.GameRepository;
import ch.fhnw.wodss.tournament.service.AccountService;
import ch.fhnw.wodss.tournament.service.BetService;
import ch.fhnw.wodss.tournament.service.dto.BetDTO;
import ch.fhnw.wodss.tournament.util.SecurityUtil;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.BetVM;

/**
 * Performs test of bet service
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@RunWith(SpringRunner.class)
public class BetServiceTests {

	@TestConfiguration
	static class EmployeeServiceImplTestContextConfiguration {

		@Bean
		public BetService employeeService() {
			return new BetService();
		}

		@Bean
		public AccountService accountService() {
			return new AccountService();
		}
	}

	@Autowired
	private BetService betService;

	@MockBean
	private AccountService accountService;

	@MockBean
	private GameRepository gameRepository;

	@MockBean
	private BetRepository betRepository;

	@MockBean
	private SecurityUtil securityUtil;

	private List<Bet> someBets = new ArrayList<>();

	@Before
	public void setUp() {
		Mockito.when(securityUtil.getUsername()).thenReturn("username");

		Account acc = new Account();
		acc.setId(100L);

		Bet b1 = new Bet();
		b1.setGame(new Game());
		b1.setAccount(acc);

		Bet b2 = new Bet();
		b2.setGame(new Game());
		b2.setAccount(acc);

		Bet b3 = new Bet();
		b3.setGame(new Game());
		b3.setAccount(acc);

		someBets.add(b1);
		someBets.add(b2);
		someBets.add(b3);
	}

	@Test
	public void testCreateOrUpdate() {
		// searching for invalid user id
		Mockito.when(accountService.getAccountByName(Mockito.anyString())).thenReturn(null);
		try {
			betService.createOrUpdate(null);
			Assert.fail("should never reach here...");
		} catch (Exception e) {
		}

		// simple bet for test
		BetVM mock = new BetVM();
		mock.setGameId(100);
		mock.setHomeGoals(10);
		mock.setAwayGoals(10);

		// game not found - exception should be thrown
		Mockito.when(gameRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());
		try {
			betService.createOrUpdate(mock);
			Assert.fail("should never reach here...");
		} catch (Exception e) {
		}

		Mockito.when(accountService.getAccountByName(Mockito.anyString())).thenReturn(someBets.get(0).getAccount());
		Mockito.when(gameRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(someBets.get(0).getGame()));
		Mockito.when(betRepository.findByGameId(Mockito.anyLong())).thenReturn(someBets.get(0));

		betService.createOrUpdate(mock);

		Assert.assertTrue(someBets.get(0).getHomeGoals() == mock.getHomeGoals()
				&& someBets.get(0).getAwayGoals() == mock.getAwayGoals());
	}

	@Test
	public void testGetBetsForUser() {
		// searching for invalid user id
		Mockito.when(accountService.getAccountByName(Mockito.anyString())).thenReturn(null);
		try {
			betService.getBetsForUser();
			Assert.fail("should never reach here...");
		} catch (Exception e) {
		}

		Mockito.when(accountService.getAccountByName(Mockito.anyString())).thenReturn(someBets.get(0).getAccount());
		Mockito.when(betRepository.findAllByAccount(Mockito.any(Account.class))).thenReturn(someBets);

		List<BetDTO> betsForUserById = betService.getBetsForUser();
		Assert.assertEquals(betsForUserById.size(), someBets.size());
	}

	@Test
	public void testGetBetsForUserById() {
		// searching for invalid user id
		Mockito.when(accountService.getAccountByName(Mockito.anyString())).thenReturn(null);
		try {
			betService.getBetsForUserById(100l);
			Assert.fail("should never reach here...");
		} catch (Exception e) {
		}

		// valid account
		Mockito.when(accountService.getAccountByName(Mockito.anyString())).thenReturn(someBets.get(0).getAccount());
		Mockito.when(betRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

		try {
			betService.getBetsForUserById(100l);
			Assert.fail("should never reach here...");
		} catch (Exception e) {
		}

		Mockito.when(betRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(someBets.get(0)));
		BetDTO dto = betService.getBetsForUserById(100l);

		Assert.assertTrue(dto != null);
	}

	@Test
	public void testGetBetsByUserId() {
		// searching for invalid user id
		Mockito.when(accountService.getAccountById(Mockito.anyLong())).thenReturn(null);
		try {
			betService.getBetsByUserId(100l);
			Assert.fail("should never reach here...");
		} catch (Exception e) {
		}

		// valid account
		Mockito.when(accountService.getAccountById(Mockito.anyLong())).thenReturn(new Account());
		Mockito.when(betRepository.findAllByAccount(Mockito.any(Account.class))).thenReturn(someBets);

		List<BetDTO> betsForUserById = betService.getBetsByUserId(100l);
		Assert.assertEquals(betsForUserById.size(), someBets.size());
	}
}