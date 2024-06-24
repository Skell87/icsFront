import axios from "axios";

// localhost url
const baseUrl = "http://127.0.0.1:8000";
// fly url
// const baseUrl = "https://ics-back.fly.dev";

// url switcher
// const baseUrl = import.meta.env.VITE_BASE_URL;
// console.log("base url", baseUrl);

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
}) => {
  console.log("auth", auth);
  console.log("data", {
    username,
    password,
    first_name: firstName,
    last_name: lastName,
    email,
  });
  return axios({
    method: "post",
    url: `${baseUrl}/register_user/`,
    data: {
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      email,
    },
  })
    .then((response) => {
      console.log("register user", response);
      return response;
    })
    .catch((error) => {
      if (error.response === 500) {
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
      throw error;
    });
};
// ===================================================================================
// warehouse creators:

export const registerWarehouse = ({ auth, name, divisions }) => {
  return axios({
    method: "post",
    url: `${baseUrl}/add_warehouse_section/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
      name: name,
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

export const registerSubWarehouse = ({ auth, name, sectionId }) => {
  return axios({
    method: "post",
    url: `${baseUrl}/add_warehouse_sub_section/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
      name: name,
      section: sectionId,
    },
  })
    .then((response) => {
      console.log("Subsection registered", response.data);
      return response;
    })
    .catch((error) => {
      console.log("error registering subsection", error);
      return error;
    });
};

export const registerSubSubWarehouse = ({ auth, name, subSectionId }) => {
  return axios({
    method: "post",
    url: `${baseUrl}/add_warehouse_sub_sub_section/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
      name: name,
      sub_section: subSectionId, // Ensure this matches the field expected by the Django model
    },
  })
    .then((response) => {
      console.log("SubSubsection registered", response.data);
      return response;
    })
    .catch((error) => {
      console.log("Error registering subsubsection", error);
      return error;
    });
};
// ================================================================================
// warehouse deletion:

export const deleteSection = ({ auth, sectionId }) => {
  return axios({
    method: "delete",
    url: `${baseUrl}/delete_warehouse_section/${sectionId}/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  })
    .then((response) => response)
    .catch((error) => {
      console.log("Error deleting section", error);
      return error;
    });
};

export const deleteSubSection = ({ auth, subSectionId }) => {
  return axios({
    method: "delete",
    url: `${baseUrl}/delete_warehouse_sub_section/${subSectionId}`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  })
    .then((response) => response)
    .catch((error) => {
      console.log("Error deleting sub section", error);
      return error;
    });
};

export const deleteSubSubSection = ({ auth, subSubSectionId }) => {
  console.log("subsubsubsub", subSubSectionId);
  return axios({
    method: "delete",
    url: `${baseUrl}/delete_warehouse_sub_sub_section/${subSubSectionId}`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  })
    .then((response) => response)
    .catch((error) => {
      console.log("error deleting sub sub section", error);
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
  console.log("subsubsection:", subsubsection);
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
      // sub_sub_section: { id: subsubsection },
      sub_sub_section: parseInt(subsubsection),
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

// =========================================================================

export const getInventoryItems = ({ auth }) => {
  return axios({
    method: "get",
    url: `${baseUrl}/inventory_detail_list/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  })
    .then((response) => {
      console.log("items recieved from back", response.data);

      return response.data;
    })
    .catch((error) => {
      console.log("error getting item data", error);
      throw error;
    });
};

export const deleteInventoryItem = ({ auth, itemId, quantityToDelete }) => {
  console.log("delete inventory item triggered");
  const data = {
    quantity_to_delete: quantityToDelete,
  };

  console.log("Data to send:", data);
  return axios({
    method: "delete",
    url: `${baseUrl}/delete_inventory_item/${itemId}/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
      quantity_to_delete: quantityToDelete,
    },
  });
};

export const updateInventoryItem = ({ auth, itemId, updates }) => {
  console.log("updateInventoryItem triggered with id", updates, itemId);

  return axios({
    method: "put",
    url: `${baseUrl}/update_inventory_item/${itemId}/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: updates,
  })
    .then((response) => {
      console.log("item updated", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("error updating item", error);
      throw error;
    });
};
// =========================================================================
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
  console.log("Sending section ID:", sectionId);
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
