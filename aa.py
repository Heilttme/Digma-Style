def to_new(num, ss):
    new_num = ""
    while num >= ss:
        pr = num % ss   
        num = num // ss
        if pr == 15:
            new_num += "F"
        elif pr == 14:
            new_num += "E"
        elif pr == 13:
            new_num += "D"
        elif pr == 12:
            new_num += "C"
        elif pr == 11:
            new_num += "B"
        elif pr == 10:
            new_num += "A"
        else:
            new_num += str(num)

    return new_num[::-1]


# print(to_new(705, 16))


def to_dec(num, ss):
    num = str(num)[::-1]
    new_num = 0
    for i in range(len(num)):
        new_num += int(num[i]) * ss ** i

    return new_num


# print(to_dec(100011101101, 2))

print(2**8+2**7+2**6+2**5+2**4+2**3+2**2+2**1+2**0)