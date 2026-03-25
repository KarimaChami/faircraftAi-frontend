# FairCraft AI Dashboard - Complete Frontend Implementation

> A production-ready AI-powered pricing dashboard for artisans and small business owners built with Next.js, TypeScript, Tailwind CSS, and GSAP animations.

## 🎯 Features

### 1. **Authentication System**
- User registration and login with JWT authentication
- Token-based authentication stored in localStorage
- Automatic token validation and refresh
- Redirect to auth page if token is missing or expired

### 2. **Dashboard Home Section**
- Welcome banner with personalized greeting
- Key statistics displayed in animated cards:
  - Total predictions made
  - Average selling price
  - Average profit margin
  - Total profit generated
- Top product category showcase
- Quick action buttons
- Recent activity feed
- Responsive design for mobile and desktop

### 3. **Prediction Section**
- Comprehensive form for product details:
  - Product title (auto-calculates title length and keywords)
  - Product category selection
  - Shop name
  - Product metrics (rating, reviews, popularity)
  - Cost breakdown (material, labor, overhead)
- Interactive Morocco map showing artisan distribution
- Dynamic city highlighting based on product category
- Real-time prediction results showing:
  - Predicted price with profit breakdown
  - Production cost analysis
  - Price range guide (minimum to premium)
  - Top influencing factors (feature importance)
  - AI-generated recommendations

### 4. **Recommendations Section**
- AI-powered chatbot interface
- Quick question templates
- AI-generated pricing recommendations
- Real-time chat interface with message history
- Typing indicators and message timestamps
- Recommendation panel with actionable insights

### 5. **Prediction History Section**
- Table view of all past predictions with pagination
- Filter and sort capabilities
- Quick statistics cards (total, average price, average margin)
- Expandable details panel for each prediction
- Sort by date, product, category, and margin
- Data export functionality ready

### 6. **User Settings Section**
- Profile information display and editing
- Personal details management (name, email)
- Account status overview
- Security settings
- Notification preferences
- Member since date display
- Role-based badges

## 🏗️ Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   ├── layout.tsx              # Dashboard root layout with navigation
│   │   ├── page.tsx                # Home/statistics page
│   │   ├── prediction/page.tsx      # Prediction page
│   │   ├── recommendations/page.tsx # Recommendations page
│   │   ├── history/page.tsx         # Prediction history page
│   │   └── settings/page.tsx        # User settings page
│   └── auth/page.tsx                # Authentication page (updated)
├── components/dashboard/
│   ├── DashboardLayout.tsx          # Main dashboard layout with sidebar
│   ├── HomeSection.tsx              # Home/statistics section component
│   ├── PredictionSection.tsx        # Prediction form and container
│   ├── PredictionResults.tsx        # Results display component
│   ├── MoroccoMap.tsx               # Interactive Morocco map
│   ├── RecommendationsSection.tsx   # Recommendations & chatbot
│   ├── HistorySection.tsx           # Prediction history table
│   └── SettingsSection.tsx          # User settings form
└── lib/
    ├── types.ts                     # TypeScript type definitions
    ├── api.ts                       # API utility functions
    └── dashboard-context.tsx        # Dashboard context provider
```

## 🔌 API Integration

### Endpoints Used

**Authentication:**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login with email/password
- `GET /auth/profile` - Get current user profile

**Predictions:**
- `POST /api/v1/predict` - Make price prediction
- `POST /api/v1/explain` - Get feature importance
- `POST /api/v1/recommendations` - Get AI recommendations
- `POST /api/v1/simulate` - Simulate price changes

**Mock Endpoints (Backend pending):**
- Statistics endpoint (auto-populated with mock data)
- Prediction history endpoint (demo data)

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or later
- npm or yarn
- Backend API running on `http://localhost:8000`

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment variables:**
Update `.env.local` with your backend API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. **Run development server:**
```bash
npm run dev
```

4. **Open in browser:**
Navigate to `http://localhost:3000`

### Build for production:
```bash
npm run build
npm start
```

## 🎨 Design & Styling

### Colors & Theme
- **Primary:** Blue gradient (#3b82f6 to #1e40af)
- **Accent:** Green (#10b981), Purple (#8b5cf6), Orange (#f97316)
- **Background:** White (#ffffff) with subtle gradients
- **Text:** Dark gray (#1f2937)

### Responsive Breakpoints
- **Mobile:** 320px - 640px
- **Tablet:** 641px - 1024px
- **Desktop:** 1025px+

### Animations
- GSAP for smooth entrance animations
- Card hover effects with elevation
- Auto-scrolling to results on prediction
- Pulse effects for map markers
- Page transitions with stagger

## 🔐 Security Features

- **JWT Authentication:** Secure token-based auth
- **Token Validation:** Automatic expiration checks
- **Protected Routes:** Redirects to auth if token missing
- **Password Security:** Matches confirmation on registration
- **HTTP-only Considerations:** Token stored in localStorage (use httpOnly cookies in production)

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Mobile hamburger menu
- ✅ Collapsible sidebar on desktop
- ✅ Adaptive grid layouts
- ✅ Touch-friendly buttons and inputs
- ✅ Optimized table scrolling on mobile

## ⚡ Performance Optimizations

- Server-side rendering with Next.js
- Image optimization
- Code splitting by route
- Lazy loading of components
- Efficient state management with React hooks
- Minimal re-renders with proper dependency arrays

## 🛠️ Technologies Used

- **Framework:** Next.js 16+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** GSAP 3.14+
- **Icons:** Lucide React
- **HTTP Client:** Fetch API (built-in)
- **State Management:** React Context & Hooks
- **Authentication:** JWT Tokens

## 📚 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

## 🔧 Configuration

### Backend API URL
The API endpoint is configured via environment variable:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Update this to match your backend deployment URL.

## 🚀 Deployment Ready Features

- ✅ Environment variable configuration
- ✅ Production build optimization
- ✅ Error handling and fallbacks
- ✅ Loading states for all async operations
- ✅ SEO metadata for all pages
- ✅ Mobile responsive design
- ✅ Accessibility considerations
- ✅ Security headers ready

## 📋 Checklist for Production

- [ ] Update `NEXT_PUBLIC_API_URL` to production endpoint
- [ ] Enable HTTPS for all API calls
- [ ] Use httpOnly cookies for JWT instead of localStorage
- [ ] Add CORS configuration to backend
- [ ] Implement token refresh mechanism
- [ ] Add error tracking (Sentry, LogRocket, etc.)
- [ ] Enable analytics (Google Analytics, Mixpanel, etc.)
- [ ] Configure proper error boundaries
- [ ] Add service worker for PWA capabilities
- [ ] Test on real devices/browsers

## 🐛 Troubleshooting

### Login redirects to auth page immediately
- Check if token is properly stored in localStorage
- Verify token expiration time in backend
- Ensure `NEXT_PUBLIC_API_URL` matches backend URL

### API requests failing
- Verify backend is running on correct port
- Check CORS configuration in backend
- Review network tab in browser DevTools
- Check authentication headers are attached

### Styling issues
- Clear `.next` cache: `rm -rf .next`
- Reload page and hard refresh cache (Ctrl+Shift+R)
- Ensure Tailwind CSS is properly configured

### Animation stuttering
- Reduce number of animated elements
- Check browser performance (GPU acceleration)
- Test in production build (faster than dev)

## 📖 API Documentation

### PredictionRequest
```typescript
{
  product_title: string;          // Product name/description
  category: string;               // Product category
  shop_name: string;              // Shop/business name
  title_length: number;           // Auto-calculated
  keyword_count: number;          // Auto-calculated
  rating_numeric: number;         // 0-5
  reviews_numeric: number;        // Number of reviews
  rating_score: number;           // 0-10
  popularity_index: number;       // 0-100
  material_cost: number;          // In dollars
  labor_hours: number;            // Hours spent
  hourly_rate: number;            // Hourly rate in dollars
  overhead_cost: number;          // Overhead in dollars
}
```

### PredictionResponse
```typescript
{
  production_cost: number;    // Total production cost
  predicted_price: number;    // AI-predicted selling price
  minimum_price: number;      // Minimum recommended price
  recommended_price: number;  // Recommended selling price
  premium_price: number;      // Premium tier pricing (1.25x recommended)
  margin: number;             // Profit margin percentage
}
```

## 📞 Support & Contact

For issues or questions:
1. Check troubleshooting section
2. Review API documentation
3. Check backend logs for API errors
4. Verify network connectivity

## 📄 License

This project is part of the FairCraft AI initiative for artisan empowerment.

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GSAP Documentation](https://gsap.com/docs/)
- [React Context API](https://react.dev/reference/react/useContext)

---

**Last Updated:** March 2025  
**Version:** 1.0.0  
**Status:** Production Ready ✅
