# LinkedIn AI Agent - Frontend

A modern SaaS web application for LinkedIn AI Posting & Analytics. This application helps users generate LinkedIn posts using AI, attach media files, schedule posts, analyze performance, and generate leads.

## Features

### 🚀 Post Agent
- **AI-Powered Post Generation**: Create engaging LinkedIn posts with AI assistance
- **Chat Interface**: Conversational interface for post creation
- **LinkedIn Post Preview**: Real-time preview of how your post will appear
- **Scheduling**: Schedule posts for optimal engagement times
- **Media Upload**: Attach images and files to your posts

### 📊 Analyzer Agent
- **Performance Analytics**: Deep insights into post performance
- **AI Insights**: Get actionable recommendations to improve engagement
- **Best Time Analysis**: Find optimal posting times based on your data
- **Content Strategy**: Understand what content resonates with your audience
- **Real-time Metrics**: Live KPI tracking and trend analysis

### 🎯 Leads Agent
- **Advanced Lead Search**: Filter by job title, location, industry, and keywords
- **Profile Scanning**: AI-powered LinkedIn profile discovery
- **Export Capabilities**: Download leads in CSV or JSON format
- **Connection Insights**: See connection degree and relationship strength

## Tech Stack

- **React** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **Lucide React** for icons
- **FastAPI** backend integration

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- FastAPI backend server running (see backend setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd linkedin-ai-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your backend API URL:
   ```
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## Backend Integration

This frontend connects to three FastAPI endpoints:

### 1. Post Agent API
**Endpoint**: `POST /agents/post/chat`

**Request**:
```json
{
  "message": "Create a post about AI trends",
  "session_id": "optional-session-id"
}
```

**Response**:
```json
{
  "session_id": "session-123",
  "response": "Generated post content...",
  "conversation": [
    {"role": "user", "content": "..."},
    {"role": "assistant", "content": "..."}
  ]
}
```

### 2. Analytics Agent API
**Endpoint**: `POST /agents/analytics/chat`

**Request**:
```json
{
  "message": "What's my best posting time?",
  "session_id": "analytics-session-id"
}
```

**Response**:
```json
{
  "session_id": "analytics-123",
  "response": {
    "status": "completed",
    "decision": {
      "insight": "Your best time is Tuesday at 9 AM..."
    },
    "reply": "Alternative response format"
  },
  "history": ["User: ...", "AI: ..."]
}
```

### 3. Leads Agent API
**Endpoint**: `POST /agents/lead/search`

**Request**:
```json
{
  "filters": {
    "job_title": "Marketing Manager",
    "location": "San Francisco, CA",
    "industry": "Technology",
    "keywords": ["AI", "SaaS"]
  },
  "limit": 10,
  "session_id": "leads-session-id"
}
```

**Response**:
```json
{
  "session_id": "leads-123",
  "status": "completed",
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "role": "Marketing Manager",
      "company": "TechCorp",
      "location": "San Francisco, CA",
      "profileUrl": "https://linkedin.com/in/johndoe",
      "connectionDegree": "2nd"
    }
  ]
}
```

## Error Handling

The application includes comprehensive error handling:

- **Connection Errors**: Shows warning banner if backend is unavailable
- **Fallback Data**: Uses mock data when API is unreachable
- **User Feedback**: Clear error messages guide users to resolution
- **Graceful Degradation**: App remains functional even without backend

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000` |

## Development

### Run development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Type checking
```bash
npm run type-check
```

## Project Structure

```
src/
├── app/
│   ├── components/        # React components
│   │   ├── PostAgent.tsx      # Post creation interface
│   │   ├── AnalyzerAgent.tsx  # Analytics dashboard
│   │   ├── LeadsAgent.tsx     # Lead generation
│   │   ├── ChatInterface.tsx  # Reusable chat component
│   │   └── ui/               # UI primitives
│   └── App.tsx            # Main app component
├── lib/
│   └── api.ts            # API integration utilities
└── styles/
    └── theme.css         # Design tokens and styles
```

## API Configuration

The application uses environment variables for API configuration. Make sure your FastAPI backend is:

1. Running on the correct port (default: 8000)
2. Accepting CORS requests from your frontend origin
3. Implementing the three agent endpoints as documented

### CORS Setup (Backend)

Ensure your FastAPI backend has CORS configured:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Troubleshooting

### "Connection Error" banners appearing

1. Verify backend is running: `curl http://localhost:8000/health`
2. Check CORS configuration in backend
3. Verify `VITE_API_BASE_URL` in `.env` matches your backend URL
4. Check browser console for detailed error messages

### Mock data showing instead of real data

- This is expected behavior when backend is unavailable
- The app gracefully degrades to show mock data
- Check the error banner for connection status

### Environment variables not loading

- Restart the Vite dev server after changing `.env`
- Ensure variables start with `VITE_` prefix
- Use `import.meta.env.VITE_VARIABLE_NAME` to access them

## Features in Detail

### Session Management
Each agent maintains its own session ID to track conversation history and context across API calls.

### Real-time Updates
The chat interfaces provide real-time typing indicators and smooth message animations.

### Responsive Design
Fully responsive across desktop, tablet, and mobile devices with breakpoints at:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Contributing

When contributing to the frontend:

1. Follow the existing component structure
2. Use TypeScript for all new code
3. Maintain consistent styling with Tailwind CSS
4. Test with both real API and fallback modes
5. Ensure responsive design works on all breakpoints

## License

[Your License Here]
