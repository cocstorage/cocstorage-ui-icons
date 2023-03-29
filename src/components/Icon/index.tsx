import { SVGProps } from 'react';

import * as SvgIcons from '../../assets/icons';
import { BrandColor, Color, GenericComponentProps } from '@cocstorage/ui';
import { StyledIcon } from './Icon.styles';

export interface IconProps extends GenericComponentProps<SVGProps<SVGElement>> {
  name: keyof typeof SvgIcons;
  color?: BrandColor | Color;
}

function Icon({ name, viewBox = '0 0 24 24', color, customStyle, ...props }: IconProps) {
  const SvgIcon = SvgIcons[name];
  const StyledSvgIcon = StyledIcon(SvgIcon);

  const splitNames = name.split('_');
  const hasSpecifyViewBox = splitNames.length === 3;
  const newViewBox = `0 0 ${splitNames[1]} ${splitNames[2]}`;

  return (
    <StyledSvgIcon
      name={name}
      color={color}
      viewBox={hasSpecifyViewBox ? newViewBox : viewBox}
      {...props}
      css={customStyle}
    />
  );
}

export default Icon;
