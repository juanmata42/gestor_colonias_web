import { useEffect, useLayoutEffect } from 'react';
import * as d3 from 'd3';

/**
 * Interface for the container's parameters, which contains the supported fields
 *
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
 *
 */
export interface containerProps {
  id: string
  width?: number | string
  height?: number | string
  padding?: number | string
  data: number[][]
  labels: string[] | Date[]
  legends: string[]
  className?: string
  spaceLeft?: number
  spaceTop?: number
  spaceRight?: number
  spaceBottom?: number
  showLegend?: boolean
  legendX?: number
  legendY?: number
  legendWidth?: number
  legendHeight?: number
  legendRadius?: number
  legendSpacing?: number
  legendTextSpace?: number
  legendCircle?: boolean
  legendHorizontal?: boolean
  legendFontSize?: number
  colors?: string[]
}

/**
 * Interface for the axis' parameters, which contains the supported fields
 *
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
 *
 */
export interface axisProps {
  xAxisCategory: string
  yAxisCategory: string
  xAxisLabel: string
  yAxisLabel: string
  xAxisX?: number
  xAxisY?: number
  xAxisLabelX?: number
  xAxisLabelY?: number
  xAxisPosition?: string
  yAxisX?: number
  yAxisY?: number
  yAxisLabelX?: number
  yAxisLabelY?: number
  yAxisPosition?: string
}

interface dimensionType {
  width: number
  height: number
  spaceLeft: number
  spaceTop: number
  spaceRight: number
  spaceBottom: number
}

export const initDimension = {
  width: 0,
  height: 0,
  spaceLeft: 0,
  spaceTop: 0,
  spaceRight: 0,
  spaceBottom: 0,
};

export const useChartContainer = (
  divId: string,
  legends: Array<string>,
  dimension: dimensionType,
  setDimension: any,
  spaceLeft?: number,
  spaceTop?: number,
  spaceRight?: number,
  spaceBottom?: number,
) => {
  const changeDimension = () => {
    setDimension({
      ...dimension,
      width: Number(document.getElementById(divId)?.clientWidth),
      height: Number(document.getElementById(divId)?.clientHeight),
      spaceLeft: spaceLeft === undefined ? 50
        : Number(document.getElementById(divId)?.clientWidth) * spaceLeft,
      spaceTop: spaceTop === undefined ? 20
        : Number(document.getElementById(divId)?.clientHeight) * spaceTop,
      spaceRight: spaceRight === undefined
        ? (Math.max(...legends.map((v) => v.length)) * 14.5) + 40
        : Number(document.getElementById(divId)?.clientWidth) * spaceRight,
      spaceBottom: spaceBottom === undefined ? 50
        : Number(document.getElementById(divId)?.clientHeight) * spaceBottom,
    });
  };

  useEffect(
    () => { changeDimension(); },
    [spaceLeft, spaceTop, spaceRight, spaceBottom],
  );

  useLayoutEffect(
    () => {
      window.addEventListener('resize', changeDimension);

      changeDimension();

      return () => window.removeEventListener('resize', changeDimension);
    },
    [spaceLeft, spaceTop, spaceRight, spaceBottom],
  );
};
function truncateText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
}
export const Axis = (
  axisType: string,
  scale: any,
  ref: any,
  dim: dimensionType,
  textAnchor: string,
  label: string,
  pAxisX?: number,
  pAxisY?: number,
  pLabelX?: number,
  pLabelY?: number,
  axisPosition?: string,
  legendsLength?: number,
) => {
  let axis: any;
  let axisX: number;
  let axisY: number;
  let labelX: number;
  let labelY: number;
  let rotate: number;

  if (axisType === 'x') {
    if (legendsLength && legendsLength > 20) {
      axis = axisPosition === 'top' ? d3.axisTop(scale) : d3.axisBottom(scale).tickValues(scale.domain().filter((d:any, i:any) => {
        return !(i % 10);
      }));
    } else { axis = axisPosition === 'top' ? d3.axisTop(scale) : d3.axisBottom(scale); }
    axisX = pAxisX === undefined ? dim.spaceLeft : dim.width * pAxisX;

    if (pAxisY === undefined && axisPosition === 'top') {
      axisY = dim.spaceTop;
    } else if (pAxisY === undefined) {
      axisY = dim.height - dim.spaceBottom;
    } else {
      axisY = dim.height * pAxisY;
    }

    labelX = pLabelX === undefined ? (dim.width - dim.spaceRight + dim.spaceLeft) / 2
      : dim.width * pLabelX;

    if (pLabelY === undefined && axisPosition === 'top') {
      labelY = dim.spaceTop / 2;
    } else if (pLabelY === undefined) {
      labelY = dim.height;
    } else {
      labelY = dim.height * pLabelY;
    }
    rotate = 0;
    d3.select(ref)
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(${axisX},${axisY})`)
      .call(axis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-1em')
      .attr('dy', '-.5em')
      .attr('transform', 'rotate(-90)');
  } else {
    axis = axisPosition === 'right' ? d3.axisRight(scale) : d3.axisLeft(scale);

    if (pAxisX === undefined && axisPosition === 'right') {
      axisX = dim.spaceRight - dim.width;
    } else if (pAxisX === undefined) {
      axisX = dim.spaceLeft;
    } else {
      axisX = dim.width * pAxisX;
    }

    axisY = pAxisY === undefined ? dim.spaceTop : dim.height * pAxisY;

    labelX = pLabelX === undefined
      ? ((axisPosition === 'right' ? -1 : 1) * (dim.spaceBottom - dim.spaceTop - dim.height)) / 2
      : dim.height * pLabelX;

    if (pLabelY === undefined && axisPosition === 'right') {
      labelY = dim.spaceRight - dim.width + (dim.spaceLeft / 2);
    } else if (pLabelY === undefined) {
      labelY = dim.spaceLeft / 2;
    } else {
      labelY = dim.width * pLabelY;
    }
    rotate = axisPosition === 'right' ? 90 : -90;
    d3.select(ref)
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${axisX}, ${axisY})`)
      .call(axis)
      .selectAll('text')
      .text((d: any) => {
        if (d.length > 8) {
          return `${d.substring(0, 7)}...`;
        }
        return d;
      })
      .append('title')
      .text((d: any) => d);
  }

  d3.select(ref)
    .append('text')
    .attr('transform', `rotate(${rotate})`)
    .attr('text-anchor', textAnchor)
    .attr('x', labelX)
    .attr('y', labelY)
    .text(label);
};

export const Legend = (
  ref: any,
  dim: dimensionType,
  legends: string[],
  colors: string[],
  legendX?: number,
  legendY?: number,
  legendWidth?: number,
  legendHeight?: number,
  legendRadius?: number,
  legendSpacing?: number,
  legendTextSpace?: number,
  legendCircle?: boolean,
  legendFontSize?: number,
  legendHorizontal?: boolean,
) => {
  const x: number = legendX === undefined ? dim.width - dim.spaceRight : dim.width * legendX;
  const y: number = legendY === undefined ? dim.spaceTop : dim.height * legendY;
  const width: number = legendWidth === undefined ? 30 : dim.width * legendWidth;
  const height: number = legendHeight === undefined ? 15 : dim.height * legendHeight;
  const radius: number = legendRadius === undefined ? 10 : Math.min(dim.width, dim.height) * legendRadius;
  const horizontal: boolean = legendHorizontal === undefined ? false : legendHorizontal;
  const spacing: number = legendSpacing === undefined ? 5 : (horizontal ? dim.width : dim.height) * legendSpacing;
  const spaceText: number = legendTextSpace === undefined ? 10 : dim.width * legendTextSpace;
  const circle: boolean = legendCircle === undefined ? false : legendCircle;
  const fontSize: number = legendFontSize === undefined ? 15 : legendFontSize;
  if (circle) {
    d3.select(ref)
      .append('g')
      .attr('transform', `translate(${x},${y})`)
      .selectAll('circle')
      .data(legends)
      .enter()
      .append('circle')
      .attr('r', radius)
      .attr('cx', (_, i) => (horizontal ? (radius + spacing + (i > 0 ? legends[i - 1].length * (fontSize * 0.67) : 0)) * i : 0))
      .attr('cy', (_, i) => (horizontal ? 0 : (radius + spacing) * i))
      .style('fill', (_, i) => colors[i]);
  } else {
    d3.select(ref)
      .append('g')
      .attr('transform', `translate(${x},${y})`)
      .selectAll('rect')
      .data(legends)
      .enter()
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('x', (_, i) => (horizontal ? (width + spacing + (i > 0 ? legends[i - 1].length * (fontSize * 0.67) : 0)) * i : 0))
      .attr('y', (_, i) => (horizontal ? 0 : (height + spacing) * i))
      .style('fill', (_, i) => colors[i]);
  }
  d3.select(ref)
    .append('g')
    .attr('transform', `translate(${x + spaceText + (circle ? radius : width)},${y})`)
    .selectAll('text')
    .data(legends)
    .enter()
    .append('text')
    .attr('x', (_, i) => (horizontal ? ((circle ? radius : width) + spacing + (i > 0 ? legends[i - 1].length * (fontSize * 0.67) : 0)) * i : 0))
    .attr('y', (_, i) => (horizontal ? 0 : ((circle ? radius : height) + spacing) * i))
    .attr('dominant-baseline', (circle ? 'middle' : 'text-before-edge'))
    .attr('font-size', fontSize)
    .text((d) => d)
    // eslint-disable-next-line func-names
    .each(function () {
      const text = d3.select(this);
      const textNode = text.node();
      if (textNode) {
        const textLength = textNode.getComputedTextLength();
        const maxWidth = window.screen.width >= 480 ? 60 : 30;
        if (textLength > maxWidth) {
          const textContent = text.text();
          let t = 0;
          let b = textContent.length;
          while (t < b) {
            // eslint-disable-next-line no-bitwise
            const c = (t + b) >> 1;
            text.text(`${textContent.slice(0, c)} ...`);
            if (textNode.getComputedTextLength() > maxWidth) b = c;
            else t = c + 1;
          }
          text.append('title').text(textContent);
        }
      }
    });
};

export const scale = (
  type: string,
  maxRange: number,
  domain: any[],
  invert = false,
  exponent = 0.5,
) => {
  let axisType;

  switch (type) {
    case 'sqrt':
    case 'pow':
      axisType = d3.scalePow().exponent(exponent);
      break;
    case 'log':
      axisType = d3.scaleLog();
      break;
    case 'time':
      axisType = d3.scaleTime();
      break;
    case 'categorical':
      axisType = d3.scaleBand();
      break;
    case 'categorical-point':
      axisType = d3.scalePoint();
      break;
    case 'linear':
    default:
      axisType = d3.scaleLinear();
  }

  return (axisType as any).domain(domain)
    .range(invert ? [maxRange, 0] : [0, maxRange]);
};

export const getColors = (length: number) => {
  const colorScale = d3.scaleLinear()
    .domain([0, length - 1])
    .range(['blue', 'red'] as any);

  const colors: any[] = [];
  for (let i = 0; i < length; i += 1) {
    colors.push(colorScale(i) as any);
  }

  return colors;
};
