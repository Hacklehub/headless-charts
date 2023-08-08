/* TODO: update import to your tailwind styles file. If you're using Angular, inject this through your angular.json config instead */
import '../src/index.css';
import './styles.css';

import type { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-styling';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Distribution',
          [
            'ScatterPlot',
            'PieChart',
            ['Intro', 'Tooltips', 'Donuts', 'SemiCircle'],
          ],
          'Linear',
        ],
      },
    },
  },

  decorators: [
    // Adds theme switching support.
    // NOTE: requires setting "darkMode" to "class" in your tailwind config
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
