import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Item from "./Item/Item";
import CartActions from "../../redux/actions/cart";

import "./CartOverlay.scss";

class CartOverlay extends Component {

    render() {
        let totalCount = 0;

        for (let i = 0; i < this.props.data.length; i++) {
            totalCount += this.props.data[i].prices[this.props.currentCurrency].amount * this.props.data[i].count;
        };

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
                    currentCurrency={this.props.currentCurrency}
                />
            })}
            <div className="cart-overlay__total-count">
                <p>
                    Total
                </p>
                <span>
                    {this.props.data[0]?.prices[this.props.currentCurrency].currency.symbol}
                    {totalCount.toFixed(2)}
                </span>
            </div>
            <div className="cart-overlay__buttons">
                <Link to="/cart" onClick={this.props.clearActiveHref}>
                    <button>
                        View bag
                    </button>
                </Link>
                <button>CHECK OUT</button>
            </div>
        </div>
    }
};

const mapStateToProps = state => {
    return {
        countItems: state.cart.countItems,
        data: state.cart.data,
        currentCurrency: state.currency.currentCurrency
    }
};

const mapDispatchToProps = dispatch => {
    return {
        cartDecrementItems: () => dispatch(CartActions.cartDecrementItems()),
        cartIncrementItems: () => dispatch(CartActions.cartIncrementItems()),
        setCartFiltredData: (data) => dispatch(CartActions.setCartFiltredData(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);