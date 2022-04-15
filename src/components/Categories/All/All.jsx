import { Component } from "react";
import { connect } from "react-redux";

import client from "../../../apollo";
import CATEGORY_QUERY from "../../../graphql/queries/category";
import CartActions from "../../../redux/actions/cart";
import Product from "../Product/Product";

import "../Categories.scss";

class All extends Component {
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
                    title: "all"
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
                        data={this.props.data}
                    />
                })}
            </div>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        data: state.cart.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCartData: data => dispatch(CartActions.setCartData(data)),
        cartIncrementItems: () => dispatch(CartActions.cartIncrementItems())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(All);