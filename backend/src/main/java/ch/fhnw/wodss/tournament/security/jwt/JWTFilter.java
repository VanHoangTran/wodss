package ch.fhnw.wodss.tournament.security.jwt;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

public class JWTFilter extends GenericFilterBean {

	private static final int MAX_REQUESTS_PER_MINUTE = 500;
	private static final int MINUTES_REQUEST_LIMIT = 5;

	private final TokenProvider tokenProvider;

	private final Map<String, long[]> requestStats;

	public JWTFilter(TokenProvider tokenProvider) {
		this.tokenProvider = tokenProvider;
		this.requestStats = new HashMap<>();
	}

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {
		HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
		String jwt = resolveToken(httpServletRequest);

		// limit access per token and REMOTE_ADDRESS
		boolean canPassThrough = validateRequestLimit(jwt) && validateRequestLimit(servletRequest.getRemoteAddr());

		if (canPassThrough && StringUtils.hasText(jwt) && this.tokenProvider.validateToken(jwt)) {
			Authentication authentication = this.tokenProvider.getAuthentication(jwt);
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		filterChain.doFilter(servletRequest, servletResponse);
	}

	private boolean validateRequestLimit(String jwt) {
		if (jwt != null && requestStats.containsKey(jwt)) {
			long[] stats = requestStats.get(jwt);
			long counter = stats[0]; // how many requests were yet send
			long firstRequest = stats[1]; // date in milliseconds of last request
			stats[0] = ++counter; // increase request counter

			// calculate diff between last and current request
			long currentTime = System.currentTimeMillis();
			long diff = currentTime - firstRequest;

			if (diff < 60000 * MINUTES_REQUEST_LIMIT) {
				if (counter > MAX_REQUESTS_PER_MINUTE * MINUTES_REQUEST_LIMIT) {
					return false;
				}
			} else {
				// reset limits
				stats[0] = 1;
				stats[1] = System.currentTimeMillis();
			}
		} else if (jwt != null) {
			requestStats.put(jwt, new long[] { 1, System.currentTimeMillis() });
		}
		return true;
	}

	private String resolveToken(HttpServletRequest request) {
		String bearerToken = request.getHeader(JWTConfigurer.AUTHORIZATION_HEADER);
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7, bearerToken.length());
		}
		return null;
	}
}
