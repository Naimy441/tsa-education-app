import math
import json
import sys

jsonArgs=json.loads(sys.argv[1])

SList=jsonArgs['S']

sum = 0
for i in range(len(SList)):
  vect.append([i, SList[i]])

avgAB = [1, 2]


def func(a, b, x):
  return a * x + b


def Lsq(vect, a, b):
  sum = 0
  for i in range(len(vect)):
    sum = sum + (vect[i][1] - func(a, b, vect[i][0]))**2
  return sum


def gradALSq(vect, a, b):
  Sum = 0
  for i in range(len(vect)):
    Sum = Sum + 2 * (vect[i][1] - a * vect[i][0] - b) * -vect[i][0]
  return Sum


def gradBLSq(vect, a, b):
  Sum = 0
  for i in range(len(vect)):
    Sum = Sum + 2 * (vect[i][1] - a * vect[i][0] - b) * -1
  return Sum


def findS(vect):
  global avgAB

  minList = []
  for a in range(-1000, 1000):
    for b in range(-1000, 1000):
      a_new = a * 0.01
      b_new = b * 0.01
      u = gradALSq(vect, a_new, b_new)
      v = gradBLSq(vect, a_new, b_new)
      if (math.fabs(u) < 0.01 and math.fabs(v) < 0.01):
        minList.append([a_new, b_new])
  if (len(minList) > 1):
    val = minList[0]
    for i in range(len(minList)):
      if Lsq(vect, minList[i][0], minList[i][1]) < Lsq(vect, val):
        val = minList[i]
    return avgAB
  elif (len(minList) == 1):
    return minList[0]

  else:
    return avgAB


avgAB=findS(vect)


result= json.dumps ({  "result" : avgAB  })

print(result)

