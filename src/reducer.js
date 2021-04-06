export function getInitialState() {
  const savedState = localStorage.getItem("data");

  if (!savedState) {
    return {
      isProfileOpen: false,
      users: [],
      currentUser: "",
      isLoading: true,
      apiUrl: "https://api.github.com/users",
      apiUrlNext: null,
      firstPageNumber: 1,
      currentPageIndex: 1,
    };
  }

  return JSON.parse(savedState);
}

export function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "open":
      newState = { ...state, currentUser: action.payload, isProfileOpen: true };
      break;
    case "close":
      newState = { ...state, isProfileOpen: false };
      break;
    case "getUsers":
      newState = {
        ...state,
        users: action.payload[0],
        apiUrlNext: action.payload[1],
        isLoading: false,
      };
      break;
    case "loadNextUsers":
      newState = {
        ...state,
        apiUrl: state.apiUrlNext,
        isLoading: true,
        firstPageNumber: state.firstPageNumber + 3,
      };
      break;
    case "loadFirstUsers":
      newState = {
        ...state,
        apiUrl: "https://api.github.com/users",
        isLoading: true,
        firstPageNumber: 1,
      };
      break;
    case "setCurrentPageIndex":
      newState = { ...state, currentPageIndex: action.payload };
      break;
    default:
      return state;
  }

  localStorage.setItem("data", JSON.stringify(newState));
  return newState;
}
