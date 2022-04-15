
import { gql } from "@apollo/client";

const CATEGORY_QUERY = gql`
    query category($input: CategoryInput) {
        category(input: $input) {
            name   
            products{
                id
                name
                inStock
                gallery
                description 
                attributes{
                    id
                    name
                    type
                    items{
                        displayValue
                        value
                        id
                    }
                }
                prices{
                    currency{
                        label
                        symbol
                    }
                    amount
                }
                brand
            }
        }
    }
`;

export default CATEGORY_QUERY;