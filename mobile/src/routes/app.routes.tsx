import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import New from "../screens/New";
import Pools from "../screens/Pools";
import { PlusCircle, SoccerBall } from "phosphor-react-native";
import { useTheme } from "native-base";
import { Platform } from "react-native";
import Find from "../screens/Find";
import Details from "../screens/Details";

const { Navigator, Screen } = createBottomTabNavigator();

const AppRoutes = () => {
  const { colors, sizes } = useTheme();

  const icoSize = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "beside-icon",
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: "absolute",
          height: sizes[22],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
        tabBarItemStyle: {
          position: "relative",
          top: Platform.OS === "android" ? -10 : 0,
        },
      }}
    >
      <Screen
        name="new"
        component={New}
        options={{
          tabBarIcon: ({ color }) => (
            <PlusCircle color={color} size={icoSize} />
          ),
          tabBarLabel: "Novo Bolao",
        }}
      />
      <Screen
        name="pools"
        component={Pools}
        options={{
          tabBarIcon: ({ color }) => (
            <SoccerBall color={color} size={icoSize} />
          ),
          tabBarLabel: "Meus Boloes",
        }}
      />
      <Screen
        name="find"
        component={Find}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Screen
        name="details"
        component={Details}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
};

export default AppRoutes;
