namespace SpriteKind {
    export const PowerUP = SpriteKind.create()
    export const Mode = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 9 9 9 9 . . . . 
        . . . . . . 9 9 9 9 5 9 . . . . 
        . 9 9 9 9 9 9 9 5 5 9 9 . . . . 
        . . . . . . . 9 9 9 9 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
    if (doublefireMode && doublefireMode.lifespan > 0) {
        projectile.y += -5
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 9 9 9 9 . . . . 
            . . . . . . 9 9 9 9 5 9 . . . . 
            . 9 9 9 9 9 9 9 5 5 9 9 . . . . 
            . . . . . . . 9 9 9 9 . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 200, 0)
        projectile.y += 5
    }
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    enemyDeath(status.spriteAttachedTo())
})
function enemyDeath (enemy: Sprite) {
    enemy.destroy(effects.disintegrate, 500)
    if (Math.percentChance(10)) {
        powerUp = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . 8 8 8 8 8 8 8 . . . . 
            . . . . 8 7 7 7 7 7 7 7 8 . . . 
            . . . 8 8 7 7 7 7 7 7 7 8 8 . . 
            . . 8 8 8 7 7 8 8 8 7 7 8 8 8 . 
            . . 8 8 8 7 7 8 8 8 7 7 8 8 8 . 
            . . 8 8 8 7 7 8 8 8 7 7 8 8 8 . 
            . . 8 8 8 7 7 7 7 7 7 7 8 8 8 . 
            . . 8 8 8 7 7 7 7 7 7 7 8 8 8 . 
            . . 8 8 8 7 7 8 8 8 8 8 8 8 8 . 
            . . 8 8 8 7 7 8 8 8 8 8 8 8 8 . 
            . . . 8 8 7 7 8 8 8 8 8 8 8 . . 
            . . . . 8 8 8 8 8 8 8 8 8 . . . 
            . . . . . 8 8 8 8 8 8 8 . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.PowerUP)
        powerUp.x = enemy.x
        powerUp.y = enemy.y
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUP, function (sprite, otherSprite) {
    doublefireMode = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 9 9 9 9 . . . 
        . . . . . . . 9 9 9 9 5 9 . . . 
        . . 9 9 9 9 9 9 9 5 5 9 9 . . . 
        . . . . . . . . 9 9 9 9 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 9 9 9 9 . . . 
        . . . . . . . 9 9 9 9 5 9 . . . 
        . . 9 9 9 9 9 9 9 5 5 9 9 . . . 
        . . . . . . . . 9 9 9 9 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Mode)
    doublefireMode.setPosition(48, 7)
    doublefireMode.lifespan = 10000
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -15
    info.changeScoreBy(1)
    if (info.score() >= 100) {
        level = 2
        game.showLongText("Congrats you have reached Level 2", DialogLayout.Full)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    enemyDeath(otherSprite)
})
let statusbar: StatusBarSprite = null
let enemyShip: Sprite = null
let powerUp: Sprite = null
let doublefireMode: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
let level = 0
effects.starField.startScreenEffect()
game.showLongText("Welcome to Star Wars Game. By Aadinath Sukesh. Press \"A' button to go to next screen", DialogLayout.Full)
game.showLongText("Keyboard shortcuts-Arrow keys to Move, To Fire -Q or A button ", DialogLayout.Full)
level = 1
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    4 4 4 4 4 4 4 2 2 2 2 2 2 . . . 
    4 4 4 4 4 4 4 4 2 2 . . . . . . 
    4 4 4 4 4 4 4 4 4 2 . . . . . . 
    4 4 4 4 4 4 4 4 4 4 4 . . . . . 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 . . . . . 
    4 4 4 4 4 4 4 4 4 2 . . . . . . 
    4 4 4 4 4 4 4 4 2 2 . . . . . . 
    4 4 4 4 4 4 4 2 2 2 2 2 2 . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 100)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(20)
let enemySpeed = 20
let enemySpawnTime = 2000
if (info.score() >= 100) {
    level = 2
    game.showLongText("Congrats you have reached Level 2", DialogLayout.Full)
    effects.starField.startScreenEffect()
    mySprite = sprites.create(img`
        ....ffffff.........ccc..
        ....ff22ccf.......cc4f..
        .....ffccccfff...cc44f..
        ....cc24442222cccc442f..
        ...c9b4422222222cc422f..
        ..c999b2222222222222fc..
        .c2b99111b222222222c22c.
        c222b111992222ccccccc22f
        f222222222222c222ccfffff
        .f2222222222442222f.....
        ..ff2222222cf442222f....
        ....ffffffffff442222c...
        .........f2cfffc2222c...
        .........fcc2ffffffff...
        ..........fc2ffff.......
        ...........fffff........
        `, SpriteKind.Player)
    controller.moveSprite(mySprite, 100, 100)
    mySprite.setFlag(SpriteFlag.StayInScreen, true)
    info.setLife(10)
    enemySpeed = 10
    enemySpawnTime = 2000
}
game.onUpdateInterval(5000, function () {
    enemySpeed += 5
    enemySpeed = Math.min(enemySpeed, 50)
    enemySpawnTime += -200
    enemySpawnTime = Math.max(enemySpawnTime, 500)
})
forever(function () {
    if (level == 1) {
        enemyShip = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 2 2 . . . . . . 
            . . . . . . . . 3 2 . . . . . . 
            . . . . . . . . 3 2 4 . . . . . 
            . . . . . . . 3 3 2 . . . . . . 
            . . . . . . . 3 2 2 . . . . . . 
            . . . . . . 3 2 2 2 . . . . . . 
            . . . . . 3 3 2 2 2 . . . . . . 
            . . . 2 3 3 2 2 2 2 . . . . . . 
            . . 2 2 2 2 2 2 2 2 . . . . . . 
            . . . . . 3 2 2 2 2 . . . . . . 
            . . . . . 3 3 2 2 2 . . . . . . 
            . . . . . . . 3 3 2 4 . . . . . 
            . . . . . . . . 3 2 . . . . . . 
            . . . . . . . . . 2 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        enemyShip.x = scene.screenWidth()
        enemyShip.vx = 0 - enemySpeed
        enemyShip.y = randint(10, scene.screenHeight() - 10)
        statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
        statusbar.setColor(5, 12)
        statusbar.max = 100
        statusbar.attachToSprite(enemyShip)
        pause(enemySpawnTime)
    } else if (level == 2) {
        enemyShip = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 2 2 . . . . . . 
            . . . . . . . . 3 2 . . . . . . 
            . . . . . . . . 3 2 4 . . . . . 
            . . . . . . . 3 3 2 . . . . . . 
            . . . . . . . 3 2 2 . . . . . . 
            . . . . . . 3 2 2 2 . . . . . . 
            . . . . . 3 3 2 2 2 . . . . . . 
            . . . 2 3 3 2 2 2 2 . . . . . . 
            . . 2 2 2 2 2 2 2 2 . . . . . . 
            . . . . . 3 2 2 2 2 . . . . . . 
            . . . . . 3 3 2 2 2 . . . . . . 
            . . . . . . . 3 3 2 4 . . . . . 
            . . . . . . . . 3 2 . . . . . . 
            . . . . . . . . . 2 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        enemyShip.x = scene.screenWidth()
        enemyShip.vx = 0 - enemySpeed
        enemyShip.y = randint(10, scene.screenHeight() - 10)
        statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
        statusbar.setColor(5, 12)
        statusbar.max = 100
        statusbar.attachToSprite(enemyShip)
        pause(enemySpawnTime)
    }
})
