import classNames from 'classnames';
import {
	Button,
	Card,
	Input,
	Select,
	encodeImageFileAsURL,
	getProfession,
} from 'components';
import SideBarLayout from 'layouts/SideBarLayout';
import Breadcrumbs from 'nextjs-breadcrumbs';
import { useState, useEffect } from 'react';
import styles from 'styles/pages/addDoctor.module.scss';
import pageStyles from 'styles/pages/page.module.scss';
import { useClinicsData } from 'components/useClinicsData';
import axios from 'axios';
import { ReactSVG } from 'react-svg';
import StuffModal from '../../../components/modals/StuffModal';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import Fuse from 'fuse.js';

export default function AddDoctor() {
	const [error, setError] = useState({
		isError: false,
		errorMessage: '',
	});

	const [uploadStaticPhoto, setUploadPhoto] = useState(``);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const router = useRouter();
	const clinicId = router.query.id ?? null;
	const branchId = router.query.branchId ?? null;

	const clinics = useClinicsData();

	const clinicData = clinics.isLoading
		? 'Loading'
		: clinics.isError
		? 'Error!'
		: clinics.data
		? clinics.data
		: [];
	const [searchValue, setSearchValue] = useState('');
	const [show, setShow] = useState(false);
	const [requestBody, setRequestBody] = useState({
		firstName: null,
		lastName: null,
		phone: null,
		email: null,
		professionId: null,
		personalId: null,
		gender: null,
		dateOfBirth: null,
		iban: null,
		aboutMe: null,
		clinicBranchIds: null,
		type: null,
		branch: null,
		pictureFile: null,
	});

	const [optionLists, setOptionLists] = useState({
		type: [],
		clinic: [],
		branch: [],
	});

	const [branchOption, setBranchOption] = useState([]);
	// const branchDetail = useQuery(['key', 'branchForClinic'], () => {
	// 	return getList(
	// 		`clinics/${requestBody?.clinicBranchIds || clinicId}/branches/`,
	// 		requestBody?.clinicBranchIds || clinicId
	// 	);
	// });

	const professions = useQuery(['key', 'professions'], () => {
		return getProfession();
	});

	async function refetchBranch(value) {
		try {
			const response = await fetch(
				`https://asclepius.pirveli.ge/asclepius/v1/api/clinics/${
					value || clinicId
				}/branches/`
			);
			const res = await response.json();
			setRequestBody((prev) => ({ ...prev, clinicBranchIds: value }));
			console.log('res', res);
			let branches = res?.filter(
				(
					(ids) =>
					({ id }) =>
						!ids.has(id) && ids.add(id)
				)(new Set())
			);
			setRequestBody((prev) => ({
				...prev,
				branch: null,
			}));
			setBranchOption(
				branches?.map((item) => {
					return {
						label: item.displayName,
						value: item.id,
					};
				})
			);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		clinicId ? refetchBranch(clinicId || requestBody.clinicBranchIds) : null;
	}, [clinicId, requestBody.clinicBranchIds]);

	useEffect(() => {
		clinics.refetch();
	}, [clinicId, clinics]);

	const makeListItems = (data) => {
		const list = data?.data?.map((item) => ({
			value: item.id,
			label: item.displayName,
		}));

		return list;
	};

	const requestNewProffesion = () => {
		return axios
			.post(
				`https://asclepius.pirveli.ge/asclepius/v1/api/professions`,
				{ name: searchValue },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then((response) => {
				requestFormData(response?.data.id);
			})
			.catch((error) =>
				setError((prev) => ({ ...prev, isError: true, errorMessage: error }))
			);
	};

	const requestFormData = (id) => {
		console.log('this request send');

		let formData = new FormData();
		formData.append('professionId', id);
		console.log('id', id);
		for (const [key, value] of Object.entries(requestBody)) {
			formData.append(key, value);
		}

		return axios
			.post(
				requestBody.type === 'FREELANCER'
					? '/asclepius/v1/api/doctors/freelancers'
					: `/asclepius/v1/api/clinics/${
							requestBody.clinicBranchIds || clinicId
					  }/doctors`,
				formData,
				{
					headers: {
						'Content-Type': `multipart/form-data`,
					},
				}
			)
			.then((response) => {
				router.push('/doctors');
			})
			.catch((error) =>
				setError((prev) => ({ ...prev, isError: true, errorMessage: error }))
			);
	};

	useEffect(() => {
		setOptionLists((prev) => ({
			...prev,
			type: [
				{ label: 'freelancer', value: 'FREELANCER' },
				{ label: 'Clinic doctor', value: 'CLINIC_DOCTOR' },
			],
			clinic: clinicData ? makeListItems(clinics) : [],
		}));
	}, [clinicId, requestBody.clinicBranchIds, clinicData]);

	const fuse = new Fuse(professions.isLoading ? [] : professions?.data, {
		includeScore: true,
		threshold: 0.4,
		keys: ['name'],
	});

	const result = fuse.search(searchValue);
	const searchResult = searchValue
		? result.map((result) => result.item)
		: professions?.data;

	return (
		<div className={pageStyles.container}>
			<div className={pageStyles.pageHeader}>
				<div className={pageStyles.pageHeaderLeft}>
					<h3>New doctor</h3>
				</div>
				<Breadcrumbs
					omitRootLabel={true}
					listClassName={pageStyles.breadcrumbs}
					replaceCharacterList={[{ from: '_', to: ' ' }]}
				/>
			</div>
			<div className={pageStyles.pageBody}>
				<Card cardTitle='General information'>
					<div className={styles.row}>
						<div className={styles.columnLeft}>
							<Input
								label='Name'
								onChange={(e) =>
									setRequestBody((prev) => ({ ...prev, firstName: e }))
								}
							/>
							<Input
								label='Surname'
								onChange={(e) =>
									setRequestBody((prev) => ({ ...prev, lastName: e }))
								}
							/>
							<div className={styles.row}>
								<Input
									label='Date of birth'
									type='date'
									className={styles.halfw}
									onChange={(value) =>
										setRequestBody((prev) => ({ ...prev, dateOfBirth: value }))
									}
									value={requestBody.dateOfBirth}
								/>
								<Select
									label='Gender'
									labelStyle='outside'
									className={styles.halfw}
									options={[
										{ label: 'Male', value: 'm' },
										{
											label: 'Female',
											value: 'f',
										},
									]}
									onChange={(value) => {
										setRequestBody((prev) => ({ ...prev, gender: value }));
									}}
									value={requestBody.gender}
								/>
							</div>
						</div>
						<div className={styles.columnRight}>
							<span className={styles.label}>
								photo
								{isModalOpen && (
									<StuffModal
										onClose={() => setIsModalOpen(false)}
										onAccept={() => setIsModalOpen(false)}
										onCancel={() => setIsModalOpen(false)}
									/>
								)}
								{uploadStaticPhoto ? (
									<ReactSVG
										src='/images/icons/table/delete.svg'
										className={styles.iconContainer}
										onClick={() => setUploadPhoto('')}
									/>
								) : null}
							</span>
							<img
								alt=''
								src={
									uploadStaticPhoto !== ''
										? uploadStaticPhoto
										: '/images/doctors/doctor.png'
								}
								className={styles.doctorImage}
							/>

							<input
								type='file'
								className={styles.upload}
								id='upload'
								onChange={(e) => {
									setRequestBody((prev) => ({
										...prev,
										pictureFile: e.target.files[0],
									}));
									encodeImageFileAsURL(e.target, setUploadPhoto);
								}}
							/>
							<label
								className={styles.upBtn}
								htmlFor='upload'
							>
								upload
							</label>
						</div>
					</div>
				</Card>
				<Card cardTitle='Contacts'>
					<div className={styles.row}>
						<div className={styles.columnLeft}>
							<Input
								label='E-mail'
								type='email'
								onChange={(e) =>
									setRequestBody((prev) => ({ ...prev, email: e }))
								}
							/>
							<Input
								type='number'
								label='Phone Number'
								onChange={(e) =>
									setRequestBody((prev) => ({ ...prev, phone: e }))
								}
							/>
						</div>
					</div>
				</Card>
				<Card cardTitle='Job information'>
					<div className={styles.row}>
						<div className={styles.smallColumnLeft}>
							{branchId || clinicId ? null : (
								<Select
									label='Type'
									labelStyle='outside'
									options={optionLists.type}
									onChange={(value) => {
										setRequestBody((prev) => ({
											...prev,
											type: value,
											iban: '',
										}));
									}}
									value={requestBody.type}
								/>
							)}
							{clinicId ? null : (
								<Select
									disabled={requestBody.type === 'FREELANCER' ? true : false}
									label='Clinic'
									labelStyle='outside'
									options={optionLists.clinic}
									value={requestBody.clinicBranchIds}
									onChange={(value) => refetchBranch(value)}
								/>
							)}
							<Input
								label='ID'
								type='text'
								maxLength={11}
								onChange={(value) =>
									setRequestBody((prev) => ({ ...prev, personalId: value }))
								}
							/>
						</div>
						<div className={classNames(styles.columnRight, styles.inputColumn)}>
							<div className={styles.dropdownContiner}>
								<span className={styles.label}>Job title</span>
								<input
									id='search-input'
									className={styles.input}
									type='text'
									value={searchValue}
									onChange={(e) => {
										searchValue.length <= 1 ? setShow(false) : setShow(true);
										setSearchValue(e.target.value);
									}}
								/>
								{show && (
									<>
										<div className={styles.dropdown}>
											{professions.isLoading
												? null
												: searchResult.map((item) => (
														<div
															key={item.id}
															className={styles.dropdownItem}
															onClick={() => {
																setSearchValue(item.name),
																	setRequestBody((prev) => ({
																		...prev,
																		professionId: item.id,
																	}));
																setShow(false);
															}}
														>
															<div className={styles.dropdownListItem}>
																{item.name}
															</div>
														</div>
												  ))}
										</div>
									</>
								)}
							</div>
							{branchId ? null : (
								<Select
									disabled={requestBody.type === 'FREELANCER' ? true : false}
									label='Branch'
									labelStyle='outside'
									options={branchOption}
									onChange={(value) => {
										setRequestBody((prev) => ({ ...prev, branch: value }));
									}}
									value={requestBody.branch}
								/>
							)}
							<Input
								disabled={requestBody.type === 'FREELANCER' ? false : true}
								label='IBAN'
								value={requestBody.iban}
								onChange={(value) => {
									setRequestBody((prev) => ({ ...prev, iban: value }));
								}}
							/>
						</div>
					</div>
					<Input
						label='About me'
						type='text'
						multiline
						className={styles.aboutMe}
						onChange={(e) =>
							setRequestBody((prev) => ({ ...prev, aboutMe: e }))
						}
					/>
				</Card>
				<div className={styles.buttons}>
					<Button
						label='Cancel'
						size='large'
						variant='outline'
					/>
					<Button
						label='Add'
						size='large'
						variant='fill'
						onClick={() =>
							requestBody?.personalId.length !== 11
								? alert('personal Id should be 11 charachters')
								: requestBody.professionId === null
								? requestNewProffesion()
								: requestFormData(requestBody.professionId)
						}
					/>
				</div>
			</div>
		</div>
	);
}

AddDoctor.getLayout = (page) => {
	return <SideBarLayout>{page}</SideBarLayout>;
};
