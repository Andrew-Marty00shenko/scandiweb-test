import { Component } from "react";

import {
    WrapperHeader,
    WrapperHeaderCategories,
    WrapperHeaderCart
}
    from "./Styled";

import LogoIcon from "../../assets/images/a-logo.svg";
import ArrowDownIcon from "../../assets/images/arrow-down.svg";
import CartIcon from "../../assets/images/cart.svg";
import DollarIcon from "../../assets/images/dollar.svg";

class Header extends Component {
    render() {
        return <WrapperHeader>
            <WrapperHeaderCategories>
                <p>women</p>
                <p>men</p>
                <p>kids</p>
            </WrapperHeaderCategories>
            <div className="wrapper-header__logo">
                <img src={LogoIcon} alt="a-logo" />
            </div>
            <WrapperHeaderCart>
                <div className="wrapper-header__cart-currency">
                    <p>
                        <img src={DollarIcon} alt="dollar" />
                    </p>
                    <p>
                        <img src={ArrowDownIcon} alt="arrow-down" />
                    </p>
                </div>
                <div className="wrapper-header__cart-icon">
                    <img src={CartIcon} alt="cart-icon" />
                </div>
            </WrapperHeaderCart>
        </WrapperHeader>
    }
}

export default Header;