interface ICardProps {
    repo: {
        _id: string;
        name: string;
        html_url: string;
        stargazers_count: number;
        forks: number;
        open_issues: number;
        created_at: number;
        owner: string;
    };
    onUpdate: (id: string) => void;
    onDelete: (id: string) => void;
}

const Card: React.FC<ICardProps> = ({ repo, onUpdate, onDelete }) => {
    return (
        <div className="p-4 rounded shadow-cyan-950 shadow-lg bg-white">
            <h2 className="text-xl font-semibold">{repo.name}</h2>
            <p className="text-black"><span className="font-bold">Owner:</span> {repo.owner}</p>
            <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-[#23C6DB] font-bold"
            >
                Open Repository
            </a>
            <ul className="mt-2 space-y-1">
                <li><span className="font-bold">Stars:</span> {repo.stargazers_count}</li>
                <li><span className="font-bold">Forks:</span> {repo.forks}</li>
                <li><span className="font-bold">Open issues:</span> {repo.open_issues}</li>
                <li><span className="font-bold">Created at:</span> {new Date(repo.created_at * 1000).toLocaleDateString()}</li>
            </ul>
            <div className="flex gap-3 mt-4 justify-center">
                <button
                    onClick={() => onUpdate(repo._id)}
                    className="bg-[#23C6DB] text-black font-bold px-3 py-1 rounded cursor-pointer"
                >
                    Update
                </button>
                <button
                    onClick={() => onDelete(repo._id)}
                    className="text-[#23C6DB] font-bold px-3 py-1 rounded cursor-pointer"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Card