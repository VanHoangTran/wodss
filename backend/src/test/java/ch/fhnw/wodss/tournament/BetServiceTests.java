package ch.fhnw.wodss.tournament;

import ch.fhnw.wodss.tournament.domain.Account;
import ch.fhnw.wodss.tournament.domain.Bet;
import ch.fhnw.wodss.tournament.domain.Game;
import ch.fhnw.wodss.tournament.repository.BetRepository;
import ch.fhnw.wodss.tournament.repository.GameRepository;
import ch.fhnw.wodss.tournament.service.AccountService;
import ch.fhnw.wodss.tournament.service.BetService;
import ch.fhnw.wodss.tournament.service.RankingService;
import ch.fhnw.wodss.tournament.service.dto.BetDTO;
import ch.fhnw.wodss.tournament.util.SecurityUtil;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.BetVM;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static org.mockito.Mockito.*;

/**
 * Performs test of bet service
 */
@RunWith(SpringRunner.class)
public class BetServiceTests {

    @TestConfiguration
    static class TestInitializer {

        @Bean
        public BetService betService() {
            return new BetService();
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

    @MockBean
    private RankingService rankingService;

    private List<Bet> someBets = new ArrayList<>();

    @Before
    public void setUp() {
        when(securityUtil.getUsername()).thenReturn("username");

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
    public void testCreateOrUpdate_invalid() {
        BetVM vm = new BetVM();

        // invalid account name
        when(accountService.getAccountByName(any())).thenReturn(null);
        try {
            betService.createOrUpdate(vm);
            Assert.fail("create/update bet did not fail with invalid account name");
        } catch (IllegalArgumentException ignored) {
        }

        // invalid game id
        when(accountService.getAccountByName(any())).thenReturn(new Account());
        when(gameRepository.findById(any())).thenReturn(Optional.empty());
        try {
            betService.createOrUpdate(vm);
            Assert.fail("create/update bet did not fail with invalid game id");
        } catch (IllegalArgumentException ignored) {
        }

        // game not ready
        Game mockGame = mock(Game.class);
        Optional<Game> gameOptional = Optional.of(mockGame);
        when(gameRepository.findById(any())).thenReturn(gameOptional);
        when(mockGame.isReady()).thenReturn(false);
        try {
            betService.createOrUpdate(vm);
            Assert.fail("create/update bet did not fail with game not ready");
        } catch (IllegalArgumentException ignored) {
        }

        // game expired
        when(mockGame.isReady()).thenReturn(true);
        when(mockGame.getDate()).thenReturn(new Date(0)); // return old date
        try {
            betService.createOrUpdate(vm);
            Assert.fail("create/update bet did not fail with game expired");
        } catch (IllegalArgumentException ignored) {
        }

        verifyZeroInteractions(betRepository);
    }


    @Test
    public void testCreateOrUpdate_createNewBet() {
        BetVM vm = new BetVM();
        vm.setHomeGoals(10);
        vm.setAwayGoals(7);

        Account account = new Account();
        when(accountService.getAccountByName(any())).thenReturn(account);
        Game mockGame = mock(Game.class);
        Optional<Game> gameOptional = Optional.of(mockGame);
        when(gameRepository.findById(any())).thenReturn(gameOptional);
        when(mockGame.isReady()).thenReturn(true);
        long tomorrow = (new Date()).getTime() + 1000 * 60 * 60 * 24;
        when(mockGame.getDate()).thenReturn(new Date(tomorrow)); // return tomorrow
        when(betRepository.findAllByGameId(any())).thenReturn(Collections.emptyList());

        betService.createOrUpdate(vm);

        ArgumentCaptor<Bet> captor = ArgumentCaptor.forClass(Bet.class);
        verify(betRepository, times(1)).save(captor.capture());
        Bet savedBet = captor.getValue();
        Assert.assertEquals("account not as expected", savedBet.getAccount(), account);
        Assert.assertEquals("game not as expected", savedBet.getGame(), mockGame);
        Assert.assertEquals("home goals not as expected", savedBet.getHomeGoals(), 10);
        Assert.assertEquals("away goals not as expected", savedBet.getAwayGoals(), 7);
    }

    @Test
    public void testCreateOrUpdate_updateExistingBet() {
        BetVM vm = new BetVM();
        vm.setHomeGoals(10);
        vm.setAwayGoals(7);

        Account account = new Account();
        when(accountService.getAccountByName(any())).thenReturn(account);
        Game mockGame = mock(Game.class);
        Optional<Game> gameOptional = Optional.of(mockGame);
        when(gameRepository.findById(any())).thenReturn(gameOptional);
        when(mockGame.isReady()).thenReturn(true);
        long tomorrow = (new Date()).getTime() + 1000 * 60 * 60 * 24;
        when(mockGame.getDate()).thenReturn(new Date(tomorrow)); // return tomorrow

        Bet bet = new Bet();
        bet.setHomeGoals(1);
        bet.setAwayGoals(2);
        bet.setAccount(account);
        List<Bet> bets = Collections.singletonList(bet);
        when(betRepository.findAllByGameId(any())).thenReturn(bets);

        // check old values
        Assert.assertEquals(bet.getHomeGoals(), 1);
        Assert.assertEquals(bet.getAwayGoals(), 2);

        betService.createOrUpdate(vm);

        // check values changed
        Assert.assertEquals("home goals not as expected", bet.getHomeGoals(), 10);
        Assert.assertEquals("away goals not as expected", bet.getAwayGoals(), 7);

        verify(betRepository, times(1)).save(bet);
    }

    @Test
    public void testGetBetsForUser_invalidAccount() {
        when(accountService.getAccountByName(anyString())).thenReturn(null);
        try {
            betService.getBetsForUser();
            Assert.fail("getBetsForUser did not fail with invalid account name");
        } catch (Exception ignored) {
        }

        verifyZeroInteractions(betRepository);
    }

    @Test
    public void testGetBetsForUser() {
        when(accountService.getAccountByName(anyString())).thenReturn(someBets.get(0).getAccount());
        when(betRepository.findAllByAccount(any(Account.class))).thenReturn(someBets);

        List<BetDTO> betsForUserById = betService.getBetsForUser();
        Assert.assertEquals("Result size not as expected", betsForUserById.size(), someBets.size());

        verify(betRepository, times(1)).findAllByAccount(any());
    }

    @Test
    public void testGetBetsForUserById_invalid() {
        // invalid account name
        when(accountService.getAccountByName(anyString())).thenReturn(null);
        try {
            betService.getBetsForUserById(100L);
            Assert.fail("getBetsForUserById did not fail with invalid account name");
        } catch (IllegalArgumentException ignored) {
        }

        verifyZeroInteractions(betRepository);

        // invalid bet id
        when(accountService.getAccountByName(anyString())).thenReturn(new Account());
        when(betRepository.findById(any())).thenReturn(Optional.empty());

        try {
            betService.getBetsForUserById(100L);
            Assert.fail("getBetsForUserById did not fail with invalid bet id");
        } catch (IllegalArgumentException ignored) {
        }

        // not given account's bet id
        Account account = new Account();
        account.setId(5L);
        when(accountService.getAccountByName(anyString())).thenReturn(account);
        Bet bet = new Bet();
        Account otherAccount = new Account();
        otherAccount.setId(3L);
        bet.setAccount(otherAccount);
        Optional<Bet> betOptional = Optional.of(bet);
        when(betRepository.findById(any())).thenReturn(betOptional);

        try {
            betService.getBetsForUserById(100L);
            Assert.fail("getBetsForUserById did not fail with bet id of other account's bet");
        } catch (IllegalArgumentException ignored) {
        }
    }

    @Test
    public void testGetBetsForUserById() {
        // not given account's bet id
        Account account = new Account();
        account.setId(5L);
        when(accountService.getAccountByName(anyString())).thenReturn(account);
        Bet bet = new Bet();
        bet.setAccount(account);
        bet.setGame(new Game());
        Optional<Bet> betOptional = Optional.of(bet);
        when(betRepository.findById(any())).thenReturn(betOptional);

        BetDTO result = betService.getBetsForUserById(100L);

        Assert.assertNotNull("Result was null", result);
    }

    @Test
    public void testGetBetsByUserId_invalid() {
        // invalid user id
        when(accountService.getAccountById(anyLong())).thenReturn(null);
        try {
            betService.getBetsByUserId(100L);
            Assert.fail("getBetsByUserId did not fail with invalid user id");
        } catch (Exception ignored) {
        }

        verifyZeroInteractions(betRepository);
    }

    @Test
    public void testGetBetsByUserId() {
        Account account = new Account();
        when(accountService.getAccountById(anyLong())).thenReturn(account);
        when(betRepository.findAllByAccount(any(Account.class))).thenReturn(someBets);

        List<BetDTO> betsForUserById = betService.getBetsByUserId(100L);

        Assert.assertEquals("Result size not as expected", betsForUserById.size(), someBets.size());
        verify(betRepository, times(1)).findAllByAccount(account);
    }
}
