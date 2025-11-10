import { createStackNavigator } from '@react-navigation/stack';
import RiverCampArticleDetails from '../RiverCampScreens/RiverCampArticleDetails';
import RiverCampOnboarding from '../RiverCampScreens/RiverCampOnboarding';
import RiverCampTabNav from './RiverCampTabNav';

const Stack = createStackNavigator();

const RiverCampStackNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="RiverCampOnboarding"
        component={RiverCampOnboarding}
      />
      <Stack.Screen name="RiverCampTabNav" component={RiverCampTabNav} />
      <Stack.Screen
        name="RiverCampArticleDetails"
        component={RiverCampArticleDetails}
      />
    </Stack.Navigator>
  );
};

export default RiverCampStackNav;
