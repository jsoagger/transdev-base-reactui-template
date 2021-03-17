import React from 'react';
import {PeopleDetails} from '_components';
/**
 */
class PeopleDetailsPage extends React.Component {
	
	constructor(props){
		super(props)
	}
	
	render() {
		return <PeopleDetails {...this.props}/>
	}
}
					
export default PeopleDetailsPage;

