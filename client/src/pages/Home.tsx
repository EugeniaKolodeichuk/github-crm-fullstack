import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';

interface IRepository {
    _id: string;
    name: string;
    html_url: string;
    stargazers_count: number;
    forks: number;
    open_issues: number;
    created_at: number;
    owner: string;
}

const Home = () => {
    const [repos, setRepos] = useState<IRepository[]>([]);

    const fetchRepos = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/repositories', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setRepos(res.data);
    };

    const handleUpdate = async (id: string) => {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:5000/api/repositories/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchRepos();
    };

    const handleDelete = async (id: string) => {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/repositories/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setRepos((prev) => prev.filter((r) => r._id !== id));
    };

    useEffect(() => {
        fetchRepos();
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Work with your repositories here</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map((repo) => (
                    <Card
                        key={repo._id}
                        repo={repo}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home