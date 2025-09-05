# Overview

This is a professional makeup artist portfolio website for Amita Kushwah (branded as "Amita Makeover"), successfully migrated from Bolt to Replit. Built with React, Express.js, and TypeScript, featuring a full-stack architecture with modern UI components, animations, and dark/light mode theming. The website focuses on bridal makeup services and includes direct contact integration with fixed floating buttons for phone, WhatsApp, and Instagram.

# User Preferences

Preferred communication style: Simple, everyday language.
Portfolio focus: Bridal and special event makeup services (not team-based content)
Branding: "Amita Makeover" for business name, "Amita Kushwah" for personal attribution
Contact integration: Fixed floating buttons positioned in bottom-right corner

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **UI Components**: Extensive use of Radix UI primitives through shadcn/ui for accessible components
- **State Management**: React hooks (useState, useEffect) for local component state
- **Theme System**: Built-in dark/light mode toggle with localStorage persistence
- **Animations**: Custom CSS animations and transitions for enhanced user experience

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **API Structure**: RESTful API design with all routes prefixed with `/api`
- **Development Setup**: Vite middleware integration for hot module replacement in development

## Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless database provider
- **ORM**: Drizzle ORM with code-first schema definitions
- **Schema Management**: Shared schema definitions between frontend and backend
- **Migrations**: Drizzle Kit for database schema migrations
- **Development Storage**: In-memory storage implementation for local development

## Authentication and Authorization
- **User Schema**: Basic user model with username and password fields
- **Storage Interface**: Prepared methods for user creation and retrieval
- **Session Management**: PostgreSQL session store configuration (connect-pg-simple)

## Build and Development
- **Monorepo Structure**: Shared code between client and server in `/shared` directory
- **Build Process**: Separate build commands for client (Vite) and server (esbuild)
- **Development**: Hot reloading with Vite middleware integration
- **Type Safety**: Comprehensive TypeScript configuration across all packages

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database hosting (@neondatabase/serverless)
- **Connection**: Environment variable based database URL configuration

## UI and Styling
- **shadcn/ui**: Complete component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Radix UI**: Accessible component primitives for complex UI components
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Frontend build tool and development server
- **esbuild**: Fast JavaScript bundler for server-side code
- **TypeScript**: Type checking and compilation across the entire stack
- **Drizzle Kit**: Database migration and management tool

## State Management and Data Fetching
- **TanStack Query**: Server state management and data fetching (@tanstack/react-query)
- **React Hook Form**: Form handling with validation (@hookform/resolvers)
- **Zod**: Schema validation and type inference

## Runtime and Utilities
- **Express.js**: Web application framework for Node.js
- **date-fns**: Date manipulation and formatting utilities
- **clsx**: Utility for constructing className strings
- **class-variance-authority**: Utility for creating component variants