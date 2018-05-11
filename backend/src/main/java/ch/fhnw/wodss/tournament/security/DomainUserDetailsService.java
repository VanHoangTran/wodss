package ch.fhnw.wodss.tournament.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import ch.fhnw.wodss.tournament.domain.Account;
import ch.fhnw.wodss.tournament.repository.AccountRepository;

@Component
public class DomainUserDetailsService implements UserDetailsService {

	private final Logger log = LoggerFactory.getLogger(UserDetailsService.class);

	@Autowired
	AccountRepository accountRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.debug("Authenticating {}", username);

		Account account = accountRepository.findByUsername(username);
		if (account != null && account.isActive() && account.isVerified()) {
			return new User(account.getUsername(), account.getPassword(), true, true, true, true,
					AuthorityUtils.createAuthorityList("USER"));
		} else {
			String msg = "could not find the user '" + username + "'";
			log.warn(msg);
			throw new UsernameNotFoundException(msg);
		}
	}

}
