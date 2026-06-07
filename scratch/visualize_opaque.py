from PIL import Image
import os

def visualize_opaque_pixels(image_path, grid_size=32):
    if not os.path.exists(image_path):
        print("File not found")
        return
    img = Image.open(image_path).convert("RGBA")
    width, height = img.size
    
    # Downsample grid
    block_w = width // grid_size
    block_h = height // grid_size
    
    print(f"\nOpaque map for {os.path.basename(image_path)} ({grid_size}x{grid_size}):")
    for y in range(grid_size):
        row = ""
        for x in range(grid_size):
            # Check if there is any opaque pixel in this block
            is_opaque = False
            for py in range(y * block_h, min((y + 1) * block_h, height)):
                for px in range(x * block_w, min((x + 1) * block_w, width)):
                    if img.getpixel((px, py))[3] > 0:
                        is_opaque = True
                        break
                if is_opaque:
                    break
            row += "#" if is_opaque else "·"
        print(row)

def main():
    public_dir = "c:\\Users\\doduy\\Desktop\\80others\\public"
    visualize_opaque_pixels(os.path.join(public_dir, "deck_play.png"))

if __name__ == "__main__":
    main()
