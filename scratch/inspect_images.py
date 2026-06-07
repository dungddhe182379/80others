import os
from PIL import Image

def inspect_image(image_path):
    if not os.path.exists(image_path):
        print(f"File not found: {image_path}")
        return
    img = Image.open(image_path)
    img_rgba = img.convert("RGBA")
    width, height = img_rgba.size
    print(f"\nImage: {os.path.basename(image_path)} ({width}x{height})")
    
    # Check 4 corners
    corners = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
    for i, pos in enumerate(corners):
        pixel = img_rgba.getpixel(pos)
        print(f"  Corner {i} at {pos}: {pixel} (Hex: #{pixel[0]:02X}{pixel[1]:02X}{pixel[2]:02X})")
        
    # Let's count some pixel color distribution to see if #3C2F40 (60, 47, 64) is present
    colors = img_rgba.getdata()
    target_count = 0
    transparent_count = 0
    for c in colors:
        if c[3] == 0:
            transparent_count += 1
        else:
            # check proximity to #3C2F40
            dist = ((c[0] - 60)**2 + (c[1] - 47)**2 + (c[2] - 64)**2)**0.5
            if dist < 25:
                target_count += 1
                
    print(f"  Transparent pixels: {transparent_count}")
    print(f"  Pixels close to #3C2F40 (60, 47, 64): {target_count}")

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
    for img in images:
        inspect_image(os.path.join(public_dir, img))

if __name__ == "__main__":
    main()
