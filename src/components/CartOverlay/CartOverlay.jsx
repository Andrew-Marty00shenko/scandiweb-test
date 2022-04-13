import { Component } from "react";
import { connect } from "react-redux";

import "./CartOverlay.scss";

class CartOverlay extends Component {

    render() {
        return <div className="cart-overlay" >
            <h1>
                My Bag, {this.props.countItems} items
            </h1>

        </div>
    }
}

const mapStateToProps = state => {
    return {
        countItems: state.cart.countItems,
        data: state.cart.data
    }
}

export default connect(mapStateToProps, null)(CartOverlay);