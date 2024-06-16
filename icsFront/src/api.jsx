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

export const registerUser = ({
  auth,
  username,
  password,
  firstName,
  lastName,
  email,
  isStaff,
}) => {
  console.log("auth", auth);
  console.log("data", {
    username,
    password,
    first_name: firstName,
    last_name: lastName,
    email,
    is_staff: isStaff,
  });
  return axios({
    method: "post",
    url: `${baseUrl}/register_user/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      email,
      is_staff: isStaff,
    },
  })
    .then((response) => {
      console.log("register user", response);
      return response;
    })
    .catch((error) => {
      if (error.response) {
        // Request was made and server responded with a status code that falls out of 2xx range
        console.log("ERROR DATA: ", error.response.data); // Logging error data
        console.log("ERROR STATUS: ", error.response.status); // Logging error status
        console.log("ERROR HEADERS: ", error.response.headers); // Logging error headers
        console.log("access token: ", auth.accessToken);
      } else if (error.request) {
        // Request was made but no response was received
        console.log("ERROR REQUEST: ", error.request); // Logging error request
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("ERROR MESSAGE: ", error.message); // Logging error message
      }
      console.log("ERROR CONFIG: ", error.config); // Logging error config
    });
};

export const registerWarehouse = ({ auth, name, divisions }) => {
  return axios({
    method: "post",
    url: `${baseUrl}/register_warehouse/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
      name: name,
      divisions: divisions,
    },
  })
    .then((response) => {
      console.log("registered warehouse", response);
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
};

// --------------------------------------------------------------------------------
export const addItem = ({
  auth,
  name,
  make,
  model,
  color,
  notes,
  quantity,
  subsubsection,
}) => {
  console.log(name, make, model, color, notes, quantity, subsubsection);
  return axios({
    method: "post",
    url: `${baseUrl}/inventory_detail_list/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
      inventory_item: {
        name: name || "_",
        make: make || "_",
        model: model || "_",
        color: color || "_",
        notes: notes || "_",
      },
      quantity: quantity || 0,
      sub_sub_section: subsubsection,
    },
  })
    .then((response) => {
      console.log("item added after axios post", response);
      return response.data;
    })
    .catch((error) => {
      console.log("error", error);
      throw error;
    });
};

export const getSection = ({ auth }) => {
  return axios({
    method: "get",
    url: `${baseUrl}/add_warehouse_section/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  })
    .then((response) => {
      console.log("section info", response.data);
      return response;
    })
    .catch((error) => {
      console.log("error getting section info", error);
      return { data: [] };
    });
};

export const getSubSections = ({ auth, sectionId }) => {
  return axios({
    method: "get",
    url: `${baseUrl}/add_warehouse_sub_section/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    params: {
      section_id: sectionId,
    },
  })
    .then((response) => {
      console.log("subSection info", response.data);
      return response;
    })
    .catch((error) => {
      console.log("error getting sub section info", error);
      return { data: [] };
    });
};

export const getSubSubSections = ({ auth, subSectionId }) => {
  return axios({
    method: "get",
    url: `${baseUrl}/add_warehouse_sub_sub_section/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    params: {
      sub_section_id: subSectionId,
    },
  })
    .then((response) => {
      console.log("sub sub section info", response.data);
      return response;
    })
    .catch((error) => {
      console.log("error getting sub sub section info", error);
      return { data: [] };
    });
};
