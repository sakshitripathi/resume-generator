import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageLoad from "./PageLoad";
//
const Main = ({ setResult }) => {
	const [userName, setuserName] = useState("");
	const [presentRole, setpresentRole] = useState("");
	const [tenure, settenure] = useState(1);
	const [technologies, settechnologies] = useState("");
	const [passportImage, setPassportImage] = useState(null);
	const [companies, setcompanies] = useState([{ name: "", position: "" }]);
	const [ispageLoading, setPageLoad] = useState(false);

	const resumeNav = useNavigate();

	const addCompanyHandle = () =>
		setcompanies([...companies, { name: "", position: "" }]);

	const deleteCompanyHandle = (index) => {
		const list = [...companies];
		list.splice(index, 1);
		setcompanies(list);
	};
	const modifyCompanyHandle = (e, index) => {
		const { name, value } = e.target;
		const list = [...companies];
		list[index][name] = value;
		setcompanies(list);
	};

	const formSubmission = (e) => {
		e.preventDefault();

		const newFormInfo = new FormData();
		newFormInfo.append("passportsizeImage", passportImage, passportImage.name);
		newFormInfo.append("userName", userName);
		newFormInfo.append("presentRole", presentRole);
		newFormInfo.append("tenure", tenure);
		newFormInfo.append("technologies", technologies);
		newFormInfo.append("jobHistory", JSON.stringify(companies));
		axios
			.post("http://localhost:8000/build/resume", newFormInfo, {})
			.then((res) => {
				if (res.data.message) {
					setResult(res.data.data);
					resumeNav("/build");
				}
			})
			.catch((err) => console.error(err));
		setPageLoad(true);
	};
	if (ispageLoading) {
		return <PageLoad />;
	}
	return (
		<div className='app'>
			<h1>Resume Generator</h1>
			<></>
			<form
				onSubmit={formSubmission}
				method='POST'
				encType='multipart/form-data'
			>
				<label htmlFor='userName'>Enter your First Name and Last Name</label>
				<input
					type='text'
					required
					name='userName'
					id='userName'
					value={userName}
					onChange={(e) => setuserName(e.target.value)}
				/>
				<div className='nestedSection'>
					<div>
						<label htmlFor='presentRole'>Enter your current position</label>
						<input
							type='text'
							required
							name='presentRole'
							className='currInput'
							value={presentRole}
							onChange={(e) => setpresentRole(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='tenure'>Tenure duration(years)</label>
						<input
							type='number'
							required
							name='tenure'
							className='currInput'
							value={tenure}
							onChange={(e) => settenure(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='technologies'>Technologies you know</label>
						<input
							type='text'
							required
							name='technologies'
							className='currInput'
							value={technologies}
							onChange={(e) => settechnologies(e.target.value)}
						/>
					</div>
				</div>
				<label htmlFor='picture'>Attach your Professional Photo</label>
				<input
					type='file'
					name='picture'
					required
					id='picture'
					accept='image/x-png,image/jpeg'
					onChange={(e) => setPassportImage(e.target.files[0])}
				/>

				<h3>List the companies you've worked at</h3>

				{companies.map((company, index) => (
					<div className='nestedSection' key={index}>
						<div className='companies'>
							<label htmlFor='name'>Company</label>
							<input
								type='text'
								name='name'
								required
								onChange={(e) => modifyCompanyHandle(e, index)}
							/>
						</div>
						<div className='companies'>
							<label htmlFor='position'>Position</label>
							<input
								type='text'
								name='position'
								required
								onChange={(e) => modifyCompanyHandle(e, index)}
							/>
						</div>

						<div className='btn__group'>
							{companies.length - 1 === index && companies.length < 4 && (
								<button id='addButton' onClick={addCompanyHandle}>
									Add
								</button>
							)}
							{companies.length > 1 && (
								<button
									id='deleteButton'
									onClick={() => deleteCompanyHandle(index)}
								>
									Delete
								</button>
							)}
						</div>
					</div>
				))}

				<button>CREATE RESUME</button>
			</form>
		</div>
	);
};

export default Main;
