import React, { Component } from "react";
import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    ResponsiveContainer,
    Text
} from "recharts";

import "./style.css";

class PieChartGraph extends Component {
    renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        name
    }) => {
        const RADIAN = Math.PI / 180;
        const radius = 25 + innerRadius + (outerRadius - innerRadius);
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <Text
                x={x}
                y={y}
                fill="#000"
                fontSize={14}
                textAnchor={x > cx ? "start" : "end"}
                verticalAnchor="middle"
            >
                {name}
            </Text>
        );
    };
    render() {
        const { data } = this.props;

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
                                isAnimationActive={false}
                                data={data.data}
                                outerRadius="60%"
                                // labelLine={false}
                                label={this.renderCustomizedLabel}
                            >
                                {data.data.map((item, index) => (
                                    <Cell
                                        key={index}
                                        fill={item.style.backgroundColor}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}

export default PieChartGraph;
