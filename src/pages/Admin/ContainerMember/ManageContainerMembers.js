import React, { Component } from 'react';

/**
 * Members are people/party having access into that container.
 * When created, parties are affiliated to  /Application/Unaffiliated, they
 * do not have access to other containers. They will not appear in search result.
 */
class ManageContainerMembers extends Component {

	constructor(props){
		super(props)
	}	
	
    render() {
        var isFirstLoad = this.props.loading;
        var loading = (
            <div className="animated fadeIn pt-1 text-center">I am loading...</div>
        )

        var defaultView = <div>
            	<div id="NavigateMembers_SearchMembersResults">
            	</div>
            </div>

        return (
            <div>
                {(() => {
                    switch (isFirstLoad) {
                    case true:   return loading;
                    default:     return defaultView;
                    }
                })()}
            </div>
        );
    }
}


export default ManageContainerMembers


