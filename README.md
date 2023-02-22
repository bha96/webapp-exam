# webapp-exam

I used my own gitHub since the classroom link gave us the same
repo as last exam, and it wasn't possible to create secrets there.

Repo: https://github.com/bha96/webapp-exam/

Link to azure: https://webapp-exam.azurewebsites.net/

## How to run:
1. create .env file with:
   1. PORT=3000
   2. COOKIE_SECRET=12hs8a9dh1lkuf90sadja
   3. MONGO_URL=mongodb+srv://examUser:examuser@webapp-exam-mongodb.pwn5sp0.mongodb.net/?retryWrites=true&w=majority
2. npm i in base directory, client, and server
3. cd back to base directory and npm run dev
4. go to localhost:3000 or the port in your .env file
    

## Endpoints: 
* /api/login
  * GET
  * POST
  * DELETE
* /api/activities
  * GET
  * PUT /log
  * PUT /group/:_id
* /api/users
  * GET
  * POST
  * POST /new
  * PUT /:id
  * DELETE /:username