# EU-platform

Platform for hosting European Union (EU) activities. Supported by _Centro de Excelência Jean Monnet da Universidade de Coimbra_.

 ## Context
The objective of my dissertation in my Master’s degree in Software Engineering at University of Coimbra was to develop a software with the intention to provide knowledge about Europe and the European Union by exhibiting the activities of the [Center of Excellence Jean Monnet UC](https://coe.uc.pt/sobre/) to kids between 6 and 9 years old.
                                                     
That software was created on a web platform format that combines a set of games and leisure activities. Both the platform and games were developed from scratch. Within the leisure activities, were included didactic videos with the European Union theme and a children’s story book, both produced by external teams. It also can host works that can be submitted to online votes from the audience, promoting competitions. In order to manage and update at any time the content inside the platform, it was created an administration page. This page can also give insight about metrics gathered anonymously from games, providing the possibility to study the effectiveness of those games.

All the engineering processes to develop this software were documented in my dissertation. But, briefly, in the beginning there was a stage where a study was performed about similar software's. Then, a requirements gathering process was performed followed by selecting the technologies and drawing the software architecture. 
The methodology used to develop the software was Agile with the framework SCRUM. Frequent meetings with the product owners were realized to ensure that the final product was developed with their feedback and needs. 
Furthermore, several risks that could affect the project's success were analysed and mitigation plans to reduce their impact were done.


## Demo
The software is deployed at: http://uniaoeuropeia.dei.uc.pt/
 
 ## Technologies 
 Technologies used to develop the software:
* React
* Node
* Express
* MongoDB
* Docker

## Tutorial Guide
> This guide presents the instructions to put the platform up and running in a Docker environment.

### Development environment

To build the services for the development environment run the following commands:

1. Build the docker files

```console
foo@bar:~/EU-platform $ docker-compose build
```

2. Install individually on the client and server the node module dependencies.

```console
foo@bar:~/EU-platform $ cd client
foo@bar:~/EU-platform/client $ npm install
```

```console
foo@bar:~/EU-platform $ cd server
foo@bar:~/EU-platform/server $ npm install
```

In the server create a .env file with the following:

```console
SECRET_KEY=[YOUR_SECRET_KEY]
```

3. Run the Docker Containers

```console
foo@bar:~/EU-platform $ docker-compose up
```

4. Restore the database to the default version. This creates an admin and some start up data.

```console
foo@bar:~/EU-platform $ ./restore_mongo init-platform-data
```

5. Open your browser at http://localhost (or the remote machine URL).

6. Add /login at HomePage to access the admin page to add your custom data to the platform. Fill the form with the following credentials:
   - username: admin
   - password: 123

---

### Production environment

After building the development environment, you're ready to create the services for the production environment. Run the following commands:

1. Build the docker files

```console
foo@bar:~/EU-platform $ docker-compose -f docker-compose.yml -f docker-compose.override.yml build
```

- You can add the flag --remove-orphans to remove the previous unused containers that you created.

2. Run the containers

```console
foo@bar:~/EU-platform $ docker-compose -f docker-compose.yml -f docker-compose.override.yml up
```

3. Open your browser at http://localhost (or the remote machine URL).

---

### Assets credits

Sound effects used in games obtained from https://www.zapsplat.com
