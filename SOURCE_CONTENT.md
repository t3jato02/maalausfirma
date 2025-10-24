Source project: c:/Users/tommi/OneDrive/Desktop/ArcticPearl Technologies/Website_Teuvo Järvenpää Oy/Painting Company Website/build/images/gallery/

The following image files are referenced by the site and should be copied into this project's `assets/images/gallery/` folder.

Files:
- boordin-maalaus-vanhan-mallin-mukaan-800x700-1920w.jpg
- harkkotalon-rappaus-800x700-1920w.jpg
- julkisivurappaus-800x700-1920w.jpg
- kiimingin-kirkon-tapuli-keittomaalattu-800x700-1920w.jpg
- lamporapattu-paaty-800x700-1920w.jpg
- lautavuorauksen-uusimista-ulkomaalaus-800x700-1920w.jpg
- logo-1-1920w.png
- maalin-poisto-ja-maalaus-800x700-1920w.jpg
- oktalon-remontti-800x700-1920w.jpg
- paikkarappaus-800x700-1920w.jpg
- peltikaton-maalaus-800x700-1920w.jpg
- puutalon-maalaus-800x700-1920w.jpg
- rappaus-ja-maalaus-800x700-1920w.jpg
- siirtolantie-paikkarappaus_2-800x700-1920w.jpg
- tapetointi-800x700-1920w.jpg
- tapetointia-800x700-1920w.jpg
- tapetointi_1-800x700-1920w.jpg
- ulkomaalaus-800x700-1920w.jpg
- ulkomaalaus_luovi_2-800x700-1920w.jpg
- ulkopuolen-entisointi_luovi-800x700-1920w.jpg
- ulkorappaus-teuvopakkalan-koulu_1-800x700-1920w.jpg
- uusi-rappaus-ja-peltikaton-maalaus-800x700-1920w.jpg
- uusi-tiilikatto-piippu-ja-ulkomaalaus-800x700-1920w.jpg

PowerShell copy commands (run from this project's root):

# Create directory if it doesn't exist (already created by the script):
# New-Item -ItemType Directory -Force -Path ".\\assets\\images\\gallery"

# Copy all gallery images from source (adjust path if needed):
Copy-Item -Path "c:\Users\tommi\OneDrive\Desktop\ArcticPearl Technologies\Website_Teuvo Järvenpää Oy\Painting Company Website\build\images\gallery\*" -Destination ".\assets\images\gallery\" -Recurse -Force

Notes:
- Binary images cannot be copied via the editor's read/write text APIs, so please run the PowerShell command above to copy the images into this project.
- After copying, open `index.html` in a browser to verify the gallery images load correctly.
