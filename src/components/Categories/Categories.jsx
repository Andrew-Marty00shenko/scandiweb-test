import { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import CartActions from "../../redux/actions/cart";
import Product from "./Product/Product";

import "./Categories.scss";

class Categories extends Component {

    componentDidMount() {
        if (this.props.params.categoryName === "all") {
            this.props.fetchItems("all");
        }
        if (this.props.params.categoryName === "clothes") {
            this.props.fetchItems("clothes");
        }
        if (this.props.params.categoryName === "tech") {
            this.props.fetchItems("tech");
        }
    };

    componentDidUpdate(prevProps) {
        if (prevProps.params.categoryName !== this.props.params.categoryName) {
            if (this.props.params.categoryName === "all") {
                this.props.fetchItems("all");
            }
            if (this.props.params.categoryName === "clothes") {
                this.props.fetchItems("clothes");
            }
            if (this.props.params.categoryName === "tech") {
                this.props.fetchItems("tech");
            }
        }
    };

    render() {
        return <div className="categories">
            <div className="categories__name">
                {this.props.allItemsData.name}
            </div>
            <div className="categories__products">
                {this.props.params.categoryName === "all" && this.props.allItemsData?.products?.map(item => {
                    return <Product
                        key={item.id}
                        setCartData={this.props.setCartData}
                        cartIncrementItems={this.props.cartIncrementItems}
                        item={item}
                        data={this.props.data}
                    />
                })}
                {this.props.params.categoryName === "clothes" && this.props.clothesData?.products?.map(item => {
                    return <Product
                        key={item.id}
                        setCartData={this.props.setCartData}
                        cartIncrementItems={this.props.cartIncrementItems}
                        item={item}
                        data={this.props.data}
                    />
                })}
                {this.props.params.categoryName === "tech" && this.props.techData?.products?.map(item => {
                    return <Product
                        key={item.id}
                        setCartData={this.props.setCartData}
                        cartIncrementItems={this.props.cartIncrementItems}
                        item={item}
                        data={this.props.data}
                    />
                })}
            </div>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        data: state.cart.data,
        allItemsData: state.cart.allItemsData,
        clothesData: state.cart.clothesData,
        techData: state.cart.techData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setCartData: data => dispatch(CartActions.setCartData(data)),
        cartIncrementItems: () => dispatch(CartActions.cartIncrementItems()),
        fetchItems: input => dispatch(CartActions.fetchItems(input))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)
    ((props) => (
        <Categories
            {...props}
            params={useParams()}
        />
    ));