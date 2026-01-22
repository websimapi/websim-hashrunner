import { GAME_CONSTANTS } from './engine.js';

export const renderFrame = (canvas, state, lastHash) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const c = GAME_CONSTANTS;

    // Clear
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Grid
    ctx.strokeStyle = '#18181b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for(let x=0; x<canvas.width; x+=50) { ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); }
    for(let y=0; y<canvas.height; y+=50) { ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); }
    ctx.stroke();

    // Hash Stream Background
    if (lastHash) {
        ctx.fillStyle = '#10b981';
        ctx.font = '10px "Space Mono"';
        ctx.textAlign = 'right';
        ctx.globalAlpha = 0.05;
        const hash = lastHash;
        for(let i=0; i<12; i++) {
            ctx.fillText(hash.substring(i*4, i*4+64), canvas.width - 20, 80 + i * 20);
        }
        ctx.globalAlpha = 1.0;
    }

    // Ground
    ctx.fillStyle = '#18181b';
    ctx.fillRect(0, c.GROUND_Y, canvas.width, canvas.height - c.GROUND_Y);
    // Neon Ground Line
    ctx.fillStyle = '#10b981';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#10b981';
    ctx.fillRect(0, c.GROUND_Y, canvas.width, 2);
    ctx.shadowBlur = 0;

    // Player
    const p = state.player;
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(255,255,255,0.4)';
    
    ctx.beginPath();
    ctx.roundRect(c.PLAYER_X, p.y - p.height, p.width, p.height, 4);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Visor
    ctx.fillStyle = '#09090b';
    ctx.fillRect(c.PLAYER_X + 20, p.y - p.height + 12, 6, 4);

    // Obstacles
    state.obstacles.forEach(obs => {
        const isFlying = obs.type === 'flying';
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = isFlying ? 'rgba(236, 72, 153, 0.5)' : 'rgba(245, 158, 11, 0.5)';
        ctx.fillStyle = isFlying ? '#db2777' : '#d97706';
        
        ctx.beginPath();
        ctx.roundRect(obs.x, obs.y - obs.h, obs.w, obs.h, 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Detail
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(obs.x + 4, obs.y - obs.h + 4, obs.w - 8, obs.h - 8);
    });
};