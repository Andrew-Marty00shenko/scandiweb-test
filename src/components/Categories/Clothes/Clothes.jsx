import { Component } from "react";
import { connect } from "react-redux";

import CATEGORY_QUERY from "../../../graphql/queries/category";
import client from "../../../apollo";
import Product from "../Product/Product";
import CartActions from "../../../redux/actions/cart";

import "../Categories.scss";

class Clothes extends Component {
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
                    title: "clothes"
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
                        setCartData={this.props.setCartData}
                        cartIncrementItems={this.props.cartIncrementItems}
                        item={item}
                    />
                })}
            </div>
        </div>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCartData: data => dispatch(CartActions.setCartData(data)),
        cartIncrementItems: () => dispatch(CartActions.cartIncrementItems())
    }
}

export default connect(null, mapDispatchToProps)(Clothes);