import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleAddNewBlog = (e) => {
    e.preventDefault();
    createBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };
  return (
    <div style={{ marginBottom: '10px' }}>
      <h2>create new blog</h2>
      <form onSubmit={handleAddNewBlog} data-testid='blog-form'>
        <div>
          <label htmlFor='title'>title:</label>
          <input id='title' type='text' onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>
        <div>
          <label htmlFor='author'>author:</label>
          <input
            id='author'
            type='text'
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </div>
        <div>
          <label htmlFor='url'>url:</label>
          <input id='url' type='text' onChange={(e) => setUrl(e.target.value)} value={url} />
        </div>
        <button className='btn-submit' type='submit'>
          create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
