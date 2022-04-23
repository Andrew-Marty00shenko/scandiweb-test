import { Component } from "react";
import { connect } from "react-redux";

import Item from "./Item/Item";
import CartActions from "../../redux/actions/cart";

import "./CartOverlay.scss";

class CartOverlay extends Component {

    render() {
        let totalCount = 0;

        for (let i = 0; i < this.props.data.length; i++) {
            totalCount += this.props.data[i].prices[0].amount * this.props.data[i].count;
        }

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
            <div className="cart-overlay__total-count">
                <p>
                    Total
                </p>
                <span>
                    {this.props.data[0]?.prices[0].currency.symbol}
                    {totalCount.toFixed(2)}
                </span>
            </div>
            <div className="cart-overlay__buttons">
                <button>View bag</button>
                <button>CHECK OUT</button>
            </div>
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