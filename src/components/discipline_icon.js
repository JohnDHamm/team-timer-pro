import React from 'react';
import { Image } from 'react-native';

import IMAGES from "../../assets/images";

const DisciplineIcon = ({ disc, iconStyle }) => {
  switch (disc) {
    case 'swim':
      return(
        <Image
          source={IMAGES.SWIM_ICON_SM}
          style={{ ...iconStyle, height: iconStyle.width / IMAGES.SWIM_ICON_ASPECT }}
        />
      );
    case 'bike':
      return(
        <Image
          source={IMAGES.BIKE_ICON_SM}
          style={{ ...iconStyle, height: iconStyle.width / IMAGES.BIKE_ICON_ASPECT }}
        />
      );
    case 'run':
      return(
        <Image
          source={IMAGES.RUN_ICON_SM}
          style={{ ...iconStyle, height: iconStyle.width / IMAGES.RUN_ICON_ASPECT }}
        />
      );
    default:
      return null
  }
};

export default DisciplineIcon;
