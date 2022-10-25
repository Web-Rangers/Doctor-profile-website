import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const getDoctor = async (id) => {
    if (!id) return null;
    const res = (
        await axios.get(
            `/asclepius/v1/api/clinics/doctors/${id}`
        )
    ).data;
    return res;
};

export const getList = async (endpoint, id) => {
    if (!id) return null;
    const res = (
        await axios.get(
            `/asclepius/v1/api/${endpoint}`
        )
    ).data;
    
    return res;
};

export const getDoctorsServices = async () => {
	const res = (
		await axios.get(
			`/asclepius/v1/api/clinics/doctors/contract-type-to-services`
		)
	).data;

	return res;
};

export const getFreeLancerServices = async () => {
    const res = (
        await axios.get(
            `/asclepius/v1/api/doctors/freelancers/contract-type-to-services`
        )
    ).data;
    return res;
};



export const getDoctors = async () => {
    const res = (
        await axios.get(
            `/asclepius/v1/api/clinics/doctors?page=0&size=5`
        )
    ).data;
    return res;
};
export const getDoctorCertificate = async (id) => {
    if (!id) return null;
    const res = (
        await axios.get(
            `/asclepius/v1/api/doctors/${id}/educations-certificates`
        )
    ).data;
    return res;
};
export const getFreelancer = async () => {
    const res = (
        await axios.get(`/asclepius/v1/api/doctors/freelancers?page=0&size=5`)
    ).data;
    return res;
};
export const getFreelancerDoctor = async (id) => {
    if (!id) return null;
    const res = (
        await axios.get(
            `/asclepius/v1/api/doctors/freelancers/${id}`
        )
    ).data;
    return res;
};
export const getFreeLancerEdu = async (id) => {
    if (!id) return null;
    const res = (
        await axios.get(
            `/asclepius/v1/api/doctors/educations/${id}`
        )
    ).data;
    return res;
};
export const getFreeLancerCertificate = async (id) => {
    if (!id) return null;
    const res = (
        await axios.get(
            `/asclepius/v1/api/doctors/${id}/certificates`
        )
    ).data;
    return res;
};
export const getFreeLancerEducations = async (id) => {
    if (!id) return null;
    const res = (
        await axios.get(
            `/asclepius/v1/api/doctors/${id}/educations`
        )
    ).data;
    return res;
};
export const getProfession = async () => {
    const res = (
        await axios.get(`/asclepius/v1/api/professions`)
    ).data;
    return res;
};
export const deactivateFreLancerDoctor = async (id) => {
    const res = (
        await axios.get(
            `/asclepius/v1/api/doctors/freelancers/${id}/deactivate`
        )
    ).data;
    return res;
};
export const activateFreLancerDoctor = async (id) => {
    const res = (
        await axios.get(
            `/asclepius/v1/api/doctors/freelancers/${id}/activate`
        )
    ).data;
    return res;
};
export const deactivateDoctor = async (id, clinicId) => {
    const res = (
        await axios.get(
            `/asclepius/v1/api/clinics/${clinicId}/doctors/${id}/deactivate`
        )
    ).data;
    return res;
};
export const activateDoctor = async (id, clinicId) => {
    const res = (
        await axios.get(
            `/asclepius/v1/api/clinics/${clinicId}/doctors/${id}/activate`
        )
    ).data;
    return res;
};