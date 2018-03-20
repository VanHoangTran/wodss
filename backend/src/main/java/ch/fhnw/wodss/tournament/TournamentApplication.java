package ch.fhnw.wodss.tournament;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import ch.fhnw.wodss.tournament.model.Account;
import ch.fhnw.wodss.tournament.persistance.AccountRepository;

@SpringBootApplication
@EnableJpaRepositories("ch.fhnw.wodss.tournament.persistance")
public class TournamentApplication {

	@PersistenceContext
	EntityManager em;

	public static void main(String[] args) {
		SpringApplication.run(TournamentApplication.class, args);
	}

	@Bean
	@Transactional
	CommandLineRunner init(final AccountRepository accountRepository) {

		return new CommandLineRunner() {

			@Override
			public void run(String... arg0) throws Exception {
				accountRepository.save(new Account("username", "password"));
			}

		};

	}

}
