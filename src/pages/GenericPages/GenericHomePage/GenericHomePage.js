import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import ipad from '../../../assets/img/mob-deskt_ipad.png';
import mobile1 from '../../../assets/img/mobile1-161.png';
import {Button} from 'reactstrap'

const rootUrl = 'home';

/**
 * Home page
 */
class GenericHomePage extends Component {
	
    render () {
        return (
        	<div>
                    <div>
                        <p className="display-4">Full stack application framework</p>
                    </div>

                    <div>
                        <p className="lead">
                            JSOAGGER is an open source framework for building full stack desktop, mobile and web application. It integrates technical framworks such as spring-boot, JPA, Hibernate, ReactJS, JavaFX11 and Docker container in order to build robust applications based on current market standards.
                        </p>
                    </div>

                <div className="badge-techs">
                    <Button className="badge-tech" >DOCKER&nbsp;<Badge variant="secondary" className="no-radius">ALL</Badge></Button>
                    <Button className="badge-tech" >DOCKER COMPOSE&nbsp;<Badge variant="secondary" className="no-radius">ALL</Badge></Button>
                    <Button className="badge-tech" >MAVEN&nbsp;<Badge variant="secondary" className="no-radius">3.5</Badge></Button>
                    <Button className="badge-tech" >JAVA &nbsp;<Badge variant="secondary" className="no-radius">11+</Badge></Button>
                    <Button className="badge-tech" >POSTGRES&nbsp;<Badge variant="secondary" className="no-radius">12</Badge></Button>
                    <Button className="badge-tech" >H2&nbsp;<Badge variant="secondary" className="no-radius">1.4.137</Badge></Button>
                    <Button className="badge-tech" >SPRING&nbsp;<Badge variant="secondary" className="no-radius">5.4</Badge></Button>
                    <Button className="badge-tech" >SPRING BOOT&nbsp;<Badge variant="secondary" className="no-radius">2.3</Badge></Button>
                    <Button className="badge-tech" >SPRING SHELL&nbsp;<Badge variant="secondary" className="no-radius">2.2.0</Badge></Button>
                    <Button className="badge-tech" >SPRING BATCH&nbsp;<Badge variant="secondary" className="no-radius">4.3</Badge></Button>
                    <Button className="badge-tech" >JPA&nbsp;<Badge variant="secondary" className="no-radius">2.1</Badge></Button>
                    <Button className="badge-tech" >HIBERNATE&nbsp;<Badge variant="secondary" className="no-radius">5.4</Badge></Button>
                    <Button className="badge-tech" >REACT.JS&nbsp;<Badge variant="secondary" className="no-radius">12</Badge></Button>
                    <Button className="badge-tech" >JavaFX&nbsp;<Badge variant="secondary" className="no-radius">11+</Badge></Button>
                </div>

                    <hr />
                    <div className={'flex-img'}>
                        <div className="">
                            <img src={mobile1} className="" alt="toto" width="100" height="200"/>
                            <h5 className="">JSOAGGER for <i>IOS</i> and <i>ANDROID</i></h5>
                        </div>

                        <div className="">
                            <img src={ipad} className="" alt="toto" width="200" height="200"/>
                            <h5>JSOAGGER for <i>Desktop</i> and <i>Embedded</i> devices</h5>
                        </div>
                    </div>

            </div>
        );
    }
}

export default GenericHomePage;
