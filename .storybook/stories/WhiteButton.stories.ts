import WhiteButton from '../../src/components/WhiteButton';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof WhiteButton> = {
  title: 'WhiteButton',
  component: WhiteButton,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  args: {
    children: '클릭하세요',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const AnotherExample: Story = {
  args: {
    children: '다른 예시',
  },
};
