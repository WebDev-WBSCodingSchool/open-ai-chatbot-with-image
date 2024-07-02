import { useState } from 'react';
import { toast } from 'react-toastify';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);
      if (!prompt) throw new Error('Prompt is required');
      const res = await fetch(`${import.meta.env.VITE_OPENAI_PROXY}/api/v1/images/generations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json ',
          provider: 'open-ai',
          mode: import.meta.env.VITE_OPENAI_PROXY_MODE
        },
        body: JSON.stringify({ model: 'dallee-3', prompt })
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto h-[calc(100vh-68px)]'>
      <form onSubmit={handleSubmit}>
        <div className='flex items-center gap-2'>
          <textarea
            name='message'
            value={prompt}
            rows='2'
            onChange={e => setPrompt(e.target.value)}
            placeholder='Describe the image you want to generate...'
            className='w-full textarea textarea-bordered'
            disabled={loading}
          ></textarea>
          <button type='submit' className='btn btn-primary btn-circle' disabled={loading}>
            {loading ? (
              <span className='loading loading-spinner'></span>
            ) : (
              <span role='img' aria-label='sparkles'>
                ✨
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
