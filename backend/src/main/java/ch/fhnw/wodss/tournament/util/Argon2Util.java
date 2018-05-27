package ch.fhnw.wodss.tournament.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Constants;
import de.mkammerer.argon2.Argon2Factory;

/**
 * @author Hoang Tran <hoang.tran@students.fhnw.ch>
 */
@Component
public class Argon2Util {

    /**
     * Default salt length in bytes to be used for hashing.
     *
     * @see Argon2Factory#create(int, int)
     */
    @Value("${argon2.defaultSaltLength}")
    private int defaultSaltLength;

    /**
     * Default hash length in bytes to be used for hashing.
     *
     * @see Argon2Factory#create(int, int)
     */
    @Value("${argon2.defaultHashLength}")
    private int defaultHashLength;

    /**
     * Number of iterations to be used for hashing.
     *
     * @see Argon2#hash(int, int, int, String)
     */
    @Value("${argon2.iterations}")
    private int iterations;

    /**
     * Number of Kibibytes for memory usage used for hashing.
     *
     * @see Argon2#hash(int, int, int, String)
     */
    @Value("${argon2.memory}")
    private int memory;

    /**
     * Number of threads and compute lanes used for hashing.
     *
     * @see Argon2#hash(int, int, int, String)
     */
    @Value("${argon2.parallelism}")
    private int parallelism;

    private Argon2 createArgon2Instance() {
        if (defaultSaltLength == 0) {
            defaultSaltLength = Argon2Constants.DEFAULT_SALT_LENGTH;
        }
        if (defaultHashLength == 0) {
            defaultHashLength = Argon2Constants.DEFAULT_HASH_LENGTH;
        }
        return Argon2Factory.create(defaultSaltLength, defaultHashLength);
    }

    /**
     * Verifies given password against given hash. Uses UTF-8 encoding.
     *
     * @param password Password to be verified.
     * @param hash     Hash to be used for Verification.
     * @return True if password matches hash, false otherwise.
     */
    public boolean verify(String password, String hash) {
        Argon2 argon2 = createArgon2Instance();
        return argon2.verify(hash, password);
    }

    /**
     * Hashes the given password with Argon2. Uses UTF-8 encoding.
     *
     * @param password Password to be hashed
     * @return Hashed password
     * @see Argon2#hash(int, int, int, String)
     */
    public String hash(String password) {
        Argon2 argon2 = createArgon2Instance();
        return argon2.hash(iterations, memory, parallelism, password);
    }
}
