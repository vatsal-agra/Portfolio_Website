import pygame
BLACK = (0, 0, 0)

class Paddle(pygame.sprite.Sprite):

	def __init__(self, color, height, width):
		super().__init__()

		self.image = pygame.Surface([width, height])
		self.image.fill(BLACK)
		self.image.set_colorkey(BLACK)

		#now we draw the paddle

		pygame.draw.rect(self.image, color, [0, 0, width, height])

		self.rect = self.image.get_rect()

	def moveLeft(self, pixels):
		self.rect.x -= pixels
		#this checks if you arent going to off the screen
		if self.rect.x < 0:
			self.rect.x = pixels


	def moveRight(self, pixels):
		self.rect.x += pixels
		#this checks if you arent going to off the screen
		if self.rect.x > 600:
			self.rect.x = 580