# Campus Event Management Hub

## Overview

The Campus Event Management Hub is a web application designed to streamline event planning and coordination on campus. It provides a platform for users to manage events, RSVP, and stay updated on upcoming campus activities.

## Features

- **User Authentication**: Secure login and registration for users and admins.
- **Event Management**: Create, view, and manage events with ease.
- **RSVP System**: Users can RSVP for events and manage their event participation.
- **Admin Dashboard**: Admins have access to additional features like event creation and management.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **HTTP Client**: Axios

## Project Structure

### Frontend

- **Components**: Reusable UI components like `NavBar`, `Footer`, `Banner`, and `EventCards`.
- **Pages**: Different pages like `HomePage`, `Dashboard`, `AdminPage`, and `RsvpConfirmationPage`.
- **Services**: API service for handling HTTP requests and authentication.
- **Styling**: Tailwind CSS for styling and responsive design.

### Backend

- **Controllers**: Handle business logic for authentication and event management.
- **Routes**: Define API endpoints for authentication and event-related operations.
- **Middleware**: Authentication middleware to protect routes.
- **Database**: PostgreSQL for data storage and retrieval.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/campus-event-hub.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd campus-event-hub
   ```

3. **Install dependencies**:

   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```
   - For the backend:
     ```bash
     cd Nodejs-postgress
     npm install
     ```

4. **Environment Variables**:

   - Create a `.env` file in the `Nodejs-postgress` directory and add your environment variables:
     ```
     PORT=3000
     JWT_SECRET=your_jwt_secret
     JWT_EXPIRES=1d
     ```

5. **Run the application**:

   - Start the backend server:
     ```bash
     cd Nodejs-postgress
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd frontend
     npm run dev
     ```

6. **Access the application**:
   - Open your browser and go to `http://localhost:3000` for the backend.
   - Open your browser and go to `http://localhost:5173` for the frontend.

## Usage

- **User Registration**: Sign up to create an account and access event features.
- **Login**: Access your account to manage and RSVP for events.
- **Admin Features**: Admins can create and manage events through the admin dashboard.
- **RSVP**: Users can RSVP for events and view their upcoming events.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please contact [emaxwellaidam@gmail.com].
