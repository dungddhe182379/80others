import os
from PIL import Image

def test_transparency(image_path, output_path, tolerance=50):
    if not os.path.exists(image_path):
        print("Original file not found")
        return
    img = Image.open(image_path).convert("RGBA")
    
    # We will sample the background color from the average of the 4 corners
    width, height = img.size
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
    print(f"Sampled BG color: R={r_bg:.1f}, G={g_bg:.1f}, B={b_bg:.1f} (Hex: #{int(r_bg):02X}{int(g_bg):02X}{int(b_bg):02X})")
    
    datas = img.getdata()
    new_data = []
    
    for item in datas:
        r, g, b, a = item[0], item[1], item[2], item[3]
        dist = ((r - r_bg) ** 2 + (g - g_bg) ** 2 + (b - b_bg) ** 2) ** 0.5
        if dist < tolerance:
            new_data.append((0, 0, 0, 0)) # transparent
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved test image to: {output_path}")

def visualize_opaque_pixels(image_path, grid_size=32):
    img = Image.open(image_path).convert("RGBA")
    width, height = img.size
    block_w = width // grid_size
    block_h = height // grid_size
    
    print(f"\nOpaque map for {os.path.basename(image_path)} ({grid_size}x{grid_size}):")
    for y in range(grid_size):
        row = ""
        for x in range(grid_size):
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
    original_path = "c:\\Users\\doduy\\Desktop\\80others\\public\\deck_play.png"
    output_path = "c:\\Users\\doduy\\Desktop\\80others\\scratch\\deck_play_transparent.png"
    
    print("--- Test with Tolerance = 40 ---")
    test_transparency(original_path, output_path, tolerance=40)
    visualize_opaque_pixels(output_path)
    
    print("\n--- Test with Tolerance = 50 ---")
    test_transparency(original_path, output_path, tolerance=50)
    visualize_opaque_pixels(output_path)

    print("\n--- Test with Tolerance = 60 ---")
    test_transparency(original_path, output_path, tolerance=60)
    visualize_opaque_pixels(output_path)

if __name__ == "__main__":
    main()
