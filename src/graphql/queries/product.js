
import { gql } from "@apollo/client";

const PRODUCT_QUERY = gql`
    query product($id: String!) {
        product(id: $id){
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
`;

export default PRODUCT_QUERY;