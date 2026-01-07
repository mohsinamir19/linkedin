# LinkedIn AI Agent - Design System Documentation

## Overview
A modern, professional SaaS dashboard for LinkedIn AI-powered content creation, analytics, and lead generation. The design emphasizes clarity, efficiency, and a LinkedIn-native aesthetic.

---

## 1. Layout Architecture

### Main Navigation Structure
- **Sticky Header**: Top navigation bar with logo, product name, and tab navigation
- **Three Main Tabs**: Posts | Analytics | Leads
- **Persistent Settings**: Settings icon in the top-right corner

### Page Layouts

#### Posts Agent (Two-Column Chat + Preview)
```
┌─────────────────────────────────────────────────┐
│  Header: Logo + Navigation Tabs + Settings      │
├──────────────────┬──────────────────────────────┤
│                  │                              │
│  Left Panel      │  Right Panel                 │
│  ━━━━━━━━━━━     │  ━━━━━━━━━━━                 │
│  Chat Interface  │  Status Card                 │
│  - Messages      │  LinkedIn Preview            │
│  - Input Box     │  Scheduling Panel            │
│                  │                              │
└──────────────────┴──────────────────────────────┘
```

#### Analytics Agent (Two-Column Chat + Dashboard)
```
┌─────────────────────────────────────────────────┐
│  Header: Logo + Navigation Tabs + Settings      │
├──────────────────┬──────────────────────────────┤
│                  │                              │
│  Left Panel      │  Right Panel                 │
│  ━━━━━━━━━━━     │  ━━━━━━━━━━━                 │
│  Chat Interface  │  Data Source Card            │
│  - Q&A Messages  │  KPI Grid (2x2)              │
│  - Input Box     │  Performance Chart           │
│                  │  Content Breakdown           │
│                  │  AI Insights                 │
└──────────────────┴──────────────────────────────┘
```

#### Leads Agent (Single Column)
```
┌─────────────────────────────────────────────────┐
│  Header: Logo + Navigation Tabs + Settings      │
├─────────────────────────────────────────────────┤
│  Filter Panel (Search Filters in Grid)          │
│  - Job Title, Location, Company, Industry       │
│  - Action Buttons: Find Leads, Export           │
├─────────────────────────────────────────────────┤
│  Progress Indicator (when searching)            │
├─────────────────────────────────────────────────┤
│  Results Table                                  │
│  - Name, Role, Company, Location, Connection    │
│  - Profile Links                                │
└─────────────────────────────────────────────────┘
```

---

## 2. Component Library

### Core Components

#### ChatInterface
- **Purpose**: Conversational AI interaction
- **Features**: 
  - Message bubbles (user: blue, assistant: gray)
  - Typing indicator (animated dots)
  - Auto-scroll to latest message
  - Auto-expanding textarea
  - Timestamp display
  - Empty state with icon and description
- **States**: Empty, Active conversation, Typing indicator

#### LinkedInPostPreview
- **Purpose**: Authentic LinkedIn post preview
- **Features**:
  - Avatar, name, timestamp
  - Editable post content
  - Media attachments display
  - LinkedIn-style action buttons (Like, Comment, Repost)
  - Character count

#### SchedulingPanel
- **Purpose**: Schedule or publish posts
- **Features**:
  - Calendar date picker
  - Time selector
  - Schedule status badges
  - Quick action buttons

#### KPICard
- **Purpose**: Display key metrics
- **Features**:
  - Icon, title, value
  - Trend indicator (up/down/neutral)
  - Comparison text
  - Colored accents based on metric type

#### PostPerformanceChart
- **Purpose**: Visualize engagement over time
- **Features**:
  - Line/area chart using Recharts
  - Multiple data series
  - Tooltips with detailed info
  - Responsive design

#### ContentBreakdown
- **Purpose**: Categorize content types
- **Features**:
  - Bar chart or list view
  - Category labels and percentages
  - Visual breakdown

#### AIInsights
- **Purpose**: AI-generated recommendations
- **Features**:
  - Insight cards with icons
  - Actionable recommendations
  - Categorized by topic (Hook, Tone, CTA, etc.)

---

## 3. Color Palette

### Primary Colors
- **Blue 600**: `#2563eb` - Primary actions, active states, links
- **Blue 700**: `#1d4ed8` - Hover states for primary buttons
- **Blue 50**: `#eff6ff` - Active tab background, light accents

### Neutral Colors
- **Gray 900**: `#111827` - Primary text, headings
- **Gray 700**: `#374151` - Secondary text
- **Gray 600**: `#4b5563` - Tertiary text, labels
- **Gray 500**: `#6b7280` - Placeholder text
- **Gray 400**: `#9ca3af` - Icons, disabled states
- **Gray 200**: `#e5e7eb` - Borders
- **Gray 100**: `#f3f4f6` - Assistant message background
- **Gray 50**: `#f9fafb` - Page background
- **White**: `#ffffff` - Cards, panels

### Status Colors
- **Green 600**: `#16a34a` - Success, positive trends
- **Green 50**: `#f0fdf4` - Success backgrounds
- **Red 600**: `#dc2626` - Error, negative trends
- **Red 50**: `#fef2f2` - Error backgrounds
- **Yellow 600**: `#ca8a04` - Warning, neutral metrics
- **Yellow 50**: `#fefce8` - Warning backgrounds
- **Purple 600**: `#9333ea` - Special metrics
- **Orange 600**: `#ea580c` - Alerts

### LinkedIn Native Colors
- **LinkedIn Blue**: `#0a66c2` - For LinkedIn-specific elements
- **LinkedIn Gray**: `#00000099` - For subtle text

---

## 4. Typography

### Font Stack
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Type Scale
- **Headings**:
  - H1: 1.5rem (24px) / font-semibold / text-gray-900
  - H2: 1.25rem (20px) / font-semibold / text-gray-900
  - H3: 1rem (16px) / font-semibold / text-gray-900

- **Body Text**:
  - Base: 0.875rem (14px) / text-gray-700
  - Small: 0.75rem (12px) / text-gray-600
  - Extra Small: 0.625rem (10px) / text-gray-500

- **Labels**: 0.875rem (14px) / font-medium / text-gray-700

- **Buttons**: 0.875rem (14px) / font-medium

### Line Height
- Headings: 1.2-1.4
- Body: 1.5-1.6
- Tight (labels): 1.25

---

## 5. Spacing System

### Base Unit: 4px (0.25rem)

### Common Spacing Values
- **xs**: 4px (0.25rem) - `gap-1`
- **sm**: 8px (0.5rem) - `gap-2`
- **md**: 12px (0.75rem) - `gap-3`
- **lg**: 16px (1rem) - `gap-4`
- **xl**: 24px (1.5rem) - `gap-6`
- **2xl**: 32px (2rem) - `gap-8`

### Layout Spacing
- **Page padding**: 16px mobile, 24px desktop
- **Card padding**: 16px mobile, 24px desktop
- **Section gaps**: 24px
- **Grid gaps**: 12-16px

---

## 6. Component Patterns

### Cards
```css
background: white
border: 1px solid gray-200
border-radius: 12px (rounded-xl)
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) (shadow-sm)
padding: 20-24px
```

### Buttons
- **Primary**: 
  - bg-blue-600, hover:bg-blue-700
  - text-white
  - rounded-lg
  - px-4 py-2
  - transition-colors

- **Secondary/Outline**:
  - border border-gray-300
  - bg-white, hover:bg-gray-50
  - text-gray-700
  - rounded-lg
  - px-4 py-2

- **Ghost**:
  - bg-transparent, hover:bg-gray-100
  - text-gray-600
  - rounded-lg
  - p-2

### Input Fields
```css
border: 1px solid gray-300
background: white
border-radius: 8px (rounded-lg)
padding: 8px 12px
focus: border-blue-500, ring-2 ring-blue-500/20
placeholder: text-gray-500
```

### Badges
- **Default**: bg-blue-100, text-blue-700
- **Success**: bg-green-100, text-green-700
- **Warning**: bg-yellow-100, text-yellow-700
- **Neutral**: bg-gray-100, text-gray-700
- **Border-radius**: 6px (rounded-md)
- **Padding**: px-2 py-0.5

### Chat Bubbles
- **User Messages**:
  - bg-blue-600
  - text-white
  - rounded-2xl
  - px-4 py-3
  - max-width: 85%
  - align-right

- **Assistant Messages**:
  - bg-gray-100
  - text-gray-900
  - rounded-2xl
  - px-4 py-3
  - max-width: 85%
  - align-left

---

## 7. Interaction Patterns

### Hover States
- **Buttons**: Background color darkens slightly
- **Cards**: Border color intensifies or subtle shadow increase
- **Links**: Underline appears, color darkens
- **Table rows**: bg-gray-50

### Active States
- **Tabs**: bg-blue-50, text-blue-600, border accent
- **Selected items**: Border or background highlight

### Loading States
- **Buttons**: Show spinner icon, disable interaction
- **Chat**: Animated typing dots (3 dots bouncing)
- **Data**: Skeleton screens or progress bars
- **Search**: Progress bar with scan count

### Transitions
```css
transition: all 150ms ease-in-out
transition-colors: 150ms
```

### Micro-animations
- **Typing indicator**: 3 dots with staggered bounce animation
- **Spinner**: Rotating icon (animate-spin)
- **Status badge pulse**: Subtle pulse for "connected" status
- **Scroll to bottom**: Smooth scroll in chat

---

## 8. Responsive Behavior

### Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (sm to lg)
- **Desktop**: > 1024px (lg+)

### Layout Adjustments

#### Mobile (< 640px)
- Two-column layouts stack to single column
- Chat interface takes full width
- Preview/dashboard shows below
- Navigation tabs show abbreviated labels
- Reduced padding (16px vs 24px)
- Smaller font sizes

#### Tablet (640px - 1024px)
- Two-column layouts remain side-by-side
- Slightly reduced spacing
- Table columns may hide on smaller tablets
- KPI cards in 2-column grid

#### Desktop (> 1024px)
- Full two-column layouts
- Maximum content width: 1400px
- Optimal spacing and padding
- KPI cards in 3-column grid
- All table columns visible

---

## 9. Accessibility

### ARIA Labels
- Interactive elements have descriptive aria-labels
- Icons include sr-only text for screen readers
- Form inputs associated with labels

### Keyboard Navigation
- Tab order follows visual hierarchy
- Enter key sends messages in chat
- Escape closes modals/dialogs
- Focus visible on all interactive elements

### Color Contrast
- All text meets WCAG AA standards (4.5:1 minimum)
- Icons and interactive elements have sufficient contrast
- Focus indicators clearly visible

---

## 10. Iconography

### Icon Library: Lucide React

### Common Icons
- **Sparkles**: AI features, post creation
- **ChartLine**: Analytics, trends
- **Users**: Leads, connections
- **Settings**: Configuration
- **Send**: Submit messages
- **Search**: Find, filter
- **Download**: Export data
- **ExternalLink**: Open in new tab
- **Calendar**: Scheduling
- **CheckCircle**: Success, completed
- **Loader2**: Loading spinner
- **TrendingUp/Down**: Metrics
- **Target**: Goals, objectives
- **Briefcase**: Job, role
- **Building**: Company
- **MapPin**: Location
- **RefreshCw**: Sync, reload

### Icon Sizes
- **Small**: 16px (w-4 h-4)
- **Medium**: 20px (w-5 h-5)
- **Large**: 24px (w-6 h-6)

---

## 11. Empty States

### Pattern
- Icon in colored circle (48-64px)
- Heading (font-semibold, text-gray-900)
- Description text (text-gray-600, max-width for readability)
- Optional CTA button

### Examples
- **Chat**: "Ready to create amazing posts" + description
- **Leads**: "No leads yet" + instruction to search
- **Analytics**: "Connect your LinkedIn account"

---

## 12. Data Visualization

### Charts (Recharts)
- **Line Charts**: Engagement over time
- **Bar Charts**: Content type breakdown
- **Colors**: 
  - Primary line: blue-600
  - Secondary line: purple-600
  - Tertiary line: green-600
- **Grid**: Subtle gray-200
- **Tooltips**: White background, border, shadow
- **Responsive**: Scale based on container width

---

## 13. Success/Error States

### Success
- **Color**: Green
- **Icon**: CheckCircle2
- **Background**: green-50, border-green-200
- **Text**: green-900 (heading), green-700 (body)

### Error
- **Color**: Red
- **Icon**: AlertCircle
- **Background**: red-50, border-red-200
- **Text**: red-900 (heading), red-700 (body)

### Info/Warning
- **Color**: Yellow/Blue
- **Icon**: Info
- **Background**: blue-50/yellow-50
- **Text**: blue-900/yellow-900

---

## 14. LinkedIn Native Elements

### Post Preview Authenticity
- Match LinkedIn's exact spacing and layout
- Use LinkedIn's icon styling for actions
- Replicate timestamp format
- Authentic avatar sizing (48px)
- LinkedIn blue for interactive elements

### Connection Badges
- 1st: Green accent
- 2nd: Blue accent
- 3rd: Gray accent

---

## 15. Performance Considerations

### Optimization
- Lazy load images and charts
- Virtualize long lists/tables
- Debounce chat input
- Optimize re-renders with React.memo
- Use CSS transforms for animations

### Progressive Disclosure
- Show advanced filters on demand
- Collapse detailed sections
- Paginate large data sets
- Load charts only when visible

---

## 16. Voice & Tone (Microcopy)

### Principles
- **Friendly**: Conversational, not robotic
- **Clear**: No jargon unless necessary
- **Helpful**: Guide users, provide context
- **Professional**: LinkedIn-appropriate language

### Examples
- "Ready to create amazing posts" (encouraging)
- "Found 8 potential leads matching your criteria" (specific)
- "Your audience is most active on weekday mornings" (insightful)
- "No leads yet. Configure your search filters..." (helpful)

---

## 17. Component States Summary

### Button States
1. Default
2. Hover (darker background)
3. Active (even darker)
4. Disabled (opacity-50, cursor-not-allowed)
5. Loading (spinner, disabled)

### Input States
1. Default
2. Focus (ring, border color)
3. Error (red border, red ring)
4. Disabled (gray background, cursor-not-allowed)
5. Filled (normal state with content)

### Card States
1. Default
2. Hover (on interactive cards)
3. Selected (border accent)
4. Loading (skeleton or spinner)

---

## Production Readiness

✅ **Fully Responsive**: Mobile, tablet, desktop optimized
✅ **Accessible**: WCAG AA compliant
✅ **Performant**: Optimized rendering and animations
✅ **Scalable**: Component-based architecture
✅ **Maintainable**: Clear naming, consistent patterns
✅ **Professional**: LinkedIn-native aesthetic
✅ **Modern**: Latest React patterns and best practices

---

## File Structure

```
/src/app/
  App.tsx                     # Main app with navigation
  /components/
    PostAgent.tsx             # Posts page with chat + preview
    AnalyzerAgent.tsx         # Analytics with chat + dashboard
    LeadsAgent.tsx            # Leads search and results
    ChatInterface.tsx         # Reusable chat component
    LinkedInPostPreview.tsx   # Post preview component
    SchedulingPanel.tsx       # Scheduling component
    KPICard.tsx              # Metric cards
    PostPerformanceChart.tsx # Charts
    ContentBreakdown.tsx     # Content analysis
    AIInsights.tsx           # AI recommendations
    /ui/                     # Shadcn UI components
      button.tsx
      input.tsx
      badge.tsx
      card.tsx
      progress.tsx
      select.tsx
      table.tsx
      ... (30+ components)
```

---

**Design System Version**: 1.0  
**Last Updated**: December 2024  
**Framework**: React + TypeScript + Tailwind CSS v4  
**Component Library**: Radix UI + Shadcn/ui
