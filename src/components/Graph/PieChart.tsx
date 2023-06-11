import React, {
  useEffect, useRef, useState,
} from 'react';
import * as d3 from 'd3';
import {
  containerProps, initDimension, Legend, useChartContainer, getColors,
} from './ChartContainerHelper';
import './styles.scss';

interface pieProps extends containerProps {
  radius?: number
  donut?: boolean
  innerRadius?: number
  rotate?: number
}

/**
 * React Component for creating pie charts. It can be used to create both pie and donut charts.
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
 * radius?: number            Radius of the circle whose value can be from -1 to 1,
 *                            since it is done relative to the width of the container
 * innerRadius?: number       Inner-radius of the circle for a hollow view
 *                            whose value can be from -1 to 1, since it is done
 *                            relative to the width of the container
 * donut?: boolean            Whether the chart should be donut or pie
 * rotate?: number            Rotate the whole axis
 *
 * @param props An object which contains all the necessary parameters for creating and rendering the component
 *
 * @returns A react component
 */
export const PieChart = (props: pieProps) => {
  const {
    id: divId, data, legends, spaceLeft, spaceTop, spaceRight, spaceBottom,
    donut: pDonut, rotate: pRotate, colors: pColors, radius: pRadius, showLegend,
    innerRadius: pInnerRadius, legendWidth, legendHeight, legendRadius, legendSpacing,
    legendTextSpace, legendCircle, legendX, legendY, legendFontSize, className, legendHorizontal,
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
    const donut: boolean = pDonut === undefined ? false : pDonut;
    const rotate: number = pRotate === undefined ? 0 : pRotate;
    const colors: string[] = pColors === undefined ? getColors(legends.length * data.length)
      : pColors;

    // Calcuting the graph area, and it's related components
    const innerWidth: number = dim.width - dim.spaceLeft - dim.spaceRight;
    const innerHeight: number = dim.height - dim.spaceTop - dim.spaceBottom;
    const radius: number = pRadius === undefined ? Math.min(innerHeight, innerWidth) / 2
      : (Math.min(innerHeight, innerWidth) / 2) * pRadius;
    let innerRadius: number = pInnerRadius === undefined
      ? radius / (data.length + (donut ? 1 : 0))
      : radius * (1 - pInnerRadius);
    innerRadius = donut ? innerRadius : radius / data.length;

    // Function for getting scaled circular data
    const pie = d3.pie().value((d) => Number(d));

    // Selecting the container to draw on
    const svg = d3.select(svgContainer.current);
    svg.selectAll('*').remove();

    data.forEach((datum, idx) => {
      svg.append('g')
        .attr('transform', `translate(${radius + (dim.spaceLeft)},
                            ${radius + (dim.spaceTop)})
                            rotate(${rotate})`)
        .selectAll('arc')
        .data(pie(datum))
        .enter()
        .append('path')
        .attr('d', d3.arc()
          .outerRadius(radius - (innerRadius * Number(idx)))
          .innerRadius(radius - (innerRadius * (1 + Number(idx)))) as any)
        .style('fill', (_, i) => colors[i + (Number(idx) * legends.length)]);
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
    <div id={divId} className={`${className} pieChart__container`}>
      <svg className='pieChart__svg' ref={svgContainer} />
    </div>
  );
};

PieChart.defaultProps = {
  radius: undefined,
  donut: undefined,
  innerRadius: undefined,
  rotate: undefined,
};
