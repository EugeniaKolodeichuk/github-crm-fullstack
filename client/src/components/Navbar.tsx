import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddRepoModal from './AddRepoModal';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showModal, setShowModal] = useState(false);
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
                <img src="/github.png" alt="GitHub CRM Logo" className="max-h-17 max-w-17" />
                <p className="hidden sm:block">GitHub Repositories CRM</p>
            </Link>

            <div className="flex gap-4">
                {isAuthenticated ? (
                    <div className="flex items-center gap-x-4 gap-y-2 flex-wrap justify-end">
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-[#23C6DB] text-black px-4 py-2 rounded text-xl font-bold cursor-pointer"
                        >
                            + Repo
                        </button>

                        <button
                            onClick={handleLogout}
                            className="text-[#23C6DB] text-xl font-bold px-4 py-2 rounded cursor-pointer"
                        >
                            Logout
                        </button>

                        {showModal && (
                            <AddRepoModal
                                onClose={() => setShowModal(false)}
                                onSuccess={() => window.location.reload()}
                            />
                        )}
                    </div>
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