import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(Boolean(token));
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        window.location.href = '/login';
    };

    return (
        <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">

            <Link to="/" className="text-xl font-bold flex items-center gap-4 mr-2">
                <img src="/github.png" alt="GitHub CRM Logo" className="h-17" />
                <p>GitHub Repositories CRM</p>
            </Link>

            <div className="flex gap-4">
                {isAuthenticated ? (
                    <button
                        onClick={handleLogout}
                        className="text-[#23C6DB] text-xl font-bold px-4 py-2 rounded cursor-pointer"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="bg-[#23C6DB] text-black text-xl font-bold px-4 py-2 rounded cursor-pointer"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar