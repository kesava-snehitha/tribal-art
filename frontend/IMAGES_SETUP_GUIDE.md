# 🖼️ Product Images Setup Guide

## ✅ Search Bar Reduced
The search bar has been made smaller:
- Width reduced from 300px to 240px max
- Padding reduced from 8px to 6px
- Font size reduced to 13px
- Overall more compact appearance

---

## 📸 How to Get Product Images

Since copyright laws prevent downloading images directly from Google, here are **legal alternatives:**

### **Option 1: Free Stock Photo Sites** (Recommended)
These sites allow free use for commercial projects:

1. **Unsplash** (unsplash.com)
   - Free high-quality images
   - No attribution required
   - Search: "tribal art", "handmade pottery", "wooden mask", etc.

2. **Pexels** (pexels.com)
   - Free stock photos
   - Creative Commons license
   - Great for craft/artisan products

3. **Pixabay** (pixabay.com)
   - 2+ million free images
   - Perfect for traditional crafts
   - Search relevant keywords

4. **Freepik** (freepik.com)
   - Free and premium images
   - License: Free for personal use
   - Design elements available

5. **Adobe Stock Free** (stock.adobe.com/free)
   - Curated free collections
   - Professional quality

### **Option 2: Use Your Own Images**
- Photograph your own products
- Hire a photographer
- Use images from artisans with permission

### **Option 3: Commission Images**
- Hire an artist on Fiverr, Upwork
- Create custom tribal art illustrations
- Design mockups

---

## 🎯 Recommended Product Images

### **Product 1: Handwoven Tribal Basket**
- Keywords: "woven basket", "tribal basket", "handmade basket"
- Size: 280x200px (landscape)
- Color: Earthy browns/creams

### **Product 2: Traditional Clay Pottery**
- Keywords: "pottery bowl", "clay pot", "handmade pottery"
- Size: 280x200px
- Color: Warm clay tones

### **Product 3: Tribal Wooden Mask**
- Keywords: "wooden mask", "tribal mask", "carved mask"
- Size: 280x200px
- Color: Dark wood tones

### **Product 4: Beaded Necklace**
- Keywords: "beaded necklace", "tribal jewelry", "ethnic necklace"
- Size: 280x200px
- Color: Multi-color beads

---

## 📁 File Organization

Current structure:
```
src/assets/
├── 1.jpg           (Handwoven Basket)
├── 2.webp          (Clay Pottery)
├── 3.webp          (Wooden Mask)
├── 4.webp          (Beaded Necklace)
└── hero.jpg        (Homepage Hero)
```

### **Recommended Setup:**
```
src/assets/
├── products/
│   ├── basket-1.jpg
│   ├── basket-2.jpg
│   ├── pottery-1.jpg
│   ├── pottery-2.jpg
│   ├── mask-1.jpg
│   ├── mask-2.jpg
│   ├── necklace-1.jpg
│   └── necklace-2.jpg
├── hero/
│   └── hero.jpg
├── 1.jpg, 2.webp, 3.webp, 4.webp (current)
└── react.svg
```

---

## 💾 How to Use Downloaded Images

### **Step 1: Download Images**
1. Go to Unsplash.com
2. Search for "tribal basket" / "pottery" etc.
3. Click "Download" button
4. Choose size (usually 640x480 or 1920x1080)

### **Step 2: Resize Images**
Use any tool:
- **Online:** tinypng.com, imageresizer.com
- **Desktop:** Photoshop, GIMP (free), Paint.NET (free)
- **Convert WebP:** Konverter online tools

Recommended sizes:
- Thumbnails: 80x80px
- Product cards: 280x200px
- Gallery main: 400x500px
- Hero: 800x600px

### **Step 3: Save to Assets**
```
Save to: src/assets/products/
File format: .jpg or .webp
Example: basket-1.jpg
```

### **Step 4: Update Code**
```javascript
// Before (placeholder)
import img1 from '../assets/1.jpg'

// After (real images)
import basketImg from '../assets/products/basket-1.jpg'
import basketImg2 from '../assets/products/basket-2.jpg'
```

---

## 🔄 Update Product Images in Code

### **In ProductPage.jsx:**
```javascript
import img1 from '../assets/products/basket-1.jpg'
import img2 from '../assets/products/pottery-1.jpg'
import img3 from '../assets/products/mask-1.jpg'
import img4 from '../assets/products/necklace-1.jpg'

const allProducts = [
  {
    id: 1,
    name: 'Handwoven Tribal Basket',
    image: img1,
    gallery: [img1, basketImg2, basketImg3],
    // ... rest of data
  },
  // ... other products
]
```

### **In Home.jsx:**
```javascript
import basketImg from '../assets/products/basket-1.jpg'
import potterImg from '../assets/products/pottery-1.jpg'
import maskImg from '../assets/products/mask-1.jpg'
import necklaceImg from '../assets/products/necklace-1.jpg'

const featuredProducts = [
  {
    id: 1,
    name: 'Handwoven Tribal Basket',
    image: basketImg,
    // ... rest
  },
]
```

---

## 🎨 Image Best Practices

### **Format Selection:**
- **JPG:** For photos (smaller file size)
- **WebP:** For modern browsers (most compact)
- **PNG:** For images with transparency

### **File Size:**
- Thumbnail (80x80): 2-5 KB
- Card (280x200): 8-15 KB
- Gallery (400x500): 25-40 KB
- Hero (800x600): 50-80 KB

### **Optimize Images:**
1. Remove unnecessary metadata
2. Compress without quality loss
3. Use appropriate format
4. Resize to exact dimensions

---

## 🌐 Free Creative Commons Images

### **Best for Tribal/Handcraft Products:**

**Unsplash Collections:**
- Search: "handmade" → 5000+ images
- Search: "art" → 20000+ images
- Search: "craft" → 3000+ images

**Pexels Collections:**
- "Traditional art"
- "Handmade items"
- "Cultural crafts"

**Pixabay Collections:**
- "Tribal patterns"
- "Pottery"
- "Jewelry"
- "Woodwork"

---

## ⚖️ License Considerations

### **Always Check License:**
- Most free sites allow commercial use
- Some require attribution
- Read terms before downloading

### **TribalArt Safe Options:**
- ✅ Unsplash (Free + Commercial)
- ✅ Pexels (Free + Commercial)
- ✅ Pixabay (Free + Commercial)
- ✅ Adobe Stock Free (Free tier)
- ❌ Google Images (Often copyrighted)
- ❌ Instagram (Copyright by creator)

---

## 🚀 Quick Start: Get Images in 5 Minutes

1. **Go to Unsplash.com** (or Pexels.com)
2. Search for "tribal basket art handmade"
3. Find 3-4 good images
4. Download each at 640x480 resolution
5. Create folder: `src/assets/products/`
6. Save images as: `basket-1.jpg`, `pottery-1.jpg`, etc.
7. Update imports in ProductPage.jsx and Home.jsx
8. Refresh browser - new images appear!

---

## 📋 Downloaded Images Checklist

- [ ] Basket images (1-2 images)
- [ ] Pottery images (1-2 images)
- [ ] Mask images (1-2 images)
- [ ] Necklace images (1-2 images)
- [ ] Home hero image (1 image)
- [ ] All saved in src/assets/products/
- [ ] All compressed/optimized
- [ ] Filenames clear and organized
- [ ] Code updated with new imports
- [ ] Browser shows new images

---

## 🆘 Troubleshooting

### **Images Not Showing?**
1. Check file path is correct
2. Verify import statement
3. Check file actually exists in folder
4. Restart dev server: `npm run dev`

### **Images Too Large?**
1. Use TinyPNG to compress
2. Resize to exact dimensions
3. Convert to WebP format
4. Use imagemin CLI tool

### **License Concerns?**
1. Check image license on site
2. Unsplash/Pexels are safe for commercial
3. Always read terms
4. Keep license info if required

---

## 💡 Pro Tips

1. **Batch Download:** Use browser extension for Unsplash
2. **Organize:** Name files clearly (basket-main.jpg, pottery-gallery-2.jpg)
3. **Backup:** Keep originals before resizing
4. **Version Control:** Don't commit huge images to git
5. **Responsive:** Save 2 sizes (standard + 2x for retina)

---

## 📚 Resources Summary

| Site | License | Images | Best For |
|------|---------|--------|----------|
| Unsplash | CC0 | 4M+ | Photos |
| Pexels | CC0 | 40K+ | Stock Photos |
| Pixabay | CC0 | 2.7M+ | Mixed Media |
| Freepik | Free (Personal) | 1M+ | Designs |
| Adobe Stock | Free Tier | 40K+ | Professional |

---

## Next Steps

1. ✅ Search bar reduced (done!)
2. 📸 Download product images using above guide
3. 💾 Save to src/assets/products/
4. 🔄 Update imports in ProductPage.jsx
5. 🔄 Update imports in Home.jsx
6. 🔄 Update imports in ProductListing.jsx
7. 🧪 Test on browser - verify images appear
8. 📦 Commit files to git

---

**Ready to add professional images to your TribalArt platform!**
