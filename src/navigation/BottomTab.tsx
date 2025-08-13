/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {moderateScale, scale} from 'react-native-size-matters';
import FontFamily from '@assets/Fonts/FontFamily';
import Dashboard from '@views/Dashboard';
import SeriesScreen from '@views/SeriesScreen';
import {useTheme} from '@theme/themeContext';
import CustomVectorIcons from '@components/CustomVectorIcons';
import MatchesTab from '@views/MatchesTab';
import News from '@views/News';
import MenuScreen from '@views/MenuScreen';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({
  focused,
  label,
  iconName,
  iconSet,
}: {
  focused: boolean;
  label: string;
  iconName: string;
  iconSet: string;
}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <View
      style={
        focused ? styles.activeTabBackground : styles.inactiveTabBackground
      }>
      <CustomVectorIcons
        name={iconName}
        size={moderateScale(20)}
        color={focused ? theme.themeColor : theme.gray}
        iconSet={iconSet}
      />
      <Text
        style={[
          styles.tabLabel,
          {color: focused ? theme.themeColor : theme.gray},
        ]}>
        {label}
      </Text>
    </View>
  );
};

const BottomTab = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,

        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#999',
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: {
          justifyContent: 'center',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              focused={focused}
              label="Shorts"
              iconName="video-collection"
              iconSet="MaterialIcons"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Series"
        component={SeriesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              focused={focused}
              label="Series"
              iconName="trophy"
              iconSet="FontAwesome5"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesTab}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              focused={focused}
              label="Matches"
              iconName="cricket"
              iconSet="MaterialCommunityIcons"
            />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              focused={focused}
              label="News"
              iconName="newspaper"
              iconSet="Ionicons"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              focused={focused}
              label="Menu"
              iconName="menu"
              iconSet="SimpleLineIcons"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabBar: {
      backgroundColor: theme.boxBackground,
      borderTopWidth: 0,
      alignItems: 'center',
      justifyContent: 'center',
      height: Platform.OS === 'android' ? 65 : 75,
      paddingTop: moderateScale(15),
    },

    activeTabBackground: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 80,
    },
    inactiveTabBackground: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 80,
    },
    tabLabel: {
      fontSize: scale(10),
      fontFamily: FontFamily.UrbanistSemiBold,
      marginTop: moderateScale(6),
    },
  });

export default BottomTab;
