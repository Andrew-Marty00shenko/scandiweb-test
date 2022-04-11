import { Component } from "react";
import client from "../../../apollo";

import CATEGORY_QUERY from "../../../graphql/queries/category";
import Product from "../Product/Product";

import "../Categories.scss";

class Tech extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryInfo: {}
        }
    };

    componentDidMount() {
        client.query({
            query: CATEGORY_QUERY,
            variables: {
                input: {
                    title: "tech"
                }
            }
        }).then(({ data }) => {
            this.setState({
                categoryInfo: data.category
            });
        })
    };

    render() {
        return <div className="categories">
            <div className="categories__name">
                {this.state.categoryInfo.name}
            </div>
            <div className="categories__products">
                {this.state.categoryInfo.products?.map(item => {
                    return <Product
                        key={item.id}
                        {...item}
                    />
                })}
            </div>
        </div>
    }
}

export default Tech;