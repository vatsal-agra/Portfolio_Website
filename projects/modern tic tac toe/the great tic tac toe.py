import tkinter.messagebox
from tkinter import*

root = Tk()
root.geometry("1350x750+0+0")
root.title("Tic Tac Toe")
root.configure(background ='cadet blue')

Tops = Frame(root,bg = 'powder blue', pady = 2, width = 1350, height =100,relief = RIDGE)
Tops.grid(row=0, column=0)

lblTitle = Label(Tops,font=('arial',50,"bold"), text="The Great Tic Tac Toe", bd=21, bg='cadet blue',fg='cornsilk',justify=CENTER)
lblTitle.grid(row=0, column=0)

Mainframe = Frame(root,bg = 'powder blue', pady = 2, width = 1350, height =100,relief = RIDGE)
Mainframe.grid(row=1, column=0)

Leftframe = Frame(Mainframe,bd=10, width = 750, height = 500,pady=2, padx=10, bg ="cadet blue",relief=RIDGE)
Leftframe.pack(side=LEFT)

Rightframe = Frame(Mainframe,bd=10, width = 560, height = 500,pady=2, padx=10, bg ="cadet blue",relief=RIDGE)
Rightframe.pack(side=RIGHT)

Rightframe1 = Frame(Rightframe,bd=10, width = 560, height =200,pady=2, padx=10, bg ="cadet blue",relief=RIDGE)
Rightframe1.grid(row=0, column=0)

Rightframe2 = Frame(Rightframe,bd=10, width = 560, height = 200,pady=2, padx=10, bg ="cadet blue",relief=RIDGE)
Rightframe2.grid(row=1, column=0)

PlayerX=IntVar()
PlayerO=IntVar()

PlayerX.set(0)
PlayerO.set(0)

buttons = StringVar()
click = True


def checker(buttons):
	global click
	if buttons["text"] == "" and click == True:
		buttons["text"] = "X" 
		click = False
		scorekeeper()
	elif buttons["text"] == "" and click == False:
		buttons["text"] = "O" 
		click = True
		scorekeeper()


def scorekeeper():
	if(button1["text"]=="X" and button2['text']=="X" and button3['text']=="X"):
		button1.configure(background ="powder blue")
		button2.configure(background ="powder blue")
		button3.configure(background ="powder blue")
		n = int(PlayerX.get())
		score = (n + 1)
		PlayerX.set(score)
		tkinter.messagebox.showinfo("winner x", "you have just won a game")

	elif(button4["text"]=="X" and button5['text']=="X" and button6['text']=="X"):
		button4.configure(background ="powder blue")
		button5.configure(background ="powder blue")
		button6.configure(background ="powder blue")
		n = int(PlayerX.get())
		score = (n + 1)
		PlayerX.set(score)
		tkinter.messagebox.showinfo("winner x", "you have just won a game")

	elif(button7["text"]=="X" and button8['text']=="X" and button9['text']=="X"):
			button7.configure(background ="powder blue")
			button8.configure(background ="powder blue")
			button9.configure(background ="powder blue")
			n = int(PlayerX.get())
			score = (n + 1)
			PlayerX.set(score)
			tkinter.messagebox.showinfo("winner x", "you have just won a game")

	elif(button1["text"]=="X" and button4['text']=="X" and button7['text']=="X"):
		button1.configure(background ="powder blue")
		button4.configure(background ="powder blue")
		button7.configure(background ="powder blue")
		n = int(PlayerX.get())
		score = (n + 1)
		PlayerX.set(score)
		tkinter.messagebox.showinfo("winner x", "you have just won a game")

	elif(button2["text"]=="X" and button5['text']=="X" and button8['text']=="X"):
		button2.configure(background ="powder blue")
		button5.configure(background ="powder blue")
		button8.configure(background ="powder blue")
		n = int(PlayerX.get())
		score = (n + 1)
		PlayerX.set(score)
		tkinter.messagebox.showinfo("winner x", "you have just won a game")

	elif(button3["text"]=="X" and button6['text']=="X" and button9['text']=="X"):
		button3.configure(background ="powder blue")
		button6.configure(background ="powder blue")
		button9.configure(background ="powder blue")
		n = int(PlayerX.get())
		score = (n + 1)
		PlayerX.set(score)
		tkinter.messagebox.showinfo("winner x", "you have just won a game")

	elif(button1["text"]=="X" and button5['text']=="X" and button9['text']=="X"):
		button1.configure(background ="powder blue")
		button5.configure(background ="powder blue")
		button9.configure(background ="powder blue")
		n = int(PlayerX.get())
		score = (n + 1)
		PlayerX.set(score)
		tkinter.messagebox.showinfo("winner x", "you have just won game")

	elif(button3["text"]=="X" and button5['text']=="X" and button7['text']=="X"):
		button3.configure(background ="powder blue")
		button5.configure(background ="powder blue")
		button7.configure(background ="powder blue")
		n = int(PlayerX.get())
		score = (n + 1)
		PlayerX.set(score)
		tkinter.messagebox.showinfo("winner x", "you have just won a game")


	if(button1["text"]=="O" and button2['text']=="O" and button3['text']=="O"):
		button1.configure(background ="powder blue")
		button2.configure(background ="powder blue")
		button3.configure(background ="powder blue")
		n = int(PlayerO.get())
		score = (n + 1)
		PlayerO.set(score)
		tkinter.messagebox.showinfo("winner O", "you have just won a game")

	elif(button4["text"]=="O" and button5['text']=="O" and button6['text']=="O"):
		button4.configure(background ="powder blue")
		button5.configure(background ="powder blue")
		button6.configure(background ="powder blue")
		n = int(PlayerO.get())
		score = (n + 1)
		PlayerO.set(score)
		tkinter.messagebox.showinfo("winner O", "you have just won a game")

	elif(button7["text"]=="O" and button8['text']=="O" and button9['text']=="O"):
			button7.configure(background ="powder blue")
			button8.configure(background ="powder blue")
			button9.configure(background ="powder blue")
			n = int(PlayerO.get())
			score = (n + 1)
			PlayerO.set(score)
			tkinter.messagebox.showinfo("winner O", "you have just won a game")

	elif(button1["text"]=="O" and button4['text']=="O" and button7['text']=="O"):
		button1.configure(background ="powder blue")
		button4.configure(background ="powder blue")
		button7.configure(background ="powder blue")
		n = int(PlayerO.get())
		score = (n + 1)
		PlayerO.set(score)
		tkinter.messagebox.showinfo("winner O", "you have just won a game")

	elif(button2["text"]=="O" and button5['text']=="O" and button8['text']=="O"):
		button2.configure(background ="powder blue")
		button5.configure(background ="powder blue")
		button8.configure(background ="powder blue")
		n = int(PlayerO.get())
		score = (n + 1)
		PlayerO.set(score)
		tkinter.messagebox.showinfo("winner O", "you have just won a game")

	elif(button3["text"]=="O" and button6['text']=="O" and button9['text']=="O"):
		button3.configure(background ="powder blue")
		button6.configure(background ="powder blue")
		button9.configure(background ="powder blue")
		n = int(PlayerO.get())
		score = (n + 1)
		PlayerO.set(score)
		tkinter.messagebox.showinfo("winner O", "you have just won a game")

	elif(button1["text"]=="O" and button5['text']=="O" and button9['text']=="O"):
		button1.configure(background ="powder blue")
		button5.configure(background ="powder blue")
		button9.configure(background ="powder blue")
		n = int(PlayerO.get())
		score = (n + 1)
		PlayerO.set(score)
		tkinter.messagebox.showinfo("winner O", "you have just won a game")

	elif(button3["text"]=="O" and button5['text']=="O" and button7['text']=="O"):
		button3.configure(background ="powder blue")
		button5.configure(background ="powder blue")
		button7.configure(background ="powder blue")
		n = int(PlayerO.get())
		score = (n + 1)
		PlayerO.set(score)
		tkinter.messagebox.showinfo("winner O", "you have just won a game")
	





def reset():
	button1['text']=""
	button2['text']=""
	button3['text']=""
	button4['text']=""
	button5['text']=""
	button6['text']=""
	button7['text']=""
	button8['text']=""
	button9['text']=""

	button1.configure(background ="gainsboro")
	button2.configure(background ="gainsboro")
	button3.configure(background ="gainsboro")
	button4.configure(background ="gainsboro")
	button5.configure(background ="gainsboro")
	button6.configure(background ="gainsboro")
	button7.configure(background ="gainsboro")
	button8.configure(background ="gainsboro")
	button9.configure(background ="gainsboro")
def newgame():
	reset()
	PlayerX.set(0)
	PlayerO.set(0)



lblPlayerX = Label(Rightframe1 ,font=('arial',40,"bold"), text="player X:",padx=2,pady=2,bg='cadet blue')
lblPlayerX.grid(row=0, column=0, sticky=W)
txtPlayerX=Entry(Rightframe1,font=('arial', 40, 'bold'), bd=2,fg='black',textvariable= PlayerX, width=14,justify=LEFT).grid(row=0,column=1)

lblPlayerO = Label(Rightframe1 ,font=('arial',40,"bold"), text="player O:",padx=2,pady=2,bg='cadet blue')
lblPlayerO.grid(row=1, column=0, sticky=W)
txtPlayerO=Entry(Rightframe1,font=('arial', 40, 'bold'), bd=2,fg='black',textvariable= PlayerO, width=14,justify=LEFT).grid(row=1,column=1)

btnReset = Button(Rightframe2, text="reset",font=("times 26 bold"), height = 3, width=30, bg = "gainsboro", command=reset)
btnReset.grid(row=0, column=0)

btnNewGame = Button(Rightframe2, text="New Game",font=("times 26 bold"), height = 3, width=30, bg = "gainsboro", command=newgame)
btnNewGame.grid(row=1, column=0) 



button1 = Button(Leftframe, text="",font=("times 26 bold"), height = 3, width=8, bg = "gainsboro", command=lambda:checker(button1))
button1.grid(row=1, column=0, sticky = S+N+E+W)

button2 = Button(Leftframe, text="",font=("times 26 bold"), height = 3, width=8, bg = "gainsboro", command=lambda:checker(button2))
button2.grid(row=1, column=1, sticky = S+N+E+W)

button3 = Button(Leftframe, text="",font=("times 26 bold"), height = 3, width=8, bg = "gainsboro", command=lambda:checker(button3))
button3.grid(row=1, column=2, sticky = S+N+E+W)

button4 = Button(Leftframe, text="",font=("times 26 bold"), height = 3, width=8, bg = "gainsboro", command=lambda:checker(button4))
button4.grid(row=2, column=0, sticky = S+N+E+W)

button5 = Button(Leftframe, text="",font=("times 26 bold"), height = 3, width=8, bg = "gainsboro", command=lambda:checker(button5))
button5.grid(row=2, column=1, sticky = S+N+E+W)

button6 = Button(Leftframe, text="",font=("times 26 bold"), height = 3, width=8, bg = "gainsboro", command=lambda:checker(button6))
button6.grid(row=2, column=2, sticky = S+N+E+W)

button7 = Button(Leftframe, text="",font=("times 26 bold"), height = 3, width=8, bg = "gainsboro", command=lambda:checker(button7))
button7.grid(row=3, column=0, sticky = S+N+E+W)

button8 = Button(Leftframe, text="",font=("times 26 bold"), height = 3, width=8, bg = "gainsboro", command=lambda:checker(button8))
button8.grid(row=3, column=1, sticky = S+N+E+W)

button9 = Button(Leftframe, text="",font=("times 26 bold"), height = 3, width=8, bg = "gainsboro", command=lambda:checker(button9))
button9.grid(row=3, column=2, sticky = S+N+E+W)

root.mainloop()

