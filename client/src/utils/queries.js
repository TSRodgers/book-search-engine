import { gql } from '@apollo/client';

// query for logged in user 
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      bookcount
      savedBooks {
        bookId
        authors
        image
        description
        title 
        link
      }
    }
  }
`;
