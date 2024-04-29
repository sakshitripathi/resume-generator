import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import AiResume from "./components/AiResume";

const App = () => {
	const [jobresponse, setResult] = useState({});

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Main setResult={setResult} />} />
					<></>
					<Route path='/resume' element={<AiResume jobresponse={jobresponse} />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
