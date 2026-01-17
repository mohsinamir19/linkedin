# Scheduler UI Preview

## Visual Layout

### Full Component View
```
┌────────────────────────────────────────────────────────────────┐
│  📅  Scheduled Posts                            [🔄 Refresh]    │
│      3 posts scheduled                                          │
│      Last updated: 2:30 PM                                      │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────┐                                                        │
│  │ Jan │  🔵 Scheduled   ⏰ 9:00 AM (In 3 days)           [🗑]│
│  │  20 │                                                        │
│  └─────┘  🚀 Excited to announce our new product launch!       │
│            After months of hard work, we're ready to share...   │
│            Created: Jan 17, 2:30 PM                             │
│                                                                 │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────┐                                                        │
│  │ Jan │  🟢 Posted   ⏰ 3:00 PM                          [🗑]│
│  │  18 │                                                        │
│  └─────┘  💡 5 tips for better LinkedIn engagement:            │
│            1. Post consistently 2. Use relevant hashtags...     │
│            Created: Jan 15, 10:00 AM                            │
│                                                                 │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────┐                                                        │
│  │ Jan │  🔵 Scheduled   ⏰ 11:00 AM (In 5 days)          [🗑]│
│  │  22 │                                                        │
│  └─────┘  📊 Data-driven insights from our latest report...    │
│            Check out these amazing findings from our Q4...      │
│            Created: Jan 17, 4:00 PM                             │
│                                                                 │
├────────────────────────────────────────────────────────────────┤
│  2 Pending  •  1 Posted  •  Total: 3                           │
└────────────────────────────────────────────────────────────────┘
```

## Color Reference

### Status Badges
```
🔵 Scheduled    →  Blue background (#3B82F6)
🟢 Posted       →  Green background (#10B981)
🔴 Failed       →  Red background (#EF4444)
```

### Date Badges
```
┌─────┐
│ Jan │  ← Month (small text)
│  20 │  ← Day (large text)
└─────┘
Blue background for future dates
Gray background for past dates
```

## Responsive Behavior

### Desktop (> 1024px)
```
┌─────────────────────┬─────────────────────────────┐
│                     │   ┌─────────────────────┐   │
│   Chat Interface    │   │  Status Card        │   │
│                     │   └─────────────────────┘   │
│   [  AI Message  ]  │   ┌─────────────────────┐   │
│                     │   │  LinkedIn Preview   │   │
│   [  User Input  ]  │   └─────────────────────┘   │
│                     │   ┌─────────────────────┐   │
│                     │   │  Scheduling Panel   │   │
│                     │   └─────────────────────┘   │
│                     │   ┌─────────────────────┐   │
│                     │   │  Scheduled Jobs  ✨ │   │
│                     │   │  (NEW COMPONENT)    │   │
│                     │   └─────────────────────┘   │
└─────────────────────┴─────────────────────────────┘
```

### Mobile (< 640px)
```
┌─────────────────────┐
│  Chat Interface     │
│                     │
│  [  AI Message  ]   │
│                     │
│  [  User Input  ]   │
└─────────────────────┘
┌─────────────────────┐
│  Status Card        │
└─────────────────────┘
┌─────────────────────┐
│  LinkedIn Preview   │
└─────────────────────┘
┌─────────────────────┐
│  Scheduling Panel   │
└─────────────────────┘
┌─────────────────────┐
│  Scheduled Jobs  ✨ │
│  (NEW COMPONENT)    │
└─────────────────────┘
```

## State Variations

### Empty State
```
┌────────────────────────────────────────┐
│  📅  Scheduled Posts      [🔄 Refresh] │
│      No scheduled posts                │
├────────────────────────────────────────┤
│                                        │
│              📅                        │
│      No scheduled posts yet            │
│                                        │
│  Posts you schedule will appear here.  │
│  Use the scheduling panel to plan your │
│  LinkedIn content in advance.          │
│                                        │
└────────────────────────────────────────┘
```

### Loading State
```
┌────────────────────────────────────────┐
│  📅  Scheduled Posts      [🔄 Refresh] │
│      No scheduled posts                │
├────────────────────────────────────────┤
│                                        │
│              ⏳                        │
│    Loading scheduled posts...          │
│                                        │
└────────────────────────────────────────┘
```

### Error State
```
┌────────────────────────────────────────┐
│  📅  Scheduled Posts      [🔄 Refresh] │
│      No scheduled posts                │
├────────────────────────────────────────┤
│  ⚠️  Failed to load scheduled jobs     │
│      Unable to connect to the server   │
├────────────────────────────────────────┤
│              📅                        │
│      No scheduled posts yet            │
└────────────────────────────────────────┘
```

## Interactive Elements

### Hover Effects
```
Job Item (Normal):
┌──────────────────────────────────┐
│  Status  Time  Content...    [🗑]│  ← Delete button visible on hover
└──────────────────────────────────┘

Job Item (Hover):
┌──────────────────────────────────┐
│  Status  Time  Content...    [🗑]│  ← Background slightly darker
└──────────────────────────────────┘
          ↑ Gray background #F9FAFB
```

### Button States
```
Refresh Button:
[ 🔄 Refresh ]  ← Default
[ ⏳ Loading ]  ← Loading (spinner animation)
[ 🔄 Refresh ]  ← Disabled (grayed out)
```

## Typography

### Header
- **Title:** "Scheduled Posts" - 16px, semibold, gray-900
- **Subtitle:** "X posts scheduled" - 14px, regular, gray-600
- **Timestamp:** "Last updated: ..." - 12px, regular, gray-500

### Job Content
- **Date Badge:** Month (10px), Day (16px), semibold
- **Status Badge:** 12px, medium
- **Time:** 12px, gray-600
- **Content:** 14px, gray-700
- **Created:** 12px, gray-500

## Spacing & Padding

### Component
- **Outer Border Radius:** 12px (rounded-xl)
- **Border:** 1px solid gray-200
- **Shadow:** Subtle drop shadow

### Header
- **Padding:** 16px all sides
- **Bottom Border:** 1px solid gray-200

### Job Items
- **Padding:** 16px all sides
- **Gap Between Items:** 1px border
- **Content Gap:** 12px between elements

### Footer
- **Padding:** 12px all sides
- **Background:** gray-50
- **Top Border:** 1px solid gray-200

## Animation

### Refresh Button
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.refresh-icon {
  animation: spin 1s linear infinite;
}
```

### Scroll Behavior
- **Max Height:** 600px
- **Overflow Y:** Auto scroll
- **Smooth:** Native browser scrolling

### Hover Transitions
```css
.job-item {
  transition: background-color 200ms ease;
}

.delete-button {
  transition: color 200ms ease;
}
```

## Accessibility Features

### ARIA Labels
```html
<button aria-label="Refresh scheduled posts">
<button aria-label="Delete scheduled post">
```

### Keyboard Navigation
- **Tab:** Navigate between interactive elements
- **Enter/Space:** Activate buttons
- **Escape:** Close modals (future)

### Screen Reader Support
- All status badges have descriptive text
- Relative time announced
- Error messages announced

## Real Data Example

### Sample Backend Response
```json
{
  "count": 2,
  "jobs": [
    {
      "id": "abc123",
      "post_content": "🚀 Excited to share our Q1 results!\n\nRevenue up 45%, team growing, and exciting features launching soon.\n\nThank you to everyone who believed in our vision.\n\n#Startup #Growth #Technology",
      "scheduled_time": "2026-01-20T09:00:00Z",
      "status": "pending",
      "created_at": "2026-01-17T14:30:00Z"
    },
    {
      "id": "def456",
      "post_content": "💡 5 lessons from building a SaaS startup:\n\n1. Listen to your customers\n2. Ship fast, iterate faster\n3. Focus on what matters\n4. Build in public\n5. Never stop learning",
      "scheduled_time": "2026-01-18T15:00:00Z",
      "status": "posted",
      "created_at": "2026-01-15T10:00:00Z"
    }
  ]
}
```

### How It Renders
```
┌────────────────────────────────────────┐
│  📅  Scheduled Posts      [🔄 Refresh] │
│      2 posts scheduled                 │
│      Last updated: 2:30 PM             │
├────────────────────────────────────────┤
│  ┌───┐                            [🗑] │
│  │20 │  🔵 Scheduled  ⏰ 9:00 AM       │
│  │Jan│        (In 3 days)              │
│  └───┘                                 │
│  🚀 Excited to share our Q1 results!   │
│  Revenue up 45%, team growing, and...  │
│  Created: Jan 17, 2:30 PM              │
├────────────────────────────────────────┤
│  ┌───┐                            [🗑] │
│  │18 │  🟢 Posted  ⏰ 3:00 PM          │
│  │Jan│                                 │
│  └───┘                                 │
│  💡 5 lessons from building a SaaS...  │
│  1. Listen to your customers 2. Ship.  │
│  Created: Jan 15, 10:00 AM             │
├────────────────────────────────────────┤
│  1 Pending  •  1 Posted  •  Total: 2  │
└────────────────────────────────────────┘
```

## Integration Screenshot (Text)

```
POST AGENT VIEW
═══════════════════════════════════════════════════════════

Left Panel                    Right Panel
────────────────────────     ────────────────────────────
┌──────────────────┐         ┌──────────────────────────┐
│ Post Agent       │         │ 📝 Draft                 │
│ Create LinkedIn  │         │ Ready to schedule or post│
│ posts            │         └──────────────────────────┘
└──────────────────┘         
                              ┌──────────────────────────┐
┌──────────────────┐         │ LinkedIn Post Preview    │
│                  │         │                          │
│ [AI Message]     │         │ John Doe                 │
│                  │         │ Marketing Manager        │
│ [User Message]   │         │                          │
│                  │         │ Your post content here...│
│ [AI Typing...]   │         │                          │
│                  │         │ #LinkedIn #Marketing     │
│                  │         └──────────────────────────┘
│                  │         
│                  │         ┌──────────────────────────┐
│                  │         │ Schedule Post            │
│                  │         │ [Date Picker]            │
│ [Type message...│         │ [Time Picker]            │
│  Send]           │         │ [Schedule Button]        │
└──────────────────┘         └──────────────────────────┘
                              
                              ┌──────────────────────────┐
                              │ 📅 Scheduled Posts ✨   │
                              │ ════════════════════════ │
                              │ 3 posts scheduled        │
                              │                          │
                              │ [Job 1]                  │
                              │ [Job 2]                  │
                              │ [Job 3]                  │
                              │                          │
                              │ Stats: 2 Pending, 1 Done │
                              └──────────────────────────┘
```

## Component Tree

```
PostAgent
├── ChatInterface (left)
│   ├── Message[]
│   └── Input
│
└── Right Panel
    ├── StatusCard
    ├── LinkedInPostPreview
    ├── SchedulingPanel
    └── ScheduledJobsPanel ✨ NEW
        ├── Header
        │   ├── Icon & Title
        │   ├── Subtitle
        │   └── Refresh Button
        ├── Error Banner (conditional)
        ├── Loading State (conditional)
        ├── Empty State (conditional)
        ├── Jobs List
        │   └── JobItem[]
        │       ├── Date Badge
        │       ├── Status Badge
        │       ├── Time Display
        │       ├── Content Preview
        │       ├── Created Timestamp
        │       └── Delete Button
        └── Footer Stats
            ├── Pending Count
            ├── Posted Count
            ├── Failed Count
            └── Total Count
```

---

**This new component seamlessly integrates into your existing LinkedIn AI Agent design!** 🎉
