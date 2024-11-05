# Frontend Documentation

## Overview

This frontend application is built using [Next.js v15](https://nextjs.org/) for server-rendered React applications, with [Chakra UI](https://chakra-ui.com/) for component-based styling and [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS. The project is structured in a modular way, with separate directories for API calls, reusable components, and utility functions, making the application scalable and easy to maintain.

## Project Structure

### Root Structure

- **`public`**: Contains static assets like images and the favicon.

- **`src`**: Main source folder for the application.
  - **`api`**: Handles API configuration and helper functions.
    - **`auth.ts`**: Manages authentication API calls.
    - **`comment.ts`**: Manages comment-related API calls.
    - **`post.ts`**: Manages post-related API calls.

  - **`app`**: Contains page and layout components for Next.js.
    - **`(navbar)`**: Components for the navigation bar.
    - **`post`**: Pages and layouts related to posts.
    - **`signin`**: Sign-in page.

  - **`assets`**: Static assets like images used throughout the application.

  - **`components`**: Reusable React components, organized by feature.
    - **`comment`**: Components for displaying and interacting with comments.
    - **`post`**: Components for displaying posts, such as `PostCard.tsx`.
    - **`ui`**: General UI components like `MenuDrawer.tsx` and `NavigationBar.tsx`.

  - **`utils`**: Helper functions for general usage across the app.
    - **`debounceSearch.ts`**: Limits the frequency of search requests.
    - **`formatDate.ts`**: Formats dates for consistent display.
    - **`formattedError.ts`**: Formats error messages consistently.

  - **`globals.css`**: Global styles that include Tailwind CSS and any custom styling.

### Key Files and Directories

- **Post Card (`PostCard.tsx`)**  
  Displays individual posts with a mix of Chakra UI for layout and Tailwind CSS for utility-based styling.

- **Navbar Component (`NavigationBar.tsx`)**  
  A responsive navigation bar, using Chakra UI for layout and Tailwind CSS for specific styles.

---

## Technologies

- **Next.js v15**: A React framework with server-side rendering, static generation, and API route support.
- **Chakra UI**: Provides accessible, pre-built UI components with easy customization.
- **Tailwind CSS**: Utility-first CSS framework for quickly applying styles without writing custom CSS.
- **pnpm**: Fast and efficient package manager that optimizes dependencies.
- **dayjs**: Lightweight library for date formatting.
- **React Icons**: A collection of icon sets for React.

### Why Chakra UI and Tailwind CSS?

- **Chakra UI** provides a consistent design language with accessible components.
- **Tailwind CSS** allows precise control over layout, spacing, and colors without writing custom styles. Together, they offer flexibility and ease of use in styling.

## Environment Configuration

- **.env**: Store environment variables for database connections, API keys, etc. Make sure to set up a `.env` file with values for your environment before running the application.

## Example `.env` file

```dotenv
NEXT_PUBLIC_PROD_URL=http://localhost:3001/api
```

---

## Getting Started


### Prerequisites

- **Node.js**: Version 16 or higher is required for compatibility with Next.js v15.
- **pnpm**: If not installed, install pnpm globally:

   ```bash
   npm install -g pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/phufarpsw/datawow-frontend.git

## Getting Started

First, Install dependencies using npm or pnpm:

```bash
npm install
or
pnpm install
```

## Running the Project

Start the development server:
```
npm run dev
or
pnpm run dev
```

