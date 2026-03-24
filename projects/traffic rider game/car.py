import pygame
import random
WHITE = (225,225,225)
TRANSPARENT = ()

pygame.init()

class Car(pygame.sprite.Sprite):

    def __init__(self, color, width, height, speed):
        # call the parent class (sprite) constructor
        super().__init__()

        #pass in the color of the car, and its x and y position, width and height.
        #set the background color and set it to be transparent
        self.image = pygame.Surface([width,height])
        self.image.fill(WHITE)
        self.image.set_colorkey(WHITE)

        #initialize the attributes
        self.width=width
        self.height=height
        self.color = color
        self.speed = speed

        # draw the car (a rectangle!)
        #pygame.draw.rect(self.image,self.color, [0,0,self.width,self.height])

        #instead we could load a proper picture of a car...
        #self.image = pygame.image.load("car.png").convert_alpha()
        self.image = pygame.image.load("carh.png").convert_alpha()
        #fetch the rectangle oblect that has the dimensions of the image
        self.rect = self.image.get_rect()
        #self.dect = self.imagee.get_rect()

        #for event in pygame.event.get():
           # if event.type==pygame.KEYDOWN:
            #    if event.key==pygame.K_s:
             #       self.image = pygame.image.load("car.png").convert_alpha()
              #      self.rect = self.image.get_rect()


    def moveRight(self, pixels):
        self.rect.x += pixels

    def moveLeft(self, pixels):
        self.rect.x -= pixels

    def moveForward(self, speed):
        self.rect.y += self.speed * speed / 20
    	
    def moveBack(self, speed):
        self.rect.y -= self.speed * speed / 20

    def changeSpeed(self, speed):
        self.speed = speed

    def repaint(self, color):
        self.color = color
        pygame.draw.rect(self.image, self.color, [0, 0, self.width, self.height])

    def Crash():
        message_display("you crashed")
