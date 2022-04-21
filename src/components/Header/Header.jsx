import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";

import CURRENCIES_QUERY from "../../graphql/queries/currencies";
import CATEGORIES_QUERY from "../../graphql/queries/categories";
import client from "../../apollo";
import CartOverlay from "../CartOverlay/CartOverlay";

import LogoIcon from "../../assets/images/a-logo.svg";
import ArrowDownIcon from "../../assets/images/arrow-down.svg";
import CartIcon from "../../assets/images/cart.svg";
import DollarIcon from "../../assets/images/dollar.svg";
import EurIcon from "../../assets/images/eur.svg";
import JpyIcon from "../../assets/images/jpy.svg";

import "./Header.scss";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyMenu: false,
            currencies: [],
            activeCurrency: null,
            activeHref: 0,
            categories: [],
            showCartOverlay: false
        };
        this.cartMenuRef = React.createRef();
    };

    componentDidMount() {
        client.query({
            query: CATEGORIES_QUERY,
        }).then(({ data }) => {
            this.setState({
                categories: data.categories
            });
        });

        client.query({
            query: CURRENCIES_QUERY
        }).then(({ data }) => {
            console.log(data)
            this.setState({
                currencies: data.currencies,
                activeCurrency: data.currencies[0].symbol
            });
        });

        document.addEventListener("click", this.handleClickOutside);
    };

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
    };

    handleClickOutside = (e) => {
        if (this.cartMenuRef.current && !this.cartMenuRef.current.contains(e.target)) {
            this.setState({
                showCartOverlay: false
            });
        }
    };

    openCurrency = () => {
        this.setState({
            currencyMenu: !this.state.currencyMenu,
        });
    };

    changeCurrency = (item) => {
        this.setState({
            activeCurrency: item.symbol,
        });
    };

    handleClickHref = (index) => {
        this.setState({
            activeHref: index
        });
    };

    render() {
        return <header className="header"
            ref={this.cartMenuRef}
        >
            <div className="header__categories">
                {this.state.categories && this.state.categories.map((item, index) => {
                    return <Link
                        className={classNames({ "active": this.state.activeHref === index })}
                        key={index}
                        to={item.name}
                        onClick={() => this.handleClickHref(index)}
                    >
                        {item.name}
                    </Link>
                })}
            </div>
            <div className="header__logo">
                <img src={LogoIcon} alt="a-logo" />
            </div>
            <div className="header__cart">
                <div className="header__cart-currency"
                    onClick={this.openCurrency}
                >
                    <p>
                        {this.state.activeCurrency}
                    </p>
                    <p>
                        <img
                            src={ArrowDownIcon}
                            className={classNames("cart-currency-icon", {
                                "cart-currency-icon--active": this.state.currencyMenu
                            })}
                            alt="arrow-down" />
                    </p>
                    {this.state.currencyMenu && (
                        <div className="header__cart-currency-overlay">
                            {this.state.currencies?.map((item, index) => {
                                return this.state.activeCurrency !== item.symbol
                                    ? <div key={index}
                                        onClick={() => this.changeCurrency(item)}
                                    >
                                        <p>
                                            {item.symbol}
                                        </p>
                                        <p>
                                            {item.label}
                                        </p>
                                    </div>
                                    : null
                            })}
                        </div>
                    )}
                </div>
                <div className="header__cart-icon">
                    {this.props.data.length > 0 && (
                        <div className="header__cart-icon-count">
                            {this.props.data.length}
                        </div>
                    )}
                    <img
                        src={CartIcon}
                        alt="cart-icon"
                        onClick={() => this.setState({ showCartOverlay: !this.state.showCartOverlay })}
                    />

                    {this.state.showCartOverlay && <CartOverlay />}
                </div>
            </div>
        </header >
    }
}

const mapStateToProps = state => {
    return {
        countItems: state.cart.countItems,
        data: state.cart.data
    }
}

export default connect(mapStateToProps, null)(Header);