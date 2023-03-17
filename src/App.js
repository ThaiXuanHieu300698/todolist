import "./App.css";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import "bootstrap/dist/css/bootstrap.css";
import Router from "./app/Router";
import { BrowserRouter } from "react-router-dom";
import { history } from "./app/utils/history";
import "./app/components/FontawesomeIcons/FontawesomeIcons"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router history={history} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
