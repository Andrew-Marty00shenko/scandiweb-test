import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";

import CATEGORIES_QUERY from "../../graphql/queries/categories";
import client from "../../apollo";
import CartOverlay from "../CartOverlay/CartOverlay";

import "./Header.scss";

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
            activeCurrency: 0,
            activeHref: 0,
            categories: [],
            showCartOverlay: false
        };
        this.cartMenuRef = React.createRef();
    };

    componentDidMount() {
        client.query({
            query: CATEGORIES_QUERY
        }).then(({ data }) => {
            this.setState({
                categories: data.categories
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

    changeCurrency = (number) => {
        this.setState({
            activeCurrency: number,
        });
    };

    handleClickHref = (index) => {
        this.setState({
            activeHref: index
        });
    };

    render() {
        return <header
            className="header"
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
                        <div className="header__cart-currency-overlay">
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