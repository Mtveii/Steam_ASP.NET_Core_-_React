Steam Clone Project

This is a Steam-like application built using React for the frontend and ASP.NET Core Web API for the backend, providing a modern, full-stack web interface for gaming community features.

🚀 Features

👤 User System (ASP.NET Core Identity & JWT)

    Complete registration and login system with secure password hashing.

    Special admin access (username: "admin") with extended privileges.

    User profile customization.

    User authentication and authorization using JWT (JSON Web Tokens).

🎮 Game Management (Full-Stack CRUD)

    Comprehensive game catalog with detailed information.

    Game filtering and search functionality.

    Special features:   - Promotional slider for featured games.   - Special offers and deals section.

    Admin capabilities (Secured by Authorization):   - Add new games.   - Edit existing games.   - Delete games.

🌐 Community Features

    Community screenshots gallery.

    Global chat system (Likely implemented using ASP.NET Core SignalR for real-time communication).

    User profiles.

    Interactive community page.

📊 Database Structure (Entity Framework Core)

The database schema is managed using Entity Framework Core Migrations.

1. Users Table

SQL

Users {
  UserId (Primary Key)
  Username
  Password (Hashed)
  Email
  Role (Admin/User)
  RegistrationDate
  LastLogin
}

2. Games Table

SQL

Games {
  GameId (Primary Key)
  Title
  ReleaseDate
  Size
  Creator
  Description
  Price
  IsOnSale
  SalePrice
  ImageUrl
}

3. Community Screenshots Table

SQL

CommunityScreenshots {
  ScreenshotId (Primary Key)
  UserId (Foreign Key)
  GameId (Foreign Key)
  ImageUrl
  Description
  UploadDate
  Likes
}

4. Global Chat Messages Table

SQL

ChatMessages {
  MessageId (Primary Key)
  UserId (Foreign Key)
  Message
  Timestamp
  IsEdited
}

💻 Technologies Used

Frontend (React)

    React 19

    Vite (Build Tool)

    React Router DOM

    React Bootstrap

    Bootstrap 5

    Axios (for API calls to ASP.NET Core)

Backend (ASP.NET Core)

    ASP.NET Core 8/9 Web API

    Entity Framework Core (for Data Access and Migrations)

    SQL Server / SQLite (Database Provider)

    JWT Authentication

    ASP.NET Core Identity (for user management)

    ASP.NET Core SignalR (for Real-Time Chat)

📁 Project Structure

src/
├── components/           # React components
│   ├── Game.jsx         # Game display component
│   ├── GameCreate.jsx   # Game creation form
│   ├── GameEdit.jsx     # Game editing interface
│   ├── GameDelete.jsx   # Game deletion component
│   ├── Games.jsx        # Games list view
│   ├── ChatPage.jsx     # Chat functionality
│   ├── CommunityPage.jsx# Community features
│   ├── ProfilePage.jsx  # User profile management
│   ├── Login.jsx        # User authentication
│   ├── Register.jsx     # User registration
│   └── components_CSS/  # Component-specific styles
├── assets/             # Static assets
└── App.jsx            # Main application component

BackendProject/ (ASP.NET Core Web API)
├── Controllers/         # API Endpoints (e.g., GamesController, AuthController)
├── Data/                # DbContext, Migrations
├── Models/              # Entity Models (Users, Games, etc.)
├── Services/            # Business Logic (e.g., UserService, GameService)
└── Program.cs           # Application configuration
🚦 Getting Started

1. Clone the repository

Bash

git clone <repository_url>
cd steam-clone-project

2. Database Setup (ASP.NET Core Backend)

Navigate to your ASP.NET Core project directory (e.g., BackendProject/) and use the .NET CLI or NuGet Package Manager Console to apply migrations and update the database schema.

Using .NET CLI (Recommended for cross-platform):
Bash

# Add a new migration (only needed after making model changes in the DbContext)
dotnet ef migrations add InitialCreate

# Apply all pending migrations to the database
dotnet ef database update

Using NuGet Package Manager Console (In Visual Studio):
PowerShell

# Add a new migration (only needed after making model changes in the DbContext)
Add-Migration InitialCreate

# Apply all pending migrations to the database
Update-Database

3. Run the Backend (ASP.NET Core Web API)

Bash

# In the BackendProject directory
dotnet run

The API will typically start on a port like https://localhost:7000.

4. Run the Frontend (React)

Navigate to the React project directory (e.g., src/ or Frontend/) and install dependencies, then start the development server.
Bash

npm install
npm run dev

The React app will typically start on a port like http://localhost:5173.

🖼️ UI Screenshots Showcase

Here are some screenshots showcasing the application's key features:

Homepage / Featured Slider

(Place the screenshot of the Promotional Slider here, like Снимок экрана 2025-11-02 134603.png or Снимок экрана 2025-11-02 134642.png)

Game Catalog / List View

(Place the screenshot of the Games List/Catalog here, like Снимок экрана 2025-11-02 134648.png)

Game Detail Page

(Place the screenshot of a Detailed Game Page here, like Снимок экрана 2025-11-02 134706.png)

Community Screenshots Gallery

(Place the screenshot of the Community Screenshots Gallery here, like Снимок экрана 2025-11-02 134716.png)

Global Chat / Community Page

(Place the screenshot of the Global Chat or Interactive Community Page here, like Снимок экрана 2025-11-02 134730.png)

User Profile / Login

(Place the screenshot of the User Profile or Login/Registration Screen here, like Снимок экрана 2025-11-02 134808.png)

🛠️ Available Scripts

Frontend (React)

    npm run dev - Start development server

    npm run build - Build for production

    npm run preview - Preview production build

    npm run lint - Run ESLint code quality checks

Backend (ASP.NET Core - use from the backend directory)

    dotnet run - Compiles and runs the backend API

    dotnet ef migrations add <Name> - Scaffolds a new database migration

    dotnet ef database update - Applies pending migrations to the database
