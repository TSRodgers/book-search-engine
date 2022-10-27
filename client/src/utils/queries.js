import { gql } from '@apollo/client';

// query for logged in user 
export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
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
