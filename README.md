The West Marches (a dnd companion app) https://the-west-marches-client.now.sh/

A "The West Marches" style Dungeons and Dragons game involves a setting with a map. The players make their camp at a town on the map, and decide what kind of adventure they want to have, and who will go on the adventure before the dungeon master even gets involved. This takes the burden of organizing games from the dungeon master so he can focus on writing and running the adventure. This app helps by allowing the dungeon master to invite players to his game, where the players can suggest adventures on the noticeboard, and decide which adventure they're most interested in.

![The Player Home Page of the West Marches App](Screenshot.png?raw=true "The West Marches")

This application was made using React, CSS, Node, Express, and PostgreSQL.

There is also an api for managing calls to a server. This is a RESTful api for managing users, characters notices and players and characters associated with notices.

Scripts
Start the application npm start

Start nodemon for the application npm run dev

Run the tests npm test
This is a server for managing calls to a blog server. This is a RESTful api the managing users, articles and comments.

Scripts
Start the application npm start

Start nodemon for the application npm run dev

Run the tests npm test


    Method:
    Here are the endpoints and methods you can call to the api

    /api/users
    GET | POST

    /api/users/:user_id
    GET | PUT | DELETE
    
    /api/characters
    GET | POST

    /api/characters/:user_id
    GET | PUT | DELETE
    
    /api/notices
    GET | POST

    /api/notices/players
    GET | POST

    /api/notices/characters
    GET | POST

    /api/notices/:notice_id
    GET | PUT

    /api/notices/players/:noticePlayer_id
    GET | PUT

    /api/notices/characters/:noticeCharacter_id
    GET | PUT

    Success Response:
    Here are some samples of endpoints you can hit and the sort of response you can expect to get back

    /api/users
    GET
    Code: 200
    Content: 
        {"id":1,
        "username":"admin,
        "password":"admin",
        "email_address":"fake_email@gmail.com",
        "role":"dungeon_master"},
        
        {"id":2,
        "username":"player",
        "password":"player",
        "email_address":"player@email.com",
        "role":"player"}

        etc...
        }

    /api/users/1
    GET
    Code: 200
    Content:
        {"id":1,
        "username":"admin",
        "password":"admin",
        "email_address":"fake_email@gmail.com",
        "role":"dungeon_master"}
        

    /api/characters
    GET
    Code: 200
    Content:
        {"id":1,
        "user_id":2,
        "name":"playercharacter"},
        
        {"id":2,
        "user_id":3,
        "name":"player2'scharacter"},
        
        etc...

    /api/characters/1
    GET
    Code: 200
    Content: 
        {"id":1,
        "user_id":2,
        "name":"playercharacter"}

    /api/notices/players
    GET
    Code: 200
    Content: 
        {"id":1,"notice_id":1,
        "name":"player"},

        {"id":2,
        "notice_id":1,
        "name":"player2"},
        
        {"id":3,"notice_id":2,
        "name":"player"}

        etc...

    /api/notices/characters
    GET
    Code: 200
    Content: 
        {"id":1,
        "notice_id":1,
        "name":"playercharacter"},
        
        {"id":2,
        "notice_id":1,
        "name":"player2'scharacter"},
        
        {"id":3,
        "notice_id":2,
        "name":"playercharacter"}

        etc... 

    /api/notices/1
    GET 
    Code: 200
    Content: 
        {"id":1,
        "message":"Loot the dungeon!","status":"Closed"}
