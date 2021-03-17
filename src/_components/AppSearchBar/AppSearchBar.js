import React, { Component } from 'react';
import {CardImg,} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HashRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';

const propTypes = {
  children: PropTypes.node,
  onFocus: PropTypes.func.isRequired,
  doSearch: PropTypes.func.isRequired,
};

const defaultProps = {
};

const mapStateToProps = store => ({
	searchTerm: store.headerSearchComp.searchTerm,
})

const mapDispatchToProps = (disptach) => ({
})

/**
 * Search bar in the header of the application 
 */
class AppSearchBar extends Component {
	
	 constructor() {
	    super();
	    this.state = {
	      value: '',
	    };
	  }
	
	 onChange = (event, { newValue }) => {
	    this.setState({
	      value: newValue
	    });
	  };
  
    render() {
    	const { value, suggestions } = this.state;
    	// Autosuggest will pass through all these props to the input.
        const inputProps = {
          placeholder: 'Search for ...',
          value,
          onChange: this.onChange
        }
        
        return (
            <div>
            </div>
        );
    }
}

AppSearchBar.propTypes = propTypes;
AppSearchBar.defaultProps = defaultProps;


export default connect(mapStateToProps, mapDispatchToProps) (AppSearchBar);

/**
 * 
 */
class SearchResult extends Component {
	
	render(){
		let user =  this.props.data
		let owner = user.links.owner
		let gender = owner.gender 
		const link = LinkTo(user)
		
		var cardImage
		if(gender === 0){
			cardImage = (
				<CardImg  src={'../../assets/img/avatars/1.png'} 
					className="img-avatar-xs"/>
			)
		}
		else {
			cardImage = (
				<CardImg  src={'../../assets/img/avatars/3.png'} 
					className="img-avatar-xs"/>
    		)
		}
		
		return ( 
			<div className="user-search-result-card">
				<div className="user-search-result-card-avatar-ctnr">
					{cardImage}
				</div>
                <div>
					<p align="center">{link}</p>
                </div>
            </div>
        )
	}
}

const LinkTo = (item) => {
	//const link = `/admin/p/containerMembers/details/${item.attributes.id}`
	const link = `/c/profile/${item.attributes.id}`
	return (
		<p align="center">
			<HashRouter >
				<Link to={link} className="btn-square"><h5>{item.links.owner.firstName}</h5></Link>
				<Link to={link} className="btn-square"><h4>{item.links.owner.lastName}</h4></Link>
			</HashRouter>
		</p>
	) 
}


