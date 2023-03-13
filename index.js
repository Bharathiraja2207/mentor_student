import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv' 
dotenv.config()

const app = express();

// const PORT = (process.env.PORT);
const PORT = 4008
// const mongo_url = 'mongodb://127.0.0.1';

const mongo_url =(process.env.mongo_url)
export const client = new MongoClient(mongo_url);
await client.connect();
  console.log('mongo is connected!!');

  app.use(express.json())


app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.get("/mentors",async function (request, response) {
    const mentor= await client
    .db("mentor")
    .collection("mentors")
    .find({})
    .toArray();
      response.send(mentor);
      });

      app.post("/mentors",async function (request, response) {
        const data=request.body;
        console.log(data);
         const result= await client
            .db("mentor")
           .collection("mentors")
            .insertMany(data)
        response.send(result);
      });      

          //get students  
app.get("/students",async function (request, response) {
    const student= await client
    .db("mentor")
    .collection("students")
    .find({})
    .toArray();
      response.send(student);
      });

       //post students
       app.post("/students",async function (request, response) {
        const data=request.body;
        console.log(data);
         const result= await client
            .db("mentor")
           .collection("students")
            .insertMany(data)
        response.send(result);
      });

      //get mentor&student      
      app.get("/patches",async function (request, response) {
        const batch= await client
        .db("mentor")
        .collection("mentorstudent")
        .find({})
        .toArray();
          response.send(batch);
          });
  
  //post
          app.post("/patches",async function (request, response) {
            const data=request.body;
            console.log(data);
             const result= await client
                .db("mentor")
               .collection("mentorstudent")
                .insertMany(data)
            response.send(result);
          });
      
  //get by mentor_name
          app.get("/patches/:mentor_name", async function (request, response) {
            console.log(request.params)
            const {mentor_name}=request.params
            console.log(mentor_name);
            const find_id= await client
            .db("mentor")
            .collection("mentorstudent")
            .findOne({mentor_name:mentor_name})
            console.log(find_id);
            find_id?response.send(find_id):response.status(404).send({message:"mentor not found"})
          });

           //update
           app.put("/patches/:mentor_name",async function (request, response) {
            const data=request.body;
            const {mentor_name}=request.params;
            console.log(mentor_name)
            console.log(data);
             const result= await client
                .db("mentor")
               .collection("mentorstudent")
                .updateOne({mentor_name:mentor_name},{$set:data})
            response.send(result);
          });

  
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));