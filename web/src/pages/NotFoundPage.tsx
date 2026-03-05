import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const NotFoundPage = () => {
  return (
    <Card className="mx-auto max-w-lg text-center">
      <h1 className="font-heading text-5xl">404</h1>
      <p className="mt-2 text-neutral-600">The page you are looking for is not available.</p>
      <Link to="/" className="mt-5 inline-block">
        <Button>Return home</Button>
      </Link>
    </Card>
  );
};
