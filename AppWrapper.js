import App from "./App.js";
import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/lib/integration/react";

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default registerRootComponent(AppWrapper);
