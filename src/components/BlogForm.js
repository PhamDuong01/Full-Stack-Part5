import { useState } from 'react';

const BlogForm = ({ creatBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleAddNewBlog = (e) => {
    e.preventDefault();
    creatBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };
  return (
    <div style={{ marginBottom: '10px' }}>
      <h2>create new blog</h2>
      <form onSubmit={handleAddNewBlog}>
        <div>
          <span>title:</span>
          <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>
        <div>
          <span>author:</span>
          <input type='text' onChange={(e) => setAuthor(e.target.value)} value={author} />
        </div>
        <div>
          <span>url:</span>
          <input type='text' onChange={(e) => setUrl(e.target.value)} value={url} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default BlogForm;
