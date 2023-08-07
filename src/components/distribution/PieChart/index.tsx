/* eslint-disable @typescript-eslint/ban-ts-comment */
import { arc, pie } from 'd3';
import { useCallback, useEffect } from 'react';

import { defaultChartClassNames } from '../../../utils';
import { interpolate } from 'd3-interpolate';
import { mergeTailwindClasses } from '../../../utils';
import { min } from 'd3-array';
import { select } from 'd3-selection';
import useTooltip from '../../../hooks/useTooltip';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface DataItem {
  name: string;
  [key: string]: any;
}

interface ClassNameMap {
  [key: string]: string;
}

interface DrawingOptions {
  duration: number;
}

interface LabelOptions {
  radius?: number;
  text?: (data: DataItem) => string;
  className?: string;
  classNameMap?: { [key: string]: string };
}

interface PieChartProps {
  data: DataItem[];
  id: string;
  className?: string;
  classNameMap?: ClassNameMap;
  padding?: {
    left: number;
    right?: number;
    top: number;
    bottom?: number;
  };
  paddingAngle?: number;
  cornerRadius?: number;
  margin?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  nameKey: string;
  valueKey: string;
  drawing?: DrawingOptions;
  tooltip?: {
    className?: string;
    html?: (d: any) => string;
    keys?: string[];
  };
  labels?: LabelOptions;
}

const PieChart = ({
  data,
  id,
  className = '',
  classNameMap = {},
  padding = {
    left: 0,
    top: 0,
  },
  paddingAngle = 0,
  startAngle = 0,
  endAngle = 360 + startAngle,
  cornerRadius = 0,
  margin = {
    left: 40,
    right: 40,
    top: 40,
    bottom: 40,
  },
  innerRadius = 0,
  nameKey = 'name',
  valueKey,
  drawing,
  tooltip,
  labels,
}: PieChartProps) => {
  const { onMouseOver, onMouseMove, onMouseLeave } = useTooltip(tooltip);
  const refreshChart = useCallback(() => {
    const svg = select(`#${id}`);
    svg.selectAll('*').remove();

    const width = +svg.style('width').split('px')[0];
    const height = +svg.style('height').split('px')[0];

    const g = svg.append('g');

    const pieFn = pie<DataItem>()
      .startAngle((startAngle / 180) * Math.PI || 0)
      .endAngle((endAngle / 180) * Math.PI || 2 * Math.PI)
      .padAngle(paddingAngle / 180)
      .value((d) => d[valueKey]);

    const chartArea = [
      width - margin.left - margin.right,
      height - margin.top - margin.bottom,
    ];

    const radius =
      min(
        endAngle - startAngle <= 180
          ? [chartArea[0] / 2, chartArea[1]]
          : chartArea.map((a) => a / 2)
      ) || 0;

    const arcFn = arc<DataItem>()
      .innerRadius(radius * innerRadius)
      .outerRadius(radius)
      .padAngle((paddingAngle / 360) * (2 * Math.PI))
      .cornerRadius(cornerRadius);

    const labelArc =
      labels?.radius &&
      arc<DataItem>()
        .innerRadius(radius * labels.radius)
        .outerRadius(radius * labels.radius);

    const arcs = pieFn(data);

    const pathsG = g
      .append('g')
      .attr(
        'transform',
        `translate(${padding.left + margin.left + chartArea[0] / 2},${
          endAngle - startAngle <= 180
            ? height - margin.bottom - (padding.bottom || 0)
            : margin.top + (padding.top || 0) + chartArea[1] / 2
        })`
      );

    const paths = pathsG
      .selectAll('path')
      .data(arcs)
      .join('path')
      .attr('id', (d) => d.data[nameKey])
      .attr('data-testid', (d) => d.data[nameKey])
      .attr('class', (d: any) =>
        mergeTailwindClasses('fill-black', classNameMap[d.data[nameKey]])
      )
      // @ts-ignore
      .attr('d', arcFn)
      .on(
        'mouseenter',
        onMouseOver((d: any) => `${d.data[nameKey]} = ${d.value}`)
      )
      .on('mousemove', onMouseMove)
      .on('mouseleave', onMouseLeave);

    drawing?.duration &&
      paths
        .transition()
        .duration(drawing?.duration || 1000)
        .attrTween('d', function (d) {
          const i = interpolate(
            {
              startAngle: (startAngle / 180) * Math.PI,
              endAngle: (startAngle / 180) * Math.PI,
            },
            d
          );

          // @ts-ignore
          return (t) => arcFn(i(t));
        });

    const labelsG = labelArc && pathsG.append('g').attr('class', 'labels');

    labelArc &&
      labelsG &&
      labelsG
        .selectAll('g')
        .data(arcs)
        .enter()
        .append('text')
        .attr(
          'transform',
          // @ts-ignore
          (d: { data: DataItem }) => `translate(${labelArc.centroid(d)})`
        )
        .attr('text-anchor', 'middle')
        .attr('class', (d: any) =>
          mergeTailwindClasses(
            labels?.className,
            labels?.classNameMap && labels.classNameMap[d.data[nameKey]],
            `fill-current`
          )
        )
        .text((d: { data: DataItem }) =>
          labels.text ? labels.text(d.data) : d.data[nameKey]
        );
  }, [
    id,
    startAngle,
    endAngle,
    paddingAngle,
    margin,
    innerRadius,
    cornerRadius,
    onMouseLeave,
    onMouseMove,
    onMouseOver,
    labels,
    data,
    padding,
    drawing,
    valueKey,
    nameKey,
    classNameMap,
  ]);

  useEffect(() => {
    refreshChart();
  }, [data, refreshChart]);

  return (
    <svg
      data-testid={id}
      id={id}
      className={mergeTailwindClasses(defaultChartClassNames, className)}
    />
  );
};

export default PieChart;
