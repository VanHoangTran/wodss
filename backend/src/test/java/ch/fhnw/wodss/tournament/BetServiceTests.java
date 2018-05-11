package ch.fhnw.wodss.tournament;

import java.util.ArrayList;
import java.util.List;

import org.assertj.core.util.Arrays;
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

	private List<Bet> someBets = new ArrayList<>();

	@Before
	public void setUp() {
		Bet b1 = new Bet(); b1.setGame(new Game()); someBets.add(b1);
		Bet b2 = new Bet(); b2.setGame(new Game()); someBets.add(b2);
		Bet b3 = new Bet(); b3.setGame(new Game()); someBets.add(b3);
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