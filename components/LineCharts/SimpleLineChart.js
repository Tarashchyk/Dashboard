import React, { Component } from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

import "./style.css";

class SimpleLineGraph extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className="widget-wrapper handleDrag">
                <h4 style={{ margin: "0", textAlign: "left" }}>{data.label}</h4>
                <div className="widget-container">
                    <ResponsiveContainer>
                        <LineChart data={data.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="Brasnarstvitlusty.cz"
                                stroke={
                                    data.lineColours["Brasnarstvitlusty.cz"]
                                }
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="Tlustyco.com"
                                stroke={data.lineColours["Tlustyco.com"]}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}

export default SimpleLineGraph;
