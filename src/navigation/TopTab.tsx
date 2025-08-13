/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Text, Pressable} from 'react-native';

import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../styles/Colors';

const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigator({
  tabs = [],
  useCustomTabBar = false, // 🔄 New toggle prop
  customStyles = {},
  navigatorProps = {},
}) {
  const {
    tabBarContainerStyle = {},
    tabItemStyle = {},
    activeTabStyle = {},
    inactiveTabStyle = {},
    activeTextStyle = {},
    inactiveTextStyle = {},
    tabBarStyle = {},
    horizontalMargin = {},
    tabBarLabelStyle = {},
    tabBarIndicatorStyle = {},
    tabBarActiveTintColor,
    tabBarInactiveTintColor,
    tabBarPressColor,
  } = customStyles;

  const defaultScreenOptions = {
    tabBarScrollEnabled: true,
    tabBarItemStyle: {
      width: 'auto',
      ...horizontalMargin,
    },

    tabBarStyle: {
      alignSelf: 'center',
      backgroundColor: 'transparent',
      elevation: 0,

      ...tabBarStyle,
    },
    tabBarLabelStyle: {
      fontSize: moderateScale(10),

      ...tabBarLabelStyle,
    },
    tabBarIndicatorStyle: {
      backgroundColor: themeColors.themeColor,
      height: 3,
      ...tabBarIndicatorStyle,
    },
    tabBarActiveTintColor: tabBarActiveTintColor || themeColors.themeColor,
    tabBarInactiveTintColor: tabBarInactiveTintColor || themeColors.grayLight,
    tabBarPressColor: tabBarPressColor || 'transparent',
  };

  return (
    <Tab.Navigator
      {...navigatorProps}
      {...(!useCustomTabBar && {screenOptions: defaultScreenOptions})}
      tabBar={
        useCustomTabBar
          ? ({state, descriptors, navigation}) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  marginVertical: 10,
                  padding: moderateScale(5),
                  borderRadius: 10,
                  width: '100%',
                  alignSelf: 'center',

                  ...tabBarContainerStyle,
                }}>
                {state.routes.map((route, index) => {
                  const {options} = descriptors[route.key];
                  const label =
                    options.tabBarLabel !== undefined
                      ? options.tabBarLabel
                      : options.title !== undefined
                      ? options.title
                      : route.name;

                  const isFocused = state.index === index;

                  const onPress = () => {
                    const event = navigation.emit({
                      type: 'tabPress',
                      target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                      navigation.navigate(route.name);
                    }
                  };

                  return (
                    <Pressable
                      key={index}
                      onPress={onPress}
                      style={{
                        flex: 1,
                        paddingVertical: moderateScale(10),

                        marginHorizontal: 4,
                        borderRadius: 20,
                        alignItems: 'center',
                        backgroundColor: isFocused
                          ? activeTabStyle?.backgroundColor ||
                            themeColors.themeColor
                          : inactiveTabStyle?.backgroundColor ||
                            themeColors.boxBackground,
                        ...tabItemStyle,
                        ...(isFocused ? activeTabStyle : inactiveTabStyle),
                      }}>
                      <Text
                        style={{
                          fontSize: moderateScale(10),

                          color: isFocused
                            ? themeColors.white
                            : themeColors.grayLight,
                          ...(!isFocused ? inactiveTextStyle : activeTextStyle),
                        }}>
                        {label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )
          : undefined
      }>
      {/* {tabs.map(({name, component}, index) => (
        <Tab.Screen key={index} name={name} component={component} />
      ))} */}

      {tabs.map(({name, component, extraProps = {}}, index) => (
        <Tab.Screen
          key={index}
          name={name}
          children={props =>
            React.createElement(component, {
              ...props,
              ...extraProps, // 👈 Only pass extraProps if provided
            })
          }
        />
      ))}
    </Tab.Navigator>
  );
}
