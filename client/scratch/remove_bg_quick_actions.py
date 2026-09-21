from PIL import Image
import os

folder = r'c:\My projects\BayMax\client\assets\labels'
files = ['Ai-health.png', 'first-aid.png', 'medicine.png', 'wellness.png']

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
        img.save(path, "PNG")
        print(f"Saved {path}")
    except Exception as e:
        print(f"Error processing {f}: {e}")
