import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import LoginForm from '../components/LoginForm';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [githubUsername, setGithubUsername] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(Boolean(token));
    }, []);

    const isValidEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (isRegistering && !githubUsername) {
            setError('GitHub username is required for registration');
            return;
        }
        setLoading(true);

        try {
            const url = isRegistering
                ? `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`
                : `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`;

            const payload = isRegistering
                ? { email, password, githubUsername }
                : { email, password };

            const res = await axios.post(url, payload);

            setError('');

            if (!isRegistering) {
                localStorage.setItem('token', res.data.token);
                navigate('/');
            } else {
                alert('Registration successful, please log in');
                setIsRegistering(false);
            }
        } catch {
            setError(isRegistering ? 'Registration failed' : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return <div className="p-8 max-w-md mx-auto">
        {isAuthenticated ? (
            <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">
                    Let’s return to your{' '}
                    <a href="/" className="text-[#23C6DB] cursor-pointer">
                        repositories
                    </a>
                </h2>
            </div>
        ) : loading ? (
            <div className="flex justify-center mt-20">
                <ClimbingBoxLoader />
            </div>
        ) : (
            <LoginForm
                email={email}
                password={password}
                githubUsername={githubUsername}
                isRegistering={isRegistering}
                error={error}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onGithubUsernameChange={setGithubUsername}
                onToggleRegistering={() => {
                    setIsRegistering((prev) => !prev);
                    setError('');
                }}
                onSubmit={onSubmit}
            />
        )}
    </div>
}

export default Login