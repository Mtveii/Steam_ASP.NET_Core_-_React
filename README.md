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

<h1>FrontendProject/ (React)</h1>
<ul>
  <li>src/
    <ul>
      <li>components/
        <ul>
          <li>Game.jsx — Game display component</li>
          <li>GameCreate.jsx — Game creation form</li>
          <li>GameEdit.jsx — Game editing interface</li>
          <li>GameDelete.jsx — Game deletion component</li>
          <li>Games.jsx — Games list view</li>
          <li>ChatPage.jsx — Chat functionality</li>
          <li>CommunityPage.jsx — Community features</li>
          <li>ProfilePage.jsx — User profile management</li>
          <li>Login.jsx — User authentication</li>
          <li>Register.jsx — User registration</li>
          <li>components_CSS/ — Component-specific styles</li>
        </ul>
      </li>
      <li>assets/ — Static assets</li>
      <li>App.jsx — Main application component</li>
    </ul>
  </li>
</ul>

<h1>BackendProject/ (ASP.NET Core Web API)</h1>
<ul>
  <li>Controllers/ — API Endpoints (e.g., GamesController, AuthController)</li>
  <li>Data/ — DbContext, Migrations</li>
  <li>Models/ — Entity Models (Users, Games, etc.)</li>
  <li>Services/ — Business Logic (e.g., UserService, GameService)</li>
  <li>Program.cs — Application configuration</li>
</ul>


git clone <repository_url>
cd steam-clone-project

2. Database Setup (ASP.NET Core Backend)

Navigate to your ASP.NET Core project directory (e.g., BackendProject/) and use the .NET CLI or NuGet Package Manager Console to apply migrations and update the database schema.

Using .NET CLI (Recommended for cross-platform):


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



# In the BackendProject directory
dotnet run

The API will typically start on a port like https://localhost:7000.

4. Run the Frontend (React)

Navigate to the React project directory (e.g., src/ or Frontend/) and install dependencies, then start the development server.


npm install

The React app will typically start on a port like http://localhost:5173.



<img width="217" height="255" alt="Снимок экрана 2025-11-02 134603" src="https://github.com/user-attachments/assets/a32dc3f2-d359-4f71-8309-adceca0d5642" />

<img width="377" height="195" alt="Снимок экрана 2025-11-02 134808" src="https://github.com/user-attachments/assets/fa32bf79-fa6a-4ed0-994c-63ad64a38107" />

Here are some screenshots showcasing the application's key features:

<img width="377" height="195" alt="Снимок экрана 2025-11-02 134642" src="https://github.com/user-attachments/assets/547d4691-bd39-4a47-8289-d4ba217e12c0" />

Game Catalog / List View

<img width="377" height="195" alt="Снимок экрана 2025-11-02 134648" src="https://github.com/user-attachments/assets/b925bef7-1216-430b-9a43-4bd52c98bfd2" />

Community Screenshots Gallery

<img width="377" height="195" alt="Снимок экрана 2025-11-02 134716" src="https://github.com/user-attachments/assets/951041fd-3a85-4abc-98c1-48fd585f66e9" />

Global Chat / Community Page

<img width="377" height="195" alt="Снимок экрана 2025-11-02 134730" src="https://github.com/user-attachments/assets/df838e3b-5dba-4f22-8d58-cfc61071f2a4" />

User Profile / Login

<img width="377" height="195" alt="Снимок экрана 2025-11-02 134808" src="https://github.com/user-attachments/assets/fa32bf79-fa6a-4ed0-994c-63ad64a38107" />

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
