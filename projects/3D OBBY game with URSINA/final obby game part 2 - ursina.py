#! /usr/bin/env python
from ursina import *
from ursina.prefabs.first_person_controller import FirstPersonController

#first obby(green color)
class Voxel(Button):
	def __init__(self, position):
		super().__init__(
			parent = scene,
			position = position,
			model = 'cube',
			origin_y = 0.5,
			texture = 'white_cube',
			color = color.green)


	def input(self, key):
		if self.hovered:
			if key == 'x':
				quit()

#second obby(red color)
class voxelred(Button):
	def __init__(self,position):
		super().__init__(
			parent = scene,
			position = position,
			model = 'cube',
			origin_y = 0.5,
			texture = 'white cube',
			color = color.orange)

	def input(self,key):
		if self.hovered:
			if key == 'x':
				quit()

#third obby(blue color)
class voxelblue(Button):
	def __init__(self,position):
		super().__init__(
			parent = scene,
			position = position,
			model = 'cube',
			origin_y = 0.5,
			texture = 'white cube',
			color = color.pink)

	def input(self,key):
		if self.hovered:
			if key == 'x':
				quit()


#fourth obby(purple)
class voxelpurp(Button):
	def __init__(self,position):
		super().__init__(
			parent = scene,
			position = position,
			model = 'cube',
			origin_y = 0.5,
			texture = 'whitecube',
			color = color.yellow)

	def input(self,key):
		if self.hovered:
			if key == 'x':
				quit()


#this is the white blocks on each platform
class voxelend(Button):
	def __init__(self, position):
		super().__init__(
			parent = scene,
			position = position,
			model = 'cube',
			origin_y = 0.5,
			texture = 'white cube',
			color = color.white)

#this is the black blocks on each platform
class voxelend2(Button):
	def __init__(self, position):
		super().__init__(
			parent = scene,
			position = position,
			model = 'cube',
			origin_y = 0.5,
			texture = 'white cube',
			color = color.black)

#this is the surprise block in the very first platform
class voxelfiend(Button):
	def __init__(self, position):
		super().__init__(
			parent = scene,
			position = position,
			model = 'cube',
			origin_y = 0.5,
			texture = 'white cube',
			color = color.white,
			highlight_color = color.orange)

#this opens up the second obby
	def input(self, key):
		if self.hovered:
			if key == 'left mouse down':	
				voxel = voxelred(position = (24,-2,24))
				voxel = voxelred(position = (26,0,27))
				voxel = voxelred(position = (23,2,28))
				voxel = voxelred(position = (25,3,30))
				voxel = voxelred(position = (26,-2,36))
				voxel = voxelred(position = (27,0,38))
				voxel = voxelred(position = (28,-1,40))

				txt = Text(text = 'level 1 complete', x=0.6,y=0.48, color = color.orange)

#this is the centre block in the second platform
class voxelfiend2(Button):
	def __init__(self, position):
		super().__init__(
			parent = scene,
			position = position,
			model = 'cube',
			origin_y = 0.5,
			texture = 'white cube',
			color = color.white,
			highlight_color = color.pink)

#this opens the third
	def input(self, key):
		if self.hovered:
			if key == 'left mouse down':	
				voxel = voxelblue(position = (30,-1,42))
				voxel = voxelblue(position = (28,0,43))
				voxel = voxelblue(position = (26,1,44))
				voxel = voxelblue(position = (24,1,44))
				voxel = voxelblue(position = (21,-2,41))
				voxel = voxelblue(position = (19,-1,39))
				voxel = voxelblue(position = (17,-1,37))
				voxel = voxelblue(position = (15,1,39))
				voxel = voxelblue(position = (13,-2,34))
				voxel = voxelblue(position = (11,-1,31))
				voxel = voxelblue(position = (10,0,29))
				voxel = voxelblue(position = (8,-1,29))
				#voxel = voxelblue(position = (6,0,29))

				txt = Text(text = 'level 2 complete', x=0.6,y=0.44, color = color.pink)


#this is the centre block in the third platform
class voxelfiend3(Button):
	def __init__(self, position):
		super().__init__(
			parent = scene,
			position = position,
			model = 'cube',
			origin_y = 0.5,
			texture = 'white cube',
			color = color.white,
			highlight_color = color.yellow)
#this opens up the fourth obby
	def input(self, key):
		if self.hovered:
			if key == 'left mouse down':	
				voxel = voxelpurp(position = (2,-1,26))
				voxel = voxelpurp(position = (0,0,24))
				voxel = voxelpurp(position = (2,1,22))
				voxel = voxelpurp(position = (-1,2,20))
				voxel = voxelpurp(position = (-3,1,18))
				voxel = voxelpurp(position = (-2,2,16))
				voxel = voxelpurp(position = (0,3,14))
				voxel = voxelpurp(position = (2,2,12))
				voxel = voxelpurp(position = (0,3,10))
				voxel = voxelpurp(position = (-2,4,8))
				voxel = voxelpurp(position = (-3,5,6))
				voxel = voxelpurp(position = (-1,4,3))
				#voxel = voxelpurp(position = (1,5,3))

				txt = Text(text = 'level 3 complete', x=0.6,y=0.40, color = color.yellow)

	
#this is the centre block in the fourth platform			
class voxelfiend4(Button):
	def __init__(self, position):
		super().__init__(
			parent = scene,
			position = position,
			model = 'cube',
			origin_y = 0.5,
			texture = 'white cube',
			color = color.white,
			highlight_color = color.green)

	def input(self, key):
		if self.hovered:
			if key == 'left mouse down':
				txt = Text(text = 'wow!!!!!,    congratulations',scale=3,x=-.4,y=.1, color=color.red)
				txt = Text(text = 'you just finished the hardest obby',scale=3,x=-.5,y=-.1, color=color.red)

				txt = Text(text = 'level 4 complete', x=0.6,y=0.36, color = color.green)
				txt = Text(text = 'wow you won! good job!:)', x=0.5,y=0.32, color = color.green)


#these are the fake white blocks in the first platform
class voxelfool(Button):
	def __init__(self, position):
		super().__init__(
			parent = scene,
			position = position,
			model = 'cube',
			origin_y = 0.5,
			texture = 'white_cube',
			color = color.white,
			highlight_color = color.yellow)

#this opens up the first obby
class voxelstart(Button):
	def __init__(self, position):
		super().__init__(
			parent = scene,
			position = position,
			model = 'cube',
			origin_y = 0.5,
			texture = 'white_cube',
			color = color.white,
			highlight_color = color.lime)

#this opens up the first obby
	def input(self, key):
		if self.hovered:
			if key == 'left mouse down':	
				voxel = Voxel(position = (4,1,1))
				voxel = Voxel(position = (7,2,3))
				voxel = Voxel(position = (8,3,7))
				voxel = Voxel(position = (11,2,10))
				voxel = Voxel(position = (14,3,13))
				voxel = Voxel(position = (16,5,15))

			if key == 'right mouse down':
				voxel = Voxel(position = (5,2,2))
				voxel = Voxel(position = (6,3,4))
				voxel = Voxel(position = (9,4,7))
				voxel = Voxel(position = (10,3,11))
				voxel = Voxel(position = (13,4,14))
				voxel = Voxel(position = (16,5,15))
		
app = Ursina()

for z in range(3):
	for x in range(3):
		voxel = Voxel(position = (x,0,z))


#how to play texts
txt = Text(text = '1)you have to reach the other platform', x = -.87, y = .5)
txt = Text(text = '2)try clicking on the white box around you', x = -.87, y = .46)
txt = Text(text = '3)one of those white boxes is a button for opening a obby', x = -.87, y = .42)
txt = Text(text = '4)find that one white box click on it the obby will appear', x = -.87, y = .38)
txt = Text(text = '5)complete the obby, reach the other platform', x = -.87, y = .34)
txt = Text(text = '6)incase you fall down press "f5" to restart', x = -.87, y = .30)
txt = Text(text = '7)stand in the hole on the other platform ', x = -.87, y = .26)
txt = Text(text = '8)then click on the box you are standing on, and woohoo!!', x = -.87, y = .22)

#positions of the fake white blocks in the first platform
voxel = voxelfool(position = (0,0,3))
voxel = voxelfool(position = (-1,0,3))
voxel = voxelfool(position = (-1,0,2))
voxel = voxelfool(position = (-1,0,1))
voxel = voxelfool(position = (-1,0,0))
voxel = voxelfool(position = (-1,0,-1))
voxel = voxelfool(position = (0,0,-1))
voxel = voxelfool(position = (1,0,-1))
voxel = voxelfool(position = (2,0,-1))
voxel = voxelfool(position = (3,0,-1))
voxel = voxelfool(position = (3,0,0))
voxel = voxelfool(position = (3,0,1))
voxel = voxelfool(position = (3,0,2))
voxel = voxelfool(position = (3,0,3))
voxel = voxelfool(position = (2,0,3))

#position of all the white blocks around the bases
voxel = voxelend(position = (20,0,20))
voxel = voxelend(position = (22,0,22))
voxel = voxelend(position = (22,0,20))
voxel = voxelend(position = (20,0,22))
voxel = voxelend(position = (20,-1,20))
voxel = voxelend(position = (22,-1,22))
voxel = voxelend(position = (22,-1,20))
voxel = voxelend(position = (20,-1,22))

voxel = voxelend(position = (30,0,40))
voxel = voxelend(position = (32,0,40))
voxel = voxelend(position = (30,0,42))
voxel = voxelend(position = (32,0,42))
voxel = voxelend(position = (30,-1,40))
voxel = voxelend(position = (32,-1,40))
voxel = voxelend(position = (30,-1,42))
voxel = voxelend(position = (32,-1,42))

voxel = voxelend(position = (4,0,28))
voxel = voxelend(position = (6,0,28))
voxel = voxelend(position = (4,0,30))
voxel = voxelend(position = (6,0,30))
voxel = voxelend(position = (4,-1,28))
voxel = voxelend(position = (6,-1,28))
voxel = voxelend(position = (4,-1,30))
voxel = voxelend(position = (6,-1,30))

voxel = voxelend(position = (1,6,1))
voxel = voxelend(position = (1,6,3))
voxel = voxelend(position = (0,6,2))
voxel = voxelend(position = (2,6,2))


#position of all the black blocks around the platforms
voxel = voxelend2(position = (21,0,20))
voxel = voxelend2(position = (20,0,21))
voxel = voxelend2(position = (21,0,22))
voxel = voxelend2(position = (22,0,21))
voxel = voxelend2(position = (21,-1,20))
voxel = voxelend2(position = (20,-1,21))
voxel = voxelend2(position = (21,-1,22))
voxel = voxelend2(position = (22,-1,21))

voxel = voxelend2(position = (31,0,40))
voxel = voxelend2(position = (31,0,42))
voxel = voxelend2(position = (30,0,41))
voxel = voxelend2(position = (32,0,41))
voxel = voxelend2(position = (31,-1,40))
voxel = voxelend2(position = (31,-1,42))
voxel = voxelend2(position = (30,-1,41))
voxel = voxelend2(position = (32,-1,41))

voxel = voxelend2(position = (4,0,29))
voxel = voxelend2(position = (6,0,29))
voxel = voxelend2(position = (5,0,28))
voxel = voxelend2(position = (5,0,30))
voxel = voxelend2(position = (4,-1,29))
voxel = voxelend2(position = (6,-1,29))
voxel = voxelend2(position = (5,-1,28))
voxel = voxelend2(position = (5,-1,30))

voxel = voxelend2(position = (0,6,1))
voxel = voxelend2(position = (0,6,3))
voxel = voxelend2(position = (2,6,1))
voxel = voxelend2(position = (2,6,3))
#voxel = voxelend2(position = (1,5,2))

#position of all the surprise blocks on each platform
voxel = voxelfiend(position = (21,-1,21))
voxel = voxelfiend2(position = (31,-1,41))
voxel = voxelfiend3(position = (5,-1,29))
voxel = voxelfiend4(position = (1,6,2))

voxel = voxelstart(position = (1,0,3))
voxel = voxelstart(position = (1,0,3))
voxel = voxelstart(position = (1,0,3))
voxel = voxelstart(position = (1,0,3))
voxel = voxelstart(position = (1,0,3))


#if click(voxel5):
#	voxel = Voxel(position = (4,4,1))

player = FirstPersonController()

app.run()