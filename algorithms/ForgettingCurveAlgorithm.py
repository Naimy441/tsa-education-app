# list of vectors of how much you remembered over time
# S

import random
import math

avgS=2
vect=[[0,1],[1,math.e**-1+1],[2,math.e**-2]]


print(vect)

def LSq(vect,S):
  sum=0
  for i in range(len(vect)):
    sum=sum+(vect[i][1]-math.e**(vect[i][0]*-1/S))**2
  return sum

def gradLSq(vect,S):
  Sum=0
  for i in range(len(vect)):
    X=(math.e**(-1/S *vect[i][0])*vect[i][0]/S**2)
    L=vect[i][0]*-1/S
    N=vect[i][1]
    U=2*(N-math.e**L)
    Sum=Sum-U*X
  return Sum

def findS(Lsq, gradLsq, vect):
  minList=[]
  for k in range(1,1000):
    k_new=k*0.01
    u=gradLsq(vect,k_new)
    if (math.fabs(u) < 0.01):
      minList.append(k_new)
  if (len(minList) > 1):
    val=minList[0]
    for i in range(len(minList)):
      if Lsq(vect, minList[i]) < Lsq(vect,val):
        val=minList[i]
    return val

  elif (len(minList) == 1):
    return minList[0]

  else:
    return avgS

print(findS(LSq, gradLSq, vect))
