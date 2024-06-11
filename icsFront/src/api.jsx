import axios from "axios";

const baseUrl = "http://127.0.0.1:8000";

export const getToken = ({ username, password }) => {
  return axios
    .post(`${baseUrl}/token/`, {
      username: username,
      password: password,
    })
    .then((response) => {
      console.log("RESPONSE: ", response);
      return response;
    })
    .catch((error) => {
      console.log("error getting response", error);
      return error;
    });
};
