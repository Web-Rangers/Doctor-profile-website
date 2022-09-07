import { Button, Input, Modal, Card, DatePicker } from 'components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactSVG } from 'react-svg';
import { useRouter } from 'next/router';
import styles from 'styles/components/Modals/AddDoctorEducation.module.scss';
import { request } from 'https';

interface CertificateData {
	school?: string;
	degree?: string;
	fieldOfStudy?: string;
	startDate?: string;
	endDate?: string;
	pictureFile?: any;
}

interface CertificateModalProps {
	onSave?: (newData: CertificateData) => void;
	data: CertificateData;
	onClose?: () => void;
	refetch?: () => void;
}

const MAX_COUNT = 5;
export default function AddDoctorCertificate({
	onClose,
	data,
	refetch,
}: CertificateModalProps) {
	const router = useRouter();
	const id = router.query.id ?? null;
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [fileLimit, setFileLimit] = useState(false);

	const [requestBody, setRequestBody] = useState({
		issuer: null,
		title: null,
		credentialId: null,
		issueDate: null,
		credentialInfo: null,
		expirationDate: null,
		doctorId: 478,
	});

	const handleUploadFiles = (files) => {
		const uploaded = [...uploadedFiles];
		let limitExceeded = false;
		files.some((file) => {
			if (uploaded.findIndex((f) => f.name === file.name) === -1) {
				uploaded.push(file);
				if (uploaded.length === MAX_COUNT) setFileLimit(true);
				if (uploaded.length > MAX_COUNT) {
					alert(`You can only add a maximum of ${MAX_COUNT} files`);
					setFileLimit(false);
					limitExceeded = true;
					return true;
				}
			}
		});
		if (!limitExceeded) setUploadedFiles(uploaded);
	};

	const handleFileEvent = (e) => {
		const chosenFiles = Array.prototype.slice.call(e.target.files);
		handleUploadFiles(chosenFiles);
	};

	const handleDeleteFile = (index) => {
		setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
	};

	const uploadFile = async () => {
		let formData = new FormData();

		for (var i = 0; i < uploadedFiles.length; i++) {
			formData.append('pictureFile', uploadedFiles[i]);
		}
		console.log('data', formData);
		return axios
			.post(
				`https://asclepius.pirveli.ge/asclepius/v1/api/gallery/doctor/${id}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			.then((response) => {
				console.log('this is response hbfsjdbc', response);
				refetch();
			})
			.catch((error) => {
				if (error.response) console.log(error.response);
			});
	};

	uploadFile();

	console.log('uploadFile', uploadedFiles);

	const requestFormData = async () => {
		return axios
			.post(
				`https://asclepius.pirveli.ge/asclepius/v1/api/doctors/{doctorId}/certificates?doctorId=${id}`,
				requestBody,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then((response) => {
				console.log('this is response res', response);
				// add fileid here
				refetch();
			})
			.catch((error) => {
				if (error.response) console.log(error.response);
			});
	};

	// console.log("file", uploadedFiles);

	return (
		<Modal onBackClick={onClose}>
			<Card
				cardTitle='Certificates'
				className={styles.card}
			>
				<div className={styles.cardBody}>
					<div className={styles.editRow}>
						<Input
							type='text'
							label='Name'
							placeholder='Enter school...'
							onChange={(e) =>
								setRequestBody((prev) => ({ ...prev, title: e }))
							}
						></Input>
						<Input
							type='text'
							label='Issuing organization'
							placeholder='Enter degree...'
							onChange={(e) =>
								setRequestBody((prev) => ({ ...prev, issuer: e }))
							}
						></Input>
					</div>
					<div className={styles.editRow}>
						<Input
							type='text'
							label='Credential ID'
							placeholder='Enter school...'
							onChange={(e) =>
								setRequestBody((prev) => ({ ...prev, credentialId: e }))
							}
						></Input>
						<div className={styles.editRow}>
							<DatePicker
								label='Issue date'
								mode='single'
								placeholder='01.01.2000'
								onChange={(e) =>
									setRequestBody((prev) => ({ ...prev, issueDate: e }))
								}
							/>
							<DatePicker
								label='End date'
								mode='single'
								placeholder='01.01.2000'
								onChange={(e) =>
									setRequestBody((prev) => ({ ...prev, expirationDate: e }))
								}
							/>
						</div>
					</div>
					<div className={styles.editRow}>
						<Input
							type='text'
							label='Credential URL'
							placeholder='Enter credential url...'
							onChange={(e) =>
								setRequestBody((prev) => ({ ...prev, credentialInfo: e }))
							}
						></Input>
					</div>
					<div className={styles.fileInput}>
						<ReactSVG
							src='/images/signUp/cloud-upload.svg'
							className={styles.iconContainer}
						/>
						<span>Drag and drop your files here</span>
						<input
							id='fileUpload'
							type='file'
							multiple
							accept='application/pdf, image/png'
							onChange={handleFileEvent}
							disabled={fileLimit}
						/>

						<label htmlFor='fileUpload'>
							<a className={`btn btn-primary ${!fileLimit ? '' : 'disabled'} `}>
								Upload Files
							</a>
						</label>
					</div>
					<div className={styles.filesContainer}>
						{uploadedFiles ? (
							<>
								{uploadedFiles.map((file, index) => {
									return (
										<div
											className={styles.file}
											key={index}
										>
											<div className={styles.info}>
												<div className={styles.name}>{file.name}</div>
												<div className={styles.size}>{file.size}</div>
											</div>
											<div className={styles.whiteSpace} />
											<div onClick={() => handleDeleteFile(index)}>
												<ReactSVG
													src='/images/signUp/x.svg'
													className={styles.iconContainer}
												/>
											</div>
										</div>
									);
								})}
							</>
						) : null}
					</div>
					<div className={styles.actions}>
						<Button
							className={styles.add}
							variant='text'
							label='+Add one more certificate'
							size='large'
						/>
						<div className={styles.modalFooter}>
							<Button
								label='Cancel'
								size='large'
								variant='outline'
								onClick={onClose}
							/>
							<Button
								label='Save'
								size='large'
								variant='fill'
								onClick={() => requestFormData()}
							/>
						</div>
					</div>
				</div>
			</Card>
		</Modal>
	);
}
