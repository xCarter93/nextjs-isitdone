# IsItDone - Book Series Completion Tracker

## Project Overview

IsItDone is a modern web application designed to help readers track and discover book series. The platform allows users to check if a book series is complete, find the recommended reading order, and get personalized book recommendations based on their preferences.

## Tech Stack & Architecture

### Core Technologies

- **Frontend Framework**: Next.js 15+ with TypeScript
- **UI Framework**: Shadcn UI
- **State Management**: React Context API (with potential for Redux or Zustand if complexity increases)
- **Styling**: Tailwind CSS with Shadcn UI components
- **Routing**: Next.js built-in App Router
- **API Integration**: Google Books API, RESTful API calls with fetch/axios
- **Animation**: CSS transitions and Tailwind custom animations for interactive elements

### Custom Tailwind Animations

The project includes custom animations defined in the tailwind.config.ts file:

```tsx
// Custom animations in tailwind.config.ts
theme: {
  extend: {
    keyframes: {
      "fade-in": {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
      "fade-in-down": {
        "0%": { opacity: "0", transform: "translateY(-20px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
      "fade-in-up": {
        "0%": { opacity: "0", transform: "translateY(20px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
    },
    animation: {
      "fade-in": "fade-in 0.5s ease-out forwards",
      "fade-in-down": "fade-in-down 0.5s ease-out forwards",
      "fade-in-up": "fade-in-up 0.5s ease-out forwards",
    },
  },
}
```

These animations can be used directly in className attributes:

```tsx
<div className="animate-fade-in">Fades in</div>
<div className="animate-fade-in-down">Fades in from top</div>
<div className="animate-fade-in-up">Fades in from bottom</div>
```

For delayed animations, use inline styles:

```tsx
<div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
	Delayed fade in
</div>
```

### Layout and Styling Approach

The project uses a consistent layout approach across all pages:

1. **Full-width backgrounds with centered content**:
   - Each section has `w-full` to ensure backgrounds span the entire screen width
   - Content is centered using `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`
   - This creates visually appealing layouts with edge-to-edge backgrounds and properly constrained content

Example section structure:

```tsx
<section className="py-20 bg-muted/30 w-full">
	<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		{/* Section content */}
	</div>
</section>
```

This approach allows for:

- Full-width colored backgrounds that extend edge-to-edge
- Centered content with a maximum width (1280px)
- Responsive padding that increases at larger screen sizes:
  - 16px on mobile (px-4)
  - 24px on small screens (sm:px-6)
  - 32px on large screens (lg:px-8)

### Adding Shadcn UI Components

To add a new Shadcn UI component to the project, run:

```bash
npx shadcn@latest add component-name
```

For example, to add the button component:

```bash
npx shadcn@latest add button
```

This will add the component to your project's components/ui directory, which you can then import and use in your application.

### Project Structure

```
src/
├── app/                    # Next.js App Router structure
│   ├── page.tsx            # Home page
│   ├── search/             # Search functionality
│   ├── series/[id]/        # Series detail pages
│   └── recommendations/    # Personalized recommendations
├── components/             # Reusable UI components
│   ├── ui/                 # Shadcn UI components (client components)
│   ├── common/             # Shared components (buttons, inputs, etc.)
│   ├── layout/             # Layout components (header, footer, etc.)
│   │   ├── Header.tsx      # Header component (client component)
│   │   └── Footer.tsx      # Footer component (server component)
│   ├── search/             # Search-related components (client components)
│   ├── series/             # Series-related components
│   ├── home/               # Home page components
│   │   ├── HeroSection.tsx # Hero section component (client component)
│   │   ├── FeaturesSection.tsx # Features section component (server component)
│   │   ├── PopularSeriesSection.tsx # Popular series section component (server component)
│   │   └── CTASection.tsx  # Call-to-action section component (server component)
│   └── animations/         # CSS animation components and utilities
├── providers/              # Client-side provider components
│   └── ThemeProvider.tsx   # Theme provider component for Shadcn UI (client component)
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and services
│   ├── api/                # API service functions
│   │   └── googleBooks.ts  # Google Books API integration
│   └── animations/         # Animation utility functions
├── types/                  # TypeScript type definitions
└── styles/                 # Global styles and theme configuration
```

### Component Architecture

The application follows Next.js 15+ architecture with a mix of server and client components:

#### Server Components

Server components render on the server and send HTML to the client, reducing JavaScript bundle size:

- `src/components/layout/Footer.tsx` - Static footer with links
- `src/components/home/FeaturesSection.tsx` - Static features display with animations
- `src/components/home/PopularSeriesSection.tsx` - Static series showcase
- `src/components/home/CTASection.tsx` - Static call-to-action section

#### Client Components

Client components include interactivity and are marked with `"use client"` directive:

- All Shadcn UI components (`src/components/ui/*`)
- `src/providers/ThemeProvider.tsx` - Manages theme state
- `src/components/layout/Header.tsx` - Contains navigation and mobile menu state
- `src/components/search/*` - Search functionality with form state
- `src/components/home/HeroSection.tsx` - Contains SearchBar component

This architecture optimizes for both performance and interactivity by rendering static content on the server while maintaining client-side interactivity where needed.

## Design Guidelines

### Visual Design Principles

- **Minimalist & Modern**: Clean interfaces with ample white space
- **Responsive**: Fully functional across all device sizes (mobile, tablet, desktop)
- **Typography**: Highly readable font hierarchy with clear contrast
- **Color Palette**: Limited, cohesive color scheme with proper contrast ratios
- **Consistency**: Uniform component styling and behavior throughout the app
- **Animation**: Purposeful, fluid animations that enhance user understanding

### UI/UX Guidelines

- Intuitive navigation with minimal learning curve
- Smooth transitions and animations (subtle, not distracting)
- Clear visual feedback for all user interactions
- Accessible design following WCAG 2.1 AA standards
- Support for dark mode (optional but recommended)

## Core Features Implementation

### 🔍 Search Functionality

#### Search Bar Component

- Prominent, centered search input on the home page
- Sticky positioning in the header on other pages
- Real-time auto-suggestions as the user types
- Advanced filters with dropdown options:
  - Genre (multi-select)
  - Publication year (range slider)
  - Completion status (radio buttons)
- Clear visual indication of active filters

#### Implementation Notes

- Implement debouncing for search input to prevent excessive API calls
- Cache recent search results for improved performance
- Provide clear empty state and error handling
- Integrate with Google Books API for comprehensive book metadata

### 📚 Search Results Page

#### Results Display

- Grid-based layout using Shadcn UI card components
- Responsive grid that adjusts columns based on viewport width
- Each card should display:
  - Book/series cover image
  - Title and author
  - Completion status (visual indicator)
  - Publication year
  - Average rating (if available)

#### Interaction Design

- Hover effects to indicate interactivity
- Quick-view functionality on hover/click for series summary
- Infinite scroll or pagination for large result sets
- Sorting options (by relevance, publication date, rating)
- Animated transitions between search results using CSS transitions

### 📖 Book/Series Detail Page

#### Content Organization

- Hero section with cover image, title, author, and completion status
- Series information section:
  - Complete list of books with thumbnails
  - Publication dates
  - Individual book statuses
- Recommended reading order:
  - Tabbed interface with multiple viewing options:
    - Chronological list
    - Publication order
    - Author-recommended order
    - Timeline visualization
- Related series recommendations section

#### Interactive Series Visualization

- Tree-like visualization showing the series structure
- Visual representation of the recommended reading order
- Interactive nodes representing each book in the series
- Ability to traverse the tree and explore relationships between books
- Smooth CSS transitions when expanding/collapsing branches
- Visual indicators for book status (published, upcoming, etc.)
- Responsive design that adapts to different screen sizes

#### Advanced Features

- Progress tracking (optional user account feature)
- Share functionality for series information
- "Notify me" option for incomplete series
- Export visualization as image

### 🎯 Personalized Recommendation Page

#### User Input Form

- Multi-step form using Shadcn UI components:
  - Genre preferences (multi-select with tags)
  - Themes/topics (searchable dropdown)
  - Book length preference (slider)
  - Favorite authors (text input with auto-complete)
  - Reading pace (radio buttons)
  - Previously enjoyed books (searchable input)

#### Recommendation Algorithm

- Weight-based scoring system for matching books
- Diversity in recommendations to avoid echo chamber
- Clear explanation of why each book is recommended
- Option to refine recommendations by adjusting inputs

#### Results Display

- Similar to search results but with added context
- "Why we recommend this" section for each item
- Option to save recommendation sets (for logged-in users)
- Animated transitions between recommendation sets

### 🧭 Navigation & Layout

#### Header Component

- Fixed position for consistent access
- Main navigation links:
  - Search
  - Recommendations
  - About/Info
- Mobile-responsive menu (hamburger for small screens)
- Optional user account area

#### Footer Component

- Links to important pages (About, Contact, Privacy Policy)
- Attribution for data sources
- Social media links (if applicable)

## Technical Implementation Guidelines

### Google Books API Integration

#### API Setup and Configuration

- Register for Google Books API key through Google Cloud Console
- Set up environment variables for secure API key storage
- Implement rate limiting and caching to stay within API quotas

#### Core API Functions

The Google Books API integration is implemented in two layers:

1. **Base API Layer** (`src/lib/api/googleBooks.ts`):

   - Contains the core API functions that directly interact with the Google Books API
   - Handles data fetching, error handling, and response parsing
   - Provides TypeScript interfaces for API responses and parameters

2. **Server Actions Layer** (`src/lib/actions/bookActions.ts`):
   - Implements Next.js Server Actions that wrap the base API functions
   - Provides a clean interface for client components to call server-side functions
   - Adds additional error handling and logging

The following functions are implemented:

- `searchBooks(query, filters)`: Search for books based on user input and optional filters
  - Supports filtering by genre, year range, and completion status
  - Returns a list of books matching the search criteria
- `getBookDetails(bookId)`: Retrieve detailed information about a specific book
  - Fetches comprehensive metadata for a single book
  - Handles 404 errors gracefully when a book is not found
- `getSeriesInfo(seriesId)`: Aggregate information about books in a series
  - Identifies books that belong to the same series
  - Determines if a series is complete based on publication dates
  - Organizes books in chronological order
- `getAuthorBooks(authorId)`: Get all books by a specific author
  - Searches for books by author name
  - Returns a comprehensive list of an author's works
- `getBooksBySeriesName(seriesName)`: Get books in a series by series name
  - Searches for books that belong to a specific series by name
  - Useful for finding related books in a series

#### Server Actions Implementation

The application uses Next.js Server Actions to perform data fetching on the server side, which offers several advantages:

- **Reduced Client-Side JavaScript**: Server Actions move data fetching logic to the server
- **Improved Performance**: Eliminates client-server waterfalls
- **Enhanced Security**: API keys remain on the server
- **Simplified Client Code**: Client components can directly call server functions

Server Actions are implemented using the `'use server'` directive and can be called directly from client components:

```tsx
// Example of a Server Action in src/lib/actions/bookActions.ts
"use server";

import { searchBooks as apiSearchBooks } from "../api/googleBooks";

export async function searchBooks(query, filters) {
	try {
		return await apiSearchBooks(query, filters);
	} catch (error) {
		console.error("Error in searchBooks action:", error);
		throw new Error("Failed to search books. Please try again later.");
	}
}
```

#### Search Implementation

The search functionality is implemented using a combination of client and server components:

1. **SearchForm Component** (`src/components/search/SearchForm.tsx`):

   - Client component that renders a search form
   - Uses the `action` attribute to call a Server Action when the form is submitted
   - Provides immediate feedback to the user during search

2. **Search Page** (`src/app/search/page.tsx`):

   - Client component that displays search results
   - Manages search state (results, loading, error)
   - Calls Server Actions to fetch search results
   - Handles filter changes and updates results accordingly

3. **SearchFilters Component** (`src/components/search/SearchFilters.tsx`):

   - Client component that renders filter options
   - Allows users to filter search results by genre, completion status, etc.
   - Communicates filter changes to the parent component

4. **SearchResults Component** (`src/components/search/SearchResults.tsx`):
   - Client component that displays search results in a grid
   - Handles loading and error states
   - Renders individual BookCard components for each result

#### Series Detail Implementation

The series detail page is implemented as a server component that uses Server Actions:

1. **Series Page** (`src/app/series/[id]/page.tsx`):

   - Server component that fetches series information
   - Uses the `getSeriesInfo` Server Action to fetch data
   - Handles 404 errors when a series is not found
   - Renders the SeriesDetail component with the fetched data

2. **SeriesDetail Component** (`src/components/series/SeriesDetail.tsx`):
   - Client component that displays series information
   - Shows series completion status, book list, and reading order
   - Provides interactive elements for exploring the series

#### Data Processing

- Parse and normalize API responses for consistent data structure
- Extract and organize series information (often requires additional processing)
- Handle edge cases like incomplete metadata or missing covers
- Implement fallback strategies when API data is incomplete

#### Error Handling

- Graceful degradation when API is unavailable
- User-friendly error messages
- Retry mechanisms for transient failures
- Logging for debugging purposes

### Animation Implementation with CSS

#### Series Visualization Tree

- Implement a custom tree component using CSS transitions
- Use CSS classes for animated elements
- Define transition states for different interactions (expanded, collapsed, hover)
- Implement gesture recognition for interactive elements

#### Animation Guidelines

- Keep animations under 300ms for optimal UX
- Use CSS easing functions for natural-feeling motion
- Ensure animations have purpose and enhance understanding
- Provide reduced motion options for accessibility

#### Key Animation Components

- `SeriesTree`: Main visualization component for book series
- `BookNode`: Interactive node representing a single book
- `ConnectionLine`: Animated lines connecting related books
- `ExpandButton`: Interactive element to expand/collapse branches

#### Implementation Example

```tsx
// Example of a BookNode component with CSS transitions
import { useState } from "react";

const BookNode = ({ book, isActive, onClick }) => {
	return (
		<div
			className={`book-node transition-all duration-300 ease-in-out ${
				isActive ? "scale-105 shadow-lg" : "scale-100"
			}`}
			onClick={onClick}
		>
			<img
				src={book.coverUrl}
				alt={book.title}
				className="transition-transform duration-300"
			/>
			<h3>{book.title}</h3>
			{isActive && (
				<div className="book-details transition-all duration-300 ease-in-out opacity-100 h-auto">
					{/* Book details */}
				</div>
			)}
		</div>
	);
};
```

### Performance Optimization

- Implement image optimization with Next.js Image component
- Lazy load off-screen content and images
- Implement proper caching strategies for API responses
- Use code splitting to reduce initial bundle size
- Optimize for Core Web Vitals metrics
- Optimize animations for performance (use CSS will-change property for hardware acceleration)

### State Management

- Use React Context for global UI state (theme, user preferences)
- Consider Zustand for more complex state requirements
- Implement proper loading and error states for all async operations
- Manage animation states consistently across components

### API Integration

- Create reusable API service functions in the lib directory
- Implement proper error handling and retry logic
- Use SWR or React Query for data fetching, caching, and revalidation
- Set up appropriate data transformation layers between Google Books API and UI

### Accessibility

- Semantic HTML structure throughout the application
- Proper ARIA attributes where necessary
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Respect user preferences for reduced motion

### Testing Strategy

- Unit tests for utility functions and hooks
- Component tests for UI elements
- Integration tests for key user flows
- Accessibility testing with automated tools
- Animation testing for performance and correctness

## Development Workflow

1. ✅ Set up the Next.js project with TypeScript, Shadcn UI, and CSS animations
2. ✅ Configure Google Books API integration and test basic queries
   - Implemented Google Books API integration with TypeScript interfaces
   - Created Server Actions for data fetching
   - Set up error handling and response parsing
   - Implemented search functionality with filters
3. ✅ Implement the core layout and navigation components
4. ✅ Build the search functionality and results display
   - Created SearchForm component with Server Actions
   - Implemented search results display with loading and error states
   - Added filter functionality
5. ✅ Develop the series detail page with tree visualization
   - Implemented series detail page using Server Actions
   - Created SeriesDetail component to display series information
   - Added completion status detection
6. 🔄 Create the recommendation engine and user input form
7. 🔄 Implement responsive design and accessibility features
8. 🔄 Optimize performance and conduct testing
9. 🔄 Deploy and monitor

### Current Implementation Status

- ✅ Google Books API integration with Server Actions
- ✅ Search functionality with filters
- ✅ Book and series detail pages
- ✅ Series completion status detection
- 🔄 Recommendation engine
- 🔄 User accounts and personalization
- 🔄 Advanced visualizations

### Next Steps

1. Enhance the series detection algorithm to better identify related books
2. Implement the recommendation engine based on user preferences
3. Add user accounts for saving favorite series and tracking reading progress
4. Improve the series visualization with interactive elements
5. Optimize performance and implement caching strategies
6. Add comprehensive error handling and fallback UI
7. Implement accessibility features and responsive design improvements

## Server Actions Implementation

### Overview

The application uses Next.js Server Actions to perform data fetching and mutations on the server side. Server Actions provide several benefits:

- **Reduced Client-Side JavaScript**: Moving data fetching logic to the server reduces the amount of JavaScript sent to the client
- **Improved Performance**: Eliminates client-server waterfalls by performing data fetching on the server
- **Enhanced Security**: API keys and sensitive data remain on the server
- **Simplified Client Code**: Client components can directly call server functions without complex state management

### Server Actions Structure

Server Actions are implemented in two main files:

1. **`src/lib/actions/bookActions.ts`**:

   - Contains Server Actions for book-related operations
   - Wraps the base API functions from `googleBooks.ts`
   - Provides additional error handling and logging

2. **`src/lib/api/googleBooks.ts`**:
   - Contains the base API functions that interact with the Google Books API
   - Defines TypeScript interfaces for API responses and parameters
   - Handles data fetching, error handling, and response parsing

### Key Server Actions

The following Server Actions are implemented:

- **`searchBooks(query, filters)`**: Search for books based on query and filters
- **`getBookDetails(bookId)`**: Get detailed information about a specific book
- **`getSeriesInfo(seriesId)`**: Get information about a book series
- **`getAuthorBooks(authorName)`**: Get books by a specific author
- **`getBooksBySeriesName(seriesName)`**: Get books in a series by name

### Using Server Actions in Components

Server Actions can be used in two main ways:

1. **Form Actions**:

   ```tsx
   // Using Server Action with a form
   <form action={searchBooks}>
   	<input name="query" />
   	<button type="submit">Search</button>
   </form>
   ```

2. **Direct Function Calls**:
   ```tsx
   // Calling Server Action directly
   const results = await searchBooks(query, filters);
   ```

### Server Actions in Client Components

When using Server Actions in client components, we follow these patterns:

1. **Form-based approach** (preferred):

   - Use the `action` attribute on forms to call Server Actions
   - Provides progressive enhancement and works without JavaScript
   - Example: `<form action={handleSubmit}>`

2. **Direct function calls**:
   - Call Server Actions directly from event handlers or effects
   - Requires JavaScript to be enabled
   - Example: `const results = await searchBooks(query, filters);`

### Error Handling

Server Actions include comprehensive error handling:

- **Try-catch blocks** in all Server Actions
- **Specific error messages** for different error types
- **Fallback UI** for error states
- **Console logging** for debugging

### Future Enhancements

Planned enhancements for Server Actions:

1. **Caching**: Implement caching strategies to improve performance
2. **Optimistic Updates**: Add optimistic UI updates for better user experience
3. **Revalidation**: Implement data revalidation for stale data
4. **Mutation Actions**: Add actions for user data mutations (when user accounts are implemented)

## Future Enhancements to Consider

- User accounts with personalized reading lists
- Social features (reviews, recommendations)
- Integration with e-reader platforms
- Mobile app versions
- Advanced analytics for reading habits
- AI-powered recommendation improvements
- More advanced visualizations for complex series with multiple reading paths

---

## Client vs Server Components

### Current Client Components

The following components are currently marked with `"use client"` directive:

#### UI Components (Shadcn)

These components need to remain as client components because they use client-side interactivity, state, or browser APIs:

- `src/components/ui/select.tsx` - Uses Radix UI's interactive select component
- `src/components/ui/dropdown-menu.tsx` - Uses client-side interactivity for dropdown functionality
- `src/components/ui/checkbox.tsx` - Manages checkbox state on the client
- `src/components/ui/radio-group.tsx` - Manages radio button state on the client
- `src/components/ui/label.tsx` - Often paired with interactive form elements

#### Providers

These components need to remain as client components because they provide context to the client-side React tree:

- `src/providers/ThemeProvider.tsx` - Uses next-themes to manage theme state on the client

#### Search Components

These components use client-side state, event handlers, and browser APIs:

- `src/components/search/SearchBar.tsx` - Uses form state, event handlers, and navigation
- `src/components/search/SearchResults.tsx` - Likely manages search result state
- `src/components/search/BookCard.tsx` - May contain interactive elements or client-side state

#### Layout Components

These components may use client-side interactivity for navigation, theme switching, etc.:

- `src/components/layout/Header.tsx` - Likely contains navigation and theme toggle
- `src/components/layout/Footer.tsx` - May contain interactive elements

#### Home Page Components

These components may use animations, state, or other client-side features:

- `src/components/home/HeroSection.tsx` - Contains animations and the SearchBar component
- `src/components/home/FeaturesSection.tsx` - May contain animations or interactive elements
- `src/components/home/PopularSeriesSection.tsx` - May contain client-side state or interactivity
- `src/components/home/CTASection.tsx` - May contain interactive elements or animations

#### Page Components

- `src/app/search/page.tsx` - Uses client-side features for search functionality

### Components That Could Be Converted to Server Components

After removing HeroUI dependencies, some components might be convertible to server components if they:

1. Don't use React hooks (useState, useEffect, etc.)
2. Don't use event handlers (onClick, onChange, etc.)
3. Don't use browser-only APIs
4. Don't use client components directly (without a client boundary)

Based on our analysis, here are specific components that could potentially be converted to server components:

1. **Footer Component** (`src/components/layout/Footer.tsx`):

   - Currently marked with "use client" but doesn't appear to use any client-side features
   - Only uses Next.js Link component and static JSX
   - The only client-side code is `new Date().getFullYear()` which could be replaced with server-side code
   - Could be converted to a server component

2. **FeaturesSection Component** (`src/components/home/FeaturesSection.tsx`):

   - Currently marked with "use client" but contains only static JSX
   - Uses CSS animations that can work in server components
   - No state or event handlers
   - Could be converted to a server component

3. **PopularSeriesSection Component** (`src/components/home/PopularSeriesSection.tsx`):
   - Would need further examination, but if it only displays static content or server-fetched data without client interactivity, it could be converted

Components that should remain as client components:

1. **Header Component** (`src/components/layout/Header.tsx`):

   - Uses useState for mobile menu toggle
   - Contains interactive elements (dropdown menu, search input)
   - Should remain a client component

2. **HeroSection Component** (`src/components/home/HeroSection.tsx`):

   - Contains animations and the SearchBar component
   - Should remain a client component
