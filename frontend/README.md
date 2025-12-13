# Business Directory Frontend

Next.js frontend for the Business Directory application.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- Axios for API calls
- Lucide React for icons
- date-fns for date formatting

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/                      # Next.js app directory
│   ├── auth/                 # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── business/             # Business detail pages
│   │   └── [slug]/
│   ├── directory/            # Business listing page
│   ├── owner/                # Business owner dashboard
│   │   ├── dashboard/
│   │   └── business/
│   ├── layout.tsx            # Root layout with AuthProvider
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
├── components/               # Reusable components
│   ├── Navbar.tsx
│   ├── CommentsSidebar.tsx
│   ├── PostCard.tsx
│   └── PromotionCard.tsx
├── lib/                      # Utilities
│   ├── api.ts                # API client functions
│   └── auth.tsx              # Authentication context
├── types/                    # TypeScript definitions
│   └── index.ts
└── package.json
```

## Key Features

### Public Pages
- **Homepage** (`/`): Search bar, popular businesses, recent listings
- **Directory** (`/directory`): All businesses with search and category filtering
- **Business Detail** (`/business/[slug]`): Full business information with tabs and comments sidebar

### Authentication
- **Login** (`/auth/login`): User login with JWT
- **Register** (`/auth/register`): New user registration with role selection

### Business Owner Features
- **Dashboard** (`/owner/dashboard`): View and manage all businesses
- **Create Business** (`/owner/business/new`): Add new business listing
- **Edit Business** (`/owner/business/[id]/edit`): Update business information
- **Manage Posts**: Create and manage business posts
- **Manage Promotions**: Create and manage promotional offers

## API Integration

All API calls are centralized in `lib/api.ts`:

```typescript
import { businessAPI, postAPI, commentAPI, promotionAPI } from '@/lib/api'

// Example usage
const businesses = await businessAPI.getAll(0, 10)
const business = await businessAPI.getBySlug('my-business')
await postAPI.like(postId)
```

## Authentication

The app uses a custom authentication context (`lib/auth.tsx`) that provides:

- `user`: Current user object
- `isAuthenticated`: Boolean authentication status
- `login(credentials)`: Login function
- `register(data)`: Registration function
- `logout()`: Logout function
- `hasRole(role)`: Check user role

Protected routes use the `withAuth` HOC:

```typescript
export default withAuth(MyComponent, Role.BUSINESS_OWNER)
```

## Styling

The app uses Tailwind CSS with a custom color scheme:

- Primary color: Blue (can be customized in `tailwind.config.ts`)
- Responsive design with mobile-first approach
- Dark mode support (optional, can be enabled)

## Components

### Navbar
Global navigation bar with authentication status, user info, and role-based menu items.

### CommentsSidebar
Sidebar component for displaying and posting comments on business pages. Features:
- Real-time comment list
- Comment form for authenticated users
- Delete functionality for comment authors

### PostCard
Card component for displaying posts with:
- Like/unlike functionality
- Comment section
- Image support
- Timestamp formatting

### PromotionCard
Card for displaying promotional offers with:
- Discount percentage
- Promo code
- Expiry date

## Best Practices

1. **Type Safety**: All API responses and props are typed
2. **Error Handling**: API errors are caught and displayed to users
3. **Loading States**: Loading indicators for async operations
4. **Authentication**: Protected routes redirect to login
5. **Responsive**: Mobile-first responsive design

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment

- Development: `http://localhost:3000`
- API: `http://localhost:8080/api` (configurable via `.env.local`)

## Troubleshooting

### API Connection Issues
- Ensure the backend is running on `http://localhost:8080`
- Check CORS configuration in the backend
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`

### Authentication Issues
- Clear browser localStorage
- Check JWT token expiration (24 hours by default)
- Verify user credentials

## Next Steps

To complete the application, you may want to add:

1. Business edit page (`/owner/business/[id]/edit`)
2. Post management pages
3. Promotion management pages
4. Image upload functionality
5. Better error boundaries
6. Loading skeletons
7. SEO optimization with metadata
8. Analytics integration
