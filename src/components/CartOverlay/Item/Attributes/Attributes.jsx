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
        if (this.props.item.type === "swatch") {
            this.setState({
                activeColor: index
            });
        }
        if (this.props.item.type !== "swatch") {
            this.setState({
                activeAttribute: index
            });
        }
    };

    render() {
        return <div>
            <p>
                {this.props.item.name}
            </p>
            <div>
                {this.props.item.items.map((i, index) => {
                    return <div
                        key={i.id}
                        className={classNames("attribute", {
                            "selected-attribute": index === this.state.activeAttribute && this.props.item.type !== "swatch",
                            "selected-color": index === this.state.activeColor && this.props.item.type === "swatch",
                        })}
                        style={
                            this.props.item.type === "swatch" ? {
                                backgroundColor: `${i.value}`,
                            } : {}
                        }
                        onClick={() => this.changeAttributes(index)}
                    >
                        {this.props.item.type !== "swatch" ? i.value : null}
                    </div>
                })}
            </div>
        </div>
    }
}

export default Attributes;