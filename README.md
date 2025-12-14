# Next Calendar - Trip Booking System

A modern, full-stack calendar booking application built with Next.js for managing trip reservations. Users can browse available dates, book time slots, manage their reservations, and administrators can oversee all bookings.

## 🚀 Features

### User Features
- **User Authentication**: Secure registration and login system with JWT tokens
- **Calendar Interface**: Interactive calendar for selecting available dates
- **Time Slot Booking**: Book available time slots (9:00 AM - 5:00 PM, 2-hour intervals)
- **Profile Management**: 
  - View and edit personal information (name, surname, email)
  - View all personal reservations
  - Delete own reservations
- **Responsive Design**: Modern UI with SCSS styling

### Admin Features
- **Admin Dashboard**: View all bookings across all users
- **User Management**: Access to user information and booking history
- **Role-based Access Control**: Admin-only routes and functionality

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **SCSS** - Styling with CSS modules
- **React Day Picker** - Calendar component
- **React Toastify** - Toast notifications
- **dayjs** - Date manipulation utilities
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **Prisma** - ORM for database management
- **PostgreSQL** - Database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
next-calendar/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/             # Database migrations
├── public/                     # Static assets
├── src/
│   ├── app/
│   │   ├── (routes)/           # Route groups
│   │   │   ├── admin/          # Admin pages
│   │   │   ├── login/          # Login page
│   │   │   ├── register/       # Registration page
│   │   │   ├── profile/         # User profile page
│   │   │   └── page.tsx        # Main/home page
│   │   ├── api/                # API routes
│   │   │   ├── admin/          # Admin endpoints
│   │   │   ├── auth/           # Authentication endpoints
│   │   │   ├── dates/          # Booking CRUD endpoints
│   │   │   ├── register/       # Registration endpoint
│   │   │   └── user/           # User endpoints
│   │   └── layout.tsx          # Root layout
│   ├── components/             # Reusable React components
│   │   ├── calendar/           # Calendar component
│   │   ├── bookableDates/      # Available time slots display
│   │   ├── buttons/            # Button components
│   │   ├── modal/              # Modal dialogs
│   │   ├── toast/              # Toast notifications
│   │   └── ...
│   ├── lib/
│   │   └── validators/         # Zod validation schemas
│   ├── models/                 # TypeScript type definitions
│   ├── server/
│   │   ├── services/           # Business logic services
│   │   ├── utils/              # Server utilities
│   │   ├── auth.ts             # Authentication helpers
│   │   └── db.ts               # Prisma client
│   └── utils/                  # Client-side utilities
└── package.json
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Environment variables configured

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd next-calendar
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/next_calendar"
   JWT_SECRET="your-secret-jwt-key-here"
   NODE_ENV="development"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in HTTP-only cookies
- Tokens expire after 7 days
- Protected routes require valid authentication
- Admin routes require admin role

## 🎨 Key Features Explained

### Time Slot Generation
Time slots are generated from 9:00 AM to 5:00 PM with 2-hour intervals:
- 09:00, 11:00, 13:00, 15:00, 17:00

### Calendar Restrictions
- Weekends (Saturday and Sunday) are disabled
- Past dates are disabled
- Only future weekdays can be selected

### Booking Flow
1. User selects a date from the calendar
2. Available time slots for that date are displayed
3. User clicks on a time slot to book
4. Booking is created and associated with the user
5. User can view and manage bookings in their profile

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- HTTP-only cookies for token storage
- Input validation with Zod schemas
- Role-based access control
- User can only modify their own bookings

## 🧪 Development

### Code Style
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- SCSS modules for component styling

### Database Management
```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# View database in Prisma Studio
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## 🚢 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Environment Variables for Production
Ensure all environment variables are set in your production environment:
- `DATABASE_URL` - Production database connection string
- `JWT_SECRET` - Strong, random secret key
- `NODE_ENV` - Set to "production"

