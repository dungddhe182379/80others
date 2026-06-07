from PIL import Image
from collections import Counter
import os

def check_transparent_file(image_path):
    if not os.path.exists(image_path):
        print(f"File not found: {image_path}")
        return
    img = Image.open(image_path).convert("RGBA")
    pixels = list(img.getdata())
    
    total = len(pixels)
    opaque = [p for p in pixels if p[3] > 0]
    transparent = [p for p in pixels if p[3] == 0]
    
    print(f"\nImage: {os.path.basename(image_path)}")
    print(f"Total pixels: {total}")
    print(f"Opaque pixels: {len(opaque)} ({len(opaque)/total*100:.2f}%)")
    print(f"Transparent pixels: {len(transparent)} ({len(transparent)/total*100:.2f}%)")
    
    # Dominant colors in opaque pixels
    rgb_counter = Counter([(p[0], p[1], p[2]) for p in opaque])
    print("Top 10 most common RGB colors in opaque pixels:")
    for color, count in rgb_counter.most_common(10):
        hex_color = f"#{color[0]:02X}{color[1]:02X}{color[2]:02X}"
        print(f"  Color {color} (Hex: {hex_color}): {count} pixels ({count/len(opaque)*100:.2f}%)")

def main():
    check_transparent_file("c:\\Users\\doduy\\Desktop\\80others\\scratch\\deck_play_transparent.png")

if __name__ == "__main__":
    main()
