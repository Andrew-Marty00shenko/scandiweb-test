import { Component } from "react";
import { connect } from "react-redux";

import Product from "../Product/Product";
import CartActions from "../../../redux/actions/cart";

import "../Categories.scss";

class Tech extends Component {

    componentDidMount() {
        this.props.fetchItems("tech");
    };

    render() {
        return <div className="categories">
            <div className="categories__name">
                {this.props.techData.name}
            </div>
            <div className="categories__products">
                {this.props.techData?.products?.map(item => {
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
        data: state.cart.data,
        techData: state.cart.techData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setCartData: data => dispatch(CartActions.setCartData(data)),
        cartIncrementItems: () => dispatch(CartActions.cartIncrementItems()),
        fetchItems: input => dispatch(CartActions.fetchItems(input))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Tech);