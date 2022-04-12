import classNames from "classnames";
import { Component } from "react";

import CartIcon from "../../../assets/images/white-cart.svg";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddCartButton: false
        }
    };

    render() {
        return <div className={classNames("categories__products-product", {
            "categories__products-product--instock": !this.props.inStock
        })}
            onMouseEnter={() => this.setState({ showAddCartButton: true })}
            onMouseLeave={() => this.setState({ showAddCartButton: false })}
        >
            {!this.props.inStock && (
                <div className="categories__products-product-outofstock">
                    out of stock
                </div>
            )}
            <div className="categories__products-product-image">
                <img src={this.props.gallery[0]} alt="gallery" />
            </div>
            <div className="categories__products-product-name">
                <span>{this.props.brand} <br /> {this.props.name}</span>
                {this.state.showAddCartButton && this.props.inStock && (
                    <div className="add-cart-btn">
                        <img src={CartIcon} alt="cart-btn" />
                    </div>
                )}
            </div>
            <div className="categories__products-product-price">
                <span>{this.props.prices[0].currency.symbol}</span>
                <span>{this.props.prices[0].amount}</span>
            </div>
        </div>
    }
}

export default Product;