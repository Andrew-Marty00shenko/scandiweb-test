import classNames from "classnames";
import { Component } from "react";

class Attributes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeAttribute: 0,
            activeColor: 0
        }
    };

    changeAttributes = (index) => {
        if (this.props.i.type === "swatch") {
            this.setState({
                activeColor: index
            });
        }
        if (this.props.i.type !== "swatch") {
            this.setState({
                activeAttribute: index
            });
        }
    };

    render() {
        return <div className="cart-items__item-attributes" >
            <p>
                {this.props.i.name}:
            </p>
            <div className="cart-items__item-attributes-switch">
                {this.props.i.items.map((p, index) => {
                    return <div key={p.id}
                        className={classNames("attribute", {
                            "selected-attribute": index === this.state.activeAttribute && this.props.i.type !== "swatch",
                            "selected-color": index === this.state.activeColor && this.props.i.type === "swatch",
                            "swatch": this.props.i.type === "swatch"
                        })}
                        style={
                            this.props.i.type === "swatch" ? {
                                backgroundColor: `${p.value}`,
                            } : {}
                        }
                        onClick={() => this.changeAttributes(index)}
                    >
                        {this.props.i.type !== "swatch" ? p.value : null}
                    </div>
                })}
            </div>
        </div>
    }
}

export default Attributes;