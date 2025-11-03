# 🎓 Interactive Flexbox Tutorial

An interactive, step-by-step tutorial for learning CSS Flexbox through building a two-column layout with a sticky sidebar and anchor navigation.

## ✨ Features

### 🎯 Interactive Learning Experience

- **Split-view layout**: Tutorial steps on the left, workspace on the right
- **Collapsible accordion sections**: Focus on one part at a time
- **Live progress tracking**: Visual indicator shows completion percentage
- **Step-by-step guidance**: Six comprehensive parts (A-F) covering all concepts

### 💻 Live Code Workspace

- **In-browser code editor**: Write HTML and CSS directly in the tutorial using codepen  REMEMBER TO SIGN INTO YOUR CODEPEN ACCOUNT FIRST!!! 
- **Live preview**: See your changes rendered in real-time
- **Auto-save**: Your code is automatically saved to localStorage
- **Download functionality**: Export your HTML and CSS files when done
- **Dual-tab editor**: Switch between HTML and CSS editing

### ✅ Checkpoint Validation

- **Interactive checkpoints**: Validate your progress at each step
- **Instant feedback**: Get confirmation when you complete milestones
- **Visual celebration**: Success animations for completed steps

### 💡Hints Toggles

- **Show/Hide solutions**: Reveal code solutions when you need help
- **Hints and tips**: Helpful boxes with common gotchas and best practices
- **Resource links**: Direct links to MDN documentation for deeper learning

### 📝 Reflection System

- **Guided reflections**: Thoughtful questions after each section
- **Auto-save reflections**: Your writing is saved automatically
- **Copy all reflections**: Export all your reflections at once for submission

### ⚡ Smart Features

- **LocalStorage persistence**: All progress, code, and reflections saved locally
- **Keyboard shortcuts**:
  - `Ctrl/Cmd + Enter` to update preview
  - `Ctrl/Cmd + S` to save code
- **Responsive design**: Works on desktop, tablet, and mobile
- **Smooth scrolling**: Elegant navigation between sections
- **Progress indicators**: Visual status for each tutorial step

## 🚀 Getting Started

### For Students:

1. Visit the tutorial at: **[Your instructor will provide the URL]**
2. The tutorial loads with an embedded CodePen workspace on the right
3. Follow along step-by-step through Parts A-F
4. Your progress is automatically saved in your browser

### For Instructors (Local Setup):

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Or deploy to GitHub Pages for easy student access 

## 📚 Tutorial Structure

### Part A: Scaffold the HTML
Learn to create semantic HTML structure with:
- Header, main, nav, and sections
- Anchor links with matching IDs
- Decorative elements

### Part B: Flexbox Two-Column Layout
Master Flexbox basics:
- Creating flex containers
- Fixed vs. flexible sizing
- Gap and padding

### Part C: Sticky Sidebar
Implement sticky positioning:
- `position: sticky`
- Viewport calculations
- Overflow handling

### Part D: Anchor Links + Scroll Polish
Polish the user experience:
- Smooth scrolling
- Scroll margin for proper alignment
- Navigation functionality

### Part E: Decorative Icons
Add visual interest:
- Downloading icons from The Noun Project
- Uploading to Snipboard.io for CodePen use
- Absolute positioning with `pointer-events: none`
- Unique icon positioning per section

### Part F: Finishing Touches
Complete with accessibility:
- Focus styles
- Enhanced navigation
- Optional improvements

## 🎯 Learning Outcomes

By completing this tutorial, students will:

1. ✅ Understand Flexbox container and item properties
2. ✅ Create fixed-width and flexible columns
3. ✅ Implement sticky positioning
4. ✅ Build accessible navigation with anchor links
5. ✅ Position decorative elements safely
6. ✅ Apply CSS best practices
7. ✅ Write reflections to cement learning

## 💾 Data Persistence

All student data is stored locally in the browser using localStorage:

- **Progress tracking**: Completed steps
- **Code work**: HTML and CSS in the editor
- **Reflections**: Written responses to prompts
- **No server required**: Everything works offline

### Reset Progress

Click the "🔄 Reset Progress" button in the sidebar to clear all saved data and start fresh.

## 🎨 Customization

### For Instructors

You can customize the tutorial by editing:

- `index.html` - Add/modify tutorial content and steps
- `tutorial-styles.css` - Change colors, spacing, and visual design
- `tutorial.js` - Adjust validation logic and interactive features

### Color Scheme 

CSS custom properties in `tutorial-styles.css` make it easy to rebrand:

```css
:root {
  --primary-color: #3b82f6;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  /* ... and more */
}
```

## 📋 Submission Checklist

Students should complete:

- [ ] All 6 parts (A-F) with code in the live editor
- [ ] Checkpoint validation for each part
- [ ] Reflections for all sections (6-10 sentences total)
- [ ] Download final HTML and CSS files
- [ ] Copy all reflections for submission

### Grading Rubric (10 pts)

- **4 pts** — Layout correctness (Flexbox, 300px sidebar, sticky behavior)
- **3 pts** — Anchors & scroll polish (IDs matched, smooth scroll, scroll-margin)
- **2 pts** — Decorative icons (positioned safely with absolute positioning, varied locations)
- **1 pt** — Reflection quality (clear, specific, shows understanding)

## 🛠️ Technical Details

### Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Flexbox, Grid, custom properties
- **Vanilla JavaScript**: No frameworks or dependencies
- **localStorage API**: Client-side data persistence

### Browser Compatibility

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### No Build Process

This is a static site with no build step required. Just open and use!

## 🎓 Pedagogical Approach

This tutorial follows evidence-based learning principles:

1. **Progressive disclosure**: Information revealed step-by-step
2. **Active learning**: Students write code, not just read
3. **Immediate feedback**: Checkpoints validate understanding
4. **Metacognition**: Reflections encourage thinking about thinking
5. **Low stakes**: Save progress, experiment safely, reset anytime
6. **Scaffolding**: Solutions available when students are stuck

## 🐛 Troubleshooting

### Preview not updating?
- Click "🔄 Update Preview" button
- Enable "Auto-update preview" checkbox
- Try `Ctrl/Cmd + Enter`

### Lost progress?
- Check if localStorage is enabled in your browser
- Make sure you're using the same browser and not in incognito mode

### Code won't download?
- Check your browser's download settings
- Look in your Downloads folder
- Try copying code manually from the editor

## 📞 Support

For questions or issues:
- Review the built-in hints and solutions
- Check the resource links to MDN documentation
- Ask your instructor for clarification

## 📄 License

This educational material is free to use, modify, and distribute for educational purposes.

---

**Built with ❤️ for students learning web development**

Start your Flexbox journey by opening `index.html` in your browser!
