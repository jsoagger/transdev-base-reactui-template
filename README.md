
REACTJS + REDUX frontend integrated to a ready to deploy SPRINGBOOT backend
===========================================================================

## Motivations


<p>Starting a full stack JAVA project from scratch is painfull, time consuming and very complex. You have to do same things again and again for each new project.</p>


**What about generating full stack JAVA projects from template?**<br>
**What about reusing components and capitalisation?**<br>
**What about integration of frontend and backend?**<br>
**What about deployment?**<br>

<p>
These are the reason why i have created this project template and the project TRANSDEV (transverse development).
Following technologies stack have been integrated:
</p>

* Frontend: ReactJS + Redux + Router + more than 100 components
* Backend: SpringBoot 2.3, JAVA 16, Docker with misc functionalities

## Usage

### Prerequisites

Following tools must be installed:

* Java 11+
* Docker desktop
* Maven 3.4
* NodeJS
* postgresSQL


### Generate full stack application

1. Generate the application

```
> mvn archetype:generate  -DarchetypeGroupId=io.github.jsoagger -DarchetypeArtifactId=transdev-archetype -DgroupId=myapp -DartifactId=myapp -DinteractiveMode=false -DarchetypeVersion=LATEST
```

2. Build and generate a docker image:

```
> mvn clean install -Pnpm-install,create-react-app,jib
```

3. Run instance of postgresSQL and create a database named 'core_app_db':

```
> docker network create test_network
> docker run -d --name postgres --network test_network -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres postgres
```

4. Run the docker image application and browse: http://localhost:8080/jsoagger

```
> export CONFIG=${PWD}/src/main/resources
> docker run --rm --name mycoreproject --network test_network -p 8080:8080 -v $CONFIG:/spring-config -e JAVA_TOOL_OPTIONS="-Dspring.config.location=/spring-config/application.properties" transdev/coreproject:1.0-SNAPSHOT
```

5. Start ReactJS UI local server:

```
> cd frontworking
> REACT_APP_CONTEXT_ROOT=jsoagger npm start
```

## Feedback

Please feel free to contact me for any feedback: rmvonji@gmail.com

## Thank you

Enjoy It!
