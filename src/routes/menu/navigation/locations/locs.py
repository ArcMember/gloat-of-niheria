import os
import shutil

path = "C:/Sync/Arc/Projects/qw/src/routes/menu/navigation/locations"

files = os.listdir(path)
""" 
for fl in files:
    if "location" in fl:
        dirName = fl.split(".md")[0]
        os.mkdir(path + '/' + dirName)
        shutil.copyfile(path + "/" + fl, path + "/" + dirName + "/index.mdx")
         """
for fl in files:
    if "location" in fl:
        with open(path + "/" + fl + "/index.mdx", encoding='utf-8') as f:
            first_line = f.readline().split("# ")[1].split("\n")[0]
            print(f"<a href=\"{fl}\">\n{first_line}\n</a>")