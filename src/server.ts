import express from "express"

const app = express();

app.get('/', (request, response) => {
    response.send("Hello World!");
});

app.listen(4000, () => {
    console.log("Express server running on port 4000");
});