import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getList = async () => {
  const res = (
    await axios.get(
      `/asclepius/v1/api/clinics/search?name=`
    )
  ).data;

  return res;
};

export const useClinicsData = () => {
  return useQuery(["key", "lists"], getList);
};

const getClinic = async (id) => {
  if (!id) return null;
  const res = (await axios.get(`/asclepius/v1/api/clinics/${id}`)).data;
  return res;
};

export const useClinicData = (id) => {
  return useQuery(["key", "clinic"], () => {
    return getClinic(id);
  });
};
