# Component Library Showcase

## Overview
This document provides a visual reference for all custom components in the LinkedIn AI Agent application.

---

## 🔷 Core Application Components

### 1. ChatInterface
**Purpose**: Reusable conversational AI interface for Posts and Analytics agents

**Features**:
- Message history with scrolling
- User messages (blue, right-aligned)
- Assistant messages (gray, left-aligned)
- Typing indicator animation
- Auto-expanding textarea input
- Timestamp display
- Empty state with icon

**Props**:
```typescript
interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isTyping?: boolean;
  placeholder?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
}
```

**Usage**:
```tsx
<ChatInterface
  messages={messages}
  onSendMessage={handleSendMessage}
  isTyping={isTyping}
  placeholder="Ask me anything..."
  emptyStateTitle="Ready to help"
  emptyStateDescription="Start a conversation..."
/>
```

**Visual States**:
- **Empty State**: Centered icon + title + description
- **Active Chat**: Scrollable message list + input
- **Typing**: Animated dots indicator
- **Loading**: Disabled input with spinner

---

### 2. PostAgent
**Purpose**: Complete post creation page with chat interface and LinkedIn preview

**Layout**:
```
┌──────────────┬──────────────┐
│ Chat         │ Preview      │
│ Interface    │ + Status     │
│              │ + Scheduling │
└──────────────┴──────────────┘
```

**Features**:
- AI-powered post generation via chat
- Live LinkedIn post preview
- Status card (Draft/Scheduled/Posted)
- Scheduling panel integration
- Media upload support
- Editable post content

**State Management**:
```typescript
const [messages, setMessages] = useState<Message[]>([]);
const [isTyping, setIsTyping] = useState(false);
const [generatedPost, setGeneratedPost] = useState("");
const [postStatus, setPostStatus] = useState<"draft" | "scheduled" | "posted">("draft");
const [uploadedMedia, setUploadedMedia] = useState<Array<{ type: string; url: string; name: string }>>([]);
```

**Key Interactions**:
1. User types post idea in chat
2. AI generates post content
3. Preview updates in real-time
4. User can schedule or post immediately

---

### 3. AnalyzerAgent
**Purpose**: Analytics dashboard with conversational Q&A interface

**Layout**:
```
┌──────────────┬──────────────┐
│ Chat Q&A     │ Dashboard    │
│ Interface    │ - KPIs       │
│              │ - Charts     │
│              │ - Insights   │
└──────────────┴──────────────┘
```

**Components Used**:
- ChatInterface
- Data Source Card
- KPICard (6 metrics)
- PostPerformanceChart
- ContentBreakdown
- AIInsights

**Key Metrics Displayed**:
- Average Engagement Rate
- Best Performing Post
- Optimal Posting Time
- Post Velocity
- Detected Writing Style
- Content Breakdown

**Interaction Examples**:
- "What's my best posting time?" → Detailed time analysis
- "How can I improve engagement?" → Actionable recommendations
- "Show me my performance trends" → Chart highlights

---

### 4. LeadsAgent
**Purpose**: LinkedIn lead generation with advanced filtering

**Layout**:
```
┌──────────────────────────────┐
│ Search Filters (Grid)        │
├──────────────────────────────┤
│ Progress Indicator           │
├──────────────────────────────┤
│ Results Table                │
└──────────────────────────────┘
```

**Filter Fields**:
- Job Title (text input)
- Location (text input)
- Company (text input)
- Industry (select dropdown)
- Keywords (text input)

**Results Table Columns**:
1. Name
2. Role (with icon)
3. Company (with icon)
4. Location (with icon)
5. Connection Degree (badge)
6. Profile Link (external)

**Export Options**:
- CSV export
- JSON export

**Visual States**:
- Empty state (no search yet)
- Searching (progress bar + scan count)
- Success (green alert + results)
- Results (table with hover states)

---

### 5. LinkedInPostPreview
**Purpose**: Authentic LinkedIn post mockup

**Features**:
- User avatar placeholder
- Name and title
- Timestamp
- Post content (editable)
- Media attachments display
- LinkedIn action buttons (Like, Comment, Repost)
- Character count
- Hashtag highlighting

**Visual Structure**:
```
┌──────────────────────────────┐
│ [👤] Your Name               │
│      Your Title • 2m         │
├──────────────────────────────┤
│                              │
│ Post content text...         │
│                              │
│ 1️⃣ Point one                 │
│ 2️⃣ Point two                 │
│ 3️⃣ Point three               │
│                              │
│ #Hashtag #Hashtag            │
│                              │
├──────────────────────────────┤
│ 👍 Like  💬 Comment  🔄 Share │
└──────────────────────────────┘
```

**Editable**: Click to edit post text directly

---

### 6. SchedulingPanel
**Purpose**: Schedule or immediately post content

**Features**:
- Date picker (calendar)
- Time selector
- "Schedule Post" button
- "Post Now" button
- Status indicators

**Visual Layout**:
```
┌──────────────────────────────┐
│ 📅 Scheduling Panel          │
│                              │
│ Schedule For:                │
│ [Tue, Dec 24, 2024]          │
│ [9:00 AM]                    │
│                              │
│ [Schedule Post] [Post Now]   │
└──────────────────────────────┘
```

---

### 7. KPICard
**Purpose**: Display key performance metrics

**Visual Structure**:
```
┌─────────────────────────┐
│ [icon] Title            │
│                         │
│ 4.8%                    │
│ ↑ 12% vs last 30 days   │
└─────────────────────────┘
```

**Props**:
```typescript
interface KPICardProps {
  title: string;
  value: string;
  label?: string;
  change?: number;
  trend?: "up" | "down";
  icon: React.ReactNode;
  comparison?: string;
  hideTrend?: boolean;
}
```

**Color Coding**:
- Trend up (green): ↑ 12%
- Trend down (red): ↓ 12%
- Neutral (gray): No trend

**Examples**:
1. Engagement Rate (blue icon, percentage)
2. Best Post (green icon, number)
3. Posting Time (purple icon, time)
4. Velocity (yellow icon, rate)

---

### 8. PostPerformanceChart
**Purpose**: Visualize engagement metrics over time

**Features**:
- Line/area chart using Recharts
- Multiple data series
- Responsive width
- Tooltips on hover
- Grid lines
- Legend
- Date range selector

**Data Points**:
- Likes (blue line)
- Comments (purple line)
- Reposts (green line)
- Total Engagement (combined)

**Visual**:
```
Engagement Over Time
200 ┤     ╱╲
150 ┤    ╱  ╲     ╱╲
100 ┤   ╱    ╲   ╱  ╲
 50 ┤  ╱      ╲ ╱    ╲
  0 └──────────────────
    Mon Tue Wed Thu Fri
```

---

### 9. ContentBreakdown
**Purpose**: Analyze content types and performance

**Features**:
- Bar chart or progress bars
- Category labels
- Percentage breakdown
- Color coding

**Categories**:
- Storytelling (65%)
- Industry Insights (25%)
- Announcements (10%)
- Questions (5%)

**Visual**:
```
┌──────────────────────────────┐
│ 📂 Content Breakdown         │
│                              │
│ Storytelling                 │
│ ████████████████░░░░ 65%     │
│                              │
│ Industry Insights            │
│ ████████░░░░░░░░░░░░ 25%     │
│                              │
│ Announcements                │
│ ███░░░░░░░░░░░░░░░░░ 10%     │
└──────────────────────────────┘
```

---

### 10. AIInsights
**Purpose**: Display AI-generated recommendations

**Features**:
- Insight cards with icons
- Categorized recommendations
- Actionable tips
- Color-coded by type

**Categories**:
- Hook Type (question, statement, statistic)
- Tone (professional, casual, storytelling)
- CTA Presence (yes/no + type)
- Hashtag Density (optimal/too many/too few)
- Emoji Usage (balanced/excessive/none)

**Visual**:
```
┌──────────────────────────────┐
│ 💡 AI Insights               │
│                              │
│ [🎯] Hook Optimization       │
│ 78% of your top posts start  │
│ with a question              │
│                              │
│ [📏] Optimal Length          │
│ Best posts: 150-200 words    │
│                              │
│ [#️⃣] Hashtag Strategy       │
│ Use 3-5 hashtags for best    │
│ reach (you use 2-3)          │
└──────────────────────────────┘
```

---

### 11. MediaUpload
**Purpose**: Upload and manage media for posts

**Features**:
- Drag and drop area
- File type validation
- Preview thumbnails
- Remove uploaded files
- Multiple file support

**Supported Types**:
- Images (PNG, JPG, GIF)
- Videos (MP4, MOV)
- Documents (PDF)

**Visual**:
```
┌──────────────────────────────┐
│ 📎 Media Upload              │
│                              │
│ ┌──────────────────────────┐ │
│ │ Drag & drop files here   │ │
│ │ or click to browse       │ │
│ └──────────────────────────┘ │
│                              │
│ [📷 image.jpg] [×]           │
│ [🎥 video.mp4] [×]           │
└──────────────────────────────┘
```

---

## 🔷 UI Library Components (Shadcn/UI)

### Button Variants
```
[Primary Button]    - bg-blue-600, text-white
[Secondary Button]  - border, bg-white
[Ghost Button]      - transparent, hover:bg-gray-100
[Destructive]       - bg-red-600, text-white
[Outline]           - border-gray-300
```

### Input Variants
```
[Text Input]        - Standard text field
[Textarea]          - Multi-line text
[Select Dropdown]   - Dropdown menu
[Date Picker]       - Calendar selector
[Time Picker]       - Time selector
```

### Card Variants
```
┌─────────────┐
│ Card Header │
├─────────────┤
│ Card        │
│ Content     │
├─────────────┤
│ Card Footer │
└─────────────┘
```

### Badge Variants
```
[Default]     - Blue background
[Secondary]   - Gray background
[Destructive] - Red background
[Outline]     - Border only
[Success]     - Green background
```

### Table Structure
```
┌──────────┬──────────┬──────────┐
│ Header 1 │ Header 2 │ Header 3 │
├──────────┼──────────┼──────────┤
│ Cell 1   │ Cell 2   │ Cell 3   │
│ Cell 4   │ Cell 5   │ Cell 6   │
└──────────┴──────────┴──────────┘
```

### Progress Bar
```
████████████░░░░░░░░ 65%
```

### Dialog/Modal
```
┌─────────────────────────┐
│ Dialog Title        [×] │
├─────────────────────────┤
│                         │
│ Dialog content...       │
│                         │
├─────────────────────────┤
│        [Cancel] [OK]    │
└─────────────────────────┘
```

---

## 🎨 Component Styling Patterns

### Card Pattern
```tsx
<div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
  {/* Card content */}
</div>
```

### Button Pattern
```tsx
<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
  Button Text
</button>
```

### Input Pattern
```tsx
<input className="border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
```

### Badge Pattern
```tsx
<span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-xs font-medium">
  Badge
</span>
```

---

## 🔄 State Indicators

### Loading States
```
[⏳ Loading...]      - Spinner icon + text
[●●●]               - Typing indicator (animated)
████████░░░░ 65%    - Progress bar
```

### Status Badges
```
[📄 Draft]          - Gray
[📅 Scheduled]      - Blue
[✓ Posted]          - Green
[⚠️ Error]          - Red
```

### Connection Badges
```
[1st]  - Green (direct connection)
[2nd]  - Blue (2nd degree)
[3rd]  - Gray (3rd degree)
```

### Trend Indicators
```
↑ 12%  - Green (positive)
↓ 12%  - Red (negative)
→ 0%   - Gray (neutral)
```

---

## 📱 Responsive Component Behavior

### ChatInterface
- **Desktop**: Full height, fixed width
- **Tablet**: Slightly reduced padding
- **Mobile**: Full width, stacked layout

### PostAgent / AnalyzerAgent
- **Desktop**: Side-by-side columns (50/50)
- **Tablet**: Side-by-side with reduced gaps
- **Mobile**: Stacked vertically (chat on top)

### LeadsAgent
- **Desktop**: 3-column filter grid, full table
- **Tablet**: 2-column filter grid, scrollable table
- **Mobile**: 1-column filters, horizontal scroll table

### KPICard
- **Desktop**: 3 columns in grid
- **Tablet**: 2 columns in grid
- **Mobile**: 1 column stacked

---

## 🎯 Component Combinations

### Common Patterns

#### 1. Chat + Preview Layout
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <ChatInterface {...chatProps} />
  <LinkedInPostPreview {...previewProps} />
</div>
```

#### 2. KPI Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <KPICard {...metric1} />
  <KPICard {...metric2} />
  <KPICard {...metric3} />
</div>
```

#### 3. Filter + Results
```tsx
<div className="space-y-6">
  <FilterPanel {...filters} />
  {isSearching && <ProgressIndicator {...progress} />}
  {results.length > 0 && <ResultsTable {...results} />}
</div>
```

---

## 🧩 Component Dependencies

### Import Map
```
ChatInterface
  └─ Textarea (ui)
  └─ Button (ui)
  └─ Send, Sparkles (lucide-react)

PostAgent
  └─ ChatInterface
  └─ LinkedInPostPreview
  └─ SchedulingPanel
  └─ Badge (ui)

AnalyzerAgent
  └─ ChatInterface
  └─ KPICard
  └─ PostPerformanceChart
  └─ ContentBreakdown
  └─ AIInsights

LeadsAgent
  └─ Input (ui)
  └─ Select (ui)
  └─ Button (ui)
  └─ Badge (ui)
  └─ Progress (ui)
  └─ Table (ui)

KPICard
  └─ Card (ui)
  └─ Icons (lucide-react)

PostPerformanceChart
  └─ Recharts
  └─ Card (ui)
```

---

## 🔍 Accessibility Features

### All Components Include:
- ✅ ARIA labels for interactive elements
- ✅ Keyboard navigation support
- ✅ Focus visible indicators
- ✅ Screen reader friendly text
- ✅ Sufficient color contrast (WCAG AA)
- ✅ Semantic HTML structure

### Examples:
```tsx
// Button with aria-label
<button aria-label="Send message">
  <Send className="w-4 h-4" />
</button>

// Input with associated label
<label htmlFor="jobTitle">Job Title</label>
<input id="jobTitle" />

// Screen reader only text
<span className="sr-only">Delete</span>
```

---

## 🎨 Animation & Transitions

### Hover Transitions
```css
transition: all 150ms ease-in-out
transition-colors: 150ms
```

### Typing Indicator
```tsx
<div className="animate-bounce" style={{ animationDelay: "0ms" }} />
<div className="animate-bounce" style={{ animationDelay: "150ms" }} />
<div className="animate-bounce" style={{ animationDelay: "300ms" }} />
```

### Spinner
```tsx
<Loader2 className="w-4 h-4 animate-spin" />
```

### Status Pulse
```tsx
<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
```

---

## 📦 Component Sizes

### Icon Sizes
- Small: `w-4 h-4` (16px)
- Medium: `w-5 h-5` (20px)
- Large: `w-6 h-6` (24px)
- XL: `w-8 h-8` (32px)

### Button Sizes
- Small: `px-3 py-1.5 text-sm`
- Medium: `px-4 py-2 text-base`
- Large: `px-6 py-3 text-lg`

### Card Padding
- Compact: `p-4`
- Standard: `p-5` or `p-6`
- Spacious: `p-8`

---

## 🎯 Best Practices

### When to Use Each Component

**ChatInterface**: 
- Natural language input
- Conversational flows
- Q&A interactions

**KPICard**: 
- Key metrics display
- Dashboard summaries
- Trend visualization

**Table**: 
- Large datasets
- Structured information
- Sortable/filterable data

**Cards**: 
- Grouped content
- Visual hierarchy
- Sectioned layouts

**Badges**: 
- Status indicators
- Categories/tags
- Small labels

**Progress**: 
- Loading states
- Multi-step processes
- Completion tracking

---

**Component Showcase Version**: 1.0  
**Last Updated**: December 2024  
**Total Custom Components**: 11  
**Total UI Components**: 30+  
**Framework**: React + TypeScript + Tailwind CSS
