import React, {
  useEffect, useRef, useState,
} from 'react';
import * as d3 from 'd3';
import { maxMultiDim } from './helper';
import {
  Axis, axisProps, getColors, Legend, scale, containerProps, initDimension, useChartContainer,
} from './ChartContainerHelper';
import './styles.scss';

interface lineProps extends containerProps, axisProps {
  area?: boolean
  strokeWidth?: number
  circleRadius?: number
  smooth?: boolean
}

/**
 * React Component for creating line charts. It can be used to create both line and area charts.
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
 * area?: boolean             Whether the chart should be a line or area chart
 * strokeWidth?: number       Stroke width of the line whose value needs to be in pixels
 * circleRadius?: number      Radius of the point circle whose value needs to be in pixels
 * smooth?: boolean           Whether the line should be smooth or edgy
 *
 * @param props An object which contains all the necessary parameters for creating and rendering the component
 *
 * @returns A react component
 */
export const LineChart = (props: lineProps) => {
  const {
    id: divId, width, height, padding, data, labels, legends, spaceLeft, spaceTop, spaceRight, spaceBottom,
    colors: pColors, legendWidth, legendHeight, legendRadius, legendSpacing, area: pArea,
    legendTextSpace, legendCircle, legendX, legendY, legendFontSize, className, xAxisCategory,
    yAxisCategory, xAxisLabel, xAxisLabelX, xAxisLabelY, xAxisPosition, xAxisX, xAxisY, yAxisLabel,
    yAxisLabelX, yAxisLabelY, yAxisPosition, yAxisX, yAxisY, smooth: pSmooth, strokeWidth: pStrokeWidth,
    circleRadius: pCircleRadius, showLegend, legendHorizontal,
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
    const area: boolean = pArea === undefined ? false : pArea;
    const smooth: boolean = pSmooth === undefined ? true : pSmooth;
    const colors: string[] = pColors === undefined ? getColors(legends.length)
      : pColors;
    const strokeWidth: number = pStrokeWidth === undefined ? 2 : pStrokeWidth;
    const circleRadius: number = pCircleRadius === undefined ? strokeWidth * 2 : pCircleRadius;
    // Calcuting the graph area, and it's related components
    const innerWidth: number = dim.width - dim.spaceLeft - dim.spaceRight;
    const innerHeight: number = dim.height - dim.spaceTop - dim.spaceBottom;

    // Getting maximum value from 2d array
    const maxVal = maxMultiDim(data);

    // Selecting the container to draw on
    const svg = d3.select(svgContainer.current);
    svg.selectAll('*').remove();
    const xScale = scale(xAxisCategory, innerWidth, labels);
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
      labels.length,
    );

    const yScale = scale(yAxisCategory, innerHeight, [0, maxVal * 1.1], true);
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
    data.forEach((datum, idx) => {
      svg.append('path')
        .attr('transform', `translate(${dim.spaceLeft},${dim.spaceTop})`)
        .datum(datum)
        .style('fill', area ? colors[idx] : 'none')
        .style('opacity', area ? 0.5 : 1)
        .attr('stroke', colors[idx])
        .attr('stroke-width', strokeWidth)
        .attr('d', area
          ? d3.area()
            .x((_, i) => Number(xScale(labels[i]))
              + (innerWidth / (labels.length * 2)))
            .y0(innerHeight)
            .y1((d) => yScale(Number(d)))
          : d3.line()
            .curve(smooth ? d3.curveMonotoneX : d3.curveLinear)
            .x((_, i) => Number(xScale(labels[i]))
              + (xAxisCategory === 'time' ? 0 : (innerWidth / (labels.length * 2))))
            .y((d) => yScale(Number(d))) as any);

      svg.append('g')
        .attr('transform', `translate(${dim.spaceLeft},${dim.spaceTop})`)
        .selectAll('circle')
        .data(data[idx])
        .enter()
        .append('circle')
        .attr('r', circleRadius)
        .attr('cx', (_, i) => Number(xScale(labels[i]))
          + (xAxisCategory === 'time' ? 0 : (innerWidth / (labels.length * 2))))
        .attr('cy', (d) => yScale(d))
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
      <svg width={dim.width} height={dim.height} ref={svgContainer} />
    </div>
  );
};

LineChart.defaultProps = {
  area: undefined,
  strokeWidth: undefined,
  circleRadius: undefined,
  smooth: undefined,
};
