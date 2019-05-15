import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DisciplineIcon from './discipline_icon';
import sharedStyles from "../styles/shared_styles";

const ResultDetailHeader = ({ workout }) => {
  return(
    <View style={styles.container}>
      <DisciplineIcon
        disc={workout.discipline}
        iconStyle={{width: 20, tintColor: sharedStyles.COLOR_GREEN}}
      />
      <Text style={styles.title}>
        {workout.description}
      </Text>
    </View>
  )
};

export default ResultDetailHeader;

const styles= StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontFamily: sharedStyles.FONT_PRIMARY_MEDIUM,
    color: sharedStyles.COLOR_GREEN,
    paddingLeft: 5
  }
});
