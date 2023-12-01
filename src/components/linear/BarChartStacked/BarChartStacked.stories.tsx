import BarChartStacked from '.';
import { Meta } from '@storybook/react';
import data from './sample.json';

/**
 * Stacked bar charts are used to compare values across categories by using horizontal bars, with some grouping. Stacked bar charts additionally show proportions within categories.
 *
 *
 * */

const meta: Meta<typeof BarChartStacked> = {
  title: 'Linear/BarChartStacked/Intro',
  component: BarChartStacked,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    data,
    id: 'bar-chart-stacked-default',
    x: [
      {
        key: 'reading',
      },
      { key: 'value' },
    ],
    y: { key: 'name' },
  },
};

export const Styled = {
  args: {
    ...Default.args,
    id: 'bar-chart-stacked-styled',
    className: 'bg-gray-100 rounded',
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 5,
      bar: 0.1,
    },
    margin: {
      top: 0,
      right: 40,
      bottom: 40,
      left: 60,
    },
    x: [
      {
        key: 'reading',
        className: 'fill-purple-700',
      },
      { key: 'value', className: 'fill-purple-400' },
    ],
    y: { key: 'name', className: 'text-red-500', padding: 10 },
  },
};

export const WithDrawing = {
  args: {
    ...Styled.args,
    id: 'bar-chart-stacked-drawing',
    drawing: {
      duration: 1000,
    },
  },
};

export const WithDrawingDelay = {
  args: {
    ...Styled.args,
    id: 'bar-chart-stacked-drawing-delay',
    drawing: {
      duration: 1000,
      delay: 100,
    },
  },
};
