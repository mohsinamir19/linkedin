# Quick Start Guide

Get your LinkedIn AI Agent frontend connected to your FastAPI backend in 5 minutes.

## Prerequisites

- ✅ Node.js 18+ installed
- ✅ Your FastAPI backend running
- ✅ Backend implements these endpoints:
  - `POST /agents/post/chat`
  - `POST /agents/analytics/chat`
  - `POST /agents/lead/search`

## Installation (2 minutes)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure API URL**
   
   The `.env` file is already set up with:
   ```
   VITE_API_BASE_URL=http://localhost:8000
   ```
   
   Change this if your backend runs on a different port.

3. **Start the app**
   ```bash
   npm run dev
   ```
   
   Frontend will be available at: `http://localhost:5173`

## Testing (3 minutes)

### Ensure Backend is Running

```bash
# In your FastAPI project directory
uvicorn main:app --reload
```

Your backend should be running on `http://localhost:8000`

### Test 1: Post Agent ✨

1. Open http://localhost:5173
2. You should see the **Posts** tab by default
3. Type in the chat: `"Create a post about AI trends"`
4. Press Enter or click Send

**Expected Result:**
- Your message appears in the chat
- Typing indicator shows "AI is typing..."
- AI response appears
- Post preview updates on the right side

**If you see an error banner:**
- Check that your backend is running
- Verify `.env` has the correct URL
- Check browser console (F12) for error details

### Test 2: Analytics Agent 📊

1. Click the **Analytics** tab in the header
2. Type: `"What's my best posting time?"`
3. Press Enter

**Expected Result:**
- AI provides insights about posting times
- Dashboard on the right shows metrics
- No error banners

### Test 3: Leads Agent 🎯

1. Click the **Leads** tab
2. Fill in at least one filter (e.g., Job Title: "Marketing Manager")
3. Click **Find Leads**

**Expected Result:**
- Progress bar appears and animates
- "Searching LinkedIn..." message shows
- Results table appears with leads
- Success message: "Found X potential leads"
- Export buttons appear

## Troubleshooting

### Problem: "Connection Error" banner appears

**Solution:**
```bash
# 1. Verify backend is running
curl http://localhost:8000

# 2. Check if it responds
curl -X POST http://localhost:8000/agents/post/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test","session_id":"test"}'

# 3. Restart both servers
# Terminal 1 (Backend):
uvicorn main:app --reload

# Terminal 2 (Frontend):
npm run dev
```

### Problem: CORS Error in Console

**Solution:** Add CORS middleware to your FastAPI backend:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Problem: Wrong Response Format

**Solution:** Verify your backend returns the correct format:

**Post Agent Response:**
```json
{
  "session_id": "string",
  "response": "string",
  "conversation": [{"role": "user", "content": "..."}]
}
```

**Analytics Agent Response:**
```json
{
  "session_id": "string",
  "response": {
    "status": "completed",
    "decision": {"insight": "string"}
  },
  "history": ["string"]
}
```

**Leads Agent Response:**
```json
{
  "session_id": "string",
  "status": "completed",
  "data": [{"id": "1", "name": "...", "role": "...", ...}]
}
```

## Next Steps

✅ **You're ready to use the app!**

Now you can:
- Create AI-generated LinkedIn posts
- Get analytics insights through conversation
- Search for leads with advanced filters
- Schedule posts and export data

## More Information

- **Full API Documentation:** See `API_INTEGRATION.md`
- **Setup Instructions:** See `README.md`
- **Design System:** See `DESIGN_SYSTEM.md`
- **Components:** See `COMPONENT_SHOWCASE.md`

## Support Checklist

If something isn't working, check:

- [ ] Backend is running on port 8000 (or configured port)
- [ ] `.env` file has correct `VITE_API_BASE_URL`
- [ ] CORS is configured in backend
- [ ] All three endpoints are implemented
- [ ] Response formats match the expected structure
- [ ] No errors in backend logs
- [ ] No errors in browser console (F12)

## Development Tips

**Hot Reload:** Both backend (with `--reload`) and frontend (Vite) support hot reload. Changes will reflect immediately.

**Debug API Calls:** Open browser DevTools → Network tab to see all API requests and responses.

**Mock Data Fallback:** If the backend is unavailable, the app will gracefully fall back to showing mock data, so you can still work on the UI.

---

**That's it!** You should now have a fully functional LinkedIn AI Agent with real-time backend integration. 🚀
