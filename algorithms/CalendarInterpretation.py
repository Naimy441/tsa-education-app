from datetime import date, timedelta
import datetime
import pytz
import math
import sys



a = 100
b = 100

allottedDays=100
timeLength=timedelta(days=allottedDays)

daysOfStudy = {
  "Monday": True,
  "Tuesday": False,
  "Wednesday": False,
  "Thursday": False,
  "Friday": True,
  "Saturday": False,
  "Sunday": True
}

weekdaysList=["Monday", "Tuesday", "Wednesday","Thursday","Friday", "Saturday", "Sunday"]


date=datetime.datetime.now()

dateList=[]
for n in range(timeLength.days):
  day=date+timedelta(days=n)
  dateList.append(day)

for day in dateList:
  print(day)


session=[]
for i in range(len(dateList)):
  if daysOfStudy[weekdaysList[dateList[i].weekday()]]:
    session.append(dateList[i])
    
inputVect=session
selectedTime=date+timedelta(days=timeLength.days)
print(selectedTime)




sessionsVect = []
for i in range(len(inputVect)):
  difference = inputVect[i] - inputVect[0]
  difference_in_s = difference.total_seconds()
  hours = divmod(difference_in_s, 3600)[0]
  sessionsVect.append(hours)

print(sessionsVect)


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

print(selectedRetention)

#print(memoryRetentionFunction(1), funcList[0](1))
#print(memoryRetentionFunction(24), funcList[1](24))

#timeZone="US/Central"

#currentDate=datetime.datetime.now()
#currentDateTimezone = currentDate.astimezone(pytz.timezone(timeZone)).strftime('%Y-%m-%d %H:%M:%S %Z%z')

#print(currentDateTimezone)
