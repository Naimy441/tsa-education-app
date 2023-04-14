# current-card-index, is-current-card-answer-correct, cards
# next-card-index

import random

cardList = [["card"], [], [], [], []]

currentCard = ["card", 0, True]

if (currentCard[2] == True):
  if (currentCard[1] != 4):
    cardList[currentCard[1]].remove(currentCard[0])
    cardList[currentCard[1] + 1].append(currentCard[0])
    currentCard[2] = currentCard[1] + 1
else:
  cardList[currentCard[1]].remove(currentCard[0])
  cardList[0].append(currentCard[0])
  currentCard[2] = 0

leastNum = 0
while (len(cardList[leastNum]) == 0):
  leastNum = leastNum + 1

num = random.randint(0, 31)

if (num <= 16):
  numChoose = 0
  if (numChoose < leastNum):
    numChoose = leastNum
elif (num <= 24):
  numChoose = 1
  if (numChoose < leastNum):
    numChoose = leastNum
elif (num <= 28):
  numChoose = 2
  if (numChoose < leastNum):
    numChoose = leastNum
elif (num <= 30):
  numChoose = 3
  if (numChoose < leastNum):
    numChoose = leastNum
elif (num <= 31):
  numChoose = 4

selectNum = 0
while (cardList[numChoose][selectNum] == currentCard[0]
       and len(cardList[numChoose]) != 1):
  selectNum = random.randint(0, len(cardList[numChoose]))

currentCard = [cardList[numChoose][selectNum], numChoose, None]
