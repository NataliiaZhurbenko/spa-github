import { useContext, useEffect } from "react";
import Context from "../context";

const useGetUsers = () => {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    getUsers().then((data) => dispatch({ type: "getUsers", payload: data }));
  }, [state.apiUrl]);

  async function getUsers() {
    const response = await fetch(state.apiUrl);
    const users = await response.json();
    const link = getHeadersNextLink(response.headers.get("Link"));
    return [users, link];
  }
};

const getHeadersNextLink = (links) => {
  let apiUrlNext = null;
  links = links.split(",").map((v) => v.split(";").map((v) => v.trim()));

  links.forEach((v) => {
    if (v[1] === 'rel="next"') {
      apiUrlNext = v[0].slice(1, -1);
    }
  });

  return apiUrlNext;
};

export default useGetUsers;
