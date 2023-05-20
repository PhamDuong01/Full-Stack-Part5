import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

test('the form calls the event handler it received as props with the right details when a new blog is created.', () => {
  const createBlogTest = jest.fn(); // Create a mock function for the createBlog handler

  const { container } = render(<BlogForm createBlog={createBlogTest} />);

  const titleInput = container.querySelector('#title');
  const authorInput = container.querySelector('#author');
  const urlInput = container.querySelector('#url');
  //   const form = screen.getByTestId('blog-form');

  // Simulate form input
  fireEvent.change(titleInput, {
    target: { value: 'Component testing is done with react-testing-library' },
  });
  fireEvent.change(authorInput, { target: { value: 'Ryan Test' } });
  fireEvent.change(urlInput, { target: { value: 'https://example.com/' } });

  const btnsubmt = container.querySelector('.btn-submit');
  fireEvent.click(btnsubmt);

  expect(createBlogTest).toHaveBeenCalledWith({
    title: 'Component testing is done with react-testing-library',
    author: 'Ryan Test',
    url: 'https://example.com/',
  });
});
