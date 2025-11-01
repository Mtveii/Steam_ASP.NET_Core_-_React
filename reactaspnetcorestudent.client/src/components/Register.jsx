import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Form, Button, Alert } from 'react-bootstrap';
import './components_CSS/Register.css';

export function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        if (password.length < 6) {
            setError('Пароль должен быть минимум 6 символов');
            return;
        }

        const result = await register(username, email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message || 'Ошибка регистрации');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h4 className="modal-title">Регистрация</h4>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label">Имя пользователя</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control-custom"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="form-label">Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control-custom"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="form-label">Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control-custom"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="form-label">Подтвердите пароль</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control-custom"
                            required
                        />
                    </Form.Group>

                    <Button type="submit" className="btn-custom btn-primary-custom">
                        Зарегистрироваться
                    </Button>
                </Form>

                <Link to="/login" className="link-register">
                    Уже есть аккаунт? Войти
                </Link>
            </div>
        </div>
    );
}