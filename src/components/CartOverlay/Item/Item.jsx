import { Component } from "react";

import Attributes from "./Attributes/Attributes";

import "./Item.scss";

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddCartButton: false,
            count: this.props.item.count
        }
    };

    addItem = () => {
        this.setState({ count: this.props.item.count + 1 });
        const objIndex = this.props.data.findIndex((obj => obj.id === this.props.item.id));
        if (objIndex !== -1) {
            this.props.data[objIndex].count = this.state.count + 1;
            this.props.cartIncrementItems();
        }
    };

    removeItem = () => {
        this.setState({ count: this.state.count - 1 });
        const objIndex = this.props.data.findIndex((obj => obj.id === this.props.item.id));
        if (objIndex !== -1) {
            this.props.data[objIndex].count = this.state.count - 1;
            this.props.cartDecrementItems();
        }
        if (this.state.count < 2) {
            const newArr = this.props.data.filter(i => i.id !== this.props.item.id)
            this.props.setCartFiltredData(newArr);
        }
    };

    render() {
        return <div className="cart-overlay-item">
            <div className="cart-overlay-item__info">
                <div>
                    <p>{this.props.item.brand}</p>
                    <p>{this.props.item.name}</p>
                    <div className="cart-overlay-item__info-price">
                        <span>{this.props.item.prices[this.props.currentCurrency].currency.symbol}</span>
                        <span>{this.props.item.prices[this.props.currentCurrency].amount}</span>
                    </div>
                    <div className="cart-overlay-item__info-attributes">
                        {this.props.item.attributes.map(item => {
                            return <Attributes key={item.id} item={item} />
                        })}
                    </div>
                </div>
                <div className="cart-overlay-item__info-count">
                    <div className="count-plus" onClick={this.addItem}>+</div>
                    <div className="count">{this.props.item.count}</div>
                    <div className="count-minus" onClick={this.removeItem}>-</div>
                </div>
            </div>
            <div className="cart-overlay-item__image">
                <img src={this.props.item.gallery[0]} alt="icon" />
            </div>
        </div>
    }
};

export default Item;