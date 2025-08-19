# Adding New Features 🚀

Want to add cool new features to the game? Here's how!

## 🦠 Adding New Diseases

Edit `game.js` and add to the arrays:

### Common Diseases
```javascript
// Add to commonDiseases array
{ 
    name: "New Disease", 
    symptoms: "List symptoms here", 
    treatment: "tool_name", 
    cure: "Treatment description", 
    severity: "mild" // mild, moderate, severe
}
```

### Rare Diseases
```javascript
// Add to rareDiseases array
{ 
    name: "Rare Condition", 
    symptoms: "Rare symptoms", 
    treatment: "special_tool", 
    cure: "Special treatment", 
    severity: "chronic"
}
```

## 🔧 Adding New Tools

1. **Add tool button in `index.html`:**
```html
<button onclick="useTool('newtool')">🔬 New Tool</button>
```

2. **Update diseases to use the new tool:**
```javascript
treatment: "newtool"
```

## 🎨 Changing Colors

Edit `style.css` to change:
- Background colors
- Button colors
- Text colors
- Patient card styling

## 👥 Adding New Patients

1. Add new patient images to `images/patients/`
2. Update `patientImages` array in `game.js`
3. Add new names to `patientNames` array

## 🏆 Modifying Scoring

In `game.js`, change:
- Points per disease type
- Level requirements
- Reward titles and badges

## 🎵 Adding Sounds (Future)

Create `sounds/` folder and add:
- Success sounds
- Tool usage sounds
- Background music
- Level up sounds

## 📱 Making it Mobile-Friendly

The game already works on phones and tablets, but you can improve:
- Button sizes in `style.css`
- Touch interactions
- Screen orientation handling

---

**Remember:** After making changes, commit them to GitHub and they'll automatically update on your live game!