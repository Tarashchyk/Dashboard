import React, { Component } from "react";
import { TooltipContent, XAxisTick } from "./BarChartHelper";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

class BarChartGraph extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className="widget-wrapper handleDrag">
                <h4 style={{ margin: "0", textAlign: "center" }}>
                    {data.label}
                </h4>
                <div className="widget-container">
                    <ResponsiveContainer>
                        <BarChart data={data.data} barCategoryGap="15%">
                            <XAxis dataKey="name" tick={XAxisTick} />
                            <YAxis hide />
                            <Tooltip
                                offset={-22}
                                isAnimationActive={false}
                                content={TooltipContent}
                            />

                            <Bar dataKey="value">
                                {data.data.map((item, index) => (
                                    <Cell
                                        key={index}
                                        fill={item.style.backgroundColor}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}

export default BarChartGraph;
