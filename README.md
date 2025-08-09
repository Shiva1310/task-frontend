# Task Manager App
A full stack web application to manage tasks with user authentication and CRUD operations.
## Tech Stack

- Frontend: React (functional components + hooks), Tailwind CSS  
- Backend: Node.js, Express.js  
- Database: MongoDB with Mongoose  
- Authentication: JWT with bcrypt password hashing  

## Features

- User registration and login with secure password hashing  
- JWT-based authentication and protected routes  
- CRUD operations on tasks (create, read, update, delete)  
- Pagination and filtering tasks by status and due date  
- Form validation on frontend and backend  
- Responsive UI built with Tailwind CSS  
- Error and success messages displayed to users

## Setup Instructions

1. Clone repo:

   git clone https://github.com/Shiva1310/task-frontend.git
   
2. Install dependencies

    npm install

3. Configure env 
    
    VITE_API_URL=backend_url/api

4. Start  server:
    
    npm run dev