import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import { Home } from './components/Home';
import { Student } from './components/Game';
import './App.css';
import { Students } from './components/Games';
import { StudentCreate } from './components/GameCreate';
import { StudentDelete } from './components/GameDelete';
import { StudentEdit } from './components/GameEdit';
import { Login } from './components/Login';
import { ProfilePage } from './components/ProfilePage';
import CommunityPage from './components/CommunityPage';
import { ChatPage } from './components/ChatPage';

function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/login" />;
}

function AppRoutes() {
    const { currentUser } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />
            <Route path="/" element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            }>
                <Route index element={<Students />} />
                <Route path="/Create" element={<StudentCreate />} />
                <Route path="/Student/:id" element={<Student />} />
                <Route path="/Delete/:id" element={<StudentDelete />} />
                <Route path="/Edit/:id" element={<StudentEdit />} />
                <Route path="/Profile" element={<ProfilePage />} />
                <Route path="/Community" element={<CommunityPage />} />
                <Route path="/Chat" element={<ChatPage />} />
                <Route path="*" element={<h2>Resource not found</h2>} />
            </Route>
        </Routes>
    );
}

function App() {
    return (
        <div>
            <AuthProvider>
                <BrowserRouter>
                    <AppRoutes />

                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;