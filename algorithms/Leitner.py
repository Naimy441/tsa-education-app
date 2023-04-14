# current-card-index, is-current-card-answer-correct, cards
# next-card-index
import json
import random
import sys

jsonArgs=json.loads(sys.argv[1])

cards =jsonArgs['cards']
cardList=[[],[],[],[],[]]
for card in cards:
  cardList[card["group"]].append("question")


#cardList = [["card", "mom"], ["dad"], ["chicken"], ["mole"], []]

currentCard = [cards[jsonArgs['current-card-index']]["question"], cards[jsonArgs['current-card-index']]["group"],  jsonArgs['is-current-card-answer-correct']]



if (currentCard[2] == True):
  if (currentCard[1] != 4):
    cardList[currentCard[1]].remove(currentCard[0])
    cardList[currentCard[1] + 1].append(currentCard[0])
    currentCard[2] = currentCard[1] + 1
else:
  cardList[currentCard[1]].remove(currentCard[0])
  cardList[0].append(currentCard[0])
  currentCard[2] = 0

numChoose=0
list=[]
while (len(list)==0):
  num = random.randint(0, 31)
  if (num <= 16):
    list=cardList[0]
    numChoose=0
  elif (num <= 24):
    list=cardList[1]
    numChoose=1
  elif (num <= 28):
    list=cardList[2]
    numChoose=2
  elif (num <= 30):
    list=cardList[3]
    numChoose=3
  elif (num <= 31):
    list=cardList[4]
    numChoose=4


newNum=random.randint(0, len(list)-1)

  
#currentCard = [list[newNum], numChoose, None]
  

for i in range(len(cards)):
  if (cards[i]==list[newNum]):
    nextIndex=i

result= json.dumps ({  "next-card-index" : nextIndex  }) 

print(result)
