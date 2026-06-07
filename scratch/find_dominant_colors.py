from PIL import Image
from collections import Counter
import os

def find_dominant_colors(image_path):
    if not os.path.exists(image_path):
        return
    img = Image.open(image_path).convert("RGBA")
    pixels = list(img.getdata())
    
    # Filter out fully transparent pixels (alpha = 0)
    opaque_pixels = [p for p in pixels if p[3] > 0]
    
    # Also find if there is a flat background color (e.g. pixels with alpha > 0 that form a background)
    # Let's count RGB colors
    rgb_counter = Counter([(p[0], p[1], p[2]) for p in opaque_pixels])
    
    print(f"\nImage: {os.path.basename(image_path)}")
    print(f"Total opaque pixels: {len(opaque_pixels)}")
    print("Top 10 most common RGB colors in opaque pixels:")
    for color, count in rgb_counter.most_common(10):
        hex_color = f"#{color[0]:02X}{color[1]:02X}{color[2]:02X}"
        print(f"  Color {color} (Hex: {hex_color}): {count} pixels ({count/len(opaque_pixels)*100:.2f}%)")

def main():
    public_dir = "c:\\Users\\doduy\\Desktop\\80others\\public"
    images = [
        "deck_warm.png",
        "deck_play.png",
        "deck_bond.png",
        "deck_heart.png",
        "deck_safe.png",
    ]
    for img in images:
        find_dominant_colors(os.path.join(public_dir, img))

if __name__ == "__main__":
    main()
