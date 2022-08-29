import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getList = async (endpoint) => {
    const res = (
      await axios.get(
        `https://asclepius.pirveli.ge/asclepius/v1/api/${endpoint}`
      )
    ).data;

    return res;
  };
  
export const useGetData = (endpoint) => {
    return useQuery(["key", "lists"], getList(endpoint));
};