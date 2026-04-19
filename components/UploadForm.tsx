'use client';

import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      setError('Veldu mynd fyrst');
      return;
    }

    setLoading(true);
    setError('');
    setImageUrl('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = (await response.json()) as {
        error?: string;
        data?: { imageUrl: string };
      };

      if (!response.ok) {
        throw new Error(data.error || 'Upload mistókst');
      }

      setImageUrl(data.data?.imageUrl ?? '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Villa kom upp');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="form card">
      <h1>Myndaupphleðsla</h1>

      <label>
        Veldu jpg eða png
        <input
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          required
        />
      </label>

      {error && <p className="error-text">{error}</p>}

      <button type="submit" className="primary-button" disabled={loading}>
        {loading ? 'Hleð upp...' : 'Hlaða upp mynd'}
      </button>

      {imageUrl && (
        <div className="success-box">
          <p>Mynd kom inn.</p>
          <input readOnly value={imageUrl} />
          <img src={imageUrl} alt="Uploaded" className="preview-image" />
        </div>
      )}
    </form>
  );
}