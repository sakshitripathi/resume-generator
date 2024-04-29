import React, { useRef } from "react";
import PageError from "./PageError";
//import PageLoad from "./PageLoad";

import { useReactToPrint } from "react-to-print";

const AiResume = ({ jobresponse }) => {
	const componentRef = useRef();
	//const Component = () => {
		//const compRef = useRef();
		//const handlint = useReactToPrint({
	const handleSaveResume = useReactToPrint({
		content: () => componentRef.current,
		resumeTitle: `${jobresponse.userName} Resume`,
		onSave: () => alert("Save Successful!"),
	});

	if (JSON.stringify(jobresponse) === "{}") {
		return <PageError />;
	}

	const lineChange = (string) => {
		return string.replace(/\n/g, "<br />");
	};

	return (
		<>
			<button onClick={handleSaveResume}>Save Resume</button>
			<main className='clssContainer' ref={componentRef}>
				<header className='header'>
					<div>
						<h1>{jobresponse.userName}</h1>
						<p className='resumeTitle headerTitle'>
							{jobresponse.presentRole} ({jobresponse.technologies})
						</p>
						<p className='resumeTitle'>
							{jobresponse.tenure}year(s) Job Experience
						</p>
					</div>
					<div>
						<img
							src={jobresponse.photourl}
							alt={jobresponse.userName}
							className='photoResume'
						/>
					</div>
				</header>
				<div className='bodyResume'>
					<div>
						<h2 className='titleBodyResume'>INTRODUCTION</h2>
						<p
							dangerouslySetInnerHTML={{
								__html: lineChange(jobresponse.textOject),
							}}
							className='bodyResumeText'
						/>
					</div>
					<div>
						<h2 className='titleBodyResume'>JOB HISTORY</h2>
						{jobresponse.jobHistory.map((job) => (
							<p className='bodyResumeText' key={job.name}>
								<span style={{ fontWeight: "bold" }}>{job.name}</span> -{" "}
								{job.position}
							</p>
						))}
					</div>
					<div>
						<h2 className='titleBodyResume'>WORK PROFILE</h2>
						<p
							dangerouslySetInnerHTML={{
								__html: lineChange(jobresponse.workDuties),
							}}
							className='bodyResumeText'
						/>
					</div>
					<div>
						<h2 className='titleBodyResume'>WORK RESPONSIBILITIES</h2>
						<p
							dangerouslySetInnerHTML={{
								__html: lineChange(jobresponse.notables),
							}}
							className='bodyResumeText'
						/>
					</div>
				</div>
			</main>
		</>
	);
};

export default AiResume;
