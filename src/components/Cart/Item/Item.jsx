import { Component } from "react";
import classNames from "classnames";

import ArrowLeftIcon from "../../../assets/images/arrow-left.svg";
import ArrowRightIcon from "../../../assets/images/arrow-right.svg";

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageIndex: null,
            count: this.props.item.count,
        }
    };

    componentDidMount() {
        this.setState({
            imageIndex: 0
        });
    };

    onClickNextImage = () => {
        this.setState(prevState => ({
            imageIndex: prevState.imageIndex < this.props.item.gallery.length - 1
                ? prevState.imageIndex + 1
                : 0
        }));
    };

    onClickPrevImage = () => {
        this.setState(prevState => ({
            imageIndex: prevState.imageIndex === 0
                ? this.props.item.gallery.length - 1
                : prevState.imageIndex - 1
        }));
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
        return <div className="cart-items__item"
            key={this.props.item.id}
        >
            <div className="cart-items__item-left">
                <div className="cart-items__item-left-info">
                    <h2>{this.props.item.brand}</h2>
                    <h3>{this.props.item.name}</h3>
                    <p>
                        {this.props.item.prices[0].currency.symbol}
                        {this.props.item.prices[0].amount}
                    </p>
                    {this.props.item.attributes?.map(i => {
                        return <div className="cart-items__item-attributes"
                            key={i.id}
                        >
                            <p>
                                {i.name}:
                            </p>
                            <div className="cart-items__item-attributes-switch">
                                {i.items.map((p, index) => {
                                    return <div key={p.id}
                                        className={classNames("attribute", {
                                            "selected-attribute": index === 0 && i.type !== "swatch",
                                            "selected-color": index === 0 && i.type === "swatch",
                                            "swatch": i.type === "swatch"
                                        })}
                                        style={
                                            i.type === "swatch" ? {
                                                backgroundColor: `${p.value}`,
                                            } : {}
                                        }
                                    >
                                        {i.type !== "swatch" ? p.value : null}
                                    </div>
                                })}
                            </div>
                        </div>
                    })}
                </div>
                <div className="cart-items__item-left-count">
                    <div className="count-plus" onClick={this.addItem}>+</div>
                    <div className="count">{this.props.item.count}</div>
                    <div className="count-minus" onClick={this.removeItem}>-</div>
                </div>
            </div>
            <div className="cart-items__item-gallery">
                <img
                    className="cart-items__item-gallery-main"
                    src={this.props.item.gallery[this.state.imageIndex]}
                    alt="icon"
                />
                <div className="cart-items__item-gallery-switcher">
                    <div onClick={this.onClickPrevImage}>
                        <img src={ArrowLeftIcon} alt="arrow-left" />
                    </div>
                    <div onClick={this.onClickNextImage}>
                        <img src={ArrowRightIcon} alt="arrow-right" />
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Item;