##! /usr/bin/env python
import pygame
import random
import time
#lets import the car class
from car import Car
pygame.init()

#def __init__(self,color,width,height)

# define some colors
BLACK = (0,0,0)
WHITE = (255,255,255)
GREEN = (0,225,0)
RED = (255,0,0)
GREY = (128,128,128)
DARKGREEN = (34,139,34)
PURPLE = (225,0,225)
CYAN = (0, 225, 225)
BLUE = (100,100,100)
YELLOW = (225,225,0)
TRANSPARENT = ()

yes = ""

speed = 1
time = 600
#colorList = (carh.png, carhh.png)
 

SCREENWIDTH=300
SCREENHEIGHT=500

size = (SCREENWIDTH, SCREENHEIGHT)
screen = pygame.display.set_mode(size)
pygame.display.set_caption("arcade gaming")

#this will be a list that will contain all the sprites we intend to use in our game
all_sprites_list = pygame.sprite.Group()

playerCar = Car(TRANSPARENT, 10,10,10)
playerCar.rect.x = 120
playerCar.rect.y = SCREENHEIGHT - 100

Car1 = Car(TRANSPARENT, 1, 80, random.randint(100,150))
Car1.rect.x = random.randint(0,200)
Car1.rect.y = -100

Car2 = Car(TRANSPARENT,60, 80, random.randint(100,150))
Car2.rect.x = 300
Car2.rect.y = -100

Car3 = Car(TRANSPARENT, 60, 80, random.randint(20,70))
Car3.rect.x = 200
Car3.rect.y = -300

Car4 = Car(TRANSPARENT, 60, 80, random.randint(90,100))
Car4.rect.x = 100
Car4.rect.y = -900
#add the car to the list of objects

all_sprites_list.add(playerCar)
all_sprites_list.add(Car1)
all_sprites_list.add(Car2)
#all_sprites_list.add(Car3)
#all_sprites_list.add(Car4)

all_coming_cars = pygame.sprite.Group()
all_coming_cars.add(Car1)
all_coming_cars.add(Car2)
#all_coming_cars.add(Car3)
#all_coming_cars.add(Car4)

#the loop will carry on untill the user exits the game
carry0n = True
clock = pygame.time.Clock()
clock.tick(60)
pygame.time.wait(5000)
#----------------main program loop-----------------
while carry0n:
    
    #pygame.mixer.pre_init(frequency=44100, size=-16, channels=2, buffer=4096)
    #pygame.mixer.music.load('carsound.mp3')
    #pygame.mixer.music.play(-1) #-1 means loops for ever, 0 means play just once)
    for event in pygame.event.get(): # user did something
        if event.type==pygame.QUIT: # if user clicked close
            carry0n=False # flag that we are done so we exit this loop
        #if event.type==pygame.KEYDOWN:
        	#if event.key==pygame.K_s:
        	#	self.image=pygame.image.load("car.png").convert_alpha()
	     #  		self.rect=self.image.get_rect()
        elif event.type==pygame.KEYDOWN:
            if event.key==pygame.K_x: #pressing the x key will quit the game
            	carry0n=False
#
	       	#if event.key==pygame.K_s:
	       	#	carry0n = False
	       		

#

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        playerCar.moveLeft(5)
        time -= 1
    if keys[pygame.K_RIGHT]:
        playerCar.moveRight(5)
        time -= 1
    if keys[pygame.K_UP]:
        speed += 0.05
        time -= 1
    if keys[pygame.K_DOWN]:
        speed -= 0.05
        # += 1

    if playerCar.rect.x>=220:
        playerCar.moveLeft(2)

    if playerCar.rect.x<2:
        playerCar.moveRight(2)    
    #game logic
    for car in all_coming_cars:
        car.moveForward(speed)
        if car.rect.y > SCREENHEIGHT:
            car.changeSpeed(random.randint(100,140))
            car.rect.x = random.randint(0,200)

            #car.repaint(random.choice(colorList))
            car.rect.y = -100
    #CHECK IF THERE IS A CAR COLLISION
            car_collision_list = pygame.sprite.spritecollide(playerCar,all_coming_cars,False)
            for car in car_collision_list:
                screen.fill(BLACK)
                font = pygame.font.Font(None, 74)
                text = font.render("gameover", 1, WHITE)
                screen.blit(text, (30,100))
                pygame.display.flip()
                pygame.time.wait(2000)
                font = pygame.font.Font(None, 74)                #end of game
                carry0n=False
    all_sprites_list.update()
    
    #drwing on the screen
    screen.fill(GREEN)

    #then you can draw different shapes and lines or add text to your background stage.
    r1 = pygame.draw.rect(screen, GREY, [2,0,100,500])
    pygame.draw.rect(screen, GREY, [100,0,100,500])
    pygame.draw.line(screen, WHITE, [200,0], [200,500], 5)
    pygame.draw.line(screen, WHITE, [305,0], [305,500], 5)
    r2 = pygame.draw.rect(screen, GREY, [203,0,95,500])
    #pygame.draw.rect(screen, GREY, [308,0,100,500],0)
    #pygame.draw.line(screen, WHITE, [408,0], [408,500], 5)
    #pygame.draw.rect(screen, GREY, [411,0,100,500],0)
    #pygame.draw.line(screen, WHITE, [510,0], [510,500], 5)
    pygame.draw.line(screen, WHITE, [100,0], [100,500], 5)

    # making the time display
    font = pygame.font.Font(None, 34)
    text = font.render("Meters:"+ str(time), 1, WHITE)
    screen.blit(text, (525,10))

    if time == 0:

        screen.fill(BLACK)

        font = pygame.font.Font(None, 74)
        text = font.render("Congrats!", 1, WHITE)
        screen.blit(text, (30,100))
        pygame.display.flip()
        pygame.time.wait(1000)

        '''font = pygame.font.Font(None, 54)
        text = font.render("    You have covered 600 meters", 1, WHITE)
        screen.blit(text, (0,100))
        pygame.display.flip()
        pygame.time.wait(3000)
        carry0n = False
        break'''
    
    #now lets draw all the sprites in one go. (for now we only have 1 sprite)
    all_sprites_list.draw(screen)

    # ---go ahead and update the screen with what we've drawn.
    pygame.display.flip()

    #--- limiit to 60 frames per second
    clock.tick(60)

#once we have exited the main program loop we can stop the game engine:
pygame.quit()
