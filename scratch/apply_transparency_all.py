import os
from PIL import Image
from collections import Counter

def make_transparent_and_verify(image_path, output_path, tolerance=55):
    if not os.path.exists(image_path):
        print(f"File not found: {image_path}")
        return
    
    img = Image.open(image_path).convert("RGBA")
    width, height = img.size
    
    # Sample background color from 4 corners
    corners = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
    r_sum, g_sum, b_sum = 0, 0, 0
    for cx, cy in corners:
        pixel = img.getpixel((cx, cy))
        r_sum += pixel[0]
        g_sum += pixel[1]
        b_sum += pixel[2]
        
    r_bg = r_sum / 4
    g_bg = g_sum / 4
    b_bg = b_sum / 4
    
    pixels = list(img.getdata())
    new_data = []
    
    for item in pixels:
        r, g, b, a = item[0], item[1], item[2], item[3]
        # Euclidean distance
        dist = ((r - r_bg) ** 2 + (g - g_bg) ** 2 + (b - b_bg) ** 2) ** 0.5
        if dist < tolerance:
            new_data.append((0, 0, 0, 0)) # transparent
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    
    # Verify result
    processed_pixels = list(img.getdata())
    opaque = [p for p in processed_pixels if p[3] > 0]
    total = len(processed_pixels)
    
    print(f"\nProcessed: {os.path.basename(image_path)}")
    print(f"  Opaque pixels: {len(opaque)} ({len(opaque)/total*100:.2f}%)")
    
    # Check top 3 colors
    rgb_counter = Counter([(p[0], p[1], p[2]) for p in opaque])
    print("  Top 3 colors:")
    for color, count in rgb_counter.most_common(3):
        hex_color = f"#{color[0]:02X}{color[1]:02X}{color[2]:02X}"
        print(f"    {hex_color}: {count} pixels")

def main():
    public_dir = "c:\\Users\\doduy\\Desktop\\80others\\public"
    images = [
        "deck_warm.png",
        "deck_play.png",
        "deck_bond.png",
        "deck_heart.png",
        "deck_safe.png",
        "mood_love.png",
        "mood_nice.png",
        "mood_okay.png",
        "mood_sad.png"
    ]
    
    for img_name in images:
        path = os.path.join(public_dir, img_name)
        make_transparent_and_verify(path, path, tolerance=55)

if __name__ == "__main__":
    main()
