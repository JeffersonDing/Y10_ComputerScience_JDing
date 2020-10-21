# Initiate Python List
myList = [1,5,5,3,7,89,1,4,56,7,23]

# Check element is in list
isInList = 7 in myList
print(isInList)

# Append to list using '+'
myList = myList + [57,25]
print(myList)

# Itterate through list
for n in myList:
    print(n)

# Traditional for loop
for i in range(0,len(myList)):
    print(myList[i])

# Python Slicing Lists and Strings
myString = "HelloWorld"
print(myString[1:3])
print(myList[1:3])

# List Functions
bigN = max(myList)
stringList = ['hello','lion','dog','fish']
bigS = max(stringList)
print(bigN,bigS)

smallN = min(myList)
smallS = min(stringList)
print(smallN, smallS)

# Mix and Match
mixList = myList + stringList
try:
    print(max(mixList))
except:
    print("Not Supported!")

# Append to lists
myList.append(199)
print(myList[-1])

# Counting in a list
num = myList.count(7)
print(num)

# Index in a list
print(myList.index(7))
# Index not found retunrs error in python
try:
    print(myList.index(10000000))
except:
    print("Error!")

# Sorting
myList.sort()
print(myList)

stringList.sort()
print(stringList)
