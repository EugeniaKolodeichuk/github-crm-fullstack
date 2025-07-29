import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [githubUsername, setGithubUsername] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(Boolean(token));
    }, []);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = isRegistering
                ? 'http://localhost:5000/api/auth/register'
                : 'http://localhost:5000/api/auth/login';

            const payload = isRegistering
                ? { username, password, githubUsername }
                : { username, password };

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
        }
    };

    if (isAuthenticated) {
        return (
            <div className="p-8 max-w-md mx-auto text-center">
                <h2 className="text-2xl font-semibold mb-4">Let`s return to your <a href="/" className="text-[#23C6DB] cursor-pointer">repositories</a></h2>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
                {isRegistering ? 'Register' : 'Login'}
            </h2>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username or email"
                    className="input border rounded px-4 py-2"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="input border rounded px-4 py-2"
                />
                {isRegistering && (
                    <input
                        type="text"
                        value={githubUsername}
                        onChange={(e) => setGithubUsername(e.target.value)}
                        placeholder="GitHub Username"
                        className="input border rounded px-4 py-2"
                    />
                )}
                <button
                    type="submit"
                    className="bg-[#23C6DB] text-white py-2 px-4 rounded cursor-pointer"
                >
                    {isRegistering ? 'Register' : 'Login'}
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <p className="text-sm mt-2">
                    {isRegistering ? (
                        <>
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => { setIsRegistering(false); setError('') }}
                                className="text-[#23C6DB] cursor-pointer"
                            >
                                Login
                            </button>
                        </>
                    ) : (
                        <>
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => { setIsRegistering(true); setError('') }}
                                className="text-[#23C6DB] cursor-pointer"
                            >
                                Register
                            </button>
                        </>
                    )}
                </p>
            </form>
        </div>
    )
}

export default Login