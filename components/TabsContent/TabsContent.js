import React, { Component } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Selector from "../Selector/Selector";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class TabsContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initialLayout: props.initialLayout,
            compactType: "vertical",
            margin: [25, 25],
            anchorEl: null
        };
    }

    onResize = () => {
        window.dispatchEvent(new Event("resize"));
    };

    onLayoutChange = (layout, initialLayout) => {
        this.props.onLayoutChange(layout, initialLayout);
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    selectedItem = (widget, tabName) => event => {
        const { initialLayout } = this.props;
        const normalWidget = initialLayout.lg.filter(
            _widget => _widget.i === widget.label
        )[0];

        this.props.onWidgetMove(normalWidget, tabName, this.props.tabId);

        this.handleClose();
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const {
            parentRef,
            widgetsData = [],
            tabNames,
            currentTabName,
            onBreakpointChange,
            currentBreakpoint,
            initialLayout
        } = this.props;
        const { anchorEl } = this.state;

        const widgetNames = initialLayout.lg.map(item => item.i);

        const filteredWidgets =
            widgetsData.filter(
                widget => !!~widgetNames.indexOf(widget.label)
            ) || [];

        const ITEM_HEIGHT = 48;

        const open = Boolean(anchorEl);

        const options = tabNames.filter(tab => tab !== currentTabName);

        return (
            <ResponsiveReactGridLayout
                {...this.props}
                onBreakpointChange={onBreakpointChange}
                layouts={initialLayout}
                measureBeforeMount={true}
                compactType={this.state.compactType}
                preventCollision={!this.state.compactType}
                margin={this.state.margin}
                draggableHandle=".handleDrag"
                onResize={this.onResize}
                onLayoutChange={this.onLayoutChange}
            >
                {filteredWidgets.map((widget, index) => (
                    <div key={widget.label}>
                        <div className="widgetTransfer">
                            <IconButton
                                className={`${index}`}
                                aria-label="more"
                                aria-controls={`long-menu-${widget.label}`}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id={`long-menu-${widget.label}`}
                                anchorEl={anchorEl}
                                keepMounted
                                open={
                                    open &&
                                    anchorEl.classList.contains(`${index}`)
                                }
                                onClose={this.handleClose}
                                PaperProps={{
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: 200
                                    }
                                }}
                            >
                                {options.map(option => (
                                    <MenuItem
                                        key={option}
                                        onClick={this.selectedItem(
                                            widget,
                                            option
                                        )}
                                    >
                                        {option}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                        <Selector
                            data={widget}
                            parentRef={parentRef}
                            currentBreakpoint={currentBreakpoint}
                        />
                    </div>
                ))}
            </ResponsiveReactGridLayout>
        );
    }
}

TabsContent.defaultProps = {
    breakpoints: { lg: 914, md: 594, sm: 431, xs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4 }
};

export default TabsContent;
