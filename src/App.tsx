import { BrowserRouter } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import { store } from "./store";
import AppPre from "./App-pre";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="oneWorld">
          <AppPre />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

