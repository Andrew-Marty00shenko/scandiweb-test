
import { gql } from "@apollo/client";

const CATEGORIES_QUERY = gql`
    query categories {
        categories {
            name   
        }
    }
`;

export default CATEGORIES_QUERY;