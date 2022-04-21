import classNames from "classnames";
import { Component } from "react";
import { useParams } from "react-router-dom";

import client from "../../apollo";
import PRODUCT_QUERY from "../../graphql/queries/product";

import "./ProductPage.scss";

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productInfo: {},
            activeImage: null
        }
    };

    componentDidMount() {
        client.query({
            query: PRODUCT_QUERY,
            variables: {
                id: this.props.params.id
            }
        }).then(({ data }) => {
            this.setState({
                productInfo: data.product,
                activeImage: data.product.gallery[0]
            })
        });
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
                        return <div key={item.id}
                            className="product-page__info-attributes-item"
                        >
                            <p> {item.name}:</p>
                            <div className="product-page__info-attributes-item-switch">
                                {item.items.map(i => {
                                    return <div
                                        key={i.id}
                                        style={
                                            item.type === "swatch" ? {
                                                backgroundColor: `${i.value}`,
                                            } : {}
                                        }
                                        className={classNames({ "swatch": item.type === "swatch" })}
                                    >
                                        {item.type !== "swatch" ? i.value : null}
                                    </div>
                                })}
                            </div>
                        </div>
                    })}
                </div>
                <div className="product-page__info-price">
                    <p> price:</p>
                    <div>
                        {this.state.productInfo.prices && this.state.productInfo?.prices[0].currency.symbol}
                        {this.state.productInfo.prices && this.state.productInfo?.prices[0].amount}
                    </div>
                </div>
                <button disabled={!this.state.productInfo.inStock}>
                    {!this.state.productInfo.inStock ? "OUT OF STOCK" : "ADD TO CART"}
                </button>
                <div className="product-page__info-desc"
                    dangerouslySetInnerHTML={{ __html: this.state.productInfo.description }}
                />
            </div>
        </div>
    }
}

export default (props) => (
    <ProductPage
        {...props}
        params={useParams()}
    />
);