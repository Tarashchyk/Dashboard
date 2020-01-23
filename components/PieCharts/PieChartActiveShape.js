import React, { Component } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import RenderActiveShape from "./ActiveShapeHelper";

import "./style.css";

class PieChartActiveShapeGraph extends Component {
    state = {
        activeIndex: 0
    };

    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index
        });
    };
    render() {
        const { data } = this.props;
        const { activeIndex } = this.state;
        return (
            <div className="widget-wrapper handleDrag">
                <h4 style={{ margin: "0", textAlign: "center" }}>
                    {data.label}
                </h4>
                <div className="widget-container">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                activeIndex={activeIndex}
                                activeShape={RenderActiveShape}
                                data={data.data}
                                cx="50%"
                                cy="48%"
                                innerRadius="56%"
                                outerRadius="75%"
                                onMouseEnter={this.onPieEnter}
                            >
                                {data.data.map((item, index) => (
                                    <Cell
                                        key={index}
                                        fill={item.style.backgroundColor}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}

export default PieChartActiveShapeGraph;
