def factorNum(n):
    factors = []
    for i in range(1,n):
        if(n%i == 0):
            factors.append(i);
    return(factors)

def sumList(n):
    return(sum(n))

def perfectNum(n):
    if(sumList(factorNum(n))==n):
        return(True)
    else:
        return(False)

for i in range(0,100):
    if(perfectNum(i)):
        print(f"Yes!{i} is a perfect number")
