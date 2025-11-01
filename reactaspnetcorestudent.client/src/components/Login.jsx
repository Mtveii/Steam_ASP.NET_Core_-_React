import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './components_CSS/Login.css';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPhotoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let result;

            if (isRegister) {
                let photoName = "User.png";

                if (photoFile) {
                    const formData = new FormData();
                    formData.append("file", photoFile);

                    const res = await fetch("https://localhost:7129/api/auth/upload-photo", {
                        method: "POST",
                        body: formData
                    });

                    if (res.ok) {
                        const data = await res.json();
                        photoName = data.fileName;
                    } else {
                        throw new Error("Failed to upload photo");
                    }
                }

                result = await register(username, email, password, photoName);
            } else {
                result = await login(username, password);
            }

            if (result.success) {
                navigate("/Profile");
            } else {
                setError(result.error);
            }
        } catch (err) {
            console.error("Auth error:", err);
            setError("Unexpected error, please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleToggleMode = () => {
        setIsRegister(!isRegister);
        setUsername("");
        setPassword("");
        setEmail("");
        setPhotoFile(null);
        setPhotoPreview(null);
        setError("");
    };

    return (
        <div className="auth-overlay">
            <div className="auth-modal">
                <h4 className="auth-title">Game Library</h4>
                <div className="auth-subtitle">
                    {isRegister ? "Create a new account" : "Log into your account"}
                </div>

                {error && <div className="error-box">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control-custom"
                        required
                    />

                    {isRegister && (
                        <>
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control-custom"
                                required
                            />

                            <label className="form-label">Profile Photo (Optional)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="form-control-custom"
                            />
                            {photoPreview && (
                                <img src={photoPreview} alt="Preview" className="preview-avatar" />
                            )}
                        </>
                    )}

                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control-custom"
                        required
                    />

                    <button type="submit" className="btn-primary-auth" disabled={loading}>
                        {loading ? "Please wait..." : isRegister ? "Create Account" : "Log In"}
                    </button>
                </form>

                <div className="switch-text">
                    {isRegister ? "Already have an account?" : "Don't have an account?"}
                    <span className="switch-link" onClick={handleToggleMode}>
                        {isRegister ? "Log in here" : "Register here"}
                    </span>
                </div>
            </div>
        </div>
    );
}