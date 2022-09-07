import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const getDoctors = async () => {
	const res = (
		await axios.get(`/asclepius/v1/api/clinics/doctors?page=1&size=5`)
	).data;
	return res;
};

export const getFreelancer = async () => {
	const res = (
		await axios.get(`/asclepius/v1/api/doctors/freelancers?page=1&size=5`)
	).data;
	return res;
};

export const getFreelancerDoctor = async (id) => {
	if (!id) return null;
	const res = (
		await axios.get(
			`https://asclepius.pirveli.ge/asclepius/v1/api/doctors/freelancers/${id}`
		)
	).data;
	return res;
};

export const getFreeLancerEdu = async (id) => {
	if (!id) return null;
	const res = (
		await axios.get(
			`https://asclepius.pirveli.ge/asclepius/v1/api/doctors/freelancers/${id}/educations`
		)
	).data;
	return res;
};
