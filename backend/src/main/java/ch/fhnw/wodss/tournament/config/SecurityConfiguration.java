package ch.fhnw.wodss.tournament.config;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;

import ch.fhnw.wodss.tournament.security.jwt.JWTConfigurer;
import ch.fhnw.wodss.tournament.security.jwt.TokenProvider;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
@Import(SecurityProblemSupport.class)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private CorsFilter corsFilter;
	
	@Autowired 
	private UserDetailsService userDetailsService;
	
	@Autowired 
	private AuthenticationManagerBuilder authenticationManagerBuilder;
	
	@Autowired
	private TokenProvider tokenProvider;
	
	@PostConstruct
	public void init() {
		try {
			authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
		} catch (Exception e) {
			throw new BeanInitializationException("Security configuration failed", e);
		}
	}
	
	@Bean // FIXME: Use argon password encoder here!
	public NoOpPasswordEncoder passwordEncoder() {
		return (NoOpPasswordEncoder) NoOpPasswordEncoder.getInstance();
	}
	
	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring()
	        .antMatchers(HttpMethod.OPTIONS, "/**")
	        .antMatchers("/app/**/*.{js,html}")
	        .antMatchers("/i18n/**")
	        .antMatchers("/content/**");
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
        .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
        .exceptionHandling()
	    .and()
	        .csrf()
	        .disable()
	        .headers()
	        .frameOptions()
	        .disable()
	    .and()
	        .sessionManagement()
	        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	    .and()
	        .authorizeRequests()
	        .antMatchers("/api/register").permitAll()
	        .antMatchers("/api/activate").permitAll()
	        .antMatchers("/api/authenticate").permitAll()
	        .antMatchers("/api/account/reset-password/init").permitAll()
	        .antMatchers("/api/account/reset-password/finish").permitAll()
	        .antMatchers("/api/profile-info").permitAll()
	        .antMatchers("/api/**").authenticated()
	    .and()
	        .apply(securityConfigurerAdapter());
	}

	private JWTConfigurer securityConfigurerAdapter() {
        return new JWTConfigurer(tokenProvider);
    }
}
