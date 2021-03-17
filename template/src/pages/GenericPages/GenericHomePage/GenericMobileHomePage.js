import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import ReactMarkdown from 'react-markdown'
import mobile1 from '../../../assets/img/mobile1-161.png';
import mobile2 from '../../../assets/img/mobile2.png';
import mobile3 from '../../../assets/img/mobile3.png';


/**
 * Home demo mobile page
 */
class HomeDemoDesktop extends Component {
    render () {
    	
    	var title1 = "### Build from source"
        var title1mark = <ReactMarkdown source={title1} />
    	
    	var title2 = "### Download demo APK"
        var title2mark = <ReactMarkdown source={title2} />

		var title3 = "### Build from source code"
        var title3mark = <ReactMarkdown source={title3} />

    	var title4 = "### Need help"
        var title4mark = <ReactMarkdown source={title4} />

    		
        return (
        		<div className="">
					<div>
						<p className="display-4">IOS and ANDROÏD integration</p>
					</div>

					<p className="text-justify lead half-opacity">
« JSOAGGER Mobile» concept is to build mobile application from « JSON » definition file.  
The visual IHM is a group of independent components, integrated at runtime by our home made JavaFX based Framework.
More, it can be easily connected to remote cloud server through our connectors.
					</p>

					<div className={'flex-img'}>
						<img src={mobile1} className="" alt="toto" width="100" height="200"/>
						<img src={mobile2} className="" alt="toto" width="100" height="200"/>
						<img src={mobile3} className="" alt="toto" width="100" height="200"/>
					</div>

					<hr/>
					<div>
						{title2mark}
					</div>
					<div className="text-justify lead half-opacity">
						<p>
							You can install manually JSOAGGER mobile demo application from, our install it
							from Google app store.<br/>
						</p>
				   </div>
				   <a href="https://play.google.com/store/apps">Download installable APK</a>

					<hr/>
					<div>
						{title3mark}
					</div>
					<div className="text-justify lead half-opacity">
						<p>
							Please chekout project from github and follow described instructions.
						</p>
					</div>
					<a href="https://play.google.com/store/apps">JSOAGGER github repository</a>

					<hr/>
					<div>
						{title4mark}
					</div>

					<div className="">
						<p><u><a target="_blank" href="http://www.jsoagger.tech">http://www.jsoagger.tech</a></u></p>
						<p><u><a target="_blank" href="http://www.nexitia.com">http://www.nexitia.com</a></u></p>
					</div>
			</div>
        );
    }
}

export default HomeDemoDesktop;
