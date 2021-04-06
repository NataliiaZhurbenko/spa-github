import { useReducer } from "react";
import UsersList from "./components/UsersList";
import UserProfile from "./components/UserProfile";
import { reducer, getInitialState } from "./reducer";
import Context from "./context";

function App() {
  const [state, dispatch] = useReducer(reducer, getInitialState(), undefined);
  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className="App">
        <UsersList />
        <UserProfile />
      </div>
    </Context.Provider>
  );
}

export default App;
