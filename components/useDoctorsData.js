import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getDoctors = async (id) => {
  if (!id) return null;
  const res = (await axios.get(`/asclepius/v1/api/clinics/${id}/doctors`)).data;
  return res;
};

export const useDoctorsData = (id) => {
  return useQuery(["key", "doctors"], () => {
    return getDoctors(id);
  });
};
