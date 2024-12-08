# User Management Dashboard

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** 
- **npm** 
- **Vue CLI** 

---

## Setup Instructions

### Step 1: Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/ganapati3/admin-dashboard.git
cd admin-dashboard
```

### Step 2: Install Dependencies

Run the following command to install the necessary dependencies for the project:

```bash
npm install
```

This will install all the required packages, including Vue 3, Tailwind CSS.

### Step 3: Run the Application

After installing dependencies and configuring Tailwind CSS, start the development server by running:

```bash
npm run dev
```

This will start the local development server. You should see the following output in your terminal:
```
  App running at:
  - Local:   http://localhost:5173/
  - Network: http://<your-ip>:5173/
```

Now, open your browser and navigate to [http://localhost:5173](http://localhost:5173) to view the application.

## Note :

i have added a dropdown at the navbar for selecting current logged user to differentiate the working process.

i used pinia store to persist the state between the pages.


## Troubleshooting

- **Port in use**: If you see an error like `Error: listen EADDRINUSE: address already in use`, it means the port (default 5173) is occupied. To resolve this, you can run:
  ```bash
   npm run dev -- --port 3000
  ```

- **Missing Dependencies**: If you see an error about missing dependencies, try running:
  ```bash
  npm install
  ```

If you still face any issue use the deployed url
[https://ganapati3.github.io/admin-dashboard/#/](https://ganapati3.github.io/admin-dashboard/#/)