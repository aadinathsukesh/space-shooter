@namespace
class SpriteKind:
    PowerUP = SpriteKind.create()
    Mode = SpriteKind.create()

def on_a_pressed():
    global projectile
    projectile = sprites.create_projectile_from_sprite(img("""
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
        """),
        mySprite,
        200,
        0)
    if doublefireMode and doublefireMode.lifespan > 0:
        projectile.y += -5
        projectile = sprites.create_projectile_from_sprite(img("""
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
            """),
            mySprite,
            200,
            0)
        projectile.y += 5
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_zero(status):
    enemyDeath(status.sprite_attached_to())
statusbars.on_zero(StatusBarKind.enemy_health, on_on_zero)

def enemyDeath(enemy: Sprite):
    global powerUp
    enemy.destroy(effects.disintegrate, 500)
    if Math.percent_chance(10):
        powerUp = sprites.create(img("""
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
            """),
            SpriteKind.PowerUP)
        powerUp.x = enemy.x
        powerUp.y = enemy.y

def on_on_overlap(sprite, otherSprite):
    global doublefireMode
    doublefireMode = sprites.create(img("""
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
        """),
        SpriteKind.Mode)
    doublefireMode.set_position(48, 7)
    doublefireMode.lifespan = 10000
    otherSprite.destroy()
sprites.on_overlap(SpriteKind.player, SpriteKind.PowerUP, on_on_overlap)

def on_on_overlap2(sprite, otherSprite):
    sprite.destroy()
    statusbars.get_status_bar_attached_to(StatusBarKind.enemy_health, otherSprite).value += -15
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap2)

def on_on_overlap3(sprite, otherSprite):
    info.change_life_by(-1)
    scene.camera_shake(4, 500)
    enemyDeath(otherSprite)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap3)

statusbar: StatusBarSprite = None
enemyShip: Sprite = None
powerUp: Sprite = None
doublefireMode: Sprite = None
projectile: Sprite = None
mySprite: Sprite = None
effects.star_field.start_screen_effect()
game.splash("Welcome to Star Wars, Press 'A'")
game.splash("Keyboard shortcuts", "To move-Arrow keys, To fire 'Q\"")
mySprite = sprites.create(img("""
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
    """),
    SpriteKind.player)
controller.move_sprite(mySprite, 100, 100)
mySprite.set_flag(SpriteFlag.STAY_IN_SCREEN, True)
info.set_life(5)
enemySpeed = 20
enemySpawnTime = 2000

def on_update_interval():
    global enemySpeed, enemySpawnTime
    enemySpeed += 5
    enemySpeed = min(enemySpeed, 50)
    enemySpawnTime += -200
    enemySpawnTime = max(enemySpawnTime, 500)
game.on_update_interval(5000, on_update_interval)

def on_forever():
    global enemyShip, statusbar
    enemyShip = sprites.create(img("""
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
        """),
        SpriteKind.enemy)
    enemyShip.x = scene.screen_width()
    enemyShip.vx = 0 - enemySpeed
    enemyShip.y = randint(10, scene.screen_height() - 10)
    statusbar = statusbars.create(15, 2, StatusBarKind.enemy_health)
    statusbar.set_color(5, 12)
    statusbar.max = 100
    statusbar.attach_to_sprite(enemyShip)
    pause(enemySpawnTime)
forever(on_forever)
