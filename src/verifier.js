import { GameEngine, GAME_CONSTANTS } from './engine.js';
import { SeededRNG } from './rng.js';
import { sha256, serializeStateForHashing } from './crypto.js';

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

    // Safety check on lengths
    if (!proof.inputs || !proof.inputs.length) {
        return { valid: false, reason: "No inputs provided" };
    }

    const totalTicks = proof.inputs.length;

    for (let i = 0; i < totalTicks; i++) {
        const record = proof.inputs[i];
        
        // 1. Run Logic
        const state = engine.tick(record.input);
        
        // 2. Reconstruct Hash Data
        // Must match exactly what was hashed in the client
        const dataToHash = previousHash + '|' + codeHash + '|' + serializeStateForHashing(i + 1, record.input, state);
        
        // 3. Compute Hash
        const calculatedHash = await sha256(dataToHash);
        
        // 4. Verify
        if (calculatedHash !== record.hash) {
            console.error(`Mismatch at tick ${i}`, {
                expected: record.hash,
                calculated: calculatedHash,
                data: dataToHash
            });
            return { 
                valid: false, 
                reason: `Hash mismatch at tick ${i}. The gameplay logic does not match the proof signature.`,
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