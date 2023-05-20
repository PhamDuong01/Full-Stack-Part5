import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('display title & author only by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Ryan Test',
    url: 'https://github.com/',
    likes: 0,
  };

  const { container } = render(
    <Blog
      blog={blog}
      updateLikesBlog={() => {
        return;
      }}
      removeBlog={() => {
        return;
      }}
      owner='Ryan Pham'
    />
  );

  const blogTitle = container.querySelector('.blog-title');
  expect(blogTitle).toHaveTextContent(
    'Component testing is done with react-testing-library' && 'Ryan Test'
  );
  const blogDetail = container.querySelector('.blog-detail');
  expect(blogDetail).toHaveStyle('display:none');
});

test('show blog detail when click show button', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Ryan Test',
    url: 'https://github.com/',
    likes: 0,
  };

  const { container } = render(
    <Blog
      blog={blog}
      updateLikesBlog={() => {
        return;
      }}
      removeBlog={() => {
        return;
      }}
      owner='Ryan Pham'
    />
  );

  const btnShow = container.querySelector('.show-detail');
  fireEvent.click(btnShow);
  const blogDetail = container.querySelector('.blog-detail');
  expect(blogDetail).toHaveStyle('display: block');
});

test('the like button is clicked twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Ryan Test',
    url: 'https://github.com/',
    likes: 0,
  };
  const updateLikesBlogMock = jest.fn();

  const { container } = render(
    <Blog
      blog={blog}
      updateLikesBlog={updateLikesBlogMock}
      removeBlog={() => {
        return;
      }}
      owner='Ryan Pham'
    />
  );

  const btnShow = container.querySelector('.show-detail');
  fireEvent.click(btnShow);
  const btnLike = container.querySelector('.btn-like');
  fireEvent.click(btnLike);
  fireEvent.click(btnLike);

  expect(updateLikesBlogMock).toHaveBeenCalledTimes(2);
});
