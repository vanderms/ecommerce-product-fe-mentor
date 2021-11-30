import os
import re
from PIL import Image


def convert_directory(src, dest, width):

    for file in  os.listdir(src):
        
        if not re.search(r'(\.jpeg|\.png|\.jpg)', file):            
            continue

        image = Image.open(src + "/" + file)
        
        if image.size[0] > width:            
            height = round((width * image.size[1]) / image.size[0])
            image = image.resize((width, height), Image.ANTIALIAS)
        
        name = file.replace(".png", ".jpg")
        if file != name:
            image = image.convert('RGB')
        
        image.save(dest + "/" + name, optimize = True, quality = 75)

#end convert_directory()


def convert():

    directories = [path[0] for path in os.walk('./src/images')]

    for src in sorted(set(directories)):      
        dest = re.sub(r'^./src', './assets', src)    
    
        if not os.path.isdir(dest):
            os.mkdir(dest)    
        
        match = re.search(r'[\\/][0-9]*([\\/]|$)', src)

        if match:
            width = re.sub(r'[\\/]', '', match.group(0))                       
            convert_directory(src, dest, int(width))  

#end convert 


if __name__ == '__main__':
    convert()