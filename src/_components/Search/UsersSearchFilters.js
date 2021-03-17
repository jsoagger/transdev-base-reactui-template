
import React from 'react';
import { Button,} from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '_actions/actions.js';
import { commons } from '_helpers/commons.js';

const mapStateToProps = store => ({
	headerSearchComp: store.headerSearchComp,
	searchCriterias: store.headerSearchComp.criterias,
})

const mapDispatchToProps = (disptach) => ({
	updateSearchResults: (e) => disptach(actions.updateHeaderSearchCompSearchTerm(e)),
})

class AdminSearchFilters extends React.Component {

	constructor(props){
		super(props);
		this.setState({
			loading:true
		})
	}

	updateSearchCriterias(selection){
		localStorage.setItem('adminSearchType', JSON.stringify(selection))
		var payload = {
			criterias: {
				adminSearchType: selection,
				searchType: localStorage.getItem('searchType')
			}
		}

		this.props.updateSearchResults(payload);
		this.setState({
			selection: selection
		})
	}

	render() {
		var each = [],
			searchType = JSON.parse(localStorage.getItem('adminSearchType'))

		if(searchType !== null && searchType !== undefined) {
			searchableTypes.map(t => {
				var isSelected = t.rootType === searchType.rootType
				var icon
				if(isSelected) {
					icon = <span className="badge badge-pill badge-warning">Current Selection</span>
				}

				if(t.visible === true){
					each.push( <>
						<div>
							<h4>{t.displayName}</h4>
							{icon}
						</div>
						<div>
							<div className="float-right">
								<Button onClick={e => this.updateSearchCriterias(t)} disabled={isSelected}>Set criteria</Button>
							</div>
						</div>
					</>)
				}
			})

			return each
		}
		else {
			return this.loading()
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps) (AdminSearchFilters);


const GetSearchType = (rootType) => {
	var res = null
	searchableTypes.map(e => {
		if(rootType === e.rootType){
			res = e
		}
	})
	return res !== null ? res : GetSearchType('io.github.jsoagger.people.Party/Person')
}

const  searchableTypes = [
	{
		displayName: 'Product',
		businessClass: 'io.github.jsoagger.core.shop.ProductInstance',
		rootType: 'io.github.jsoagger.product.ProductInstance',
		headerMessage: 'Search Products...',
		visible: true
	},
]
