from PIL import Image
import os

folder = r'c:\My projects\BayMax\client\assets\labels'
files = ['cpr.jpeg', 'bleeding.jpeg', 'burns.jpeg', 'fracture.jpeg']

for f in files:
    try:
        path = os.path.join(folder, f)
        img = Image.open(path).convert('RGBA')
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Change white (and near white) to transparent
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
                
        img.putdata(newData)
        new_path = os.path.join(folder, f.replace('.jpeg', '.png'))
        img.save(new_path, "PNG")
        print(f"Saved {new_path}")
    except Exception as e:
        print(f"Error processing {f}: {e}")
