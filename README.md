# Running the Express Application Locally

## Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Steps to Run Locally

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

#### Create a .env file in the root of your project and add the following environment variables:

```env
PORT='port you want to run'
DB_URL="your mongodb url"
```

### 4. Run the Application

#### Development Mode

##### To run the application in development mode with hot-reloading, use the following command:

```bash
npm run start:dev
```

#### Production Mode

##### To build and run the application in production mode, use the following commands:

```bash
# Transpile TypeScript to JavaScript
npx tsc

# Start the application
npm run start:prod

```
