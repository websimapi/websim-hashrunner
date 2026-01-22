import { createMiningWorker } from './crypto.js';

let miningWorkerPool = null;
let miningQueue = [];
let processingMining = false;

export function mineProofOfWork(commitment, difficulty) {
    return new Promise((resolve) => {
        // Add to queue
        miningQueue.push({ commitment, difficulty, resolve });
        
        // Process queue
        if (!processingMining) {
            processMiningQueue();
        }
    });
}

async function processMiningQueue() {
    if (miningQueue.length === 0) {
        processingMining = false;
        return;
    }
    
    processingMining = true;
    
    // Create worker if needed
    if (!miningWorkerPool) {
        miningWorkerPool = createMiningWorker();
    }
    
    const task = miningQueue.shift();
    
    miningWorkerPool.onmessage = (e) => {
        task.resolve(e.data); // {hash, nonce}
        processMiningQueue(); // Process next
    };
    
    miningWorkerPool.postMessage({
        id: Math.random(),
        prefix: task.commitment,
        difficulty: task.difficulty
    });
}

export function terminateMiningWorker() {
    if (miningWorkerPool) {
        miningWorkerPool.terminate();
        miningWorkerPool = null;
        miningQueue = [];
        processingMining = false;
    }
}