# Testing Checklist

Use this checklist to verify your backend integration is working correctly.

## Pre-Testing Setup

- [ ] FastAPI backend is running
  ```bash
  uvicorn main:app --reload
  ```

- [ ] Frontend development server is running
  ```bash
  npm run dev
  ```

- [ ] `.env` file has correct API URL
  ```bash
  cat .env
  # Should show: VITE_API_BASE_URL=http://localhost:8000
  ```

- [ ] No build errors in terminal
- [ ] Browser is open to http://localhost:5173

## Test 1: Post Agent 🚀

### Basic Chat Functionality
- [ ] Navigate to "Posts" tab (should be default)
- [ ] Chat interface loads without errors
- [ ] Welcome message from AI is visible
- [ ] Input field is clickable and functional

### API Integration
- [ ] Type message: `"Create a post about AI trends"`
- [ ] User message appears immediately in chat
- [ ] "AI is typing..." indicator shows
- [ ] AI response appears within a few seconds
- [ ] Post preview updates on right side
- [ ] No red error banner appears

### Session Management
- [ ] Send multiple messages
- [ ] Check browser console - session_id should be consistent
- [ ] Refresh page - new session_id should be generated

### Error Handling
- [ ] Stop backend server
- [ ] Send a message
- [ ] Red error banner should appear
- [ ] Error message should appear in chat
- [ ] Restart backend and try again - should work

### Expected Console Output (DevTools → Console)
```
No errors
Network requests to POST /agents/post/chat return 200
```

### Expected Network Tab (DevTools → Network)
```
POST /agents/post/chat
Status: 200
Response: { "session_id": "...", "response": "...", "conversation": [...] }
```

---

## Test 2: Analytics Agent 📊

### Basic Chat Functionality
- [ ] Navigate to "Analytics" tab
- [ ] Chat interface loads
- [ ] Welcome message is visible
- [ ] Dashboard shows metrics on right side
- [ ] All KPI cards are visible

### API Integration
- [ ] Type: `"What's my best posting time?"`
- [ ] User message appears
- [ ] Typing indicator shows
- [ ] AI insight response appears
- [ ] Response is formatted nicely
- [ ] No error banner

### Different Query Types
- [ ] Ask: `"Show me my engagement trends"`
  - [ ] Receives appropriate response
- [ ] Ask: `"How can I improve my posts?"`
  - [ ] Receives actionable recommendations
- [ ] Ask: `"What content performs best?"`
  - [ ] Receives content analysis

### Session Management
- [ ] Session_id persists across multiple questions
- [ ] History builds up (check network response)

### Error Handling
- [ ] Stop backend
- [ ] Ask a question
- [ ] Error banner appears
- [ ] Error message in chat
- [ ] Restart backend - functionality restored

### Expected Console Output
```
No errors
POST /agents/analytics/chat returns 200
Response includes status and decision/reply
```

---

## Test 3: Leads Agent 🎯

### Basic UI Functionality
- [ ] Navigate to "Leads" tab
- [ ] Header shows "Leads Agent"
- [ ] Filter panel is visible
- [ ] All input fields are functional
- [ ] Industry dropdown works
- [ ] "Find Leads" button is clickable

### API Integration - Basic Search
- [ ] Fill in Job Title: `"Marketing Manager"`
- [ ] Fill in Location: `"San Francisco, CA"`
- [ ] Click "Find Leads"
- [ ] Progress bar appears and animates
- [ ] "Searching LinkedIn..." message shows
- [ ] Profile count increases
- [ ] Results table appears after completion
- [ ] Success message shows lead count
- [ ] Export buttons appear

### API Integration - Filtered Search
- [ ] Clear previous search
- [ ] Fill filters:
  - Job Title: `"VP of Marketing"`
  - Location: `"New York, NY"`
  - Industry: `"Technology"`
  - Keywords: `"SaaS, B2B, AI"`
- [ ] Click "Find Leads"
- [ ] Results match filters
- [ ] All lead fields are populated:
  - [ ] Name
  - [ ] Role
  - [ ] Company
  - [ ] Location
  - [ ] Connection degree
  - [ ] Profile URL

### Results Validation
- [ ] Table displays all leads
- [ ] Connection degree badges have correct colors:
  - 1st = Green
  - 2nd = Blue
  - 3rd = Gray
- [ ] "View Profile" links work (open in new tab)
- [ ] Table is scrollable on small screens

### Error Handling
- [ ] Stop backend
- [ ] Try search
- [ ] Orange warning banner appears
- [ ] Mock data still displays (graceful fallback)
- [ ] Search completes successfully with fallback data
- [ ] Restart backend - real data returns

### Expected Console Output
```
No errors for successful search
"API returned non-array data" warning if backend fails (expected)
POST /agents/lead/search returns 200
```

---

## Cross-Browser Testing

Test in multiple browsers:

### Chrome/Edge
- [ ] All three agents work
- [ ] No console errors
- [ ] API calls succeed
- [ ] Responsive design works

### Firefox
- [ ] All three agents work
- [ ] No console errors
- [ ] API calls succeed
- [ ] Responsive design works

### Safari (Mac only)
- [ ] All three agents work
- [ ] No console errors
- [ ] API calls succeed
- [ ] Responsive design works

---

## Responsive Design Testing

### Desktop (> 1024px)
- [ ] Two-column layout displays correctly
- [ ] All content is visible
- [ ] No horizontal scrolling
- [ ] Buttons are properly sized

### Tablet (640px - 1024px)
- [ ] Layout adjusts appropriately
- [ ] Tables are scrollable
- [ ] Buttons remain accessible
- [ ] Text is readable

### Mobile (< 640px)
- [ ] Single-column layout
- [ ] Navigation is compact
- [ ] Touch targets are large enough
- [ ] Forms are usable
- [ ] Tables scroll horizontally

---

## Performance Testing

### Load Times
- [ ] Initial page load < 2 seconds
- [ ] Tab switching is instant
- [ ] Chat messages appear immediately
- [ ] API responses < 3 seconds

### Memory Usage
- [ ] No memory leaks after extended use
- [ ] Page remains responsive after 50+ messages
- [ ] No console warnings about performance

---

## Security Testing

### API Calls
- [ ] No API keys exposed in frontend code
- [ ] CORS is properly configured
- [ ] Requests use HTTPS in production
- [ ] Session IDs are generated securely

### Data Handling
- [ ] User messages are not logged to console
- [ ] Sensitive data is not cached
- [ ] No XSS vulnerabilities in rendered content

---

## Production Readiness

### Environment Configuration
- [ ] `.env` can be changed without code changes
- [ ] `VITE_API_BASE_URL` works with different values
- [ ] Build process respects environment variables

### Build Process
- [ ] `npm run build` completes successfully
- [ ] No errors in build output
- [ ] `dist/` folder is created
- [ ] Assets are optimized

### Deployment
- [ ] Built files work on web server
- [ ] API calls work in production
- [ ] CORS is configured for production domain
- [ ] HTTPS is enforced

---

## Issue Resolution

If any tests fail, check:

1. **Backend Connection**
   ```bash
   curl http://localhost:8000
   ```

2. **CORS Configuration**
   - Check backend logs for CORS errors
   - Verify `allow_origins` includes frontend URL

3. **Response Format**
   - Use Network tab to inspect responses
   - Compare with interfaces in `/src/lib/api.ts`

4. **Environment Variables**
   - Restart dev server after changing `.env`
   - Verify with `import.meta.env.VITE_API_BASE_URL`

5. **Console Errors**
   - Open browser console (F12)
   - Look for red errors
   - Check Network tab for failed requests

---

## Success Criteria

✅ **All tests passing indicates:**
- Backend integration is working correctly
- Error handling is functioning
- UI is responsive and accessible
- Session management is working
- API contracts are respected
- Application is production-ready

## Next Steps After Testing

1. **If all tests pass:**
   - Deploy to staging environment
   - Perform user acceptance testing
   - Prepare for production deployment

2. **If tests fail:**
   - Reference troubleshooting guides:
     - `QUICKSTART.md` for common issues
     - `API_INTEGRATION.md` for detailed debugging
     - `BACKEND_INTEGRATION.md` for setup verification

---

**Testing Date:** _________________

**Tester Name:** _________________

**Backend Version:** _________________

**Frontend Version:** _________________

**Pass/Fail:** _________________

**Notes:**
_____________________________________________
_____________________________________________
_____________________________________________
