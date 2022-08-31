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

const getFreelancer = async () => {
  const res = (await axios.get(`/asclepius/v1/api/doctors/freelancers`)).data;
  return res;
};

export const useFreeLancerDoctorData = () => {
  return useQuery(["key", "freelancerDoctors"], getFreelancer);
};

const getDoctor = async (id) => {
  if (!id) return null;
  const res = (
    await axios.get(
      `https://asclepius.pirveli.ge/asclepius/v1/api/doctors/freelancers/${id}`
    )
  ).data;
  return res;
};

export const useDoctorData = (id) => {
  return useQuery(["key", "doctor"], () => {
    return getDoctor(id);
  });
};
