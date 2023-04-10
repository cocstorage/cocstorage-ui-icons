import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Icon from '.';

export default {
  title: 'Components/Icon',
  component: Icon
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = function Template(args) {
  return <Icon {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  name: 'CommunityFilled',
  color: 'primary'
};
