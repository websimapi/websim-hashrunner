/**
 * Cryptographic utilities
 */

export async function sha256(message) {
    // Encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);
    // Hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    // Convert ArrayBuffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Generate a compact string representation of the critical game state
// This is what gets hashed to prove the state existed
export function serializeStateForHashing(tick, input, state) {
    return [
        tick,
        input.jump ? 1 : 0,
        Math.floor(state.player.y * 100), // Fixed precision
        state.score,
        state.rngState
    ].join('|');
}