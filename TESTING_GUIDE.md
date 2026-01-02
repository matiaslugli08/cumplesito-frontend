# Testing Guide

This guide will help you test all features of the Birthday Wishlist application.

## Manual Testing Scenarios

### Scenario 1: Create a Wishlist as Owner

1. **Navigate to Home Page**
   - Open `http://localhost:3000`
   - You should see the landing page with "Birthday Wishlist" title
   - Verify the 3 feature cards are displayed

2. **Create New Wishlist**
   - Click "Create Your Wishlist"
   - Fill in the form:
     - Title: "My 30th Birthday Wishlist"
     - Your Name: "John Doe"
     - Birthday Date: Select a future date
     - Description: "Items I'd love to receive for my birthday!"
   - Click "Create Wishlist"
   - You should be redirected to your wishlist page

3. **Add First Item**
   - Click "Add Item" button
   - Fill in the form:
     - Title: "Wireless Noise-Canceling Headphones"
     - Description: "Sony WH-1000XM5 in black color"
     - Image URL: `https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400`
     - Product URL: `https://www.amazon.com/example-product`
   - Click "Add Item"
   - Verify the item appears in your wishlist

4. **Add More Items**
   - Add at least 2 more items with different details
   - Use these sample image URLs:
     - `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400` (watch)
     - `https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400` (book)

5. **Edit an Item**
   - Click "Edit" on one of your items
   - Change the title or description
   - Click "Update Item"
   - Verify the changes are saved

6. **Delete an Item**
   - Click "Delete" on one item
   - Confirm the deletion
   - Verify the item is removed

7. **Copy Share Link**
   - Click "Copy Share Link"
   - Verify you see "Copied!" message
   - Open a new incognito/private window
   - Paste and visit the link (without `?owner=true` parameter)

### Scenario 2: Visit Wishlist as Guest

1. **Open Shared Link**
   - Use the link from Scenario 1 (make sure `?owner=true` is NOT in the URL)
   - You should see the wishlist but WITHOUT "Add Item" button
   - Verify you see "Edit" and "Delete" buttons are NOT visible

2. **Mark Item as Purchased**
   - Click "Mark as Purchased" on an item
   - Enter your name: "Sarah Smith"
   - Click "Confirm Purchase"
   - Verify the item shows as "Purchased by Sarah Smith"
   - Verify a green overlay appears on the item

3. **Unmark Item as Purchased**
   - Click "Unmark as Purchased" on the same item
   - Verify the green overlay disappears
   - Verify the item is available again

4. **Copy Link**
   - Click "Copy Link" button
   - Share with another person or open in another window

### Scenario 3: Test Responsiveness

1. **Desktop View**
   - Open in full screen
   - Verify items display in 3 columns

2. **Tablet View**
   - Resize browser to ~768px width
   - Verify items display in 2 columns
   - Check that navigation and forms are still usable

3. **Mobile View**
   - Resize to ~375px width (or use mobile device)
   - Verify items display in 1 column
   - Check all buttons are accessible
   - Verify forms are easy to fill

### Scenario 4: Test Data Persistence

1. **Create Wishlist and Items**
   - Create a wishlist with 3 items
   - Copy the URL

2. **Close and Reopen Browser**
   - Close the browser completely
   - Open browser again
   - Paste the URL
   - Verify all data is still there (thanks to localStorage)

3. **Clear Browser Data**
   - Clear browser's localStorage
   - Reload the page
   - You should be redirected to home (wishlist not found)

## Sample Test Data

### Sample Wishlist

```
Title: My 30th Birthday Celebration
Owner Name: John Doe
Event Date: 2025-06-15
Description: Thank you for helping make my birthday special! Here are some items I'd love to receive. Feel free to go off-list too!
```

### Sample Items

**Item 1: Headphones**
```
Title: Sony WH-1000XM5 Headphones
Description: Wireless noise-canceling headphones in black. Perfect for work and travel!
Image URL: https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400
Product URL: https://www.amazon.com/Sony-WH-1000XM5-Canceling-Headphones-Hands-Free/dp/B09XS7JWHH
```

**Item 2: Smart Watch**
```
Title: Apple Watch Series 9
Description: GPS + Cellular, 45mm, Midnight Aluminum Case
Image URL: https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400
Product URL: https://www.apple.com/shop/buy-watch/apple-watch
```

**Item 3: Book**
```
Title: "Atomic Habits" by James Clear
Description: Hardcover edition. I've been wanting to read this!
Image URL: https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400
Product URL: https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299
```

**Item 4: Coffee Maker**
```
Title: Breville Barista Express
Description: Espresso machine with built-in grinder. Love my morning coffee!
Image URL: https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400
Product URL: https://www.breville.com/us/en/products/espresso/bes870.html
```

## Edge Cases to Test

### Form Validation

1. **Empty Fields**
   - Try to create a wishlist without filling all fields
   - Verify error messages appear

2. **Invalid URLs**
   - Try to add an item with invalid image URL (e.g., "not-a-url")
   - Verify validation error

3. **Future Date**
   - Try dates in the past and future
   - Both should work (past birthdays are valid)

### User Interactions

1. **Multiple Purchases**
   - Have 2 different people (windows) open the same wishlist
   - Both try to purchase the same item
   - Verify purchase status updates correctly

2. **Rapid Clicks**
   - Click "Add Item" button multiple times quickly
   - Verify only one modal opens

3. **Cancel Actions**
   - Open "Add Item" modal
   - Click cancel or X
   - Verify modal closes without saving

### Image Loading

1. **Valid Image URL**
   - Add item with valid image URL
   - Verify image loads correctly

2. **Invalid Image URL**
   - Add item with broken image URL
   - Verify placeholder image appears

3. **No Image**
   - Add item with empty image URL (if validation allows)
   - Verify graceful fallback

## Browser Testing

Test on multiple browsers:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (if on Mac)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Checklist

- [ ] Page loads in under 2 seconds
- [ ] Forms submit quickly (mock delay is 300ms)
- [ ] Images load progressively
- [ ] No console errors
- [ ] Smooth animations and transitions
- [ ] Responsive layout adjusts quickly

## Accessibility Checklist

- [ ] All buttons have visible focus states
- [ ] Forms can be submitted with Enter key
- [ ] Color contrast is sufficient
- [ ] Images have alt text
- [ ] Modal can be closed with Escape key (if implemented)
- [ ] Semantic HTML is used

## Success Criteria

Your app passes testing if:
- ✅ All scenarios complete without errors
- ✅ Data persists across page refreshes
- ✅ Multiple users can interact with the same wishlist
- ✅ Forms validate correctly
- ✅ UI is responsive on all screen sizes
- ✅ Purchase tracking works correctly
- ✅ Share links work in incognito mode

## Known Limitations (Mock API)

- Data is stored in browser localStorage only
- Clearing browser data removes all wishlists
- No real-time sync between users (refresh needed)
- No user authentication
- Links work only on the same domain

These will be resolved once the backend is integrated!

---

**Happy Testing! 🧪✨**
