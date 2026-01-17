# API Integration Guide

This document explains how the frontend integrates with your FastAPI backend and how to test the integration.

## Overview

The LinkedIn AI Agent frontend connects to four FastAPI endpoints:

1. **Post Agent** - `/agents/post/chat` - AI-powered post creation
2. **Analytics Agent** - `/agents/analytics/chat` - Performance insights
3. **Leads Agent** - `/agents/lead/search` - Lead generation
4. **Scheduler** - `/scheduler/jobs` - View scheduled posts

## API Client Architecture

### Location
All API integration logic is centralized in `/src/lib/api.ts`

### Configuration
API base URL is configured via environment variable:
```
VITE_API_BASE_URL=http://localhost:8000
```

### Error Handling
The API client includes:
- Type-safe request/response interfaces
- Automatic error parsing
- HTTP status code handling
- Network error detection

## API Endpoints

### 1. Post Agent

**Endpoint:** `POST /agents/post/chat`

**Purpose:** Generate LinkedIn posts through conversational AI

**Request Interface:**
```typescript
interface PostChatRequest {
  message: string;
  session_id?: string;
}
```

**Response Interface:**
```typescript
interface PostChatResponse {
  session_id: string;
  response: string;
  conversation: Array<{
    role: string;
    content: string;
  }>;
}
```

**Example Request:**
```json
{
  "message": "Create a LinkedIn post about the future of AI in healthcare",
  "session_id": "session-1234567890"
}
```

**Example Response:**
```json
{
  "session_id": "session-1234567890",
  "response": "🏥 The Future of AI in Healthcare is Here!\n\nAfter years of research and development...",
  "conversation": [
    {
      "role": "user",
      "content": "Create a LinkedIn post about the future of AI in healthcare"
    },
    {
      "role": "assistant",
      "content": "🏥 The Future of AI in Healthcare is Here!..."
    }
  ]
}
```

**Frontend Usage:**
```typescript
import { sendPostMessage } from '@/lib/api';

const response = await sendPostMessage(
  "Create a post about AI trends",
  "my-session-id"
);
console.log(response.response); // AI-generated post
```

**How It Works:**
1. User types message in chat interface
2. Frontend calls `sendPostMessage()`
3. Backend processes with AI orchestrator
4. Frontend receives generated content
5. Post preview updates in real-time
6. User can schedule or publish

---

### 2. Analytics Agent

**Endpoint:** `POST /agents/analytics/chat`

**Purpose:** Provide conversational analytics insights

**Request Interface:**
```typescript
interface AnalyticsRequest {
  message: string;
  session_id?: string;
}
```

**Response Interface:**
```typescript
interface AnalyticsResponse {
  session_id: string;
  response: {
    status: string;
    decision?: {
      insight?: string;
      [key: string]: any;
    };
    reply?: string;
    [key: string]: any;
  };
  history: string[];
}
```

**Example Request:**
```json
{
  "message": "What's my best posting time?",
  "session_id": "analytics-1234567890"
}
```

**Example Response (Completed):**
```json
{
  "session_id": "analytics-1234567890",
  "response": {
    "status": "completed",
    "decision": {
      "insight": "📊 Based on your last 30 days:\n\nBest Time: Tuesday 9:00 AM\n- 287 avg interactions\n- 45% higher engagement\n\nOther strong slots:\n• Wed 2:00 PM - 223 interactions\n• Thu 10:00 AM - 198 interactions"
    }
  },
  "history": [
    "User: What's my best posting time?",
    "AI: Based on your last 30 days..."
  ]
}
```

**Example Response (In Progress):**
```json
{
  "session_id": "analytics-1234567890",
  "response": {
    "status": "processing",
    "reply": "I'm analyzing your data now. This might take a moment..."
  },
  "history": ["User: What's my best posting time?"]
}
```

**Frontend Usage:**
```typescript
import { sendAnalyticsMessage } from '@/lib/api';

const response = await sendAnalyticsMessage(
  "Show me my engagement trends",
  "analytics-session"
);

if (response.response.status === "completed") {
  console.log(response.response.decision?.insight);
} else {
  console.log(response.response.reply);
}
```

**How It Works:**
1. User asks analytics question
2. Frontend calls `sendAnalyticsMessage()`
3. Backend analyzes data and generates insights
4. Response includes status and insight/reply
5. Frontend displays formatted insights
6. Dashboard visualizations update

---

### 3. Leads Agent

**Endpoint:** `POST /agents/lead/search`

**Purpose:** Search for potential LinkedIn leads with filters

**Request Interface:**
```typescript
interface LeadSearchRequest {
  filters: {
    job_title?: string;
    location?: string;
    industry?: string;
    keywords?: string[];
  };
  limit?: number;
  session_id?: string;
}
```

**Response Interface:**
```typescript
interface LeadSearchResponse {
  session_id: string;
  status: string;
  data: Lead[] | string;
}

interface Lead {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  profileUrl: string;
  connectionDegree?: string;
  [key: string]: any;
}
```

**Example Request:**
```json
{
  "filters": {
    "job_title": "VP of Marketing",
    "location": "San Francisco, CA",
    "industry": "Technology",
    "keywords": ["SaaS", "B2B", "AI"]
  },
  "limit": 10,
  "session_id": "leads-1234567890"
}
```

**Example Response:**
```json
{
  "session_id": "leads-1234567890",
  "status": "completed",
  "data": [
    {
      "id": "lead-1",
      "name": "Sarah Johnson",
      "role": "VP of Marketing",
      "company": "TechCorp Inc.",
      "location": "San Francisco, CA",
      "profileUrl": "https://linkedin.com/in/sarahjohnson",
      "connectionDegree": "2nd",
      "industry": "Technology",
      "keywords_matched": ["SaaS", "B2B"]
    },
    {
      "id": "lead-2",
      "name": "Michael Chen",
      "role": "VP of Growth Marketing",
      "company": "CloudAI Solutions",
      "location": "San Francisco, CA",
      "profileUrl": "https://linkedin.com/in/michaelchen",
      "connectionDegree": "3rd",
      "industry": "Technology",
      "keywords_matched": ["AI", "SaaS"]
    }
  ]
}
```

**Frontend Usage:**
```typescript
import { searchLeads } from '@/lib/api';

const response = await searchLeads(
  {
    job_title: "Marketing Manager",
    location: "New York, NY",
    keywords: ["SaaS", "Marketing"]
  },
  10, // limit
  "leads-session"
);

if (response.status === "completed" && Array.isArray(response.data)) {
  console.log(`Found ${response.data.length} leads`);
  response.data.forEach(lead => {
    console.log(`${lead.name} - ${lead.role} at ${lead.company}`);
  });
}
```

**How It Works:**
1. User fills out filter form
2. Frontend calls `searchLeads()` with filters
3. Progress bar animates during search
4. Backend searches LinkedIn with criteria
5. Results displayed in table
6. User can export to CSV/JSON

---

### 4. Scheduler

**Endpoint:** `GET /scheduler/jobs`

**Purpose:** Retrieve all scheduled posts

**Request:** No parameters required

**Response Interface:**
```typescript
interface ScheduledJobsResponse {
  count: number;
  jobs: ScheduledJob[];
}

interface ScheduledJob {
  id?: string;
  post_content: string;
  scheduled_time: string;
  status?: string;
  created_at?: string;
  [key: string]: any;
}
```

**Example Response:**
```json
{
  "count": 3,
  "jobs": [
    {
      "id": "job-123",
      "post_content": "🚀 Excited to announce our new product launch!\n\nAfter months of hard work, we're ready to share something amazing with you...",
      "scheduled_time": "2026-01-20T09:00:00",
      "status": "pending",
      "created_at": "2026-01-17T14:30:00"
    },
    {
      "id": "job-124",
      "post_content": "💡 5 tips for better LinkedIn engagement:\n\n1. Post consistently\n2. Use relevant hashtags\n3. Engage with comments...",
      "scheduled_time": "2026-01-18T15:00:00",
      "status": "posted",
      "created_at": "2026-01-15T10:00:00"
    },
    {
      "id": "job-125",
      "post_content": "📊 Data-driven insights from our latest report...",
      "scheduled_time": "2026-01-22T11:00:00",
      "status": "scheduled",
      "created_at": "2026-01-17T16:00:00"
    }
  ]
}
```

**Frontend Usage:**
```typescript
import { getScheduledJobs } from '@/lib/api';

const response = await getScheduledJobs();

console.log(`Found ${response.count} scheduled posts`);
response.jobs.forEach(job => {
  console.log(`${job.post_content.substring(0, 50)}... - ${job.scheduled_time}`);
});
```

**How It Works:**
1. Component mounts and calls `getScheduledJobs()`
2. Backend reads from `scheduled_jobs.json` file
3. Returns array of all scheduled jobs
4. Frontend displays jobs in beautiful timeline view
5. User can see status, time, and content preview
6. Manual refresh available via button

**Status Values:**
- `"pending"` or `"scheduled"` → Blue badge (Future posts)
- `"posted"` or `"completed"` → Green badge (Successfully posted)
- `"failed"` or `"error"` → Red badge (Failed to post)

---

## Error Handling

### Connection Errors

When the backend is unavailable, the frontend:

1. **Displays Warning Banner**
   ```
   ⚠️ Connection Error
   Unable to connect to the backend API. Make sure your FastAPI
   server is running on the correct port.
   ```

2. **Shows Error Message in Chat**
   ```
   ⚠️ I'm having trouble connecting to the server.
   Please check that your backend is running.
   
   Error: Failed to fetch
   ```

3. **Falls Back to Mock Data** (Leads Agent only)
   - Shows sample leads so UI remains functional
   - User can still test the interface

### API Error Example

```typescript
try {
  const response = await sendPostMessage(message, sessionId);
  // Handle success
} catch (error) {
  if (error instanceof Error) {
    console.error("API Error:", error.message);
    // Show error to user
  }
}
```

---

## Testing the Integration

### Prerequisites

1. **Backend Running**
   ```bash
   # In your FastAPI project directory
   uvicorn main:app --reload
   ```

2. **Frontend Running**
   ```bash
   # In this directory
   npm run dev
   ```

3. **Environment Configured**
   ```bash
   # .env file
   VITE_API_BASE_URL=http://localhost:8000
   ```

### Test Each Agent

#### Test Post Agent

1. Navigate to **Posts** tab
2. Type: "Create a post about AI trends"
3. Watch for:
   - ✅ User message appears immediately
   - ✅ Typing indicator shows
   - ✅ AI response appears in chat
   - ✅ Post preview updates on right side
   - ✅ No error banners

4. If errors appear:
   - Check browser console (F12)
   - Verify backend is running
   - Check CORS configuration
   - Verify endpoint exists: `POST /agents/post/chat`

#### Test Analytics Agent

1. Navigate to **Analytics** tab
2. Type: "What's my best posting time?"
3. Watch for:
   - ✅ User message appears
   - ✅ Typing indicator
   - ✅ AI insight response
   - ✅ Dashboard shows metrics
   - ✅ No error banners

4. Try these queries:
   - "Show me my engagement trends"
   - "How can I improve my posts?"
   - "What content performs best?"

#### Test Leads Agent

1. Navigate to **Leads** tab
2. Fill in filters:
   - Job Title: "Marketing Manager"
   - Location: "San Francisco, CA"
   - Industry: "Technology"
3. Click **Find Leads**
4. Watch for:
   - ✅ Progress bar animates
   - ✅ "Searching LinkedIn..." message
   - ✅ Profile count increases
   - ✅ Results table appears
   - ✅ Success message shows
   - ✅ Export buttons appear

#### Test Scheduler

1. Navigate to **Scheduler** tab
2. Watch for:
   - ✅ List of scheduled posts
   - ✅ Post content, schedule time, and status
   - ✅ No error banners

3. Try these actions:
   - View details of a scheduled post
   - Edit a scheduled post
   - Cancel a scheduled post

### Verify CORS Configuration

If you get CORS errors, add this to your FastAPI backend:

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

### Check Network Requests

Open browser DevTools (F12) → Network tab:

1. **Post Agent Request**
   - Method: POST
   - URL: `http://localhost:8000/agents/post/chat`
   - Status: 200
   - Response: JSON with `session_id`, `response`, `conversation`

2. **Analytics Agent Request**
   - Method: POST
   - URL: `http://localhost:8000/agents/analytics/chat`
   - Status: 200
   - Response: JSON with `session_id`, `response`, `history`

3. **Leads Agent Request**
   - Method: POST
   - URL: `http://localhost:8000/agents/lead/search`
   - Status: 200
   - Response: JSON with `session_id`, `status`, `data`

4. **Scheduler Request**
   - Method: GET
   - URL: `http://localhost:8000/scheduler/jobs`
   - Status: 200
   - Response: JSON with `jobs` array

---

## Debugging Tips

### Problem: Connection Error Banner

**Possible Causes:**
- Backend not running
- Wrong API URL in `.env`
- CORS not configured
- Network issue

**Solution:**
```bash
# 1. Check backend is running
curl http://localhost:8000/health

# 2. Verify environment variable
cat .env

# 3. Check backend logs for errors

# 4. Test endpoint manually
curl -X POST http://localhost:8000/agents/post/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "test", "session_id": "test"}'
```

### Problem: Typing Indicator Never Stops

**Cause:** API request hanging or timing out

**Solution:**
- Check backend logs for errors
- Verify endpoint is responding
- Check for infinite loops in backend
- Add timeout to fetch requests

### Problem: Empty Response

**Cause:** Backend returning unexpected format

**Solution:**
1. Check browser console for errors
2. Inspect Network tab response
3. Verify backend response matches interface
4. Add console.logs to API client

### Problem: Mock Data Instead of Real Data

**Cause:** API error, frontend falling back gracefully

**Solution:**
- This is expected behavior when API fails
- Check error banner for details
- Verify backend is running correctly
- Check backend response format

---

## Session Management

Each agent maintains its own session ID to track conversation context:

```typescript
// Post Agent
const [sessionId, setSessionId] = useState(`session-${Date.now()}`);

// Analytics Agent
const [sessionId, setSessionId] = useState(`analytics-${Date.now()}`);

// Leads Agent
const [sessionId, setSessionId] = useState(`leads-${Date.now()}`);
```

Sessions are:
- Generated on component mount
- Persisted across messages
- Updated if backend returns new session_id
- Independent for each agent

---

## Production Deployment

### Environment Variables

Update `.env` for production:

```bash
VITE_API_BASE_URL=https://api.yourdomain.com
```

### Build and Deploy

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview

# Deploy dist/ folder to your hosting service
```

### Backend Checklist

- ✅ CORS configured for production domain
- ✅ HTTPS enabled
- ✅ API rate limiting configured
- ✅ Error logging set up
- ✅ Health check endpoint available
- ✅ Environment variables secured

---

## API Client Code Reference

The complete API client implementation is in `/src/lib/api.ts`:

```typescript
// Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Type-safe API calls
export async function sendPostMessage(message: string, sessionId?: string)
export async function sendAnalyticsMessage(message: string, sessionId?: string)
export async function searchLeads(filters: LeadFilters, limit: number, sessionId?: string)
export async function getSchedulerJobs()

// Error handling
class APIError extends Error {
  constructor(public status: number, message: string)
}
```

All API functions:
- Use TypeScript interfaces
- Handle errors gracefully
- Parse JSON responses
- Throw APIError on failure
- Support optional session IDs

---

## Next Steps

1. **Test all four agents** with your backend
2. **Customize error messages** for your use case
3. **Add authentication** if needed
4. **Implement retry logic** for failed requests
5. **Add request timeouts** for better UX
6. **Monitor API performance** in production
7. **Set up error tracking** (e.g., Sentry)

## Support

For issues with the integration:

1. Check this guide first
2. Review browser console errors
3. Check backend logs
4. Verify API response formats
5. Test endpoints with curl/Postman
6. Ensure CORS is configured correctly

The frontend is designed to be resilient - it will gracefully degrade to mock data if the backend is unavailable, ensuring a smooth development experience.