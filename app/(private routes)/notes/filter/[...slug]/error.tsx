'use client';

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

const ErrorPage = ({
  error,
  reset,
}: ErrorProps) => {
  return (
    <div>
      <h2>
        Could not load notes.
      </h2>

      <p>{error.message}</p>

      <button
        type="button"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;