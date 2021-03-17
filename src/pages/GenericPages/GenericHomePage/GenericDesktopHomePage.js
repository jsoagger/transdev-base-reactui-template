import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
import desktop3 from '../../../assets/img/mob-deskt_ipad.png';

class HomeDemoDesktop extends Component {
    render () {
    	var title1 = "### Build and run from source code"
        var title1mark = <ReactMarkdown source={title1} />
    	
    	var title2 = "### Need help?"
        var title2mark = <ReactMarkdown source={title2} />
    		
        return (
        		<div className="home-page-root">
					<div className={'row'}>
						<p className="display-4">Desktop and embedded platforms integration</p>
					</div>

					<div className={'row'}>
						<p className="lead ">
	« JSOAGGER Desktop and embedded» devices applications concept is to build application from « JSON » definition file.
	The visual IHM is a group of independent components, integrated at runtime by our home made JavaFX based Framework.
	More, it can be easily connected to remote cloud server through our connectors.
						</p>
					</div>
					<div className={'row'}>
						<img src={desktop3} className="" alt="toto" width="300" height="300"/>
					</div>

					<hr/>
					<div className={'row'}>
			                <div>{title1mark}</div>
	                        <div className="text-justify lead half-opacity">
	                        	<p>
	                            	Please chekout project from github and follow described instructions.
	                            </p>
	                        </div>
	                        <a href="https://play.google.com/store/apps">JSOAGGER github repository</a>
					</div>

	                <hr/>
					<div className={'row'}>
							<div>{title2mark}</div>
							<div className="font-weight-normal text-justify lead half-opacity">
	                            <p><u><a target="_blank" href="http://www.jsoagger.tech">http://www.jsoagger.tech</a></u></p>
	                            <p><u><a target="_blank" href="http://www.nexitia.com">http://www.nexitia.com</a></u></p>
	                        </div>
            		</div>
				</div>
        );
    }
}

export default HomeDemoDesktop;
