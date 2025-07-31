interface IFormProps {
    email: string;
    password: string;
    githubUsername: string;
    isRegistering: boolean;
    error: string;
    onEmailChange: (val: string) => void;
    onPasswordChange: (val: string) => void;
    onGithubUsernameChange: (val: string) => void;
    onToggleRegistering: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<IFormProps> = ({
    email,
    password,
    githubUsername,
    isRegistering,
    error,
    onEmailChange,
    onPasswordChange,
    onGithubUsernameChange,
    onToggleRegistering,
    onSubmit
}) => {
    return (
        <>
            <h2 className="text-2xl font-semibold mb-4">
                {isRegistering ? 'Register' : 'Login'}
            </h2>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    placeholder="Email"
                    className="input border rounded px-4 py-2"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    placeholder="Password"
                    className="input border rounded px-4 py-2"
                    required
                />
                {isRegistering && (
                    <input
                        type="text"
                        value={githubUsername}
                        onChange={(e) => onGithubUsernameChange(e.target.value)}
                        placeholder="GitHub Username"
                        className="input border rounded px-4 py-2"
                        required
                    />
                )}
                <button
                    type="submit"
                    className="bg-[#23C6DB] text-black text-xl font-bold py-2 px-4 rounded cursor-pointer"
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
                                onClick={onToggleRegistering}
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
                                onClick={onToggleRegistering}
                                className="text-[#23C6DB] cursor-pointer"
                            >
                                Register
                            </button>
                        </>
                    )}
                </p>
            </form>
        </>
    )
}

export default LoginForm