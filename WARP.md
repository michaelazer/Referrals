# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Weferral is a referral management & affiliate tracking software built with React and Webpack. This is the frontend dashboard application that communicates with a separate backend API (weferral-api).

**Note:** This project is not production-ready yet and is still a work in progress.

## Development Commands

### Setup
```bash
npm install
```

### Running the Application
```bash
npm start                  # Start development server (alias for npm run start:dev)
npm run start:dev          # Start dev server with hot reloading on port 4100
npm run start:prod         # Start production server
```

Development server runs at: `http://localhost:4100`

### Building
```bash
npm run build:dev          # Build development version
npm run build:prod         # Build production version (minified, ready for deployment)
```

Built files are output to `/dist/` directory.

### Linting
```bash
npx eslint app/            # Run ESLint on app directory
```

No test suite is currently configured.

## Backend API Dependency

This frontend requires the weferral-api backend server to be running:
- Backend repo: https://github.com/WeferralHq/weferral-api
- Default backend URL: `http://localhost:3001` (configured in `app/port.js`)
- Setup backend at: `http://localhost:3001/setup`

## Architecture

### Application Structure

```
app/
├── components/          # Reusable UI components
│   ├── App/            # Root application component
│   ├── Layout/         # Layout wrappers
│   ├── Navbar/         # Navigation components
│   └── [various]/      # Other reusable components
├── routes/             # Route definitions and page components
│   ├── Dashboards/     # Dashboard pages
│   ├── Forms/          # Form pages (campaigns, participants, etc.)
│   ├── Pages/          # General pages (login, settings, etc.)
│   ├── Tables/         # Table views
│   ├── Graphs/         # Chart/graph pages
│   └── index.js        # Main route configuration
├── layout/             # Layout components and configurations
│   └── components/     # Navbar and sidebar variants
├── utilities/          # Utility functions and helpers
│   ├── fetcher.js      # API request wrapper with auth
│   ├── action.js       # Redux action creators and types
│   ├── authorizer.js   # Authorization utilities
│   └── [others]/       # Various helpers
├── styles/             # Global styles (SCSS)
├── store.js           # Redux store configuration
└── index.js           # Application entry point
```

### Key Architectural Patterns

#### State Management
- **Redux** is used for global state management
- Store configured in `app/store.js` with thunk middleware
- Key state slices:
  - `allForms`: Form data storage
  - `options`: System-wide options/settings
  - `notifications`: User and system notifications
  - `user`: Current user data
  - `uid`: User ID from cookies

#### Routing
- **React Router** (v5) for client-side routing
- Routes defined in `app/routes/index.js`
- Two user types supported:
  - Admin users: Dashboard, campaigns, participants, commissions
  - Referral participants: Public signup/login at `/:campaignName/login`
- Layout components switch based on route

#### API Communication
- Centralized API calls through `app/utilities/fetcher.js`
- Automatic JWT/Bearer token injection from localStorage
- Cookie-based session management (uid/pid)
- Default API base URL configurable in `app/port.js`

#### Authentication Flow
- Admin: `/login` → stores JWT token → redirects to `/dashboard`
- Participants: `/:campaignName/login` → stores Bearer token → redirects to `/my-dashboard`
- Logout routes: `/logout` (admin), `/:campaignName/logout` (participant)

#### Build System
- **Webpack 4** with separate dev/prod configurations in `/build/`
- Hot Module Replacement (HMR) enabled in development
- CSS Modules for component styles (except global styles in `app/styles/`)
- SCSS support with PostCSS processing

### Important Files

- `config.js`: Build configuration (paths, site metadata)
- `app/port.js`: Backend API URL configuration
- `app/store.js`: Redux store setup
- `app/routes/index.js`: Route definitions and state initialization
- `app/utilities/fetcher.js`: API request wrapper
- `app/utilities/action.js`: Redux actions and action creators

### Component Organization

#### Key Pages
- **Dashboard**: Main admin overview (`routes/Dashboards/Dashboard`)
- **Campaigns**: Create/edit campaigns (`routes/Forms/CreateCampaign`, `routes/Pages/Campaign`)
- **Participants**: Manage affiliates (`routes/Pages/Participant`)
- **Commissions**: Track and manage payouts (`routes/Pages/Commission`)
- **Settings**: System configuration (`routes/Forms/SystemOptions`)

#### Layouts
Multiple layout variants support different page types:
- `DefaultNavbar` + `DefaultSidebar`: Standard admin layout
- `SidebarANavbar` + `SidebarASidebar`: Alternative admin layout
- `ParticipantNavBar`: Public-facing participant layout
- `NavbarOnly`: Minimal layout

### Authentication & Authorization

- Uses JWT tokens for admin users
- Bearer tokens for participant users
- Tokens stored in localStorage
- UIDs/PIDs stored in cookies
- Authorization wrapper in `app/utilities/authorizer.js`
- Initial state loads user data and system options on app mount

### Styling

- Bootstrap 4 + Reactstrap for UI components
- Custom SCSS in `app/styles/`
- CSS Modules for component-specific styles
- Airframe dashboard theme (`@owczar/dashboard-style--airframe`)

## Development Notes

### Adding New Routes
1. Create page component in appropriate `app/routes/` subdirectory
2. Add route definition in `app/routes/index.js` within `<Switch>`
3. Update layout routing in `RoutedNavbars` or `RoutedSidebars` if needed

### Making API Calls
Always use the `Fetcher` utility from `app/utilities/fetcher.js`:
```javascript
import Fetcher from '../utilities/fetcher';
import port from '../port';

// GET request
const data = await Fetcher(`${port}/api/v1/endpoint`);

// POST request
const response = await Fetcher(`${port}/api/v1/endpoint`, 'POST', { key: 'value' });
```

### Updating Redux State
Use action creators from `app/utilities/action.js`:
```javascript
import { setUser, setOptions } from '../utilities/action';
import { useDispatch } from 'react-redux';

const dispatch = useDispatch();
dispatch(setUser(userData));
```

### Configuration Changes
- Backend URL: Edit `app/port.js`
- Site metadata: Edit `config.js` (title, description, URL)
- Webpack build: Edit files in `/build/` directory
