package ch.fhnw.wodss.tournament.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ch.fhnw.wodss.tournament.domain.Account;
import ch.fhnw.wodss.tournament.domain.BettingPool;
import ch.fhnw.wodss.tournament.repository.BettingPoolRepository;
import ch.fhnw.wodss.tournament.service.dto.AccountDTO;
import ch.fhnw.wodss.tournament.service.dto.BettingPoolDTO;
import ch.fhnw.wodss.tournament.util.SecurityUtil;

/**
 * Service responsible for interaction with betting pools
 * 
 * @author Kevin Kirn <kevin.kirn@students.fhnw.ch>
 */
@Service
@Transactional
public class BettingPoolService {

	private final Logger log = LoggerFactory.getLogger(BettingPoolService.class);

	@Autowired
	private BettingPoolRepository bettingPoolRepository;

	@Autowired
	private AccountService accountService;

	/**
	 * Gets all bettingPools and marks if current user is member of it
	 * 
	 * @return list of betting pool DTOs
	 */
	public List<BettingPoolDTO> getAllPools() {
		log.info("reading all betting pools from database");
		List<BettingPool> allPools = bettingPoolRepository.findAll();
		List<BettingPoolDTO> dtoList = BettingPoolDTO.fromList(allPools);

		final String username = SecurityUtil.getUsername();

		for (BettingPoolDTO pool : dtoList) {
			boolean isMember = false;
			for (AccountDTO account : pool.getMembers()) {
				isMember = account.getUsername().equals(username);
			}

			log.info("current user is " + (isMember ? "" : "not") + " member of pool {}", pool.getName());
			pool.setMember(isMember);
		}

		return dtoList;
	}

	/**
	 * Creates a new betting pool owned by current user
	 * 
	 * @param name of the new betting pool
	 */
	public void createPool(String name) {
		if (name == null || name == "" || name.length() > 100) {
			throw new IllegalArgumentException("name of betting pool is invalid");
		}

		// does a pool with same name exists already?
		BettingPool foundByName = bettingPoolRepository.findByName(name);
		if (foundByName != null) {
			throw new IllegalArgumentException("pool with same name already exists");
		}

		final String username = SecurityUtil.getUsername();
		Account owner = accountService.getAccountByName(username);

		BettingPool newPool = new BettingPool();
		newPool.setName(name);
		newPool.setOwner(owner);

		// add owner to members
		List<Account> members = new ArrayList<>();
		members.add(owner);
		newPool.setMembers(members);

		bettingPoolRepository.save(newPool);
	}

	/**
	 * Deletes a pool by given name
	 * 
	 * @param name of pool to delete
	 */
	public void deletePool(String name) {
		if (name == null || name == "" || name.length() > 100) {
			throw new IllegalArgumentException("name of betting pool is invalid");
		}

		// does the pool exists?
		BettingPool foundByName = bettingPoolRepository.findByName(name);
		if (foundByName == null) {
			throw new IllegalArgumentException("no pool found");
		}

		// is current user owner of pool?
		final String username = SecurityUtil.getUsername();
		Account currentUser = accountService.getAccountByName(username);

		if (foundByName.getOwner().getId() != currentUser.getId()) {
			throw new IllegalArgumentException("access to pool denied");
		}

		bettingPoolRepository.delete(foundByName);
	}

	/**
	 * Removes current user from betting pool
	 * 
	 * @param name of betting pool
	 */
	public BettingPoolDTO leaveGroup(String name) {
		if (name == null || name == "" || name.length() > 100) {
			throw new IllegalArgumentException("name of betting pool is invalid");
		}

		// does the pool exists?
		BettingPool foundByName = bettingPoolRepository.findByName(name);
		if (foundByName == null) {
			throw new IllegalArgumentException("no pool found");
		}

		// is current user owner of pool?
		final String username = SecurityUtil.getUsername();
		Account currentUser = accountService.getAccountByName(username);

		boolean found = false;
		List<Account> currentMembers = foundByName.getMembers();
		for (Account member : currentMembers) {
			if (member.getId().equals(currentUser.getId())) {
				found = true;
			}
		}

		if (!found) {
			return new BettingPoolDTO(foundByName); // idempotent
		}

		currentMembers.remove(currentUser);
		foundByName.setMembers(currentMembers);

		bettingPoolRepository.save(foundByName);

		return new BettingPoolDTO(foundByName);
	}

	/**
	 * Joins current user from betting pool
	 * 
	 * @param name of betting pool
	 */
	public BettingPoolDTO joinGroup(String name) {
		if (name == null || name == "" || name.length() > 100) {
			throw new IllegalArgumentException("name of betting pool is invalid");
		}

		// does the pool exists?
		BettingPool foundByName = bettingPoolRepository.findByName(name);
		if (foundByName == null) {
			throw new IllegalArgumentException("no pool found");
		}

		// is current user owner of pool?
		final String username = SecurityUtil.getUsername();
		Account currentUser = accountService.getAccountByName(username);

		List<Account> currentMembers = foundByName.getMembers();
		for (Account member : currentMembers) {
			if (member.getId().equals(currentUser.getId())) {
				return new BettingPoolDTO(foundByName); // idempotent
			}
		}

		currentMembers.add(currentUser);
		foundByName.setMembers(currentMembers);

		bettingPoolRepository.save(foundByName);

		return new BettingPoolDTO(foundByName);
	}

	/**
	 * Finds a betting pool by it's id and returns it's id
	 * 
	 * @param poolId to search for
	 */
	public BettingPoolDTO getPoolById(Long poolId) {
		Optional<BettingPool> pool = bettingPoolRepository.findById(poolId);
		if (pool.isPresent()) {
			return new BettingPoolDTO(pool.get());
		} else {
			throw new IllegalArgumentException("betting pool does not exist");
		}
	}

}
