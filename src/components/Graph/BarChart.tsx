import * as d3 from 'd3';
import React, {
  useEffect, useRef, useState,
} from 'react';
import {
  Axis, Legend, containerProps, initDimension, useChartContainer, scale, getColors, axisProps,
} from './ChartContainerHelper';
import { maxMultiDim } from './helper';
import './styles.scss';

interface barProps extends containerProps, axisProps {
  barRadius?: number
  spacing?: number
  horizontal?: boolean
}

/**
 * React Component for creating bar charts. It can be used to create both horizontal and vertical bar charts.
 *
 * The required fields needed to create a bar chart is described below;
 * width: number | string     Width of the container containing the chart
 * height: number | string    Height of the container containing the chart
 * data: number[][]           The data section is kept a 2d numerical array
 * labels: string[] | Date[]  Labels of the graph which can be either string or date
 * legends: string[]          Legends of the graph
 * spaceLeft?: number         Space that is kept at the left side of the container
 *                            whose value can be from -1 to 1, since it is done
 *                            relative to the width of the container
 * spaceTop?: number          Space that is kept at the top side of the container
 *                            whose value can be from -1 to 1, since it is done
 *                            relative to the height of the container
 * spaceRight?: number        Space that is kept at the right side of the container
 *                            whose value can be from -1 to 1, since it is done
 *                            relative to the width of the container
 * spaceBottom?: number       Space that is kept at the bottom side of the container
 *                            whose value can be from -1 to 1, since it is done
 *                            relative to the height of the container
 * legendWidth?: number       Width of the colored rectangle in the legend
 *                            whose value needs to be in pixels
 * legendHeight?: number      Height of the colored rectangle in the legend
 *                            whose value needs to be in pixels
 * legendRadius?: number      Radius of the colored circle in the legend
 *                            whose value needs to be in pixels
 * legendTextSpace?: number   Space between the rectangle or color and text
 *                            whose value needs to be in pixels
 * legendCircle?: boolean     Whether it will be circle or rectangle
 * colors?: string[]          Colors for coloring the lines with different legends
 * xAxisCategory: string      Category of the x axis. It can take the following values
 *                            sqrt:               Square root of numeric values
 *                            pow:                Power of the numeric values
 *                            log:                Logarihm of the numeric values
 *                            time:               For handling date data
 *                            categorical:        Categorical values
 *                            categorical-point:  Categorical values in points
 *                            linear:             Default type, linear representation of numeric values
 * yAxisCategory: string      Category of the y axis. It can take the following values
 *                            sqrt:               Square root of numeric values
 *                            pow:                Power of the numeric values
 *                            log:                Logarihm of the numeric values
 *                            time:               For handling date data
 *                            categorical:        Categorical values
 *                            categorical-point:  Categorical values in points
 *                            linear:             Default type, linear representation of numeric values
 * xAxisLabel: string         Label of the x axis
 * yAxisLabel: string         Label of the y axis
 * xAxisX?: number            x Position of the x axis whose value can be from -1 to 1,
 *                            since it is done relative to the width of the container
 * xAxisY?: number            y Position of the x axis whose value can be from -1 to 1,
 *                            since it is done relative to the height of the container
 * xAxisLabelX?: number       x Position of the label of x axis whose value can be from -1 to 1,
 *                            since it is done relative to the width of the container
 * xAxisLabelY?: number       y Position of the label of x axis whose value can be from -1 to 1,
 *                            since it is done relative to the height of the container
 * xAxisPosition?: string     Position of the x axis. It can take the following values
 *                            top   : Placing the x axis at the top
 *                            bottom: Placing the x axis at the bottom
 * yAxisX?: number            x Position of the y axis whose value can be from -1 to 1,
 *                            since it is done relative to the width of the container
 * yAxisY?: number            y Position of the y axis whose value can be from -1 to 1,
 *                            since it is done relative to the height of the container
 * yAxisLabelX?: number       x Position of the label of y axis whose value can be from -1 to 1,
 *                            since it is done relative to the width of the container
 * yAxisLabelY?: number       y Position of the label of y axis whose value can be from -1 to 1,
 *                            since it is done relative to the height of the container
 * yAxisPosition?: string     Position of the y axis. It can take the following values
 *                            left  : Placing the y axis at the left
 *                            right : Placing the y axis at the right
 * spacing?: number           Space between each bar and group of bars whose value can be from -1 to 1,
 *                            since it is done relative to the height or width of the container
 * horizontal?: boolean       Whether the bar chart will be horizontal or vertical
 *
 * @param props An object which contains all the necessary parameters for creating and rendering the component
 *
 * @returns A react component
 */
export const BarChart = (props: barProps) => {
  const {
    id: divId, width, height, data, labels, legends, spaceLeft, spaceTop, spaceRight, spaceBottom,
    colors: pColors, legendWidth, legendHeight, legendRadius, legendSpacing, horizontal: pHorizontal,
    legendTextSpace, legendCircle, legendX, legendY, legendFontSize, className, xAxisCategory,
    yAxisCategory, xAxisLabel, xAxisLabelX, xAxisLabelY, xAxisPosition, xAxisX, xAxisY, yAxisLabel,
    yAxisLabelX, yAxisLabelY, yAxisPosition, yAxisX, yAxisY, spacing: pSpacing, showLegend, legendHorizontal,
    barRadius: pBarRadius,
  } = props;

  // Create unique id for the div, and reference for the container
  const svgContainer = useRef(null);

  // Get requierd dimensions for the container
  const [dim, setDim] = useState({ ...initDimension });
  useChartContainer(
    divId,
    legends,
    dim,
    setDim,
    spaceLeft,
    spaceTop,
    spaceRight,
    spaceBottom,
  );

  useEffect(() => {
    // Handling undefined value by specifying appropraite values
    const horizontal: boolean = pHorizontal === undefined ? false : pHorizontal;
    const colors: string[] = pColors === undefined ? getColors(legends.length) : pColors;

    // Calcuting the graph area, and it's related components
    const innerWidth: number = (dim.width) - (dim.spaceLeft) - (dim.spaceRight);
    const innerHeight: number = (dim.height) - (dim.spaceTop) - (dim.spaceBottom);
    const spacing: number = pSpacing === undefined
      ? (horizontal ? innerHeight : innerWidth) / (labels.length + 1)
      : (horizontal ? innerHeight : innerWidth) * pSpacing;
    const barSize: number = ((horizontal ? innerHeight : innerWidth) - (pSpacing === undefined ? 0 : spacing))
      / ((pSpacing === undefined ? labels.length + 1 : labels.length) * legends.length);
    const barRadius: number = pBarRadius === undefined ? 3 : pBarRadius;
    const barSpacing: number = spacing / labels.length;
    // Getting maximum value from 2d array
    const maxVal = maxMultiDim(data);
    // Selecting the container to draw on
    const svg = d3.select(svgContainer.current);
    svg.selectAll('*').remove();

    const xScale = scale(xAxisCategory, dim.width - dim.spaceLeft - dim.spaceRight, horizontal ? [0, maxVal * 1.1] : labels);
    Axis(
      'x',
      xScale,
      svgContainer.current,
      dim,
      'middle',
      xAxisLabel,
      xAxisX,
      xAxisY,
      xAxisLabelX,
      xAxisLabelY,
      xAxisPosition,
    );

    const yScale = scale(yAxisCategory, dim.height - dim.spaceBottom - dim.spaceTop, horizontal ? labels : [0, maxVal * 1.1]);
    Axis(
      'y',
      yScale,
      svgContainer.current,
      dim,
      'middle',
      yAxisLabel,
      yAxisX,
      yAxisY,
      yAxisLabelX,
      yAxisLabelY,
      yAxisPosition,
    );

    const position = (dataIdx: number, idx: number) => {
      return (barSize * idx) + (barSize * legends.length * dataIdx) + (barSpacing * dataIdx)
        + (pSpacing === undefined ? 0 : barSpacing / 2);
    };

    data.forEach((datum, idx) => {
      svg.append('g')
        .attr('transform', `translate(${dim.spaceLeft + (horizontal ? 0 : barSpacing / 2)},
                            ${dim.spaceTop + (horizontal ? 0 : barSpacing / 2)})`)
        .selectAll('rect')
        .data(datum)
        .enter()
        .append('rect')
        .attr('rx', barRadius)
        .attr('width', (d) => (horizontal ? xScale(d) : barSize))
        .attr('height', (d) => (horizontal ? barSize : innerHeight - yScale(d)))
        .attr('x', (_, i) => (horizontal ? 0 : position(i, Number(idx))))
        .attr('y', (d, i) => {
          return (horizontal ? position(i, Number(idx)) : yScale(d));
        })
        .style('fill', colors[idx]);
    });

    if (showLegend) {
      Legend(
        svgContainer.current,
        dim,
        legends,
        colors,
        legendX,
        legendY,
        legendWidth,
        legendHeight,
        legendRadius,
        legendSpacing,
        legendTextSpace,
        legendCircle,
        legendFontSize,
        legendHorizontal,
      );
    }
  }, [props, dim]);

  return (
    <div id={divId} style={{ width, height }} className={className}>
      <svg width={(dim.width)} height={(dim.height)} ref={svgContainer} />
    </div>
  );
};

BarChart.defaultProps = {
  barRadius: undefined,
  spacing: undefined,
  horizontal: undefined,
};
