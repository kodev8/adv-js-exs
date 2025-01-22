import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <main className="not-found">
            <h1>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="back-home">
                Back to Home
            </Link>
        </main>
    );
}

export default NotFound;
