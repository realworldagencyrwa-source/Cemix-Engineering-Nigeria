# Deploy Your Website to www.cemix-nigeria.com

## ✅ What's Already Done
- Production build is ready in the `dist` folder
- All deployment configuration files are created
- Your site is fully functional and tested

## 🚀 Quick Deploy Options

### **FASTEST: Deploy to Vercel (5 minutes)**

1. **Go to https://vercel.com/new**
2. **Sign up/Login** (use GitHub, GitLab, or Bitbucket)
3. **Import this project:**
   - Click "Add New Project"
   - Connect to your Git repository OR
   - Drag and drop your project folder
4. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add these two:
     ```
     VITE_SUPABASE_URL = https://cflpphrddekccakfkkjz.supabase.co
     VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmbHBwaHJkZGVrY2Nha2Zra2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDAzNjcsImV4cCI6MjA4NjM3NjM2N30.vTK_NaUyYikrM2gpZYWEvvMqFy5VrRX-mYsTukLWeXw
     ```
5. **Click "Deploy"**
6. **Wait 2-3 minutes** - Vercel will build and deploy

### **After Vercel Deployment:**

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Click "Add Domain"
   - Enter: `www.cemix-nigeria.com`
   - Enter: `cemix-nigeria.com`
   - Vercel will show you DNS settings

2. **Copy the DNS settings Vercel provides** (will look like this):
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## 🌐 Update Your Network Solutions DNS

1. **Login to Network Solutions:**
   - Go to https://www.networksolutions.com/my-account/hosting/list
   - Login to your account

2. **Navigate to DNS Management:**
   - Go to "My Account" → "Domain Names"
   - Find `cemix-nigeria.com`
   - Click "Manage" or "Edit DNS"

3. **Update DNS Records:**
   - Look for "Advanced DNS" or "DNS Manager"
   - **Important:** Keep your MX records (email) unchanged!
   - Update/Add these records with the values Vercel gave you:
     - **A Record:** Point `@` to Vercel's IP
     - **CNAME Record:** Point `www` to Vercel's CNAME

4. **Save Changes**

---

## ⏰ Timeline

- Deploy to Vercel: **3-5 minutes**
- Update DNS at Network Solutions: **2 minutes**
- DNS Propagation (worldwide): **2-24 hours** (usually faster)
- SSL Certificate: **Automatic** (within 1 hour of DNS propagation)

---

## 🔍 Check Your Progress

**Immediately after DNS update:**
- Check if it's working: https://www.whatsmydns.net
- Enter: `www.cemix-nigeria.com`
- See if DNS has propagated globally

**Your site will be live at:**
- https://www.cemix-nigeria.com
- https://cemix-nigeria.com

---

## 📧 Important: Email Settings

If you use email with this domain (like info@cemix-nigeria.com):
- **DO NOT delete MX records** in Network Solutions
- Only change A and CNAME records
- Your email will continue working normally

---

## Alternative: Deploy to Netlify

If you prefer Netlify instead of Vercel:

1. Go to https://app.netlify.com/drop
2. Drag and drop your `dist` folder
3. Go to "Site settings" → "Environment variables"
4. Add the same two environment variables
5. Go to "Domain management" → "Add custom domain"
6. Follow similar DNS update steps

---

## ⚠️ Before You Start: Backup Checklist

- [ ] Download your old website files from Network Solutions
- [ ] Screenshot your current DNS settings
- [ ] Note down any email configuration (MX records)
- [ ] Save any important data from the old site

---

## 🆘 Need Help?

If you get stuck:
1. Take a screenshot of where you're stuck
2. Copy any error messages
3. Let me know and I'll guide you through it

---

## Your Supabase Details (Already Configured)

```
Supabase URL: https://cflpphrddekccakfkkjz.supabase.co
Supabase Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmbHBwaHJkZGVrY2Nha2Zra2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDAzNjcsImV4cCI6MjA4NjM3NjM2N30.vTK_NaUyYikrM2gpZYWEvvMqFy5VrRX-mYsTukLWeXw
```

These are already in your project - you just need to add them to Vercel/Netlify.
