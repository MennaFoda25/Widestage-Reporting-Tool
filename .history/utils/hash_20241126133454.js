const crypto = require('crypto');

/**
 * Configuration constants
 */
const LEN = 128; // Byte size of the hash
const ITERATIONS = 12000; // Number of iterations for PBKDF2
const DIGEST = 'sha1'; // Hashing algorithm

/**
 * Hashes a password with optional `salt`. Generates a new random salt if none is provided.
 *
 * @param {string} password - The password to hash.
 * @param {string} [salt] - Optional salt for hashing.
 * @returns {Promise<{ salt: string, hash: string }>} - An object containing the salt and hash.
 */
async function hashPassword(password, salt = null) { //salt is a random piece of data added to a password before hashing it
    try {
        // Generate a new salt if none is provided
        if (!salt) { 
            salt = crypto.randomBytes(LEN).toString('base64');
        }

        // Derive the hash using PBKDF2
        const hash = await crypto.pbkdf2Sync(password, salt, ITERATIONS, LEN, DIGEST).toString('base64');

        return { salt, hash };
    } catch (err) {
        throw new Error(`Hashing failed: ${err.message}`);
    }
}

module.exports = hashPassword;
