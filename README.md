<h1 align="center">🎮 Steam Clone Project</h1>

<p align="center">
  This is a Steam-like application built using <b>React</b> for the frontend and <b>ASP.NET Core Web API</b> for the backend, providing a modern, full-stack web interface for gaming community features.
</p>

<hr/>

<h2>🚀 Features</h2>

<h3>👤 User System (ASP.NET Core Identity & JWT)</h3>
<ul>
  <li>Complete registration and login system with secure password hashing.</li>
  <li>Special admin access (username: <code>admin</code>) with extended privileges.</li>
  <li>User profile customization.</li>
  <li>Authentication and authorization using JWT.</li>
</ul>

<h3>🎮 Game Management (Full-Stack CRUD)</h3>
<ul>
  <li>Comprehensive game catalog with detailed information.</li>
  <li>Game filtering and search functionality.</li>
  <li>Promotional slider for featured games.</li>
  <li>Special offers and deals section.</li>
  <li><b>Admin capabilities:</b> Add, Edit, Delete games (secured by authorization).</li>
</ul>

<h3>🌐 Community Features</h3>
<ul>
  <li>Community screenshots gallery.</li>
  <li>Global chat system (real-time via ASP.NET Core SignalR).</li>
  <li>User profiles and interactive community page.</li>
</ul>

<h3>📊 Database Structure (Entity Framework Core)</h3>
<pre>
Users {
  UserId (Primary Key)
  Username
  Password (Hashed)
  Email
  Role (Admin/User)
  RegistrationDate
  LastLogin
}

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

CommunityScreenshots {
  ScreenshotId (Primary Key)
  UserId (Foreign Key)
  GameId (Foreign Key)
  ImageUrl
  Description
  UploadDate
  Likes
}

ChatMessages {
  MessageId (Primary Key)
  UserId (Foreign Key)
  Message
  Timestamp
  IsEdited
}
</pre>

<h2>💻 Technologies Used</h2>

<h3>Frontend (React)</h3>
<ul>
  <li>React 19</li>
  <li>Vite</li>
  <li>React Router DOM</li>
  <li>React Bootstrap / Bootstrap 5</li>
  <li>Axios</li>
</ul>

<h3>Backend (ASP.NET Core)</h3>
<ul>
  <li>ASP.NET Core 8/9 Web API</li>
  <li>Entity Framework Core</li>
  <li>SQL Server / SQLite</li>
  <li>JWT Authentication</li>
  <li>ASP.NET Core Identity</li>
  <li>SignalR (for real-time chat)</li>
</ul>

<hr/>

<h2>📁 Project Structure</h2>

<h3>FrontendProject/ (React)</h3>
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

<h3>BackendProject/ (ASP.NET Core Web API)</h3>
<ul>
  <li>Controllers/ — API Endpoints (e.g., GamesController, AuthController)</li>
  <li>Data/ — DbContext, Migrations</li>
  <li>Models/ — Entity Models (Users, Games, etc.)</li>
  <li>Services/ — Business Logic (e.g., UserService, GameService)</li>
  <li>Program.cs — Application configuration</li>
</ul>

<hr/>

<h2>⚙️ Setup & Run</h2>

<h3>1. Clone the Repository</h3>
<pre>
git clone &lt;repository_url&gt;
cd steam-clone-project
</pre>

<h3>2. Database Setup (ASP.NET Core Backend)</h3>
<pre>
# In BackendProject directory
dotnet ef migrations add InitialCreate
dotnet ef database update
</pre>

<h3>3. Run the Backend</h3>
<pre>
dotnet run
# API: https://localhost:7000
</pre>

<h3>4. Run the Frontend</h3>
<pre>
npm install
npm run dev
# React: http://localhost:5173
</pre>

<hr/>

<h2>🖼️ Screenshots</h2>

<p align="center">
  <img width="217" height="255" src="https://github.com/user-attachments/assets/a32dc3f2-d359-4f71-8309-adceca0d5642" alt="Main Page"/><br/>
  <img width="377" height="195" src="https://github.com/user-attachments/assets/547d4691-bd39-4a47-8289-d4ba217e12c0" alt="Game Catalog"/>
  <img width="377" height="195" src="https://github.com/user-attachments/assets/b925bef7-1216-430b-9a43-4bd52c98bfd2" alt="Community Gallery"/>
  <img width="377" height="195" src="https://github.com/user-attachments/assets/951041fd-3a85-4abc-98c1-48fd585f66e9" alt="Global Chat"/>
  <img width="377" height="195" src="https://github.com/user-attachments/assets/df838e3b-5dba-4f22-8d58-cfc61071f2a4" alt="User Profile"/>
</p>

<hr/>

<h2>🛠️ Available Scripts</h2>

<h3>Frontend (React)</h3>
<pre>
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
</pre>

<h3>Backend (ASP.NET Core)</h3>
<pre>
dotnet run                          # Run the backend API
dotnet ef migrations add <Name>     # Add new migration
dotnet ef database update           # Apply migrations
</pre>

<hr/>

