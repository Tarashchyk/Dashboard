import React, { Component } from "react";

import PieChartGraph from "../PieCharts/PieChart";
import PieChartActiveShapeGraph from "../PieCharts/PieChartActiveShape";
import BarChartGraph from "../BarCharts/BarChart";
import SimpleLineGraph from "../LineCharts/SimpleLineChart";
import StackedBarChartGraph from "../BarCharts/StackedBarChart";
import DashboardTable from "../DashboardTable/DashboardTable";

const CASE_TYPES = {
    TAB: "tab",
    PIE_CHART: "PieChart",
    BAR_CHART: "BarChart",
    PIE_CHART_ACTIVE_SHAPE: "PieChartActiveShape",
    SIMPLE_LINE_CHART: "SimpleLineChart",
    STACKED_BAR_CHART: "StackedBarChart"
};

class Selector extends Component {
    render() {
        const { data, parentRef, currentBreakpoint } = this.props;

        switch (data.type) {
            case CASE_TYPES.TAB: {
                return (
                    <DashboardTable
                        data={data}
                        parentRef={parentRef}
                        currentBreakpoint={currentBreakpoint}
                    />
                );
            }
            case CASE_TYPES.PIE_CHART: {
                return <PieChartGraph data={data} />;
            }
            case CASE_TYPES.BAR_CHART: {
                return <BarChartGraph data={data} />;
            }
            case CASE_TYPES.PIE_CHART_ACTIVE_SHAPE: {
                return <PieChartActiveShapeGraph data={data} />;
            }
            case CASE_TYPES.SIMPLE_LINE_CHART: {
                return <SimpleLineGraph data={data} />;
            }
            case CASE_TYPES.STACKED_BAR_CHART: {
                return <StackedBarChartGraph data={data} />;
            }
            default:
                return null;
        }
    }
}

export default Selector;
