import datetime
import pytz
import math
import sys

a = 100
b = 100

inputVect = [
  datetime.datetime(2020, 5, 17, 23, 0),
  datetime.datetime(2020, 5, 18, 23, 0),
  datetime.datetime(2020, 5, 25, 23, 0),
  datetime.datetime(2020, 6, 15, 23, 0)
]
selectedTimes = [
  datetime.datetime(2020, 6, 18, 23, 0),
  datetime.datetime(2020, 6, 20, 23, 0)
]

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


selectedRetention = []
for selectedTime in selectedTimes:
  selectedRetention.append(memoryRetentionFunctionDate(selectedTime))

print(selectedRetention)

#print(memoryRetentionFunction(1), funcList[0](1))
#print(memoryRetentionFunction(24), funcList[1](24))

#timeZone="US/Central"

#currentDate=datetime.datetime.now()
#currentDateTimezone = currentDate.astimezone(pytz.timezone(timeZone)).strftime('%Y-%m-%d %H:%M:%S %Z%z')

#print(currentDateTimezone)
