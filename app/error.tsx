'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="container page-section">
      <div className="card centered-card">
        <h1>Villa</h1>
        <p>{error.message || 'Eitthvað fór úrskeiðis.'}</p>
        <button className="primary-button" onClick={reset}>
          Reyna aftur
        </button>
      </div>
    </div>
  );
}