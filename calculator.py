import tkinter as tk 
'''importing modules to our project '''

def press(v):
    entry.insert(tk.END,v)
'''called when a button is clicked 
insert the pressed value at the end od entry widget'''

def clear():
    entry.delete(0,tk.END)
'''clears the caluctors screen 
Delets all characters from index 0 to end '''

def calc():
    try:
        result = eval(entry.get())
        '''entry .get() retrives the exprssion (eg.5+3)
        eval() evaluates the string as a python expression '''

        entry.delete(0,tk.END)
        '''clears the old exprssion'''
        entry.insert(0,result)
        '''display the results of expresion '''

    except:
        entry.delete(0,tk.END)
        entry.insert(0,"cannot divisble by zer0")
        '''handels invalid exception (e.g 5++)
        display error instead of crashh'''

#main window creation 
root =tk.Tk()
'''creates a main application windows '''

root.title("calculator")
'''sets the window title '''

root.configure(bg = "#3729b0")

root.resizable(False,False)

#entry widegts 
entry = tk.Entry(
    root,
    font=("TImes new Roman",20),
    bg = "#2d2d2d",
    fg = "black",
    bd=0,
    justify="right"
)

entry.grid(row=0, column=0, columnspan=4, padx=12 , ipady=10)
'''place entry at top 
columnspan=4 makes it streach across 4 columns'''

#buttons labels
buttons = [
    "7","8","9","/",
    "4","5","6","*",
    "1","2","3","-",
    "0",".","=","+"
]

'''Reprsent calculator buttons stored in list to reduce repetative code '''

#dyamic button creation 
r=1
c=0
'''rows and columns counter for grid layout'''

for b in buttons:
    cmd = calc if b == "=" else lambda x=b: press(x)
    '''if button is  = calc()
    other wise call press() with the button value 
    lamda x = b prevents late binding issue '''

    tk.Button(
        root,
        text = b,
        command=cmd,
        font=("calibri", 14),
        width=5,
        height=2,
        bg="#ff0033"  if b in "+-*/" else "#eb1b1b",
        fg="Red",
        bd=0,
    ).grid(row=r,column=c , padx=6 , pady=6)

    c+=1
    #after 4 columns move to next row 
    if c == 4:
        r+=1
        c=0
    #moves to next row after 4 buttons 

#clear button 
tk.Button(
    root,
    text = "c",
    command=clear,
    font=("calibri", 14),
    width=22,
    height=2,
    bg="#09ff00"  if b in "+-*/" else "#50e74d",
    fg="GREEN",
    bd=0,
).grid(row=r , column=0, columnspan=4, pady=8)
'''clear the calculator 
spans acrros all columns '''

#event loop 
root.mainloop()
'''keeps the windows running 
Listens the code '''