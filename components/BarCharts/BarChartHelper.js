import React from "react";
import { Text } from "recharts";

export const TooltipContent = props => {
    const { active, payload } = props;
    if (active) {
        return (
            <div
                style={{
                    background: "#222",
                    color: "#fff",
                    padding: "5px 7px",
                    borderRadius: "4px"
                }}
            >
                {`${payload[0].value} Kc`}
            </div>
        );
    }
    return null;
};

export const XAxisTick = props => {
    const { x, y, payload } = props;
    return (
        <Text x={x} y={y} textAnchor="middle" verticalAnchor="start">
            {payload.value}
        </Text>
    );
};
