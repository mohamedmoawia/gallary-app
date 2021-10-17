import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TextContainer = props => {
  return (
    <View style={styles.textContainer}>
      <Text>{props.label}</Text>
      <Text style={{width: '80%', color: props.color ? props.color : 'white'}}>
        {props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    padding: 20,
  },
});

export default TextContainer;
