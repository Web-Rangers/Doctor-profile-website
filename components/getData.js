import axios from "axios";

export const getList = async (endpoint, id) => {
    if (!id) return null;
    const res = (
      await axios.get(
        `/asclepius/v1/api/${endpoint}`
      )
    ).data;
    
    return res;
};