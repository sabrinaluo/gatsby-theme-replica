import { Link } from 'gatsby';
import React from 'react';
const PostList = ({ posts }) => (
  <>
    <h2>Upcoming Events</h2>
    <ul>
      {posts.map(event => (
        <li key={event.id}>
          <strong>
            <Link to={event.fields.slug}>{event.frontmatter.title}</Link>
          </strong>
          <br />
          {new Date(event.frontmatter.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}{' '}
          in {event.location}
        </li>
      ))}
    </ul>
  </>
);

export default PostList;
