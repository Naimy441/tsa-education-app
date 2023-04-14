from datetime import date, timedelta
import datetime
import math
import sys
import json

# alloted_days, days-of-study
# expected-end-state

jsonArgs=json.loads(sys.argv[1])

allottedDays=int(jsonArgs['alloted-days'])
a = int(jsonArgs['avgAB'][0]) 
b = int(jsonArgs['avgAB'][1])


timeLength=timedelta(days=allottedDays)

daysOfStudy = jsonArgs['days-of-study']

weekdaysList=["Monday", "Tuesday", "Wednesday","Thursday","Friday", "Saturday", "Sunday"]


date=datetime.datetime.now()

dateList=[]
for n in range(timeLength.days):
  day=date+timedelta(days=n)
  dateList.append(day)

session=[]
for i in range(len(dateList)):
  if daysOfStudy[weekdaysList[dateList[i].weekday()]]:
    session.append(dateList[i])
    
inputVect=session
selectedTime=date+timedelta(days=timeLength.days)

sessionsVect = []
for i in range(len(inputVect)):
  difference = inputVect[i] - inputVect[0]
  difference_in_s = difference.total_seconds()
  hours = divmod(difference_in_s, 3600)[0]
  sessionsVect.append(hours)

def makeAFunc(i):
  if (i == 0):

    def newFunc(x):
      return math.e**(-x / b)

    return newFunc

  else:

    def newFunc(x):
      n = math.e**(-(x - sessionsVect[i]) / (a * i + b))
      return n

    return newFunc

funcList = []
for i in range(len(sessionsVect)):
  funcList.append(makeAFunc(i))

def memoryRetentionFunction(t):
  for i in range(len(sessionsVect)):
    if (i == len(sessionsVect) - 1):
      return funcList[i](t)
    elif (t >= sessionsVect[i] and t < sessionsVect[i + 1]):
      return funcList[i](t)

def memoryRetentionFunctionDate(date):
  difference = date - inputVect[0]
  difference_in_s = difference.total_seconds()
  hours = divmod(difference_in_s, 3600)[0]
  return memoryRetentionFunction(hours)

selectedRetention=memoryRetentionFunctionDate(selectedTime)

result = json.dumps({
  "expected-end-state": round(selectedRetention, 5)
})
print(result)
