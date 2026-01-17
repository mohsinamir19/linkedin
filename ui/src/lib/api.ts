// API Configuration and Utilities
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// ============================
// Type Definitions
// ============================
export interface PostChatRequest {
  message: string;
  session_id?: string;
}

export interface PostChatResponse {
  session_id: string;
  response: string;
  conversation: Array<{ role: string; content: string }>;
}

export interface AnalyticsRequest {
  message: string;
  session_id?: string;
}

export interface AnalyticsResponse {
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

export interface LeadFilters {
  job_title?: string;
  location?: string;
  industry?: string;
  keywords?: string[];
}

export interface LeadSearchRequest {
  filters: LeadFilters;
  limit?: number;
  session_id?: string;
}

export interface Lead {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  profileUrl: string;
  connectionDegree?: string;
  [key: string]: any;
}

export interface LeadSearchResponse {
  session_id: string;
  status: string;
  data: Lead[] | string;
}

export interface ScheduledJob {
  id?: string;
  post_content: string;
  scheduled_time: string;
  status?: string;
  created_at?: string;
  [key: string]: any;
}

export interface ScheduledJobsResponse {
  count: number;
  jobs: ScheduledJob[];
}

// ============================
// API Error Handler
// ============================
class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new APIError(response.status, errorText || response.statusText);
  }
  return response.json();
}

// ============================
// Post Agent API
// ============================
export async function sendPostMessage(
  message: string,
  sessionId?: string
): Promise<PostChatResponse> {
  const response = await fetch(`${API_BASE_URL}/agents/post/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      session_id: sessionId,
    }),
  });

  return handleResponse<PostChatResponse>(response);
}

// ============================
// Analytics Agent API
// ============================
export async function sendAnalyticsMessage(
  message: string,
  sessionId?: string
): Promise<AnalyticsResponse> {
  const response = await fetch(`${API_BASE_URL}/agents/analytics/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      session_id: sessionId || 'default',
    }),
  });

  return handleResponse<AnalyticsResponse>(response);
}

// ============================
// Leads Agent API
// ============================
export async function searchLeads(
  filters: LeadFilters,
  limit: number = 5,
  sessionId?: string
): Promise<LeadSearchResponse> {
  const response = await fetch(`${API_BASE_URL}/agents/lead/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filters,
      limit,
      session_id: sessionId || 'default',
    }),
  });

  return handleResponse<LeadSearchResponse>(response);
}

// ============================
// Scheduler API
// ============================
export async function getScheduledJobs(): Promise<ScheduledJobsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/scheduler/jobs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return handleResponse<ScheduledJobsResponse>(response);
  } catch (error) {
    // If fetch fails (network error, CORS, backend down), throw a more descriptive error
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to backend server. Please ensure your FastAPI backend is running on ' + API_BASE_URL);
    }
    // Re-throw other errors
    throw error;
  }
}