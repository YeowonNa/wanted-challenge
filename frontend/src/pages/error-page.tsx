import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to='/'>Go Back to Home</Link>
    </div>
  );
}
