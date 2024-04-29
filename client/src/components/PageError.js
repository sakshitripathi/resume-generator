import React from "react";
import { Link } from "react-router-dom";

const PageError = () => {
	return (
		<div className='app'>
			<h3>
				It seems you have not given your details. Please head back to the{" "}
				<Link to='/'>homepage</Link>.
			</h3>
		</div>
	);
};

export default PageError;
