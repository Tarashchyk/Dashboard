import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

import ReactFitText from "react-fittext";

class DashboardTable extends Component {
    componentDidUpdate(prevProps) {
        const { parentRef } = this.props;

        if (parentRef && parentRef.offsetWidth !== prevProps.parentRef) {
            setTimeout(() => {
                window.dispatchEvent(new Event("resize"));
            }, 150);
        }
    }
    renderRows = response => {
        const {
            data,
            layout: { rowQty, cellQty }
        } = response;
        const { currentBreakpoint } = this.props;

        const rows = [];
        let cellIndex = 0;

        for (let i = 0; i < rowQty; i++) {
            const newRow = [];

            data.forEach((item, index) => {
                if (
                    !(index < cellQty * i - 1) &&
                    index < cellQty * i + cellQty &&
                    index === cellIndex &&
                    index < data.length
                ) {
                    newRow.push(
                        this.renderItems(item, index, rowQty, response, cellQty)
                    );
                    cellIndex++;
                }
            });

            if (newRow.length) {
                const rowClassName =
                    currentBreakpoint !== "lg" && cellQty > 6
                        ? "table_row table_row--long"
                        : "table_row";
                rows.push(
                    <Grid
                        item
                        md
                        lg
                        key={i}
                        justify="space-around"
                        container
                        className={rowClassName}
                    >
                        {newRow}
                    </Grid>
                );
            }
        }

        const tableBodyClassName =
            currentBreakpoint !== "lg" && cellQty > 6
                ? "table_body table_body--long"
                : "table_body";

        return (
            <Grid container item xs className={tableBodyClassName}>
                {rows}
            </Grid>
        );
    };

    renderItems = (values, index, rowQty, data, cellQty) => {
        const table_item_height =
            rowQty > 1 ? "table_item--sm" : "table_item--lg";

        const {
            link: { url }
        } = data;
        const { currentBreakpoint } = this.props;

        if (
            currentBreakpoint === "lg" &&
            table_item_height === "table_item--sm"
        ) {
            return (
                <Grid
                    container
                    item
                    xs
                    className={`table_item ${table_item_height}`}
                    key={index}
                    style={values.style}
                >
                    <Link to={url} className="link link_multiple-cell">
                        <ReactFitText
                            maxFontSize={42}
                            minFontSize={12}
                            compressor={0.7}
                        >
                            <div className="table_item_value">
                                {values.value}
                            </div>
                        </ReactFitText>
                        <ReactFitText
                            maxFontSize={26}
                            minFontSize={12}
                            compressor={1.2}
                        >
                            <div className="table_item_description">
                                {values.name}
                            </div>
                        </ReactFitText>
                    </Link>
                </Grid>
            );
        } else if (
            currentBreakpoint === "lg" &&
            table_item_height === "table_item--lg" &&
            Number(cellQty) === 2
        ) {
            return (
                <Grid
                    container
                    item
                    xs
                    className={`table_item ${table_item_height}`}
                    key={index}
                    style={values.style}
                >
                    <Link to={url} className="link link_multiple-cell">
                        <ReactFitText
                            maxFontSize={45}
                            minFontSize={12}
                            compressor={0.7}
                        >
                            <div className="table_item_value">
                                {values.value}
                            </div>
                        </ReactFitText>
                        <ReactFitText
                            maxFontSize={30}
                            minFontSize={12}
                            compressor={1.3}
                        >
                            <div className="table_item_description">
                                {values.name}
                            </div>
                        </ReactFitText>
                    </Link>
                </Grid>
            );
        } else if (
            currentBreakpoint !== "lg" &&
            table_item_height === "table_item--sm"
        ) {
            return (
                <Grid
                    container
                    item
                    xs
                    className={`table_item ${table_item_height}`}
                    key={index}
                    style={values.style}
                >
                    <Link to={url} className="link link_multiple-cell">
                        <ReactFitText
                            maxFontSize={28}
                            minFontSize={12}
                            compressor={0.7}
                        >
                            <div className="table_item_value">
                                {values.value}
                            </div>
                        </ReactFitText>
                        <ReactFitText maxFontSize={15} minFontSize={10}>
                            <div className="table_item_description">
                                {values.name}
                            </div>
                        </ReactFitText>
                    </Link>
                </Grid>
            );
        } else {
            return (
                <Grid
                    container
                    item
                    xs
                    className={`table_item ${table_item_height}`}
                    key={index}
                    style={values.style}
                >
                    <Link to={url} className="link link_multiple-cell">
                        <ReactFitText
                            maxFontSize={52}
                            minFontSize={12}
                            compressor={0.7}
                        >
                            <div className="table_item_value">
                                {values.value}
                            </div>
                        </ReactFitText>
                        <ReactFitText
                            maxFontSize={30}
                            minFontSize={10}
                            compressor={0.9}
                        >
                            <div className="table_item_description">
                                {values.name}
                            </div>
                        </ReactFitText>
                    </Link>
                </Grid>
            );
        }
    };

    renderOneCellRow = data => {
        const values = data.data[0];
        const {
            link: { url }
        } = data;
        const { currentBreakpoint } = this.props;
        if (currentBreakpoint === "lg") {
            return (
                <>
                    <Grid
                        container
                        item
                        xs
                        className="table_item table_item--single"
                        style={values.style}
                    >
                        <Link to={url} className="link link_single-cell">
                            <ReactFitText maxFontSize={90} compressor={1.4}>
                                <div className="table_item_value">
                                    {values.value}
                                </div>
                            </ReactFitText>
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <ReactFitText
                            maxFontSize={35}
                            minFontSize={12}
                            compressor={4.4}
                        >
                            <div className="table_description">
                                {data.description}
                            </div>
                        </ReactFitText>
                    </Grid>
                </>
            );
        } else {
            return (
                <>
                    <Grid
                        container
                        item
                        xs
                        className="table_item table_item--single"
                        style={values.style}
                    >
                        <Link to={url} className="link link_single-cell">
                            <ReactFitText maxFontSize={90} compressor={1.1}>
                                <div className="table_item_value">
                                    {values.value}
                                </div>
                            </ReactFitText>
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <ReactFitText maxFontSize={18} minFontSize={12}>
                            <div className="table_description">
                                {data.description}
                            </div>
                        </ReactFitText>
                    </Grid>
                </>
            );
        }
    };

    checkTableSize = (data, rowQty, cellQty) => {
        if (Number(rowQty) === 1 && Number(cellQty) === 1) {
            return this.renderOneCellRow(data);
        } else {
            return this.renderRows(data);
        }
    };

    render() {
        const { data } = this.props;

        if (
            !data ||
            !data.hasOwnProperty("data") ||
            !data.hasOwnProperty("label") ||
            !data.hasOwnProperty("layout")
        ) {
            return null;
        }

        const {
            layout: { rowQty, cellQty }
        } = data;

        return (
            <div className="table">
                <ReactFitText maxFontSize={16} minFontSize={10}>
                    <div className="table_title handleDrag">{data.label}</div>
                </ReactFitText>
                {this.checkTableSize(data, rowQty, cellQty)}
            </div>
        );
    }
}

export default DashboardTable;
