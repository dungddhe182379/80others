import os
import shutil

def main():
    public_dir = "c:\\Users\\doduy\\Desktop\\80others\\public"
    assets_dir = os.path.join(public_dir, "assets")
    
    # Create subdirectories
    subfolders = ["decks", "moods", "illustrations", "avatars"]
    for sf in subfolders:
        path = os.path.join(assets_dir, sf)
        os.makedirs(path, exist_ok=True)
        print(f"Created directory: {path}")
        
    # List of moves (source name, target relative path)
    moves = {
        "logo.jpg": "logo.jpg",
        "pixel_avatar.png": "avatars/avatar.png",
        
        "deck_warm.png": "decks/warm.png",
        "deck_play.png": "decks/play.png",
        "deck_bond.png": "decks/bond.png",
        "deck_heart.png": "decks/heart.png",
        "deck_safe.png": "decks/safe.png",
        
        "mood_love.png": "moods/love.png",
        "mood_nice.png": "moods/nice.png",
        "mood_okay.png": "moods/okay.png",
        "mood_sad.png": "moods/sad.png",
        
        "pixel_cozy_banner.png": "illustrations/cozy_banner.png",
        "pixel_cozy_fireplace.png": "illustrations/cozy_fireplace.png",
        "pixel_family_dinner.png": "illustrations/family_dinner.png",
    }
    
    for src_name, dest_rel in moves.items():
        src_path = os.path.join(public_dir, src_name)
        dest_path = os.path.join(assets_dir, dest_rel)
        if os.path.exists(src_path):
            if os.path.exists(dest_path):
                os.remove(dest_path)
            shutil.move(src_path, dest_path)
            print(f"Moved and renamed: {src_name} -> assets/{dest_rel}")
        else:
            print(f"Already moved or not found: {src_name}")
            
    print("\nAssets restructuring complete!")

if __name__ == "__main__":
    main()
