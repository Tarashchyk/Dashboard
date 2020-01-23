import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Tab, Tabs } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import TabsContent from "./components/TabsContent/TabsContent";

import initialLayouts from "./initial";

import { Card, CardHeader, CardContent } from "@material-ui/core";

import unpaidMockData from "./components/Sales/MockData/Unpaid";
import delayedOrders from "./components/Sales/MockData/DelayedOrders";
import salesFor from "./components/Sales/MockData/SalesFor";
import newJobs from "./components/Sales/MockData/NewJobs";
import salesDoneToday from "./components/Sales/MockData/SalesDoneToday";
import salesOnDateForCountries from "./components/Sales/MockData/SalesOnDateForCountries";
import planForCountries from "./components/Sales/MockData/PlanForCountries";
import forcastForCountries from "./components/Sales/MockData/ForcastForCountries";
import inPending from "./components/Sales/MockData/InPending";
import salesTotal from "./components/Sales/MockData/SalesTotal";
import newOrders from "./components/Sales/MockData/NewOrders";
import riskyOrders from "./components/Sales/MockData/RiskyOrders";
import byDayShopSales from "./components/Sales/MockData/ByDayShopSales";
import byMonthShopSales from "./components/Sales/MockData/ByMonthShopSales";

import complaints from "./components/Production/MockData/Complaints";
import manufacture from "./components/Production/MockData/Manufacture";
import pendingOrders from "./components/Production/MockData/PendingOrders";

import readyToSend from "./components/Expedition/MockData/ReadyToSend";
import readyJobsWaiting from "./components/Expedition/MockData/ReadyJobsWaiting";
import personalDelivery from "./components/Expedition/MockData/PersonalDelivery";
import expeditionReady from "./components/Expedition/MockData/ExpeditionReady";

import "./style.css";
import "./components/reactGridLayout.css";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    tabsRoot: {
        borderBottom: "1px solid #e8e8e8"
    },
    tabsIndicator: {
        backgroundColor: "#1890ff"
    },
    tabRoot: {
        textTransform: "initial",
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit * 4,
        "&:hover": {
            color: "#40a9ff",
            opacity: 1
        },
        "&$tabSelected": {
            color: "#1890ff",
            fontWeight: theme.typography.fontWeightMedium
        },
        "&:focus": {
            color: "#40a9ff"
        }
    },
    tabSelected: {}
});

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: initialLayouts.tabs[0].tabName || "",
            currentBreakpoint: "lg",
            tabs: initialLayouts.tabs,
            data: [
                unpaidMockData,
                delayedOrders,
                salesFor,
                newJobs,
                salesDoneToday,
                salesOnDateForCountries,
                planForCountries,
                forcastForCountries,
                inPending,
                salesTotal,
                newOrders,
                riskyOrders,
                byDayShopSales,
                byMonthShopSales,
                complaints,
                manufacture,
                pendingOrders,
                readyToSend,
                readyJobsWaiting,
                personalDelivery,
                expeditionReady
            ]
        };
    }

    ref = React.createRef();

    onBreakpointChange = breakpoint => {
        this.setState({
            currentBreakpoint: breakpoint
        });
    };

    onLayoutChange = layout => {
        const { tabs, value, currentBreakpoint } = this.state;
        const tabData = !!tabs.find(tabItem => tabItem.tabName === value)
            ? tabs.find(tabItem => tabItem.tabName === value).data
            : [];

        const tabDataCurrentBreakpiont = Object.keys(tabData).filter(
            breakpoint => currentBreakpoint
        );
        // this.setState({ layout: layout });

        console.log(layout);
        console.log(tabData);
        console.log(tabDataCurrentBreakpiont);
    };

    onWidgetMove = (widget, targetTabName, sourceTabId) => {
        const { tabs } = this.state;
        const newTabs = tabs.map(tab => {
            if (tab.tabName === targetTabName) {
                const newTab = { ...tab };
                Object.keys(newTab.data).map(key =>
                    newTab.data[key].push(widget)
                );
                return newTab;
            } else if (tab.id === sourceTabId) {
                const newTab = { ...tab };
                let tmp = {};
                Object.keys(newTab.data).map(key => {
                    const layout = newTab.data[key].filter(
                        _widget => _widget.i !== widget.i
                    );
                    tmp = {
                        ...tmp,
                        [key]: layout
                    };
                });
                newTab.data = tmp;
                return newTab;
            } else {
                return tab;
            }
        });
        this.setState({
            tabs: newTabs
        });
    };

    componentDidMount() {
        const { current } = this.ref;
        if (current && current.offsetWidth > 914) {
            this.setState({
                currentBreakpoint: "lg"
            });
        } else if (
            current &&
            current.offsetWidth < 915 &&
            current.offsetWidth > 594
        ) {
            this.setState({
                currentBreakpoint: "md"
            });
        } else if (
            current &&
            current.offsetWidth < 595 &&
            current.offsetWidth > 431
        ) {
            this.setState({
                currentBreakpoint: "sm"
            });
        } else {
            this.setState({
                currentBreakpoint: "xs"
            });
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            setTimeout(() => {
                window.dispatchEvent(new Event("resize"));
            }, 500);
        }
    }
    handleChange = (event, value) => {
        this.setState({ value });
        setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 150);
    };

    render() {
        const { classes } = this.props;
        const { value, tabs = [], data, currentBreakpoint } = this.state;
        const { current } = this.ref;

        const tabData = !!tabs.find(tabItem => tabItem.tabName === value)
            ? tabs.find(tabItem => tabItem.tabName === value).data
            : [];

        const tabNames = tabs.map(tabItem => tabItem.tabName);

        return (
            <Card>
                <CardHeader title="Dashboard" />
                <CardContent>
                    <div className={classes.root} ref={this.ref}>
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            classes={{
                                root: classes.tabsRoot,
                                indicator: classes.tabsIndicator
                            }}
                        >
                            {tabs.map(tabItem => (
                                <Tab
                                    key={tabItem.tabName}
                                    value={tabItem.tabName}
                                    disableRipple
                                    classes={{
                                        root: classes.tabRoot,
                                        selected: classes.tabSelected
                                    }}
                                    label={tabItem.tabName}
                                />
                            ))}
                        </Tabs>

                        <Typography component="div" className="tabs_content">
                            {tabs.map(item =>
                                item.tabName === value ? (
                                    <TabsContent
                                        currentBreakpoint={currentBreakpoint}
                                        parentRef={current}
                                        tabId={item.id}
                                        widgetsData={data}
                                        initialLayout={tabData}
                                        key={item.tabName}
                                        currentTabName={item.tabName}
                                        tabNames={tabNames}
                                        onWidgetMove={this.onWidgetMove}
                                        onBreakpointChange={
                                            this.onBreakpointChange
                                        }
                                        onLayoutChange={this.onLayoutChange}
                                    />
                                ) : (
                                    <div key={item.tabName} />
                                )
                            )}
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    open: state.admin.ui.sidebarOpen
});

export default connect(mapStateToProps, null)(withStyles(styles)(Dashboard));
