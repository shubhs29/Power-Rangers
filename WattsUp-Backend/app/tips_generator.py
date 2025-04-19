import random

def generate_funny_tip(wastage):
    tips = [
        f"{wastage['device']} bhai ne raat bhar rave party kar liya! Band kar diya karo, bijli bhi thak gayi 😴",
        f"Aree {wastage['device']} ka night shift chal raha kya? Sone do use bhi yaar 😅",
        f"{wastage['device']} ko bhi chhutti chahiye! Band karo raat mein, warna bill milega L 😬"
    ]
    return random.choice(tips)
