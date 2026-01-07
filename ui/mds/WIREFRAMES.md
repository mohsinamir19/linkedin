# LinkedIn AI Agent - Wireframes & Layout Specifications

## Application Navigation Structure

```
┌────────────────────────────────────────────────────────────────────┐
│  [🎯] LinkedIn AI Agent     │   Posts | Analytics | Leads   [⚙️]  │
│       AI-Powered LinkedIn Assistant                                │
└────────────────────────────────────────────────────────────────────┘
```

---

## Page 1: Posts Agent (Post Creation & Scheduling)

### Desktop Layout (1400px max-width)
```
┌──────────────────────────────────────────────────────────────────────────┐
│  Header: Logo + Navigation (Posts | Analytics | Leads) + Settings        │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────┬───────────────────────────────────────────┐
│  LEFT PANEL (50%)            │  RIGHT PANEL (50%)                        │
│                              │                                           │
│  ┌────────────────────────┐  │  ┌─────────────────────────────────────┐ │
│  │ 📝 Post Agent          │  │  │ Status Card                         │ │
│  │ Create, schedule posts │  │  │ ┌──────┐                            │ │
│  └────────────────────────┘  │  │ │[📄]│ Draft                        │ │
│                              │  │ │ Ready to schedule or post         │ │
│  ┌────────────────────────┐  │  │ └──────────────────────────────────┘ │
│  │  Chat Interface        │  │  │                                       │
│  │  ┌──────────────────┐  │  │  │  ┌─────────────────────────────────┐ │
│  │  │ [AI] Hi! I'm     │  │  │  │  │ LinkedIn Post Preview           │ │
│  │  │ your Post Agent. │  │  │  │  │ ┌────┐                          │ │
│  │  │ How can I help?  │  │  │  │  │ │ 👤│ Your Name                 │ │
│  │  │     10:30 AM     │  │  │  │  │ │    │ Your Title • 2m         │ │
│  │  └──────────────────┘  │  │  │  │ └────┘                          │ │
│  │                        │  │  │  │                                 │ │
│  │  ┌──────────────────┐  │  │  │  │ 🚀 Excited to share...          │ │
│  │  │ Create a post    │  │  │  │  │                                 │ │
│  │  │ about AI tools   │  │  │  │  │ After working in this space,   │ │
│  │  │     10:31 AM     │  │  │  │  │ here are 3 key takeaways:      │ │
│  │  └──────────────────┘  │  │  │  │                                 │ │
│  │                        │  │  │  │ 1️⃣ Authenticity matters         │ │
│  │  ┌──────────────────┐  │  │  │  │ 2️⃣ Data drives decisions        │ │
│  │  │ [AI] I've created│  │  │  │  │ 3️⃣ Community engagement         │ │
│  │  │ a post for you!  │  │  │  │  │                                 │ │
│  │  │ See it on right →│  │  │  │  │ What are your thoughts? 👇      │ │
│  │  │     10:31 AM     │  │  │  │  │                                 │ │
│  │  └──────────────────┘  │  │  │  │ #LinkedIn #Innovation           │ │
│  │                        │  │  │  │                                 │ │
│  │  ⋮                    │  │  │  │ ┌─────────────────────────────┐ │ │
│  │  ⋮                    │  │  │  │ │ 👍 Like  💬 Comment  🔄 Share│ │ │
│  │  ⋮ (scrollable)      │  │  │  │ └─────────────────────────────┘ │ │
│  │                        │  │  │  └─────────────────────────────────┘ │
│  │                        │  │  │                                       │
│  │  ┌──────────────────┐  │  │  │  ┌─────────────────────────────────┐ │
│  │  │ Type message...  │  │  │  │  │ 📅 Scheduling Panel             │ │
│  │  │             [📤] │  │  │  │  │                                 │ │
│  │  └──────────────────┘  │  │  │  │ Schedule For:                   │ │
│  └────────────────────────┘  │  │  │ [Tue, Dec 24, 2024] [9:00 AM]  │ │
│                              │  │  │                                 │ │
│                              │  │  │ [Schedule Post] [Post Now]      │ │
│                              │  │  └─────────────────────────────────┘ │
└──────────────────────────────┴───────────────────────────────────────────┘
```

### Mobile Layout (< 640px)
```
┌──────────────────────────────┐
│ Header (Compact)             │
└──────────────────────────────┘

┌──────────────────────────────┐
│ 📝 Post Agent                │
└──────────────────────────────┘

┌──────────────────────────────┐
│ Chat Interface               │
│ (Full Width, scrollable)     │
│ ⋮                            │
└──────────────────────────────┘

┌──────────────────────────────┐
│ Status Card                  │
└──────────────────────────────┘

┌──────────────────────────────┐
│ LinkedIn Preview             │
│ (Full Width)                 │
└──────────────────────────────┘

┌──────────────────────────────┐
│ Scheduling Panel             │
└──────────────────────────────┘
```

---

## Page 2: Analytics Agent (Performance Insights)

### Desktop Layout
```
┌──────────────────────────────────────────────────────────────────────────┐
│  Header: Logo + Navigation (Posts | Analytics | Leads) + Settings        │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────┬───────────────────────────────────────────┐
│  LEFT PANEL (50%)            │  RIGHT PANEL (50%)                        │
│                              │                                           │
│  ┌────────────────────────┐  │  ┌─────────────────────────────────────┐ │
│  │ 📊 Analyzer Agent      │  │  │ [🔄] Live Data • Last synced: 2h ago│ │
│  │ AI-powered insights    │  │  │ [🟢 Connected]                      │ │
│  └────────────────────────┘  │  └─────────────────────────────────────┘ │
│                              │                                           │
│  ┌────────────────────────┐  │  ┌──────────────┬──────────────────────┐ │
│  │  Chat Interface        │  │  │ [📈] Avg Eng │ [📈] Best Post      │ │
│  │  ┌──────────────────┐  │  │  │ 4.8%         │ 287 engagements     │ │
│  │  │ [AI] Hi! Ask me  │  │  │  │ ↑12% vs 30d  │ ↑45% vs 30d         │ │
│  │  │ about your       │  │  │  ├──────────────┼──────────────────────┤ │
│  │  │ LinkedIn data    │  │  │  │ [🎯] Optimal │ [⚡] Velocity       │ │
│  │  │     10:00 AM     │  │  │  │ Tue 9AM      │ 3.2 posts/week      │ │
│  │  └──────────────────┘  │  │  │ peak time    │ ↑8% vs last month   │ │
│  │                        │  │  └──────────────┴──────────────────────┘ │
│  │  ┌──────────────────┐  │  │                                           │
│  │  │ What's my best   │  │  │  ┌─────────────────────────────────────┐ │
│  │  │ posting time?    │  │  │  │ 📊 Post Performance Over Time       │ │
│  │  │     10:05 AM     │  │  │  │                                     │ │
│  │  └──────────────────┘  │  │  │     ╱╲                              │ │
│  │                        │  │  │    ╱  ╲    ╱╲                       │ │
│  │  ┌──────────────────┐  │  │  │   ╱    ╲  ╱  ╲  ╱╲                 │ │
│  │  │ [AI] Based on    │  │  │  │  ╱      ╲╱    ╲╱  ╲                │ │
│  │  │ your data, Tue   │  │  │  │ ────────────────────────            │ │
│  │  │ at 9 AM is best  │  │  │  │ Mon  Tue  Wed  Thu  Fri             │ │
│  │  │ (287 avg eng.)   │  │  │  └─────────────────────────────────────┘ │
│  │  │     10:05 AM     │  │  │                                           │
│  │  └──────────────────┘  │  │  ┌─────────────────────────────────────┐ │
│  │                        │  │  │ 📂 Content Breakdown                │ │
│  │  ⋮                    │  │  │ ━━━━━━━━━━ 65% Storytelling         │ │
│  │  ⋮ (scrollable)      │  │  │ ━━━━━ 25% Industry Insights          │ │
│  │  ⋮                    │  │  │ ━━ 10% Announcements                │ │
│  │                        │  │  └─────────────────────────────────────┘ │
│  │  ┌──────────────────┐  │  │                                           │
│  │  │ Type question... │  │  │  ┌─────────────────────────────────────┐ │
│  │  │             [📤] │  │  │  │ 💡 AI Insights                      │ │
│  │  └──────────────────┘  │  │  │ • Posts with questions get +56%    │ │
│  └────────────────────────┘  │  │ • Optimal length: 150-200 words    │ │
│                              │  │ • Use 3-5 hashtags for best reach  │ │
│                              │  └─────────────────────────────────────┘ │
└──────────────────────────────┴───────────────────────────────────────────┘
```

---

## Page 3: Leads Agent (Lead Generation)

### Desktop Layout
```
┌──────────────────────────────────────────────────────────────────────────┐
│  Header: Logo + Navigation (Posts | Analytics | Leads) + Settings        │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  👥 Leads Agent                                                          │
│  Find and connect with potential leads on LinkedIn                       │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  🔍 Search Filters                                                       │
│  ┌──────────────────┬──────────────────┬──────────────────┐             │
│  │ Job Title        │ Location         │ Company          │             │
│  │ [____________]   │ [____________]   │ [____________]   │             │
│  ├──────────────────┼──────────────────┴──────────────────┴─────────┐   │
│  │ Industry         │ Keywords                                        │   │
│  │ [▼ Select]       │ [_______________________________]              │   │
│  └──────────────────┴─────────────────────────────────────────────────┘   │
│                                                                           │
│  [🔍 Find Leads]  [⬇ Export CSV]  [⬇ Export JSON]                       │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  [⏳] Searching LinkedIn... 342 profiles scanned                         │
│  ████████████████░░░░░░░░░░░░ 65%                                       │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  ✅ Search Complete! Found 8 potential leads matching your criteria      │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  👥 Results (8 leads)                                                    │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ NAME           │ ROLE              │ COMPANY       │ LOCATION  │...│  │
│  ├────────────────┼───────────────────┼───────────────┼───────────┼───┤  │
│  │ Sarah Johnson  │ VP of Marketing   │ TechCorp Inc. │ SF, CA    │2nd│  │
│  │ Michael Chen   │ CTO               │ InnovateAI    │ NY, NY    │3rd│  │
│  │ Emily Rodriguez│ Head of Product   │ StartupHub    │ Austin,TX │2nd│  │
│  │ David Kim      │ Dir. of Sales     │ SalesForce Pro│ Seattle   │1st│  │
│  │ Jennifer Liu   │ VP Engineering    │ CloudTech     │ Boston,MA │2nd│  │
│  │ Robert Martinez│ Marketing Dir.    │ GrowthLabs    │ LA, CA    │3rd│  │
│  │ Amanda Foster  │ COO               │ Enterprise Sol│ Chicago   │2nd│  │
│  │ James Wilson   │ VP Biz Dev        │ ScaleUp       │ Miami, FL │1st│  │
│  └────────────────┴───────────────────┴───────────────┴───────────┴───┘  │
│  Each row has: Name, Role, Company, Location, Connection Degree, Profile │
└──────────────────────────────────────────────────────────────────────────┘
```

### Empty State
```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                           │
│                          ┌──────────┐                                    │
│                          │          │                                    │
│                          │  [👥]    │                                    │
│                          │          │                                    │
│                          └──────────┘                                    │
│                                                                           │
│                        No leads yet                                      │
│                                                                           │
│             Configure your search filters above and click                │
│             "Find Leads" to discover potential connections               │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Common UI Patterns

### Status Badge
```
┌────────────┐
│ [📄] Draft │  Gray background
├────────────┤
│ [📅] Sched │  Blue background
├────────────┤
│ [✓] Posted │  Green background
└────────────┘
```

### Connection Degree Badges
```
[1st] ← Green (Direct connection)
[2nd] ← Blue (2nd degree)
[3rd] ← Gray (3rd degree)
```

### KPI Card Structure
```
┌─────────────────────────┐
│ [icon] Title            │
│ ──────────────────────  │
│ 4.8%                    │
│ ↑ 12% vs last 30 days   │
└─────────────────────────┘
```

### Chat Message Bubble (User)
```
                    ┌──────────────────┐
                    │ Message text...  │
                    │ 10:30 AM         │
                    └──────────────────┘
                    (Blue background, right-aligned)
```

### Chat Message Bubble (Assistant)
```
┌──────────────────┐
│ Response text... │
│ 10:30 AM         │
└──────────────────┘
(Gray background, left-aligned)
```

### Typing Indicator
```
┌──────────────────┐
│  ⚫ ⚫ ⚫          │  (Animated bouncing dots)
└──────────────────┘
```

---

## Interaction Flow Examples

### Flow 1: Create a Post
1. User arrives on "Posts" page
2. Sees chat interface (left) and empty preview (right)
3. Types: "Create a post about AI productivity tools"
4. Clicks Send or presses Enter
5. Message appears in chat (blue bubble, right-aligned)
6. AI typing indicator appears (3 animated dots)
7. AI response appears (gray bubble, left-aligned)
8. Post preview populates on the right panel
9. Status card shows "Draft"
10. User can schedule or post immediately

### Flow 2: Analyze Performance
1. User clicks "Analytics" tab
2. Sees chat interface (left) and dashboard (right)
3. Dashboard auto-loads with live data
4. User types: "What's my best posting time?"
5. AI responds with detailed analysis in chat
6. Relevant KPI card on right highlights "Tue 9AM"
7. Chart updates to show time-based engagement

### Flow 3: Find Leads
1. User clicks "Leads" tab
2. Sees filter panel at top, empty state below
3. Fills in filters: Job Title, Location, Industry
4. Clicks "Find Leads"
5. Progress indicator appears with scanning count
6. Progress bar fills from 0% to 100%
7. Success message appears
8. Results table populates with 8 leads
9. Export buttons become available
10. User can click profile links or export data

---

## Responsive Breakpoints Behavior

### Desktop (> 1024px)
- Two-column layouts side-by-side
- All features visible
- Optimal spacing and padding
- Tables show all columns

### Tablet (640px - 1024px)
- Two-column layouts remain but narrower
- Some table columns may hide
- Slightly reduced padding
- KPI cards in 2-column grid

### Mobile (< 640px)
- Two-column layouts stack vertically
- Chat interface full width at top
- Preview/dashboard below
- Navigation tabs show icons + text (smaller)
- Single column for all cards
- Horizontal scroll for tables

---

## Color-Coded Visual Legend

### Component Colors in Wireframes
- `┌─────┐` - Card/Panel borders (gray-200)
- `[icon]` - Icons (various colors based on type)
- `[Button]` - Primary action (blue-600)
- `[⬇ Export]` - Secondary action (outlined)
- `↑ 12%` - Positive trend (green)
- `↓ 12%` - Negative trend (red)
- `🟢 Connected` - Status indicator (green)
- `⏳ Loading` - In progress (blue)
- `✅ Success` - Completed (green)

---

## Spacing Guidelines (in wireframes)

### Between Sections
- 24px (1.5rem) - `gap-6`
- Represented by blank line in ASCII wireframes

### Within Cards
- 16-20px (1rem - 1.25rem) - `p-4` to `p-5`
- Represented by spacing within boxes

### Grid Gaps
- 12-16px (0.75rem - 1rem) - `gap-3` to `gap-4`
- Shown as `│` separators in grids

---

## Z-Index Layers

1. **Base**: Main content (z-0)
2. **Cards**: Slightly elevated (z-1, shadow-sm)
3. **Sticky Header**: Always on top (z-50)
4. **Modals/Dialogs**: Overlay (z-100)
5. **Tooltips**: Above all (z-200)

---

**Wireframe Version**: 1.0  
**Corresponds to**: Design System v1.0  
**Date**: December 2024
