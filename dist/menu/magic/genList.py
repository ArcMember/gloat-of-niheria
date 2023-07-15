urls = [
    "src/routes/menu/magic/runes/Б И Белой Магии.png",
    "src/routes/menu/magic/runes/Б И Жизни.png",
    "src/routes/menu/magic/runes/Б И Крепости.png",
    "src/routes/menu/magic/runes/Б Р Воли.png",
    "src/routes/menu/magic/runes/Б Р Выносливости.png",
    "src/routes/menu/magic/runes/Б Р Гибкости.png",
    "src/routes/menu/magic/runes/Б Р Исцеления.png",
    "src/routes/menu/magic/runes/Б Р Легкости.png",
    "src/routes/menu/magic/runes/Б Р Покоя.png",
    "src/routes/menu/magic/runes/В И Влияния.png",
    "src/routes/menu/magic/runes/В И Внимания.png",
    "src/routes/menu/magic/runes/В И Единства.png",
    "src/routes/menu/magic/runes/В Р Вести.png",
    "src/routes/menu/magic/runes/В Р Вмешательства.png",
    "src/routes/menu/magic/runes/В Р Духа.png",
    "src/routes/menu/magic/runes/В Р Истока.png",
    "src/routes/menu/magic/runes/В Р Притока.png",
    "src/routes/menu/magic/runes/В Р Пути.png",
    "src/routes/menu/magic/runes/В Р Роста.png",
    "src/routes/menu/magic/runes/В Р Фокуса.png",
    "src/routes/menu/magic/runes/С И Звука.png",
    "src/routes/menu/magic/runes/С И Пелены.png",
    "src/routes/menu/magic/runes/С И Силы.png",
    "src/routes/menu/magic/runes/С И Созидания.png",
    "src/routes/menu/magic/runes/С Р Воды.png",
    "src/routes/menu/magic/runes/С Р Воздуха.png",
    "src/routes/menu/magic/runes/С Р Земли.png",
    "src/routes/menu/magic/runes/С Р Льда.png",
    "src/routes/menu/magic/runes/С Р Молнии.png",
    "src/routes/menu/magic/runes/С Р Огня.png",
    "src/routes/menu/magic/runes/Ч И Слабости.png",
    "src/routes/menu/magic/runes/Ч И Смерти.png",
    "src/routes/menu/magic/runes/Ч И Черной Магии.png",
    "src/routes/menu/magic/runes/Ч Р Жесткости.png",
    "src/routes/menu/magic/runes/Ч Р Несчастья.png",
    "src/routes/menu/magic/runes/Ч Р Разрушения.png",
    "src/routes/menu/magic/runes/Ч Р Тяжести.png",
    "src/routes/menu/magic/runes/Ч Р Хаоса.png",
    "src/routes/menu/magic/runes/Ч Р Ярости.png",
]

with open("runesListGen.json", "w", encoding="utf8") as gen_file:
    gen_file.write("[\n")

    first = True
    for u in urls:
        u = "/" + u
        nameSrc = u.split('/')[-1].split(".png")[0]
        name = ""
        if " И " in nameSrc:
            name += "Идеограмма"
        if " Р " in nameSrc:
            name += "Руна"
        name += " " + nameSrc.split(" ")[-1]

        branch = ""
        if "Б " in nameSrc:
            branch = "Белая"
        if "В " in nameSrc:
            branch = "Влияния"
        if "С " in nameSrc:
            branch = "Созидания"
        if "Ч " in nameSrc:
            branch = "Чёрная" 
    
        if not first:
            gen_file.write(",\n")
        gen_file.write("{\n")
        gen_file.write(f'"name":  "{name}",\n')
        gen_file.write(f'"baseName":  "{nameSrc}",\n')
        gen_file.write(f'"src":  "{u}",\n')
        gen_file.write(f'"branch":  "{branch}"\n')
        gen_file.write("}")
        if first: first = False

    gen_file.write("]")

