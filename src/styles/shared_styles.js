import React from "react";
import { Dimensions } from 'react-native';

// Get Device Dimensions
const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

export default sharedStyles = {

  // GENERAL
  DEVICE_WIDTH: x,
  DEVICE_HEIGHT: y,

  // MEASUREMENTS
  DEFAULT_BORDER_RADIUS: 3,


  // LAYOUT
  LAYOUT_MAIN_STRETCH: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingBottom: 25,
    paddingTop: 20,
  },
  LAYOUT_MAIN_CENTER: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 25,
    paddingTop: 20,
  },
  LAYOUT_NEXT_BUTTON_CONTAINER: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },


  // COLORS
  COLOR_GREEN: "#BADA55",
  COLOR_PURPLE: "#6E5EAB",
  COLOR_DARK_BLUE: "#0B163B",
  COLOR_LIGHT_BLUE: "#6A7189",
  COLOR_LIGHT_GRAY: "#CCCCCC",
  COLOR_RED: "#A82F29",
  COLOR_DARK_GREEN: "#1CA721",
  COLOR_WHITE: "#FFFFFF",
  COLOR_MODAL_BG: 'rgba(11, 22, 59, 0.75)',


  // FONTS
  FONT_PRIMARY_REGULAR: "dosis-regular",
  FONT_PRIMARY_LIGHT: "dosis-light",
  FONT_PRIMARY_MEDIUM: "dosis-medium",
  FONT_PRIMARY_SEMIBOLD: "dosis-semiBold",

  // MESSAGES
  EMPTY_TEAM_MESSAGE: "There are no athletes currently entered for your team!",

  // TEMP FOR TESTING LAYOUTS
  TEMP_BORDER: {
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'dotted',
  }

}
