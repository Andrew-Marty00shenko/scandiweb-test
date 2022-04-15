import { Component } from "react";
import { connect } from "react-redux";

import Item from "./Item/Item";
import CartActions from "../../redux/actions/cart";

import "./CartOverlay.scss";

class CartOverlay extends Component {

    render() {
        return <div className="cart-overlay" >
            <h1>
                My Bag, <span>{this.props.countItems} items</span>
            </h1>
            {this.props?.data.map((item, index) => {
                return <Item key={index}
                    data={this.props.data}
                    item={item}
                    cartDecrementItems={this.props.cartDecrementItems}
                    cartIncrementItems={this.props.cartIncrementItems}
                    setCartFiltredData={this.props.setCartFiltredData}
                />
            })}
        </div>
    }
}

const mapStateToProps = state => {
    return {
        countItems: state.cart.countItems,
        data: state.cart.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cartDecrementItems: () => dispatch(CartActions.cartDecrementItems()),
        cartIncrementItems: () => dispatch(CartActions.cartIncrementItems()),
        setCartFiltredData: (data) => dispatch(CartActions.setCartFiltredData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);