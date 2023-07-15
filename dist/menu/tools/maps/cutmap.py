import argparse
import os
import re
from collections import Counter

from PIL import Image

levels = {
    1: (2048, 4),
    2: (4096, 8),
    3: (4096, 16),
    4: (4096, 32),
}

def split_image(image_path):
    im = Image.open(image_path)
    
    name, ext = os.path.splitext(image_path)
    name = os.path.basename(name)

    if not os.path.exists(f"./{name}"):
        os.makedirs(f"./{name}")
    output_dir = f"./{name}"

    for k, v in levels.items():
        new_im = im.resize((v[0], v[0]))

        im_width, im_height = new_im.size
        row_width = int(im_width / v[1])
        row_height = int(im_height / v[1])

        n = 0
        for i in range(0, v[1]): # rows
            for j in range(0, v[1]): # columns
                box = (j * row_width, i * row_height, j * row_width +
                    row_width, i * row_height + row_height)
                outp = new_im.crop(box)
                outp_path = f"{k}/{j}/{i}{ext}"                
                outp_path = os.path.join(output_dir, outp_path)
                os.makedirs(os.path.dirname(outp_path), exist_ok=True)
                print("Exporting image tile: " + outp_path)
                outp.save(outp_path)
                n += 1

split_image("map-political/map-political.jpg")