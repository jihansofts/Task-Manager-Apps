import Navigation from "./src/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import Store from "./src/Redux/Store/Store";
export default function App() {
  return (
    <NavigationContainer>
      <Provider store={Store}>
        <Navigation />
      </Provider>
    </NavigationContainer>
  );
}
