package ch.fhnw.wodss.tournament.config;

import ch.fhnw.wodss.tournament.service.GameService;
import ch.fhnw.wodss.tournament.service.GroupService;
import ch.fhnw.wodss.tournament.service.jobs.TournamentManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import java.util.concurrent.TimeUnit;

@Configuration
public class WebConfigurer implements ServletContextInitializer {

	private final Logger log = LoggerFactory.getLogger(WebConfigurer.class);

	@Autowired
	private TaskScheduler executor;

	@Autowired
	private GameService gameService;

	@Autowired
	private GroupService groupService;

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		// schedule tournament manager - not request based due to DDOS prevention
		executor.scheduleAtFixedRate(new TournamentManager(gameService, groupService), TimeUnit.DAYS.toMillis(1));
	}

	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.addAllowedOrigin("*");
		config.addAllowedMethod("*");
		config.addAllowedHeader("*");
		config.addExposedHeader("Authorization"); // header to handle authorization
		config.addExposedHeader("Link"); // header to signal a similar resource
		config.addExposedHeader("X-Total-Count"); // header to signal total count of response elements
		config.setAllowCredentials(true);
		config.setMaxAge(1800l);

		if (config.getAllowedOrigins() != null && !config.getAllowedOrigins().isEmpty()) {
			log.debug("Registering CORS filter");
			source.registerCorsConfiguration("/api/**", config);
			source.registerCorsConfiguration("/management/**", config);
			source.registerCorsConfiguration("/v2/api-docs", config);
		}
		return new CorsFilter(source);
	}

}
