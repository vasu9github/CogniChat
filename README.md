# CogniChat 🧠💬

CogniChat is a modern, full-stack AI chat application that allows users to have intelligent conversations with Google's Gemini AI. It features a sleek, responsive interface, secure user authentication, and persistent chat history.

---

## ✨ Features

- **AI-Powered Conversations:** Engage in dynamic and intelligent conversations powered by the Google Gemini API.
- **Secure Google OAuth:** Users can sign up and log in securely with their Google accounts.
- **Persistent Chat History:** All conversations are saved to the user's account and can be revisited at any time.
- **Responsive Design:** A clean, modern, and fully responsive UI that works seamlessly on both desktop and mobile devices.
- **Collapsible Sidebar:** Easily navigate through your chat history with a smooth, collapsible sidebar.
- **Functional Chat Management:** Start new chats, search through your history, and delete old conversations.
- **Real-time Feel:** Includes loading indicators and auto-scrolling for a smooth user experience.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React (with Vite)
- **Styling:** Tailwind CSS
- **API Communication:** Axios
- **Icons:** Lucide React
- **Text Area:** `react-textarea-autosize`

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** Passport.js (Google OAuth 2.0 Strategy)
- **Session Management:** `express-session` with `connect-mongo` for persistent sessions.
- **AI Integration:** `@google/generative-ai`

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm
- A MongoDB database (local or a free cloud instance from MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/vasu9github/https://github.com/vasu9github/CogniChat.git
    cd CogniChat
    ```

2.  **Install Backend Dependencies:**
    ```sh
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```sh
    cd ../frontend
    npm install
    ```

4.  **Set Up Environment Variables:**
    In the `backend` folder, create a `.env` file and add the following variables. You will need to get your credentials from Google Cloud Console and MongoDB.

    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    SESSION_SECRET=a_very_long_random_string_for_security

    # Google OAuth Credentials
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret

    # Gemini API Key
    GEMINI_API_KEY=your_gemini_api_key
    ```

5.  **Configure Google OAuth Redirect URIs:**
    In your Google Cloud Console, make sure you have added the following to your OAuth client's "Authorized redirect URIs":
    - `http://localhost:3000/auth/google/callback`

### Running the Application

1.  **Start the Backend Server:**
    From the `backend` directory, run:
    ```sh
    npm start
    ```

2.  **Start the Frontend Development Server:**
    Open a new terminal and, from the `frontend` directory, run:
    ```sh
    npm run dev
    ```

Your application should now be running at `http://localhost:5173`.
