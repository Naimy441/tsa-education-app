class flashcard:
  def _init_(self, TimeList, ValueList):
    self.TimeList=TimeList
    self.ValueList=ValueList

  def addNewTime(self, time):
    self.TimeList.append(time)

  def addNewValue(self, value):
    self.ValueList.append(value)

  def findWeightAvgTime(self):
    sum=0
    
    if len(self.TimeList>5):
      for i in range(len(self.TimeList)-4, len(self.TimeList)):
        sum=sum+self.TimeList[i]
      return sum/5
    else:
      for i in range(len(self.TimeList)):
        sum=sum+self.TimeList[i]
      return sum/len(self.TimeList)

  def findWeightAvgValue(self):
    sum=0
    
    if len(self.ValueList>5):
      for i in range(len(self.ValueList)-4, len(self.ValueList)):
        sum=sum+self.ValueList[i]
      return int(sum/5)
    else:
      for i in range(len(self.ValueList)):
        sum=sum+self.ValueList[i]
      return int(sum/len(self.ValueList))


  def detTimeParameter(self):
    if (self.findWeightAvgTime() < 10):
      return 0
    elif (self.findWeightAvgTime() <30):
      return 1
    else:
      return 2

  def detValParameter(self):
    if(self.findWeightAvgValue()<4):
      return 0
    elif (self.findWeightAvgValue()==4):
      return 1
    else:
      return 2
  
  def detWeight(self):
    x=self.detValParameter()
    y=self.detTimeParameter()
    if (x==0):
      return 1
    elif (x+y==1):
      return 0.25
    elif (x+y==2):
      return 0.125
    elif (x+y==3):
      return 0.0625
    else:
      return 0.03125
      
flashcardList=[]
probList=[]

weightSum=0
for card in flashcardList:
  weight=card.detWeight()
  weightSum=weightSum+weight

for card in flashcardList:
  probList.append(card.detWeight/weightSum)

print(probList)
