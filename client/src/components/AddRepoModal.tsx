import { useState } from 'react';

interface IProps {
    onClose: () => void;
    onSuccess: () => void;
}

const AddRepoModal: React.FC<IProps> = ({ onClose, onSuccess }) => {
    const [token, setToken] = useState('');
    const [path, setPath] = useState('');
    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [pathError, setPathError] = useState('');

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/repositories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    path,
                    description,
                    isPrivate,
                    githubToken: token,
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.msg || 'Failed to create');
            }

            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const validatePath = (value: string) => {
        const isValid = /^[^\/\s]+\/[^\/\s]+$/.test(value);
        setPath(value);
        if (!isValid) {
            setPathError('Path must be in format: username/repo');
        } else {
            setPathError('');
        }
        setError('');
    };


    return (
        <div
            className="fixed inset-0 bg-black/90 bg-opacity-60 flex justify-center items-center z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-white p-6 rounded w-full max-w-md relative shadow">
                <button onClick={onClose} className="absolute right-4 top-4 text-black text-xl">
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4 text-black">Create GitHub Repository</h2>

                <form onSubmit={handleCreate} className="flex flex-col gap-4 text-black">
                    <div>
                        <label htmlFor="token" className="block mb-1 text-sm font-medium">
                            GitHub Token
                        </label>
                        <input
                            id="token"
                            name="token"
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={token}
                            onChange={(e) => { setToken(e.target.value); setError(''); }}
                        />
                        <a
                            href="https://github.com/settings/tokens"
                            className="text-[#23C6DB] text-xs mt-1 cursor-pointer"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Click to generate token
                        </a>
                    </div>

                    <div>
                        <label htmlFor="path" className="block mb-1 text-sm font-medium">
                            Repository path (username/repo)
                        </label>
                        <input
                            id="path"
                            name="path"
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={path}
                            onChange={(e) => validatePath(e.target.value)}
                        />
                        {pathError && <p className="text-red-500 text-sm">{pathError}</p>}
                    </div>

                    <div>
                        <label htmlFor="description" className="block mb-1 text-sm font-medium">
                            Description (optional)
                        </label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={description}
                            onChange={(e) => { setDescription(e.target.value); setError('') }}
                        />
                    </div>

                    <label htmlFor="private" className="flex items-center text-sm">
                        <input
                            id="private"
                            name="private"
                            type="checkbox"
                            checked={isPrivate}
                            onChange={(e) => { setIsPrivate(e.target.checked); setError(''); }}
                            className="mr-2"
                        />
                        Private repository
                    </label>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading || !!error || !!pathError}
                        className="w-full bg-[#23C6DB] text-black text-xl font-bold py-2 rounded cursor-pointer disabled:opacity-70"
                    >
                        {loading ? 'Creating...' : 'Create Repository'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddRepoModal;
