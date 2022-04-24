import classNames from "classnames";
import { Component } from "react";
import { Link } from "react-router-dom";

import CartIcon from "../../../assets/images/white-cart.svg";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddCartButton: false,
            count: null
        }
    };

    componentDidMount() {
        this.setState({
            count: 1
        });
    };

    addToCartItem = (item) => {
        this.setState({ count: this.state.count + 1 });

        if (this.props.data?.length !== 0) {
            const objIndex = this.props.data.findIndex((obj => obj.id === item.id));
            if (objIndex !== -1) {
                this.props.data[objIndex].count = this.state.count;
                this.props.cartIncrementItems();
            } else {
                this.props.setCartData({ ...item, count: this.state.count });
                this.props.cartIncrementItems();
            }
        } else {
            this.props.setCartData({ ...item, count: this.state.count });
            this.props.cartIncrementItems();
        }
    };

    render() {
        return <div className={classNames("categories__products-product", {
            "categories__products-product--instock": !this.props.item.inStock
        })}
            onMouseEnter={() => this.setState({ showAddCartButton: true })}
            onMouseLeave={() => this.setState({ showAddCartButton: false })}
        >
            {!this.props.item.inStock && (
                <div className="categories__products-product-outofstock">
                    out of stock
                </div>
            )}
            <div className="categories__products-product-image">
                <Link to={`/product/${this.props.item.id}`}>
                    <img src={this.props.item.gallery[0]} alt="gallery" />
                </Link>
            </div>
            <div className="categories__products-product-name">
                <span>{this.props.item.brand} <br /> {this.props.item.name}</span>
                {this.state.showAddCartButton && this.props.item.inStock && (
                    <div className="add-cart-btn"
                        onClick={() => this.addToCartItem(this.props.item)}
                    >
                        <img src={CartIcon} alt="cart-btn" />
                    </div>
                )}
            </div>
            <div className="categories__products-product-price">
                <span>{this.props.item.prices[0].currency.symbol}</span>
                <span>{this.props.item.prices[0].amount}</span>
            </div>
        </div>
    }
}

export default Product;