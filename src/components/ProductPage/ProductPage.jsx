import { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

import client from "../../apollo";
import PRODUCT_QUERY from "../../graphql/queries/product";
import CartActions from "../../redux/actions/cart";
import Attributes from "./Attributes/Attributes";

import "./ProductPage.scss";

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productInfo: {},
            activeImage: null,
            count: null
        }
    };

    componentDidMount() {
        client.query({
            query: PRODUCT_QUERY,
            variables: {
                id: this.props.params.id
            }
        }).then(({ data }) => {
            const objIndex = this.props.data.findIndex((obj => obj.id === data.product.id));
            this.setState({
                productInfo: data.product,
                activeImage: data.product.gallery[0],
                count: objIndex !== -1 ? this.props.data[objIndex].count : 1
            })
        });
    };

    addToCartItem = () => {
        this.setState({ count: this.state.count + 1 });

        const objIndex = this.props.data.findIndex((obj => obj.id === this.state.productInfo.id));
        if (objIndex !== -1) {
            this.props.data[objIndex].count = this.state.count;
            this.props.cartIncrementItems();
        } else {
            this.props.setCartData({ ...this.state.productInfo, count: this.state.count });
            this.props.cartIncrementItems();
        }
    };

    render() {
        return <div className="product-page">
            <div className="product-page__gallery">
                {this.state.productInfo?.gallery?.map((item, index) => {
                    return <div key={index}
                        onClick={() => this.setState({ activeImage: item })}
                    >
                        <img
                            src={item}
                            alt="gallery"
                        />
                    </div>
                })}
            </div>
            <div className="product-page__image">
                <img src={this.state.activeImage} alt="" />
            </div>
            <div className="product-page__info">
                <h1 className="product-page__info-brand">
                    {this.state.productInfo.brand}
                </h1>
                <h1 className="product-page__info-name">
                    {this.state.productInfo.name}
                </h1>
                <div className="product-page__info-attributes">
                    {this.state.productInfo?.attributes?.map(item => {
                        return <Attributes key={item.id} item={item} />
                    })}
                </div>
                <div className="product-page__info-price">
                    <p> price:</p>
                    <div>
                        {this.state.productInfo.prices && this.state.productInfo?.prices[this.props.currentCurrency].currency.symbol}
                        {this.state.productInfo.prices && this.state.productInfo?.prices[this.props.currentCurrency].amount}
                    </div>
                </div>
                <button
                    disabled={!this.state.productInfo.inStock}
                    onClick={this.addToCartItem}
                >
                    {!this.state.productInfo.inStock ? "OUT OF STOCK" : "ADD TO CART"}
                </button>
                <div className="product-page__info-desc" >
                    {parse(`${this.state.productInfo?.description}`)}
                </div>
            </div>
        </div>
    }
};

const mapStateToProps = state => {
    return {
        data: state.cart.data,
        currentCurrency: state.currency.currentCurrency
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setCartData: data => dispatch(CartActions.setCartData(data)),
        cartIncrementItems: () => dispatch(CartActions.cartIncrementItems())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)
    ((props) => (
        <ProductPage
            {...props}
            params={useParams()}
        />
    ));