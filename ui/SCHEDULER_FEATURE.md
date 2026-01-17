# Scheduler Feature Documentation

## Overview

The Scheduler feature displays all scheduled LinkedIn posts in a beautiful, organized panel. It fetches data from your FastAPI backend and provides a real-time view of pending, posted, and failed posts.

## API Endpoint

**Endpoint:** `GET /scheduler/jobs`

**Response Format:**
```json
{
  "count": 3,
  "jobs": [
    {
      "id": "job-123",
      "post_content": "🚀 Excited to announce our new product launch!...",
      "scheduled_time": "2026-01-20T09:00:00",
      "status": "pending",
      "created_at": "2026-01-17T14:30:00"
    },
    {
      "id": "job-124",
      "post_content": "💡 5 tips for better LinkedIn engagement...",
      "scheduled_time": "2026-01-18T15:00:00",
      "status": "posted",
      "created_at": "2026-01-15T10:00:00"
    }
  ]
}
```

## Component: ScheduledJobsPanel

### Location
`/src/app/components/ScheduledJobsPanel.tsx`

### Features

#### 1. **Real-time Job List**
- Fetches scheduled jobs on component mount
- Displays all jobs in a scrollable list
- Auto-refreshes with manual refresh button

#### 2. **Smart Status Badges**
- **Scheduled** (Blue) - Posts pending in the future
- **Posted** (Green) - Successfully published posts
- **Failed** (Red) - Posts that failed to publish

#### 3. **Intelligent Time Display**
- Shows date in readable format (e.g., "Jan 20, 2026")
- Displays time in 12-hour format
- Shows relative time (e.g., "In 3 days", "In 2 hours")
- Detects past dates and marks them accordingly

#### 4. **Post Content Preview**
- Truncates long posts to 120 characters
- Preserves formatting with whitespace
- Shows full context without overwhelming the UI

#### 5. **Visual Calendar Badges**
- Date displayed in a card-like badge
- Color-coded: Blue for upcoming, Gray for past
- Quick visual reference for scheduling

#### 6. **Error Handling**
- Shows connection errors with helpful messages
- Gracefully handles API failures
- Provides refresh option to retry

#### 7. **Empty State**
- Beautiful empty state when no jobs exist
- Guides users on what to do next
- Clear call-to-action messaging

#### 8. **Quick Statistics Footer**
- Total job count
- Pending posts count (blue)
- Posted count (green)
- Failed count (red, if any)

### UI Design

#### Layout
```
┌─────────────────────────────────────────┐
│  📅  Scheduled Posts          [Refresh] │
│      3 posts scheduled                  │
│      Last updated: 2:30 PM              │
├─────────────────────────────────────────┤
│  ┌──┐                                   │
│  │20│  🔵 Scheduled  ⏰ 9:00 AM (In 3d) │
│  │Jan│  Content preview text...         │
│  └──┘  Created: Jan 17, 2:30 PM    [🗑] │
├─────────────────────────────────────────┤
│  ┌──┐                                   │
│  │18│  🟢 Posted  ⏰ 3:00 PM             │
│  │Jan│  Content preview text...         │
│  └──┘  Created: Jan 15, 10:00 AM   [🗑] │
├─────────────────────────────────────────┤
│  2 Pending  |  1 Posted  |  Total: 3   │
└─────────────────────────────────────────┘
```

#### Color Scheme (LinkedIn Theme)
- **Primary Blue:** `#0A66C2` (LinkedIn brand)
- **Success Green:** `#10B981`
- **Error Red:** `#EF4444`
- **Gray Neutral:** `#6B7280`
- **Background:** White cards with subtle shadows
- **Borders:** Light gray `#E5E7EB`

### Integration

The component is integrated into the **PostAgent** view:

```tsx
import { ScheduledJobsPanel } from "./ScheduledJobsPanel";

// In PostAgent component:
<div className="space-y-6">
  {/* Status Card */}
  {/* LinkedIn Preview */}
  {/* Scheduling Panel */}
  
  {/* Scheduled Jobs Panel - NEW */}
  <ScheduledJobsPanel />
</div>
```

### Props

The component is self-contained and requires **no props**. It:
- Manages its own state
- Fetches data automatically
- Handles errors internally
- Provides refresh functionality

### State Management

```typescript
const [jobs, setJobs] = useState<ScheduledJob[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [lastFetch, setLastFetch] = useState<Date | null>(null);
```

### API Integration

```typescript
import { getScheduledJobs, ScheduledJob } from "@/lib/api";

const fetchJobs = async () => {
  setIsLoading(true);
  try {
    const response = await getScheduledJobs();
    setJobs(response.jobs);
    setLastFetch(new Date());
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};
```

## User Interactions

### 1. Refresh Button
- **Icon:** Rotating refresh icon
- **Action:** Re-fetches jobs from backend
- **Loading State:** Spinning animation during fetch
- **Disabled State:** Grayed out while loading

### 2. Delete Button (Placeholder)
- **Icon:** Trash icon
- **Action:** Currently logs to console
- **Note:** Awaiting DELETE endpoint implementation
- **Visual:** Hover turns red

### 3. Scroll Behavior
- **Max Height:** 600px
- **Overflow:** Vertical scroll
- **Smooth Scrolling:** Native browser behavior
- **Mobile Optimized:** Touch-friendly

## Responsive Design

### Desktop (> 1024px)
- Full width in right panel
- Side-by-side layout with chat
- Comfortable spacing and padding

### Tablet (640px - 1024px)
- Adjusted padding
- Stacked layout below other panels
- Readable text sizes

### Mobile (< 640px)
- Full width stacked layout
- Touch-optimized buttons
- Horizontal scrolling for overflow content

## Error States

### 1. Connection Error
```
┌────────────────────────────────────┐
│ ⚠️ Failed to load scheduled jobs   │
│    Unable to connect to the server │
└────────────────────────────────────┘
```

### 2. Empty State
```
┌────────────────────────────────────┐
│           📅                        │
│   No scheduled posts yet            │
│   Posts you schedule will appear    │
│   here. Use the scheduling panel... │
└────────────────────────────────────┘
```

### 3. Loading State
```
┌────────────────────────────────────┐
│           ⏳                        │
│   Loading scheduled posts...        │
└────────────────────────────────────┘
```

## Time Formatting Logic

The component includes intelligent time formatting:

### Relative Time
- **Future:**
  - "In X days" (> 24 hours)
  - "In X hours" (1-24 hours)
  - "In X mins" (< 1 hour)
  - "Very soon" (< 1 minute)
- **Past:** Shows "Past"

### Display Format
- **Date:** "Jan 20, 2026"
- **Time:** "9:00 AM"
- **Combined:** Shows both in separate areas

### Smart Status Detection
If `scheduled_time` is in the past and `status` is "pending", automatically shows as "Posted"

## Backend Requirements

Your FastAPI endpoint should return:

```python
@router.get("/jobs")
async def get_scheduled_jobs():
    return {
        "count": len(jobs),
        "jobs": [
            {
                "id": "unique-id",           # Optional
                "post_content": "text",       # Required
                "scheduled_time": "ISO-8601", # Required
                "status": "pending",          # Optional (default: pending)
                "created_at": "ISO-8601"      # Optional
            }
        ]
    }
```

### Status Values
- `"pending"` or `"scheduled"` → Blue badge
- `"posted"` or `"completed"` → Green badge
- `"failed"` or `"error"` → Red badge
- Any other value → Gray badge with text

## Testing

### Test Cases

1. **Empty Jobs**
   ```bash
   # Return empty array
   {"count": 0, "jobs": []}
   ```
   **Expected:** Shows empty state

2. **Multiple Jobs**
   ```bash
   # Return 5+ jobs
   ```
   **Expected:** Shows scrollable list with all jobs

3. **Past Jobs**
   ```bash
   # scheduled_time in the past
   ```
   **Expected:** Shows gray badge, no relative time

4. **Connection Error**
   ```bash
   # Backend down
   ```
   **Expected:** Shows error banner, allows retry

5. **Refresh Functionality**
   - Click refresh button
   **Expected:** Re-fetches data, updates last fetch time

## Customization

### Modify Max Height
```tsx
// In ScheduledJobsPanel.tsx
<div className="max-h-[600px]"> // Change 600px to desired height
```

### Change Truncation Length
```tsx
const truncateText = (text: string, maxLength: number = 120)
// Change 120 to desired character limit
```

### Adjust Time Format
```tsx
// Modify formatDateTime function
date.toLocaleDateString('en-US', { /* options */ })
```

## Future Enhancements

### Planned Features (when endpoints available)

1. **Delete Job**
   ```typescript
   DELETE /scheduler/jobs/{job_id}
   ```

2. **Edit Job**
   ```typescript
   PUT /scheduler/jobs/{job_id}
   ```

3. **Pause/Resume Job**
   ```typescript
   POST /scheduler/jobs/{job_id}/pause
   POST /scheduler/jobs/{job_id}/resume
   ```

4. **Bulk Actions**
   - Select multiple jobs
   - Bulk delete
   - Bulk reschedule

5. **Filtering**
   - Filter by status
   - Filter by date range
   - Search by content

6. **Sorting**
   - Sort by date
   - Sort by status
   - Sort by creation time

## Accessibility

- ✅ Keyboard navigable
- ✅ Screen reader friendly
- ✅ ARIA labels on interactive elements
- ✅ Color is not the only indicator (icons + text)
- ✅ Sufficient color contrast ratios
- ✅ Touch target sizes (minimum 44x44px)

## Performance

- **Initial Load:** Fetches jobs once on mount
- **Re-renders:** Optimized with React.memo potential
- **Scroll Performance:** Native browser scrolling
- **Memory:** Efficient state management
- **Network:** Single API call per refresh

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Summary

The **ScheduledJobsPanel** component provides a professional, LinkedIn-themed interface for viewing scheduled posts. It features:

- 🎨 Beautiful UI matching LinkedIn's design language
- 📊 Real-time data from your FastAPI backend
- ⏰ Intelligent time formatting and status detection
- 🔄 Manual refresh capability
- 📱 Fully responsive design
- ⚠️ Comprehensive error handling
- 🎯 Production-ready code

The component seamlessly integrates into your existing PostAgent view without breaking any existing functionality.
