/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  useWindowDimensions,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const CustomLoader = ({visible = false}) => {
  const {width, height} = useWindowDimensions();
  const height2 = height + 100;
  return (
    visible && (
      <View style={[style.container, {height2, width}]}>
        <View
          style={{
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <LoaderKit style={{ width: 50, height: 50, alignSelf: 'center' }} name={'BallSpinFadeLoader'} color={COLORS.themeColor} /> */}
          <ActivityIndicator
            style={{width: 50, height: 50}}
            size={'large'}
            color={'#FFF'}
          />
        </View>
      </View>
    )
  );
};

const style = StyleSheet.create({
  loader: {
    height: 100,
    backgroundColor: 'transparent',
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  container: {
    top: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 1050,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
  },
});

export default CustomLoader;
