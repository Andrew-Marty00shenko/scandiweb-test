import { Component } from "react";
import { connect } from "react-redux";

import Item from "./Item/Item";
import CartActions from "../../redux/actions/cart";

import "./Cart.scss";

class Cart extends Component {

    render() {
        let totalCount = 0;

        for (let i = 0; i < this.props.data.length; i++) {
            totalCount += this.props.data[i].prices[0].amount * this.props.data[i].count;
        };

        return <div className="cart">
            {this.props.data.length === 0
                ? <h1>Cart is epmty</h1>
                : <h1>Cart</h1>
            }
            <div className="cart-items">
                {this.props.data?.map(item => {
                    return <Item
                        key={item.id}
                        item={item}
                        data={this.props.data}
                        cartDecrementItems={this.props.cartDecrementItems}
                        cartIncrementItems={this.props.cartIncrementItems}
                        setCartFiltredData={this.props.setCartFiltredData}
                    />
                })}
            </div>
            <div className="cart-info cart-tax">
                Tax: <span> $15.00 </span>
            </div>
            <div className="cart-info cart-quantity">
                Qty: <span>{this.props.countItems}</span>
            </div>
            <div className="cart-info cart-total">
                Total: <span> {this.props.data[0]?.prices[0].currency.symbol}{totalCount.toFixed(2)}</span>
            </div>
            <button className="cart-order">
                order
            </button>
        </div>
    }
};

const mapStateToProps = (state) => {
    return {
        data: state.cart.data,
        countItems: state.cart.countItems
    }
};

const mapDispatchToProps = dispatch => {
    return {
        cartDecrementItems: () => dispatch(CartActions.cartDecrementItems()),
        cartIncrementItems: () => dispatch(CartActions.cartIncrementItems()),
        setCartFiltredData: (data) => dispatch(CartActions.setCartFiltredData(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);