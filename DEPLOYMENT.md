# Quick Deployment Guide for Sawi's Delight Cakes

## 🚀 Deploy to Vercel (5 Minutes)

### Step 1: Prepare Your Images

1. Copy all your cake photos to the `images/` folder
2. Rename them according to the pattern:
   - Hero images: `hero1.jpg`, `hero2.jpg`, `hero3.jpg`
   - Birthday cakes: `birthday1.jpg`, `birthday2.jpg`, `birthday3.jpg`
   - Kids cakes: `kids1.jpg`, `kids2.jpg`, `kids3.jpg`
   - Graduation: `grad1.jpg`, `grad2.jpg`, `grad3.jpg`
   - Wedding: `wedding1.jpg`, `wedding2.jpg`, `wedding3.jpg`
   - Traditional: `trad1.jpg`, `trad2.jpg`, `trad3.jpg`
   - Church: `church1.jpg`, `church2.jpg`, `church3.jpg`

### Step 2: Initialize Git

Open terminal/command prompt in the project folder and run:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Sawi's Delight Cakes website"
```

### Step 3: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `sawi-delight-cakes`
3. Make it **Public** or **Private** (your choice)
4. Don't initialize with README
5. Click "Create repository"

### Step 4: Push to GitHub

Copy the commands from GitHub and run them:

```bash
git remote add origin https://github.com/YOUR-USERNAME/sawi-delight-cakes.git
git branch -M main
git push -u origin main
```

### Step 5: Deploy to Vercel

1. Go to https://vercel.com/signup
2. Click "Continue with GitHub"
3. Once logged in, click "Add New..." → "Project"
4. Find your `sawi-delight-cakes` repository
5. Click "Import"
6. Leave all settings as default
7. Click "Deploy"
8. Wait 30-60 seconds
9. ✅ Done! Your site is live!

### Step 6: Get Your Links

Vercel will give you:
- **Public URL**: `https://sawi-delight-cakes.vercel.app`
- **Admin URL**: `https://sawi-delight-cakes.vercel.app/admin.html`

**IMPORTANT**: Keep the admin URL secret! Only share the main website link.

### Step 7: Add Custom Domain (Optional)

1. Buy domain from Namecheap, GoDaddy, etc.
2. In Vercel dashboard: Settings → Domains
3. Add your domain (e.g., `sawisdelight.com`)
4. Follow DNS configuration
5. Wait for DNS propagation (10 mins - 48 hours)

## 📱 Using Your Website

### For Customers (Public Site)
Share: `https://your-site.vercel.app`

### For You (Admin Panel)
Access: `https://your-site.vercel.app/admin.html`

**Don't share this link with customers!**

## 🔄 Updating Content

### Method 1: Use Admin Panel (Recommended)
1. Go to your admin URL
2. Make changes
3. Click "Save Changes"
4. Refresh your website - changes appear instantly!

### Method 2: Edit Files Directly
1. Edit files locally
2. Run:
   ```bash
   git add .
   git commit -m "Updated cake prices"
   git push
   ```
3. Vercel auto-deploys in 30 seconds

## 🎨 Customization Tips

### Change Colors
Edit the CSS variables in `index.html`:
```css
:root {
    --cream: #FFF8F0;
    --gold: #D4AF37;
    --rose: #FFB6C1;
}
```

### Add More Cakes
1. Open `admin.html`
2. Go to "Cake Categories" tab
3. Edit existing or duplicate one in `data.js`

### Change Phone Number
1. Open `admin.html`
2. Go to "Business Info" tab
3. Update phone number
4. Save changes

## 🐛 Troubleshooting

### Images Not Showing
- Check image filenames match exactly (case-sensitive!)
- Images must be in `images/` folder
- Supported formats: .jpg, .jpeg, .png, .webp

### Admin Changes Not Saving
- Make sure you clicked "Save Changes" button
- Check browser localStorage is enabled
- Try clearing browser cache (Ctrl+Shift+Del)

### Website Not Deploying
- Check all files are committed: `git status`
- Check Vercel dashboard for error messages
- Make sure `index.html` exists in root folder

## 📞 Next Steps

1. ✅ Add all your cake images
2. ✅ Test admin panel - edit some content
3. ✅ Share public URL with friends for testing
4. ✅ Update business info in admin
5. ✅ Add more testimonials
6. ✅ Launch and share with customers!

## 🌟 Pro Tips

- **Backup**: Keep original images in a separate folder
- **Mobile**: Always test on mobile devices
- **SEO**: Add your business to Google My Business
- **Social**: Link to your Facebook/Instagram
- **Analytics**: Add Google Analytics code to track visitors

## 💡 Need More Features?

Future upgrades could include:
- Online payment integration (M-Pesa)
- Customer login/accounts
- Order tracking system
- Automated order confirmations via email/SMS
- Photo gallery with categories
- Blog for cake tips and recipes

---

**Your website is ready to launch! 🎉**

Public URL: `https://sawi-delight-cakes.vercel.app`
Admin URL: `https://sawi-delight-cakes.vercel.app/admin.html` (keep private!)

Any questions? WhatsApp: +254797486557
