import { getBrandColorCode } from '@cocstorage/ui';
import styled, { CSSObject } from '@emotion/styled';

import type { BellOutlined } from '../../assets/icons';

import { IconProps } from './index';

export const StyledIcon = (icon: typeof BellOutlined) => styled(icon)<Pick<IconProps, 'color'>>`
  color: ${({
    theme: {
      mode,
      palette: { text }
    }
  }) => text[mode].main};

  ${({ theme, color }): CSSObject => {
    const brandColorCode = getBrandColorCode(theme, color);

    if (brandColorCode) {
      return {
        color: `${brandColorCode} !important`
      };
    }

    return {
      color: `${color} !important`
    };
  }}
`;
