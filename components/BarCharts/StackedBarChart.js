import React, { Component } from "react";
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

import "./style.css";

class StackedBarChartGraph extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className="widget-wrapper handleDrag">
                <h4 style={{ margin: "0", textAlign: "left" }}>{data.label}</h4>
                <div className="widget-container ">
                    <ResponsiveContainer>
                        <BarChart data={data.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="Brasnarstvitlusty.cz"
                                stackId="a"
                                fill={data.lineColours["Brasnarstvitlusty.cz"]}
                            />
                            <Bar
                                dataKey="Tlustyco.com"
                                stackId="a"
                                fill={data.lineColours["Tlustyco.com"]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}

export default StackedBarChartGraph;
