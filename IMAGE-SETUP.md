# Image Setup Guide

## 📸 Required Images

Your website needs images for:

### Hero Slideshow (3 images)
- `hero1.jpg` - Main hero image (wedding cake, celebration)
- `hero2.jpg` - Secondary hero image
- `hero3.jpg` - Third hero image

**Recommended size**: 1920x1080px or larger
**Format**: .jpg or .png
**File size**: Keep under 500KB each for fast loading

### Cake Categories (3 images each)

#### Birthday Cakes
- `birthday1.jpg`
- `birthday2.jpg`
- `birthday3.jpg`

#### Kids Character Cakes
- `kids1.jpg`
- `kids2.jpg`
- `kids3.jpg`

#### Graduation Cakes
- `grad1.jpg`
- `grad2.jpg`
- `grad3.jpg`

#### Wedding Cakes
- `wedding1.jpg`
- `wedding2.jpg`
- `wedding3.jpg`

#### Traditional/Ruracio Cakes
- `trad1.jpg`
- `trad2.jpg`
- `trad3.jpg`

#### Church & Anniversary Cakes
- `church1.jpg`
- `church2.jpg`
- `church3.jpg`

**Recommended size**: 800x800px (square)
**Format**: .jpg or .png
**File size**: Keep under 300KB each

## 🎯 Using Your Existing Images

Based on your uploaded images, here's the mapping:

1. **WhatsApp_Image_2025-12-05_at_21_57_10_f43cdc82.jpg** (Purple wedding cake)
   → Rename to: `wedding1.jpg` AND `hero1.jpg`

2. **WhatsApp_Image_2025-12-05_at_21_57_09_9f268ad8.jpg** (Grace birthday cake)
   → Rename to: `birthday1.jpg` AND `hero2.jpg`

3. **WhatsApp_Image_2025-12-05_at_21_57_09_832d3b40.jpg** (Happy Turning Afwech)
   → Rename to: `trad1.jpg`

4. **WhatsApp_Image_2025-12-05_at_21_57_08_f7858b67.jpg** (Graduation books)
   → Rename to: `grad1.jpg`

5. **WhatsApp_Image_2025-12-05_at_21_57_07_de58012d.jpg** (Minnie Mouse)
   → Rename to: `kids1.jpg`

6. **WhatsApp_Image_2025-12-05_at_21_57_07_9df5a70b.jpg** (CoComelon)
   → Rename to: `kids2.jpg` AND `hero3.jpg`

7. **WhatsApp_Image_2025-12-05_at_21_57_06_7442f3f4.jpg** (Graduation cap)
   → Rename to: `grad2.jpg`

8. **WhatsApp_Image_2025-12-05_at_21_57_06_5e766f41.jpg** (Books graduation)
   → Rename to: `grad3.jpg`

9. **WhatsApp_Image_2025-12-05_at_21_57_05_b96003b1.jpg** (Boys Clare birthday)
   → Rename to: `birthday2.jpg`

10. **WhatsApp_Image_2025-12-05_at_21_57_05_b6ade0fe.jpg** (Cupcakes)
    → Rename to: `birthday3.jpg`

## 📂 Quick Copy-Paste Commands

If your images are in a folder called "uploads", run these commands:

### On Windows (Command Prompt):
```cmd
cd /path/to/sawi-delight-website/images
copy /path/to/uploads/WhatsApp_Image_2025-12-05_at_21_57_10_f43cdc82.jpg wedding1.jpg
copy /path/to/uploads/WhatsApp_Image_2025-12-05_at_21_57_10_f43cdc82.jpg hero1.jpg
copy /path/to/uploads/WhatsApp_Image_2025-12-05_at_21_57_09_9f268ad8.jpg birthday1.jpg
copy /path/to/uploads/WhatsApp_Image_2025-12-05_at_21_57_09_9f268ad8.jpg hero2.jpg
REM ... continue for other images
```

### On Mac/Linux (Terminal):
```bash
cd /path/to/sawi-delight-website/images
cp /path/to/uploads/WhatsApp_Image_2025-12-05_at_21_57_10_f43cdc82.jpg wedding1.jpg
cp /path/to/uploads/WhatsApp_Image_2025-12-05_at_21_57_10_f43cdc82.jpg hero1.jpg
cp /path/to/uploads/WhatsApp_Image_2025-12-05_at_21_57_09_9f268ad8.jpg birthday1.jpg
cp /path/to/uploads/WhatsApp_Image_2025-12-05_at_21_57_09_9f268ad8.jpg hero2.jpg
# ... continue for other images
```

### Manual Method:
1. Open your uploads folder
2. Copy each image
3. Paste into `sawi-delight-website/images/`
4. Rename according to the list above

## 🔄 Adding Placeholder Images

For missing images, create simple placeholder files:

### Option 1: Download Free Stock Images
- [Unsplash](https://unsplash.com/s/photos/cake)
- [Pexels](https://www.pexels.com/search/cake/)
- Search: "wedding cake", "birthday cake", "celebration cake"

### Option 2: Use Your Own Photos
- Take photos of your actual cakes
- Use good lighting (natural light is best)
- Plain background preferred
- Show the full cake

### Option 3: Temporary Placeholders
Create solid color images with text using online tools:
- [Placeholder.com](https://placeholder.com/)
- Generate: 800x800 images with cake category names

## ✅ Image Optimization Tips

Before adding images:

1. **Resize Large Images**
   - Use [TinyPNG](https://tinypng.com/) to compress
   - Or [Squoosh](https://squoosh.app/) for more control
   - Target: Under 300KB per image

2. **Crop to Square**
   - Use Windows Photos or Mac Preview
   - Make images 800x800px or 1000x1000px
   - Center the cake in frame

3. **Good Photography**
   - Clean, uncluttered background
   - Good lighting (avoid shadows)
   - Show entire cake clearly
   - Multiple angles if possible

## 🎨 Image Best Practices

✅ **DO:**
- Use high-quality photos
- Show your actual work
- Keep consistent styling
- Use natural lighting
- Center the cake

❌ **DON'T:**
- Use blurry photos
- Include watermarks from other bakeries
- Use stock photos (customers want to see YOUR cakes)
- Upload huge files (slow loading)
- Use dark or unclear images

## 📱 Testing Images

After adding images:
1. Open `index.html` in browser
2. Check all cake categories load properly
3. Test on mobile view (F12 → Toggle device toolbar)
4. Make sure slideshows work
5. Check loading speed

## 🔧 Troubleshooting

**Images not showing?**
- Check filenames match exactly (case-sensitive!)
- Confirm images are in `/images/` folder
- Try different image format (.jpg vs .png)
- Check file isn't corrupted

**Images too large/slow?**
- Compress using TinyPNG
- Resize to max 1200px width
- Convert to .jpg format
- Target 200-300KB per image

**Wrong image showing?**
- Clear browser cache (Ctrl+Shift+Del)
- Check filename spelling
- Refresh page (F5)

---

Need help? WhatsApp: +254797486557
