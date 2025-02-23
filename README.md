# Todo App

Full-stack Todolist application with a **PostgreSQL** database, **Node.js** backend, and a **React + TypeScript** frontend.

---

## **Features**
- **Secure Routes**
- **PostgreSQL Database with passwords secured with bcrypt hashing**
- **CRUD Tasks**
- **JWT User Authentication**
---

## **Prerequisites**
Have the following installed:
- **Node.js**
- **PostgreSQL**
- **npm**

---
## **Cloning the Github Repository**
git clone <repository-url>
cd lumaa-spring-2025-swe

## **Setting Up the Database**

### **1. Create a PostgreSQL Database**
Open a PostgreSQL terminal and run:
```sql
CREATE DATABASE todolist;
```

### **2. Create a `.env` File**
Inside the `backend/` folder, create a `.env` file:
```
PORT=8000
DATABASE_URL=postgres://your_username:your_password@localhost:5432/todo_app
JWT_SECRET=your_secret_key
```
**Replace `your_username` and `your_password`** with your PostgreSQL credentials.

---

## **Running the Backend**

1. Navigate to the `backend/` folder:
   ```sh
   cd backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the server:
   ```sh
   npm start
   ```
   Or if using `nodemon`:
   ```sh
   nodemon server.js
   ```

4. The backend should be running at **`http://localhost:8000`**.

---

## **Running the Frontend**

1. Navigate to the `frontend/` folder:
   ```sh
   cd frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the React development server:
   ```sh
   npm start
   ```

4. The frontend should be running at **`http://localhost:3000`**.

---

## **Relevant Testing Notes**

### **Backend Testing**
If you have backend tests, run:
```sh
npm test
```

### **Frontend Testing**
If using React Testing Library, run:
```sh
npm test
```

---

## **Troubleshooting**

- **Database Connection Issues**: Ensure PostgreSQL is running and your `.env` file has the correct credentials.
- **Port Conflicts**: If `8000` or `3000` is in use, change the `PORT` variable in `.env` and restart the server.
- **Dependency Issues**: If `npm install` fails, try:
  ```sh
  rm -rf node_modules package-lock.json
  npm install
  ```

---

## **Salary Expectations**
$20-25 an hour for a part time internship position. I am open to negotiating the salary depending on internship expectations and other career and learning opportunities.

## **Personal Information**
Email: Sammedina4235@gmail.com
Linkedin: https://www.linkedin.com/in/samantha-medina-515243346/