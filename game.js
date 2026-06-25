// Game constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const GROUND_LEVEL = CANVAS_HEIGHT - 100;
const GRAVITY = 0.6;

// Game variables
let canvas, ctx;
let player, enemies = [], score = 0, gameRunning = true;
let keys = {};
let mobileInput = { left: false, right: false, jump: false, attack: false };

// Player class
class Player {
    constructor() {
        this.x = 100;
        this.y = GROUND_LEVEL;
        this.width = 20;
        this.height = 40;
        this.velocityY = 0;
        this.velocityX = 0;
        this.speed = 5;
        this.isGrounded = false;
        this.health = 100;
        this.maxHealth = 100;
        this.isAttacking = false;
        this.attackCooldown = 0;
        this.facingRight = true;
    }

    update() {
        // Input handling
        let moveX = 0;
        if (keys['ArrowLeft'] || keys['a'] || mobileInput.left) moveX = -this.speed;
        if (keys['ArrowRight'] || keys['d'] || mobileInput.right) moveX = this.speed;

        this.velocityX = moveX;
        this.x += this.velocityX;

        // Gravity
        this.velocityY += GRAVITY;
        this.y += this.velocityY;

        // Ground collision
        if (this.y >= GROUND_LEVEL) {
            this.y = GROUND_LEVEL;
            this.velocityY = 0;
            this.isGrounded = true;
        } else {
            this.isGrounded = false;
        }

        // Jump
        if ((keys[' '] || mobileInput.jump) && this.isGrounded) {
            this.velocityY = -12;
            this.isGrounded = false;
            mobileInput.jump = false;
        }

        // Boundaries
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width;

        // Attack cooldown
        if (this.attackCooldown > 0) this.attackCooldown--;

        // Direction
        if (this.velocityX > 0) this.facingRight = true;
        if (this.velocityX < 0) this.facingRight = false;
    }

    attack() {
        if (this.attackCooldown <= 0) {
            this.isAttacking = true;
            this.attackCooldown = 20;

            // Check collision with enemies
            enemies.forEach(enemy => {
                if (this.isCollidingWith(enemy)) {
                    enemy.health -= 25;
                    score += 10;
                }
            });

            setTimeout(() => {
                this.isAttacking = false;
            }, 100);
        }
    }

    isCollidingWith(other) {
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            gameRunning = false;
        }
    }

    draw(ctx) {
        // Draw stick figure
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y);
        if (!this.facingRight) ctx.scale(-1, 1);

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.fillStyle = '#000';

        // Head
        ctx.beginPath();
        ctx.arc(0, 5, 5, 0, Math.PI * 2);
        ctx.fill();

        // Body
        ctx.beginPath();
        ctx.moveTo(0, 10);
        ctx.lineTo(0, 20);
        ctx.stroke();

        // Arms
        ctx.beginPath();
        ctx.moveTo(-8, 13);
        ctx.lineTo(8, 13);
        ctx.stroke();

        // Legs
        ctx.beginPath();
        ctx.moveTo(-3, 20);
        ctx.lineTo(-3, 30);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(3, 20);
        ctx.lineTo(3, 30);
        ctx.stroke();

        // Attack indicator
        if (this.isAttacking) {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.fillRect(-15, -5, 30, 40);
        }

        ctx.restore();
    }
}

// Enemy class
class Enemy {
    constructor(x) {
        this.x = x;
        this.y = GROUND_LEVEL;
        this.width = 20;
        this.height = 40;
        this.velocityY = 0;
        this.velocityX = 0;
        this.speed = 2;
        this.health = 50;
        this.attackCooldown = 0;
        this.direction = -1; // -1 for left, 1 for right
    }

    update(player) {
        // Simple AI - chase player
        if (player.x > this.x + 50) {
            this.velocityX = this.speed;
            this.direction = 1;
        } else if (player.x < this.x - 50) {
            this.velocityX = -this.speed;
            this.direction = -1;
        } else {
            this.velocityX = 0;
        }

        this.x += this.velocityX;

        // Gravity
        this.velocityY += GRAVITY;
        this.y += this.velocityY;

        if (this.y >= GROUND_LEVEL) {
            this.y = GROUND_LEVEL;
            this.velocityY = 0;
        }

        // Attack cooldown
        if (this.attackCooldown > 0) this.attackCooldown--;

        // Attack player
        if (this.isCollidingWith(player)) {
            if (this.attackCooldown <= 0) {
                player.takeDamage(10);
                this.attackCooldown = 60;
            }
        }
    }

    isCollidingWith(other) {
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }

    draw(ctx) {
        // Draw enemy stick figure (red)
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y);
        if (this.direction === 1) ctx.scale(-1, 1);

        ctx.strokeStyle = '#f00';
        ctx.lineWidth = 2;
        ctx.fillStyle = '#f00';

        // Head
        ctx.beginPath();
        ctx.arc(0, 5, 5, 0, Math.PI * 2);
        ctx.fill();

        // Body
        ctx.beginPath();
        ctx.moveTo(0, 10);
        ctx.lineTo(0, 20);
        ctx.stroke();

        // Arms
        ctx.beginPath();
        ctx.moveTo(-8, 13);
        ctx.lineTo(8, 13);
        ctx.stroke();

        // Legs
        ctx.beginPath();
        ctx.moveTo(-3, 20);
        ctx.lineTo(-3, 30);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(3, 20);
        ctx.lineTo(3, 30);
        ctx.stroke();

        ctx.restore();
    }
}

// Initialize game
function initGame() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    player = new Player();
    score = 0;
    gameRunning = true;
    enemies = [];

    // Setup mobile controls
    setupMobileControls();
    updateUI();
}

// Setup mobile controls
function setupMobileControls() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const mobileControls = document.getElementById('mobileControls');

    if (isMobile) {
        mobileControls.classList.remove('hidden');

        document.getElementById('leftBtn').addEventListener('touchstart', () => mobileInput.left = true);
        document.getElementById('leftBtn').addEventListener('touchend', () => mobileInput.left = false);

        document.getElementById('rightBtn').addEventListener('touchstart', () => mobileInput.right = true);
        document.getElementById('rightBtn').addEventListener('touchend', () => mobileInput.right = false);

        document.getElementById('jumpBtn').addEventListener('touchstart', () => mobileInput.jump = true);
        document.getElementById('jumpBtn').addEventListener('touchend', () => mobileInput.jump = false);

        document.getElementById('attackBtn').addEventListener('touchstart', () => player.attack());
    }
}

// Input handling
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (e.key === ' ') e.preventDefault();
    if (e.key === 'f') player.attack();
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

window.addEventListener('click', () => {
    player.attack();
});

// Update UI
function updateUI() {
    document.getElementById('healthValue').textContent = Math.max(0, player.health);
    document.getElementById('scoreValue').textContent = score;
}

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw ground
    ctx.fillStyle = '#8B7355';
    ctx.fillRect(0, GROUND_LEVEL, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_LEVEL);

    if (gameRunning) {
        // Update player
        player.update();
        player.draw(ctx);

        // Spawn enemies
        if (Math.random() < 0.01 && enemies.length < 5) {
            enemies.push(new Enemy(Math.random() > 0.5 ? 0 : CANVAS_WIDTH));
        }

        // Update and draw enemies
        for (let i = enemies.length - 1; i >= 0; i--) {
            enemies[i].update(player);
            enemies[i].draw(ctx);

            // Remove dead enemies
            if (enemies[i].health <= 0) {
                enemies.splice(i, 1);
                score += 50;
            }
        }

        updateUI();
    } else {
        // Game Over
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);
        ctx.font = '24px Arial';
        ctx.fillText(`Final Score: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
        ctx.fillText('Refresh page to play again', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 70);
    }

    requestAnimationFrame(gameLoop);
}

// Start game when page loads
window.addEventListener('load', () => {
    initGame();
    gameLoop();
});
