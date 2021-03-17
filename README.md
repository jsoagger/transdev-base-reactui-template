
REACTJS + REDUX frontend integrated to a ready to deploy SPRINGBOOT backend
===========================================================================

## Motivations


<p>Starting a fullstack JAVA project from scratch is painfull, time consuming and very complex. You have to do same things again and again for each new project.</p>

<p>
**What about generating fullstack JAVA projects from template?**<br>
**What about reusing components and capitalisation?**<br>
**What about integration of frontend and backend?**<br>
**What about deployment?**<br>
</p>

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

### Frontend UI only

If you have an existing project and want to update the UI part:

```
npm create-react-app your-project-name --template transdev-base-reactui-template
```


### Fullstack application

Generate fullstack JAVA application:

```
mvn archetype:generate  -DarchetypeGroupId=io.github.jsoagger -DarchetypeArtifactId=transdev-archetype -DgroupId=myapp -DartifactId=myapp -DinteractiveMode=false 
```

Build the project:
```
mvn clean install -Pjib
```

Run:

```
mvn 
```

## Deploy to GCP


## Deploy to AWS


## Feedback



## Thank you



