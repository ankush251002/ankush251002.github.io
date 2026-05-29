# Ankush - Data Analyst Portfolio

A modern, responsive portfolio website showcasing data analytics projects and skills.

## 🚀 Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI** - Clean, professional design with smooth animations
- **Easy to Customize** - Simple HTML/CSS/JS structure
- **Fast Loading** - Optimized for performance
- **SEO Friendly** - Proper meta tags and semantic HTML

## 📁 Structure

```
portfolio/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # Interactive features
└── README.md       # This file
```

## 🛠️ Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Font Awesome Icons

## 🎨 Customization

### Update Your Information

1. **Personal Details** (in `index.html`):
   - Line 19: Your name in the navbar
   - Line 30-35: Hero section title and subtitle
   - Line 36-38: Your description
   - Lines 42-48: Social media links (update URLs)
   - Line 161: Your email
   - Line 164: Your location

2. **Projects** (in `index.html`):
   - Lines 172-245: Update project cards with your projects
   - Add project images or replace placeholder icons
   - Update GitHub links

3. **Skills** (in `index.html`):
   - Lines 123-158: Update skill bars and percentages
   - Adjust `style="width: X%"` to reflect your skill level

4. **Colors** (in `styles.css`):
   - Lines 10-20: CSS variables for easy color customization
   - Change `--primary-color` and `--secondary-color` for your brand

## 📤 Deployment to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to GitHub and create a new repository
2. Name it: `your-username.github.io` (replace `your-username` with your GitHub username)
   - Example: `ankush251002.github.io`

### Step 2: Upload Files

```bash
# In your terminal, navigate to the portfolio folder
cd /path/to/portfolio

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio commit"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/your-username/your-username.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** section (in the left sidebar)
4. Under **Source**, select `main` branch
5. Click **Save**

### Step 4: Access Your Site

Your portfolio will be live at: `https://your-username.github.io`

It may take a few minutes for the site to go live the first time.

## 🔄 Updating Your Portfolio

Whenever you make changes:

```bash
git add .
git commit -m "Updated projects/skills/etc"
git push
```

Changes will appear on your live site within a few minutes.

## 📸 Adding Project Images

To replace placeholder icons with actual images:

1. Add your image files to the repository
2. In `index.html`, replace the placeholder div:

```html
<!-- Replace this: -->
<div class="project-placeholder">
    <i class="fas fa-shopping-cart"></i>
</div>

<!-- With this: -->
<img src="path/to/your/image.jpg" alt="Project screenshot">
```

## 💡 Tips

1. **LinkedIn URL**: Update line 45 with your actual LinkedIn profile
2. **Contact Form**: The form is currently a demo. To make it functional:
   - Use services like Formspree, EmailJS, or Netlify Forms
   - Or connect to your own backend
3. **Analytics**: Add Google Analytics code before `</body>` tag to track visitors
4. **Custom Domain**: You can use a custom domain instead of `username.github.io`
   - Add a `CNAME` file with your domain
   - Update DNS settings

## 🎯 Next Steps

1. Update all personal information
2. Add your actual project screenshots
3. Link to your real GitHub projects
4. Update your LinkedIn profile URL
5. Deploy to GitHub Pages
6. Share the link on your resume and LinkedIn!

## 📝 License

Feel free to use this template for your own portfolio!

---

**Built with ❤️ for Data Analysts**
