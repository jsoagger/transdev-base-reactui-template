import React, { Component } from 'react';

class ContainerDeletion extends Component {

	render(){
		return <div className="container-deletion">
				<div className="form-title-level-0">Drop zone</div>
				<div className="pane">
					<div class="infos">
							<p className="lead">
								Delete container will remove all contents and linked business object.
								This action can not be undone.
							</p>
					</div>
					<div class="btn-toolbar"><button>DELETE</button></div>
				</div>
		</div>
	}
}

export default ContainerDeletion;
