import RiverCampStories from '../RiverCampScreens/RiverCampStories';
import RiverCampRandomizer from '../RiverCampScreens/RiverCampRandomizer';
import RiverCampSaved from '../RiverCampScreens/RiverCampSaved';
import RiverCampFearmetr from '../RiverCampScreens/RiverCampFearmetr';
import RiverCampSettings from '../RiverCampScreens/RiverCampSettings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text } from 'react-native';

const Tab = createBottomTabNavigator();

const RiverCampTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.rivercamptabsnav,
        tabBarActiveTintColor: '#FFF',
        tabBarInactiveTintColor: '#696969',
        tabBarItemStyle: {
          flexDirection: 'column',
        },
        tabBarLabelPosition: 'below-icon',
      }}
    >
      <Tab.Screen
        name="RiverCampStories"
        component={RiverCampStories}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/rivercamstor.png')}
              style={{ tintColor: color }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.rivercamplbl,
                { color: focused ? '#FFF' : '#696969' }, // 👈 label color
              ]}
            >
              Stories
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="RiverCampRandomizer"
        component={RiverCampRandomizer}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/rivercamrand.png')}
              style={{ tintColor: color }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.rivercamplbl,
                { color: focused ? '#fff' : '#696969' },
              ]}
            >
              Random
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="RiverCampFearmetr"
        component={RiverCampFearmetr}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/rivercampfear.png')}
              style={{ tintColor: color }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.rivercamplbl,
                { color: focused ? '#fff' : '#696969' },
              ]}
            >
              Fearmeater
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="RiverCampSaved"
        component={RiverCampSaved}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/rivercampsav.png')}
              style={{ tintColor: color }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.rivercamplbl,
                { color: focused ? '#fff' : '#696969' },
              ]}
            >
              Saved
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="RiverCampSettings"
        component={RiverCampSettings}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/rivercamsett.png')}
              style={{ tintColor: color }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.rivercamplbl,
                { color: focused ? '#fff' : '#696969' },
              ]}
            >
              Settings
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  rivercamptabsnav: {
    backgroundColor: '#1A1A1ACC',
    elevation: 1,
    borderWidth: 1,
    borderTopWidth: 1,
    borderColor: '#C49D30',
    paddingTop: 2,
    paddingBottom: 8,
    justifyContent: 'center',
    position: 'absolute',
    height: 55,
    paddingHorizontal: 5,
    marginHorizontal: 40,
    borderRadius: 10,
    bottom: 35,
  },
  rivercamplbl: {
    fontSize: 7,
  },
});

export default RiverCampTabNav;
