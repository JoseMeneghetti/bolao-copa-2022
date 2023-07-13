import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./app.routes";
import { SignIn } from "../screens/SignIn";
import useAuth from "../hooks/useAuth";
import { Box } from "native-base";

const Routes = () => {
  const { user } = useAuth();
  return (
    <Box flex={1} bgColor="gray.900">
      <NavigationContainer>
        {!user.name ? <SignIn /> : <AppRoutes />}
      </NavigationContainer>
    </Box>
  );
};
export default Routes;
