import json

# Locations data type
""" 
locs_data = {}
new_locs_data = []
with open("locations-data.json", "r", encoding='utf-8') as f:
    locs_data = json.load(f)

for loc in locs_data:
    new_locs_data.append({
        "name": loc["title"],
        "coords": "[0, 0]",
        "url": "https://vk.com/topic-201966363_" + str(loc["id"])
        }) 

with open("locations-try.json", "w", encoding='utf-8') as json_file:
    json.dump(new_locs_data, json_file, ensure_ascii=False, indent=2)
"""

# Pages data type

locs_data = {}
new_locs_data = ""
with open("locations-data.json", "r", encoding='utf-8') as f:
    locs_data = json.load(f)

i = 0
for loc in locs_data:
    new_locs_data += f'- [{loc["title"]}](./menu/navigation/locations/location-{loc["id"]})\n'
    i += 1

with open("locations-try2.json", "w", encoding='utf-8') as json_file:
    json_file.write(new_locs_data)
    json_file.close()

print(locs_data)