import re
import pyperclip

data = """
<Character title="Герртейр три Фейнес" 
subtitle="Делегат Рейдан'Фаля" 
filter="Реабор-Тхаес Г" 
href="reabor-thaes/gerrteyr"
    q:slot="characters" 
src="reabor-thaes/gerrteyr/pic.jpg"/>
    <Character title="Рьян тр'Ивия" 
subtitle="Прокуратор Рейдан'Фаль" 
filter="Реабор-Тхаес Р" 
href="reabor-thaes/ryan"
    q:slot="characters" 
src="reabor-thaes/ryan/pic.jpg"/>
    <Character title="Артеринарт од'Мрийт" 
subtitle="Вождь Реабора" 
filter="Реабор-Тхаес А" 
href="reabor-thaes/arterinart"
    q:slot="characters" 
src="reabor-thaes/arterinart/pic.jpg"/>
    <Character title="Мире́нт Айфесс" 
subtitle="Наместник Ималиона" 
filter="Реабор-Тхаес М" 
href="reabor-thaes/mirent"
    q:slot="characters" 
src="reabor-thaes/mirent/pic.jpg"/>
    <Character title="Эгрейт Мииртай" 
subtitle="Глава Ковена" 
filter="Реабор-Тхаес Э" 
href="reabor-thaes/egreit"
    q:slot="characters" 
src="reabor-thaes/egreit/pic.jpg"/>
    <Character title="Амтьен Эйрини" 
subtitle="Шаман Ковена" 
filter="Реабор-Тхаес А" 
href="reabor-thaes/amtyen"
    q:slot="characters" 
src="reabor-thaes/amtyen/pic.jpg"/>
    <Character title="Террикт тр'Анайр" 
subtitle="Прокуратор Тхагата" 
filter="Реабор-Тхаес Т" 
href="reabor-thaes/terrict"
    q:slot="characters" 
src="reabor-thaes/terrict/pic.jpg"/>

    <Character title="Эрх" 
subtitle="Секретарь Тейеля" 
filter="Тейель Э" 
href="teyel/erh"
    q:slot="characters" 
src="teyel/erh/pic.jpg"/>
    <Character title="Гранта Мифльдатер" 
subtitle="Амбассадор Тейеля" 
filter="Тейель Г" 
href="teyel/granta"
    q:slot="characters" 
src="teyel/granta/pic.jpg"/>
    <Character title="Маттор Эрнерсон" 
subtitle="Капитан флота Тейеля" 
filter="Тейель М" 
href="teyel/mattor"
    q:slot="characters" 
src="teyel/mattor/pic.jpg"/>

    <Character title="Глерней" 
subtitle="Вождь Нации" 
filter="Афитра Г" 
href="kharfirs/glernei"
    q:slot="characters" 
src="kharfirs/glernei/pic.jpg"/>
    <Character title="Ийроно" 
subtitle="Верховная жрица Триума" 
filter="Афитра И" 
href="kharfirs/yirono"
    q:slot="characters" 
src="kharfirs/yirono/pic.jpg"/>
    <Character title="Кифтенетт" 
subtitle="Вождь Атра-Хаитнат" 
filter="Афитра К" 
href="kharfirs/kiftenett"
    q:slot="characters" 
src="kharfirs/kiftenett/pic.jpg"/>

    <Character title="Визиф Вьервудский" 
subtitle="Канцлер Последней Республики" 
filter="Луат В" 
href="luat/wizif"
    q:slot="characters" 
src="luat/wizif/pic.jpg"/>
    <Character title="Авраг Энри́йтен" 
subtitle="Секретарь Республиканского Кабинета" 
filter="Луат А" 
href="luat/avrag"
    q:slot="characters" 
src="luat/avrag/pic.jpg"/>
    <Character title="Тарган Тиберский" 
subtitle="Маршал Бюро Вычищения" 
filter="Луат Т" 
href="luat/targan"
    q:slot="characters" 
src="luat/targan/pic.jpg"/>
    <Character title="Трикш Рватиф" 
subtitle="Адмирал Последней Республики" 
filter="Луат Т" 
href="luat/triksh"
    q:slot="characters" 
src="luat/triksh/pic.jpg"/>   

    <Character title="Батриф Матир" 
subtitle="Гранд-адмирал Коркафта" 
filter="Коркафт Б" 
href="korkaft/batrif"
    q:slot="characters" 
src="korkaft/batrif/pic.jpg"/>
    <Character title="Фредерика Датесс" 
subtitle="Гранд-офицер международного общения" 
filter="Коркафт Ф" 
href="korkaft/frederica"
    q:slot="characters" 
src="korkaft/frederica/pic.jpg"/>
    <Character title="Кманран Год" 
subtitle="Вольный капитан" 
filter="Коркафт К" 
href="korkaft/kmanran"
    q:slot="characters" 
src="korkaft/kmanran/pic.jpg"/>  

    <Character title="Вбаргах Тихолес" 
subtitle="Император Мордвина" 
filter="Мордвин В" 
href="mordwin/wbargah"
    q:slot="characters" 
src="mordwin/wbargah/pic.jpg"/>
    <Character title="Тильф Грохолес" 
subtitle="Главный археолог" 
filter="Мордвин Т" 
href="mordwin/tilf"
    q:slot="characters" 
src="mordwin/tilf/pic.jpg"/>
    <Character title="Манкорд Грободел" 
subtitle="Ревизор Искры" 
filter="Мордвин М" 
href="mordwin/mankord"
    q:slot="characters" 
src="mordwin/mankord/pic.jpg"/>
    <Character title="Миркей Геринджер" 
subtitle="Коммандер гвардии Искры" 
filter="Мордвин М" 
href="mordwin/mirkey"
    q:slot="characters" 
src="mordwin/mirkey/pic.jpg"/>

    <Character title="Мейрад Тефе́сс" 
subtitle="Первый министр Флатрии" 
filter="Флатрия М" 
href="flatria/meyrad"
    q:slot="characters" 
src="flatria/meyrad/pic.jpg"/>

    <Character title="Гвар Беломор" 
subtitle="Ведущий архимагистр Ассоциации С'Итш'Тас" 
filter="Сикстинна Г" 
href="sixtinna/gvar"
    q:slot="characters" 
src="sixtinna/gvar/pic.jpg"/>

    <Character title="Грат" 
subtitle="Старший машинист" 
filter="Кланы Г" 
href="clans/grat"
    q:slot="characters" 
src="clans/grat/pic.jpg"/>
    <Character title="Терр а'Мария" 
subtitle="Старший машинист" 
filter="Кланы Т" 
href="clans/terr"
    q:slot="characters" 
src="clans/terr/pic.jpg"/>

    <Character title="Арт'Фатали́я" 
subtitle="Лич" 
filter="Хельгеран А" 
href="helgeran/art-fatalia"
    q:slot="characters" 
src="helgeran/art-fatalia/pic.jpg"/>
    <Character title="Гати́х Тьяр" 
subtitle="Друид" 
filter="Хельгеран Г" 
href="helgeran/gatih"
    q:slot="characters" 
src="helgeran/gatih/pic.jpg"/>"""

names = re.findall(r' title="([^"]+)"', data)
subtitles = re.findall(r'subtitle="([^"]+)"', data)
filters = re.findall(r'filter="([^"]+)"', data)
hrefs = re.findall(r'href="([^"]+)"', data)
srcs = re.findall(r'src="([^"]+)"', data)

print(len(names), " ", len(subtitles), " ", len(filters), " ", len(hrefs), " ", len(srcs))
characters = ""
for i in range(len(names)):
    characters += f'''{"{"}
        "name": "{names[i]}",
        "subtitle": "{subtitles[i]}",
        "filter": "{filters[i]}",
        "href": "{hrefs[i]}",
        "src": "{srcs[i]}"
        {'},'}\n
        '''
pyperclip.copy(characters)