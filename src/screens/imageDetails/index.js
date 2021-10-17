import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TextContainer from './components/textContainer';

const ImageDetails = props => {
  const imageDetails = props.route.params?.imageDetails;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Image style={styles.image} source={{uri: imageDetails.src.portrait}} />
      </View>
      <View style={styles.body}>
        <TextContainer
          label="Description: "
          text="Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text"
        />
        <TextContainer
          label="avg_color: "
          text={imageDetails.avg_color}
          color={imageDetails.avg_color}
        />
        <TextContainer
          label="photographer: "
          text={imageDetails.photographer}
        />
        <TextContainer
          label="size: "
          text={`${imageDetails.width} * ${imageDetails.height}`}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    backgroundColor: 'black',
    flex: 0.33,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  body: {
    flex: 0.33,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
  },
});
export default ImageDetails;
