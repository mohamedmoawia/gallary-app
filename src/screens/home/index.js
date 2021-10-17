import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import axios from 'axios';

// CONSTANTS
const {width, height} = Dimensions.get('screen');
const IMAGE_SIZE = 80;
const SPACING = 10;

const Home = props => {
  //STATE
  const [gallary, setGallary] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  //REFS
  const bigGallaryRef = useRef();
  const smallGallaryRef = useRef();

  //METHODS
  const getGallaryData = () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: 'https://api.pexels.com/v1/search?query=woods&orientation=portrait&size=small&per_page=20',
      headers: {
        Authorization:
          '563492ad6f91700001000001ecb1ff27078248bab0181d7352c90ddd',
      },
    }).then(
      res => {
        console.log('GET DATA SUCCSS', res);
        setGallary(res.data.photos);
        setLoading(false);
      },
      err => {
        console.log('GET DATA FAILED', {...err});
        setLoading(false);
      },
    );
  };
  const scrollToActiveIndex = index => {
    setActiveIndex(index);
    bigGallaryRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    // check the middle of the active image if greater than the center of the screen
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      smallGallaryRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      smallGallaryRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
    console.log(index);
  };

  // HOOKS
  useEffect(() => {
    getGallaryData();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.screen,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <ActivityIndicator color={'white'} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        ref={bigGallaryRef}
        data={gallary}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={evt => {
          scrollToActiveIndex(
            Math.ceil(evt.nativeEvent.contentOffset.x / width),
          );
        }}
        renderItem={({item}) => {
          return (
            <View style={{width, height, position: 'relative'}}>
              <View
                style={{
                  position: 'absolute',
                  top: 50,
                  backgroundColor: 'white',
                  zIndex: 5,
                  right: 20,
                  opacity: 0.7,
                  padding: 5,
                  borderRadius: 5,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('image-details', {
                      imageDetails: item,
                    });
                    console.log(item);
                  }}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    Details
                  </Text>
                </TouchableOpacity>
              </View>
              <Image
                source={{uri: item.src.portrait}}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
          );
        }}
      />
      <FlatList
        ref={smallGallaryRef}
        data={gallary}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{position: 'absolute', bottom: 40}}
        contentContainerStyle={{paddingHorizontal: SPACING}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                scrollToActiveIndex(index);
              }}
              activeOpacity={0.5}>
              <Image
                source={{uri: item.src.portrait}}
                style={[
                  styles.smallImage,
                  {
                    borderColor: activeIndex === index ? '#fff' : 'transparent',
                  },
                ]}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
  },
  smallImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
    marginRight: SPACING,
    borderWidth: 2,
  },
});

export default Home;
