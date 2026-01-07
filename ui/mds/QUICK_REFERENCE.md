# Quick Reference Guide

## 📚 Documentation Index

| Document | Purpose | Lines |
|----------|---------|-------|
| `DESIGN_SYSTEM.md` | Complete design system specs | 1,000+ |
| `WIREFRAMES.md` | Layout wireframes & flows | 700+ |
| `COMPONENT_SHOWCASE.md` | Component library reference | 800+ |
| `PROJECT_SUMMARY.md` | High-level overview | 500+ |
| `QUICK_REFERENCE.md` | This file - fast lookup | 200+ |

---

## 🎨 Quick Color Reference

```css
/* Primary Actions */
bg-blue-600  #2563eb
bg-blue-700  #1d4ed8  (hover)
bg-blue-50   #eff6ff  (active bg)

/* Text */
text-gray-900  #111827  (primary)
text-gray-700  #374151  (secondary)
text-gray-600  #4b5563  (tertiary)

/* Backgrounds */
bg-white       #ffffff  (cards)
bg-gray-50     #f9fafb  (page)
bg-gray-100    #f3f4f6  (AI messages)

/* Status */
green-600  #16a34a  (success)
red-600    #dc2626  (error)
yellow-600 #ca8a04  (warning)
```

---

## 🧩 Component Quick Import

```tsx
// Main Agents
import { PostAgent } from "./components/PostAgent";
import { AnalyzerAgent } from "./components/AnalyzerAgent";
import { LeadsAgent } from "./components/LeadsAgent";

// Reusable Components
import { ChatInterface } from "./components/ChatInterface";
import { LinkedInPostPreview } from "./components/LinkedInPostPreview";
import { SchedulingPanel } from "./components/SchedulingPanel";
import { KPICard } from "./components/KPICard";
import { PostPerformanceChart } from "./components/PostPerformanceChart";
import { ContentBreakdown } from "./components/ContentBreakdown";
import { AIInsights } from "./components/AIInsights";

// UI Components
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Progress } from "./components/ui/progress";
import { Select } from "./components/ui/select";
import { Table } from "./components/ui/table";

// Icons
import { Sparkles, ChartLine, Users, Settings } from "lucide-react";
```

---

## 📐 Common Class Patterns

### Cards
```tsx
className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
```

### Buttons (Primary)
```tsx
className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
```

### Buttons (Secondary)
```tsx
className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors"
```

### Input Fields
```tsx
className="border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
```

### Chat Bubble (User)
```tsx
className="bg-blue-600 text-white rounded-2xl px-4 py-3 max-w-[85%]"
```

### Chat Bubble (AI)
```tsx
className="bg-gray-100 text-gray-900 rounded-2xl px-4 py-3 max-w-[85%]"
```

### Badge
```tsx
className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-xs font-medium"
```

---

## 📱 Responsive Breakpoints

```css
/* Tailwind breakpoints */
sm:   640px   /* Tablet */
md:   768px   /* Small desktop */
lg:   1024px  /* Desktop */
xl:   1280px  /* Large desktop */

/* Common patterns */
className="grid grid-cols-1 lg:grid-cols-2 gap-6"  /* Stack on mobile, side-by-side on desktop */
className="px-4 sm:px-6"  /* 16px mobile, 24px tablet+ */
className="text-sm sm:text-base"  /* Smaller text on mobile */
```

---

## 🎯 Page Navigation

```tsx
// App.tsx navigation pattern
type Page = "posts" | "analytics" | "leads";
const [currentPage, setCurrentPage] = useState<Page>("posts");

// Render logic
{currentPage === "posts" && <PostAgent />}
{currentPage === "analytics" && <AnalyzerAgent />}
{currentPage === "leads" && <LeadsAgent />}

// Navigation button
<button
  onClick={() => setCurrentPage("posts")}
  className={currentPage === "posts" 
    ? "bg-blue-50 text-blue-600" 
    : "text-gray-600 hover:bg-gray-50"
  }
>
  Posts
</button>
```

---

## 💬 Chat Message Pattern

```tsx
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const [messages, setMessages] = useState<Message[]>([]);

const handleSendMessage = (message: string) => {
  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user",
    content: message,
    timestamp: new Date(),
  };
  setMessages(prev => [...prev, userMessage]);
  
  // AI response logic here
};
```

---

## 📊 KPI Card Pattern

```tsx
<KPICard
  title="Average Engagement Rate"
  value="4.8%"
  change={12}
  trend="up"
  icon={<Activity className="w-5 h-5 text-blue-600" />}
  comparison="vs. last 30 days"
/>
```

---

## 📋 Table Pattern

```tsx
<table className="w-full">
  <thead className="bg-gray-50 border-b border-gray-200">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
        Name
      </th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200">
    {data.map(item => (
      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4">{item.name}</td>
      </tr>
    ))}
  </tbody>
</table>
```

---

## 🎨 Status Badge Colors

```tsx
// Connection degrees
1st: "bg-green-100 text-green-700"
2nd: "bg-blue-100 text-blue-700"
3rd: "bg-gray-100 text-gray-700"

// Post status
draft: "bg-gray-100 text-gray-700"
scheduled: "bg-blue-100 text-blue-700"
posted: "bg-green-100 text-green-700"

// Trends
up: "text-green-600"
down: "text-red-600"
neutral: "text-gray-600"
```

---

## 🔄 Loading States

```tsx
// Button loading
{isLoading ? (
  <>
    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
    Loading...
  </>
) : (
  <>
    <Send className="w-4 h-4 mr-2" />
    Send
  </>
)}

// Chat typing indicator
{isTyping && (
  <div className="flex gap-1">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
  </div>
)}

// Progress bar
<Progress value={progress} className="h-2" />
```

---

## 📏 Spacing Scale

```css
gap-1   4px    0.25rem
gap-2   8px    0.5rem
gap-3   12px   0.75rem
gap-4   16px   1rem
gap-6   24px   1.5rem
gap-8   32px   2rem

p-4     16px padding
p-5     20px padding
p-6     24px padding
```

---

## 🎯 Common Icon Sizes

```tsx
w-4 h-4   16px (buttons, inline)
w-5 h-5   20px (standard icons)
w-6 h-6   24px (emphasis)
w-8 h-8   32px (large icons, empty states)
```

---

## 📐 Layout Patterns

### Two-Column (Chat + Content)
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <div className="space-y-4">
    {/* Left panel */}
  </div>
  <div className="space-y-6">
    {/* Right panel */}
  </div>
</div>
```

### KPI Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* KPI cards */}
</div>
```

### Filter Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Filter inputs */}
</div>
```

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 File Locations

```
/src/app/App.tsx              # Main app entry
/src/app/components/          # All components
  PostAgent.tsx               # Posts page
  AnalyzerAgent.tsx           # Analytics page
  LeadsAgent.tsx              # Leads page
  ChatInterface.tsx           # Reusable chat
  /ui/                        # UI library
/src/styles/                  # Stylesheets
  index.css                   # Main styles
  tailwind.css                # Tailwind imports
  theme.css                   # Theme config
```

---

## 🎨 Commonly Used Icons

```tsx
import {
  Sparkles,      // AI, creation
  ChartLine,     // Analytics
  Users,         // Leads, people
  Settings,      // Configuration
  Send,          // Submit, send
  Search,        // Find, filter
  Download,      // Export
  Calendar,      // Scheduling
  CircleCheck,   // Success
  Loader2,       // Loading spinner
  TrendingUp,    // Positive trend
  TrendingDown,  // Negative trend
  ExternalLink,  // Open in new tab
  Briefcase,     // Job, work
  Building2,     // Company
  MapPin,        // Location
  RefreshCw,     // Sync, reload
} from "lucide-react";
```

---

## 🔧 TypeScript Interfaces

```tsx
// Message
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Lead
interface Lead {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  profileUrl: string;
  connectionDegree: string;
}

// Post Status
type PostStatus = "draft" | "scheduled" | "posted";

// Page
type Page = "posts" | "analytics" | "leads";
```

---

## 🎯 Key Tailwind Classes by Category

### Layout
```
flex, grid, hidden, block
items-center, justify-between
space-y-4, gap-6
max-w-[1400px], mx-auto
```

### Sizing
```
w-full, h-full
min-h-[500px]
max-w-[85%]
px-4, py-2
```

### Typography
```
text-sm, text-base, text-lg
font-semibold, font-medium
text-gray-900, text-gray-600
```

### Colors
```
bg-white, bg-gray-50
text-blue-600, text-gray-900
border-gray-200
```

### Effects
```
rounded-xl, rounded-lg
shadow-sm
hover:bg-gray-50
transition-colors
```

---

## 📊 Mock Data Examples

### KPI Values
```tsx
const kpiData = {
  engagement: "4.8%",
  change: 12,
  bestPost: 287,
  worstPost: 23,
  optimalTime: "Tue 9AM",
  velocity: "3.2 posts/week",
};
```

### Lead Data
```tsx
const mockLead = {
  id: "1",
  name: "Sarah Johnson",
  role: "VP of Marketing",
  company: "TechCorp Inc.",
  location: "San Francisco, CA",
  profileUrl: "https://linkedin.com/in/...",
  connectionDegree: "2nd",
};
```

---

## ⚡ Performance Tips

1. Use `React.memo` for expensive components
2. Debounce search inputs
3. Lazy load charts
4. Virtualize long lists
5. Optimize images
6. Use CSS transforms for animations

---

## 🎯 Accessibility Checklist

- [ ] All interactive elements have focus states
- [ ] Images have alt text
- [ ] Forms have associated labels
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] ARIA labels on icon buttons

---

## 🔍 Debugging Quick Tips

```tsx
// Log messages
console.log('Messages:', messages);

// Check state
{JSON.stringify(filters, null, 2)}

// Conditional rendering debug
{isTyping && <div>Typing: true</div>}
```

---

## 📱 Mobile-First Approach

```tsx
// Start with mobile (no prefix)
className="text-sm p-4 grid-cols-1"

// Add tablet breakpoint
className="text-sm sm:text-base p-4 sm:p-6 grid-cols-1 md:grid-cols-2"

// Add desktop breakpoint
className="text-sm sm:text-base p-4 sm:p-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

---

## 🎨 Design Tokens Quick Reference

```css
/* Border Radius */
rounded-lg   8px
rounded-xl   12px
rounded-2xl  16px
rounded-full 9999px

/* Shadows */
shadow-sm    0 1px 2px rgba(0,0,0,0.05)
shadow       0 1px 3px rgba(0,0,0,0.1)

/* Transitions */
transition-colors
transition-all
duration-150
```

---

**Quick Reference Version**: 1.0  
**Last Updated**: December 2024  
**Purpose**: Fast lookup for common patterns  
**See also**: DESIGN_SYSTEM.md, WIREFRAMES.md, COMPONENT_SHOWCASE.md
