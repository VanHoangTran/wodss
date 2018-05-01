package ch.fhnw.wodss.tournament.web.rest;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonProperty;

import ch.fhnw.wodss.tournament.security.jwt.JWTConfigurer;
import ch.fhnw.wodss.tournament.security.jwt.TokenProvider;
import ch.fhnw.wodss.tournament.web.rest.viewmodel.LoginViewModel;

@RestController
@RequestMapping("/api")
public class UserJWTController {

	@Autowired
	private TokenProvider tokenProvider;

	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("/authenticate")
	public ResponseEntity<JWTToken> authorize(@Valid @RequestBody LoginViewModel payload) {
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				payload.getUsername(), payload.getPassword());

		try {
			Authentication authentication = this.authenticationManager.authenticate(authenticationToken);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String jwt = tokenProvider.createToken(authentication, false);
			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.add(JWTConfigurer.AUTHORIZATION_HEADER, "Bearer " + jwt);
			return new ResponseEntity<>(new JWTToken(jwt), httpHeaders, HttpStatus.OK);
		} catch (BadCredentialsException bce) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

	}

	/**
	 * Object to return as body in JWT Authentication.
	 */
	static class JWTToken {

		private String idToken;

		JWTToken(String idToken) {
			this.idToken = idToken;
		}

		@JsonProperty("id_token")
		String getIdToken() {
			return idToken;
		}

		void setIdToken(String idToken) {
			this.idToken = idToken;
		}
	}

}
