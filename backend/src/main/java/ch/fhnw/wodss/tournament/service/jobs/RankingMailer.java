package ch.fhnw.wodss.tournament.service.jobs;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ch.fhnw.wodss.tournament.domain.Account;
import ch.fhnw.wodss.tournament.domain.BettingPool;
import ch.fhnw.wodss.tournament.service.AccountService;
import ch.fhnw.wodss.tournament.service.MailService;
import ch.fhnw.wodss.tournament.service.RankingService;
import ch.fhnw.wodss.tournament.service.dto.AccountDTO;
import ch.fhnw.wodss.tournament.service.dto.RankingDTO;

public class RankingMailer implements Runnable {

	private final Logger log = LoggerFactory.getLogger(RankingMailer.class);

	private final RankingService rankingService;
	private final AccountService accountService;
	private final MailService mailService;

	public RankingMailer(RankingService rankingService, AccountService accountService, MailService mailService) {
		this.rankingService = rankingService;
		this.accountService = accountService;
		this.mailService = mailService;
	}

	@Override
	public void run() {
		try {
			log.info("ranking mailer invoked, sending rankings to users now.");
			List<RankingDTO> rankings = rankingService.getRankingOfPool(BettingPool.ALL_USERS_GROUP);

			for (RankingDTO rank : rankings) {
				AccountDTO account = rank.getAccount();
				Account storedAccount = accountService.getAccountById(account.getId());
				mailService.sendRankingUpdateMail(storedAccount.getMail(), account.getUsername(), rank.getPosition(),
						rank.getPoints());
			}

		} catch (RuntimeException re) {
			log.error("unexpected exception occured during ranking mail job", re);
		}

	}

}
