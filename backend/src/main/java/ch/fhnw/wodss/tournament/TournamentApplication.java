package ch.fhnw.wodss.tournament;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
// TODO KKI move me into a configuration class
@EnableJpaRepositories("ch.fhnw.wodss.tournament.persistance")
public class TournamentApplication {

	@PersistenceContext
	EntityManager em;

	public static void main(String[] args) {
		SpringApplication.run(TournamentApplication.class, args);
	}

}
