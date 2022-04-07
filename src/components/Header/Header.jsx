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
import EurIcon from "../../assets/images/eur.svg";
import JpyIcon from "../../assets/images/jpy.svg";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyMenu: false,
            activeCurrency: 0
        }
    }

    openCurrency = () => {
        this.setState({
            currencyMenu: !this.state.currencyMenu,
        });
    };

    changeCurrency = (number) => {
        this.setState({
            activeCurrency: number,
        });
    };

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
                <div className="wrapper-header__cart-currency"
                    onClick={this.openCurrency}
                >
                    <p>
                        <img
                            src={this.state.activeCurrency === 0
                                ? DollarIcon
                                : this.state.activeCurrency === 1
                                    ? EurIcon
                                    : this.state.activeCurrency === 2
                                        ? JpyIcon
                                        : null
                            }
                            alt="dollar"
                        />
                    </p>
                    <p>
                        <img
                            src={ArrowDownIcon}
                            className="cart-currency-icon"
                            alt="arrow-down" />
                    </p>
                    {this.state.currencyMenu && (
                        <div className="wrapper-header__cart-currency-overlay">
                            <div onClick={() => this.changeCurrency(0)}>
                                <p>
                                    <img
                                        src={DollarIcon}
                                        alt="dollar"
                                    />
                                </p>
                                <p>
                                    USD
                                </p>
                            </div>
                            <div onClick={() => this.changeCurrency(1)}>
                                <p>
                                    <img
                                        src={EurIcon}
                                        alt="dollar"
                                    />
                                </p>
                                <p>
                                    EUR
                                </p>
                            </div>
                            <div onClick={() => this.changeCurrency(2)}>
                                <p>
                                    <img
                                        src={JpyIcon}
                                        alt="dollar"
                                    />
                                </p>
                                <p>
                                    JPY
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="wrapper-header__cart-icon">
                    <img src={CartIcon} alt="cart-icon" />
                </div>
            </WrapperHeaderCart>
        </WrapperHeader>
    }
}

export default Header;