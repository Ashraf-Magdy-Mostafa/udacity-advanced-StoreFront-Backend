==================
# included:
==================
1-how to get started:
    a-using the docker compose
    b-create database store
    c-db-migrate up
2-USING THE API
    A-COMPILING the code
    B-TESTING the code

-------------------END OF included------------------
========================================================
================================
# How to Get started 
===============================
-i'm using Docker & windows 
1-using the docker-compose:{
    -open terminal
    - navagate to where is docker-compose is located using cd"dir name"
    -check the yml file using the cmd "docker-compose config"
    -if every thing checks out (it did on my end)
    -run the cmd "docker-compose up"
    -now u should have a postgres DB with -U admin  -W mypassword
    }

       ** PS**( u can provide your own variables in the .env to create the docker container you , edit it if u like )
       ** PS**(DataBase connection port: 5432 -- and Server is running on port: 3000)

    2- create database store--
        1-using docker program:
            -"psql -U admin"
            -"CREATE DATABASE store;" for main DB
        2-using terminal:
            -write in terminal "docker ps -a" to get all containers get the container-id of the newly created container
                ex{
                    CONTAINER ID   IMAGE      COMMAND                  CREATED          STATUS                             
                    277c0c1a6748   postgres   "docker-entrypoint.s…"   33 seconds ago   Up 9 seconds   
                    }
            -run in terminal "docker exec -ti 277c0c1a6748 bash" to enter the container terminal
                then enter the previously mentioned psql cmds:
                -run in terminal "psql -U admin"
                -run in terminal "CREATE DATABASE store;" for main DB

3- DB-migrate Up
    -npx db-migrate up will create tables for the main DB in my case "store"DB
    
    -------END OF How to Get Started------
=============================================

====================
#  USING THE API 
===================
    A-compiling the code:

        1- run in terminal "npm run compile"
        2- then using "postman"OR "thunder client" try the desired Requests From Below
        3- server running on localhost:port  3000
        4- Database connection port is 5432

    B-TESTING the code:
        A-running jasmine tests:
            -in terminal run "npm run jasmine" will create DB"test" and run jasmine tests then delete "test"DB
==============================



----EXTRA INFO-----
    -minor Bugs and mistakes may be Found ^^ -
Kindly note that that this project still needs alot more work to fine tune it more and add some extra tweaks
it took me alot of time to get it to work together
and i will be more than happy to hear your comments on it.
i might have made minor errors while coding this but i'm trying my best to edit it...
thanks for your effort, really appreciated. 
-----------------------------------------------------------