#hangman day 5
import turtle
from tkinter import *
import tkinter as tk
import random
import time

root = Tk()
root.geometry("350x320+0+0")
root.title("hangman")
correct = 0
lives = 0
nhints = 0


def Done():
	global num
	global num2
	num = word.get()
	num2 = num
	lets = len(num)
	#print(lets)
	#print(hint)
	turtle.Screen().bgcolor("deep pink")
	turtle.penup()
	turtle.goto(-200,-90)
	turtle.pendown()
	for i in range(lets):
		turtle.forward(20)
		turtle.penup()
		turtle.forward(15)
		turtle.pendown()



	guess = Tk()
	guess.geometry("350x410+0+0")
	guess.title("guess the word")

	Topg = Frame(guess, width = 400, height=600, bg = "black", relief = SUNKEN)
	Topg.pack(side=TOP)


	lblInfo = Label(Topg, font = ('arial', 20, 'bold'), text="GUESS THE LETTER",bg = "black", fg="deep pink",bd=40, anchor='w')
	lblInfo.grid(row=0,column=0)

	gletter = StringVar()

	gword = Entry(Topg, font = ('arial', 15, 'bold'), textvariable=gletter,bd=40,insertwidth = 2,
		bg = "powder blue", justify="center")
	gword.grid(row=2,column=0)

	
	def hintd():
		global correct
		global lives
		global nhints
		global num
		global num2
		#print(lives)
		hint = random.choice(num2)
		if hint != "_":
			clet = num.find(hint)
			letters = len(num)
			num2 = num2.replace(hint, '_', 1)
			
			if clet >= 0 and correct < lets and letters >= 5 and nhints <= 2:
				turtle.penup()
				turtle.goto(-200, -90)
			#turtle.right()
				for i in range(clet):
					turtle.forward(20)
					turtle.penup()
					turtle.forward(15)
					turtle.pendown()
				turtle.write(hint, font= ("verdena", 25, "normal"))
				time.sleep(1)
				turtle.undo()
				nhints += 1

			if clet >= 0 and correct < lets and letters <= 4 and nhints < 1:
				turtle.penup()
				turtle.goto(-200, -90)
			#turtle.right()
				for i in range(clet):
					turtle.forward(20)
					turtle.penup()
					turtle.forward(15)
					turtle.pendown()
				turtle.write(hint, font= ("verdena", 25, "normal"))
				time.sleep(1)
				turtle.undo()
				nhints += 1
		else:
			hintd()


	def Clet():
		global correct
		global lives
		global num
		global num2
		#print(lives)
		clet = num.find(gword.get())
		
		if clet >= 0 and correct < lets:
			turtle.penup()
			turtle.goto(-200, -90)
		#turtle.right()
			for i in range(clet):
				turtle.forward(20)
				turtle.penup()
				turtle.forward(15)
				turtle.pendown()
			turtle.write(gword.get(), font= ("verdena", 25, "normal"))
			num = num.replace(gword.get(), '_', 1)
			num2 = num2.replace(gword.get(), '_', 1)
			#print(num)			
			correct += 1

		if clet >= 0 and correct >= lets:
			turtle.penup()
			turtle.goto(-200, 190)
			turtle.Screen().bgcolor("black")
			turtle.pencolor("white")
			turtle.write("CONGRATS", font = ("verdena", 50, "normal"))

		elif clet < 0 and lives == 0:
			turtle.penup()
			turtle.goto(0, 175)
			turtle.pendown()
			turtle.circle(40)
			lives = 1
			#print(lives)

		elif clet < 0 and lives == 1:
			turtle.penup()
			turtle.goto(0, 175)
			turtle.right(90)
			turtle.pendown()
			turtle.forward(100)
			turtle.left(90)
			lives = lives+1

		elif clet < 0 and lives == 2:
			turtle.penup()
			turtle.goto(0, 75)
			turtle.left(90)
			turtle.pendown()
			turtle.forward(80)
			turtle.right(45)
			turtle.forward(50)
			turtle.right(45)
			lives = lives+1

		elif clet < 0 and lives == 3:
			turtle.penup()
			turtle.goto(0, 155)
			turtle.left(135)
			turtle.pendown()
			turtle.forward(60)
			turtle.left(225)
			lives = lives+1

		elif clet < 0 and lives == 4:
			turtle.penup()
			turtle.goto(0, 105)
			turtle.right(45)
			turtle.pendown()
			turtle.forward(50)
			turtle.left(45)
			
			lives = lives+1

		elif clet < 0 and lives == 5:
			turtle.penup()
			turtle.goto(0, 105)
			turtle.left(225)
			turtle.pendown()
			turtle.forward(50)
			turtle.right(225)
			lives = lives+1

		if lives == 6:
			turtle.penup()
			turtle.goto(-200, 190)
			turtle.Screen().bgcolor("black")
			turtle.pencolor("white")
			turtle.write("YOU LOST :(", font = ("verdena", 50, "normal"))




	done = Button(Topg, padx=16, pady=16, bd = 8, fg = "deep pink",bg = "grey15",activebackground='grey10',activeforeground = "deep pink3", font = ('arial',20, 'bold'),
		text = "done", command = Clet)
	done.grid(row=3,column=0)

	hintb = Button(Topg, padx=16, pady=16, bd = 8, fg = "deep pink",bg = "grey15",activebackground='grey10',activeforeground = "deep pink3", font = ('arial',20, 'bold'),
		text = "hint?", command = hintd)
	hintb.grid(row=4,column=0)

	root.mainloop()




Tops = Frame(root, width = 300, height=600, bg = "black", relief = SUNKEN)
Tops.pack(side=TOP)


lblInfo = Label(Tops, font = ('arial', 20, 'bold'), text="ENTER YOUR WORD",bg = "black", fg="deep pink",bd=42, anchor='w')
lblInfo.grid(row=1,column=0)

word = StringVar()

word = Entry(Tops, font = ('arial', 15, 'bold'), textvariable=word,bd=40,insertwidth = 2,
	bg = "powder blue", show = "?" ,justify="center")
word.grid(row=2,column=0)



done = Button(Tops, padx=16, pady=16, bd = 10, fg = "deep pink",bg = "grey15",activebackground='grey10',activeforeground = "deep pink3", font = ('arial',20, 'bold'),
	text = "done", command = Done)
done.grid(row=4,column=0)





root.mainloop()

#ideas to add:

'''
difficulty by making 3 list of numerous words names basic , hard, insane, impossible can also be altered with number of letters
add a how to play button in the start
add more lives by making the stand on which the man is hanged
'''