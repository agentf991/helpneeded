let player: Sprite = null
let enemies: Sprite[] = []
let score = 0
let game_over = false

function spawnEnemy() {
    let enemy = sprites.create(img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    enemy.setPosition(Math.randomRange(0, scene.screenWidth()), 0)
    enemy.setVelocity(0, 50)
    enemies.push(enemy)
}

function updateScore() {
    score += 1
    game.splash("Score: " + score)
}

function gameover() {
    game_over = true
    game.splash("Game Over!")
}

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    player.vx = -50
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    player.vx = 50
})

function init() {
    player = sprites.create(img`
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . 
        . . . . .
`, SpriteKind.Player)
    player.setPosition(scene.screenWidth() / 2, scene.screenHeight() - 50)
    player.setVelocity(0, 0)

    game.onUpdate(function () {
        if (game_over) {
            return
        }

        if (Math.percentChance(5)) {
            spawnEnemy()
        }

        for (let enemy of enemies) {
            if (enemy.bottom > scene.screenHeight()) {
                gameover()
                return
            }

            if (enemy.overlapsWith(player)) {
                gameover()
                return
            }
        }

        if (controller.left.isPressed()) {
            player.vx = -50
        } else if (controller.right.isPressed()) {
            player.vx = 50
        } else {
            player.vx = 0
        }
    })}