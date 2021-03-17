import React from 'react';


class ApplicationVersion extends React.Component {

	render(){
		var buildVersion = process.env.REACT_APP_BUILD_VERSION,
    	buildDate = process.env.REACT_APP_BUILD_DATETIME;
    	
    	return <span>Version: {buildVersion}.{buildDate}</span>
	}
}

export default ApplicationVersion;