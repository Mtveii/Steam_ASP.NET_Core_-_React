import { useAuth } from './AuthContext';
import './components_CSS/ProfilePage.css';

export function ProfilePage() {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return (
            <div className="profile-container">
                <h3>You are not logged in</h3>
            </div>
        );
    }

    const photoUrl = currentUser.photo
        ? `https://localhost:7129/pics/${currentUser.photo}`
        : `https://localhost:7129/pics/User.png`;

    return (
        <div className="profile-container">
            <img
                src={photoUrl}
                className="profile-avatar"
                alt="User avatar"
                onError={(e) => {
                    e.currentTarget.src = `https://localhost:7129/pics/User.png`;
                }}
            />
            <div className="profile-username">{currentUser.username}</div>
            {currentUser.email && <div className="profile-email">{currentUser.email}</div>}
            <div className="profile-badge">
                {currentUser.username === 'admin' ? 'Administrator' : 'Standard User'}
            </div>
        </div>
    );
}
