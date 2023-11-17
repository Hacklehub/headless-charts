/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';

import ColumnChartStacked from '.';
import data from './sample.json';

export default {
  title: 'Linear/ColumnChartStacked/Intro',
  component: ColumnChartStacked,
  tags: ['autodocs'],
} as Meta;

type Story = StoryObj<typeof ColumnChartStacked>;

export const Default: Story = {
  args: {
    data,
    id: 'column-chart-stack-default',
    x: { key: 'name' },
    y: [{ key: 'value1' }, { key: 'value2' }, { key: 'value3' }],
  },
};

export const Styled: Story = {
  args: {
    ...Default.args,
    id: 'column-chart-stack-styled',
    className: 'bg-gray-100 rounded',
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 5,
    },
    paddingBar: 0.1,
    margin: {
      top: 10,
      right: 40,
      bottom: 40,
      left: 60,
    },
    y: [
      { key: 'value1', className: 'text-purple-500' },
      { key: 'value2', className: 'text-purple-700' },
      { key: 'value3', className: 'text-purple-900' },
    ],
  },
};

export const WithDrawing: Story = {
  args: {
    ...Styled.args,
    drawing: {
      duration: 1000,
    },
  },
};
export const Waterfall: Story = {
  args: {
    ...Styled.args,
    id: 'column-chart-stack-waterfall',
    waterfall: true,
  },
};

export const WaterfallDrawing: Story = {
  args: {
    ...Waterfall.args,
    drawing: {
      duration: 1000,
    },
  },
};
