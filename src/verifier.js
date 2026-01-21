import { GameEngine, GAME_CONSTANTS } from './engine.js';
import { SeededRNG } from './rng.js';
import { sha256, serializeStateForHashing, getDifficulty } from './crypto.js';

/**
 * Replays a game proof to verify its validity.
 * @param {Object} proof - The proof object containing seed, inputs, and hashes.
 * @param {Function} onProgress - Callback for progress updates (0-1).
 * @returns {Promise<Object>} - { valid: boolean, reason: string, score: number }
 */
export async function verifyProof(proof, onProgress) {
    const engine = new GameEngine(proof.seed);
    let previousHash = proof.initialHash; // Should be hash of seed
    
    // Compute Code Hash for integrity check
    const codeHash = await sha256(GameEngine.toString() + SeededRNG.toString());
    
    // Verify Code Hash matches proof (if present)
    if (proof.codeHash && proof.codeHash !== codeHash) {
        return { valid: false, reason: "Code Integrity Check Failed: Game code has been modified." };
    }

    // Safety check on lengths
    if (!proof.inputs || !proof.inputs.length) {
        return { valid: false, reason: "No inputs provided" };
    }

    const totalTicks = proof.inputs.length;

    for (let i = 0; i < totalTicks; i++) {
        const record = proof.inputs[i];
        
        // 1. Run Logic
        const state = engine.tick(record.input);
        
        // 2. Check Difficulty Requirement
        const expectedDiff = getDifficulty(state);
        if ((record.difficulty || 0) < expectedDiff) {
             return { valid: false, reason: `Difficulty too low at tick ${i}. Suspicious behavior detected.` };
        }

        // 3. Reconstruct Hash Data
        // Must match exactly what was hashed in the client (now includes nonce)
        // Format: prevHash | codeHash | serializedState | nonce
        // Note: The miner computes sha256(prefix + nonce).
        // Prefix was: prevHash | codeHash | serializedState |
        
        const serialized = serializeStateForHashing(i + 1, record.input, state);
        const prefix = previousHash + '|' + codeHash + '|' + serialized + '|';
        const dataToHash = prefix + record.nonce;
        
        // 4. Compute Hash
        const calculatedHash = await sha256(dataToHash);
        
        // 5. Verify Hash Matches Claim
        if (calculatedHash !== record.hash) {
            return { 
                valid: false, 
                reason: `Hash mismatch at tick ${i}. Proof is invalid.`,
                tick: i 
            };
        }
        
        // 6. Verify Proof of Work (Leading Zeros)
        const target = '0'.repeat(record.difficulty);
        if (!calculatedHash.startsWith(target)) {
             return { 
                valid: false, 
                reason: `Proof of Work failed at tick ${i}. Hash does not meet difficulty target.`,
                tick: i 
            };
        }

        previousHash = calculatedHash;
        
        // Update progress every 50 ticks to not spam
        if (i % 50 === 0 && onProgress) {
            onProgress(i / totalTicks);
        }
    }

    if (engine.state.score !== proof.finalScore) {
        return { valid: false, reason: `Score mismatch. Proof says ${proof.finalScore}, Engine says ${engine.state.score}` };
    }

    return { valid: true, score: engine.state.score };
}