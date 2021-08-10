const { request } = require('express');

const express = require('express');

const app = express();

const users = require('./users.json');

app.use(express.json())


app.listen(1234, () => {
    console.log('listening on 1234')
})


app.get("/", (request, response) => {
    return response.send("Welcome to Home page")
})


app.get("/users", (request,response) => {
    return response.send({ data: users });
})


app.post("/users", (request, response) => {

    let input = request.body

    let temp = [...users, input];

    response.send(temp);

})


app.patch("/users/:id", (request, response) => {

    let id = +request.params.id;
    console.log('id:', id)

    let output = users.map((el) => {
        
        if (id == el.id) {
            
            let temp = { ...el, ...request.body };
            return temp;

        }
        else {

            return el;
        
        }
        
    })
    
    response.send(output);

})


app.delete("/users/:id", (request, response) => {
    
    let id = +request.params.id;

    let output = users.filter((el)=>{

        return id != el.id;

    })
    response.send(output);
})
