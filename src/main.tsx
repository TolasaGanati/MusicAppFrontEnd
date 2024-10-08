import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/configureStore"; 
import App from "./app/App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
