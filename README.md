# QuickResume - AI-Powered Resume Builder

A modern MERN-stack based AI resume builder that allows users to create, edit, and manage resumes through an intuitive dashboard. QuickResume simplifies the resume creation process with structured form handling, dynamic routing, PDF generation, and seamless backend integration.

## Overview

QuickResume is designed to reinforce full-stack fundamentals while providing users with a powerful tool to build professional resumes. The application combines a responsive React frontend with a robust Node.js/Express backend, leveraging MongoDB for persistent data storage.

## Features

- **Dashboard Interface**: Clean, user-friendly dashboard for managing multiple resumes
- **Dynamic Resume Builder**: Structured form-based resume creation with real-time preview
- **Multiple Templates**: Choose from various professionally designed resume templates
- **PDF Export**: Generate and download resumes as PDF files
- **User Authentication**: Secure login and account management
- **AI-Powered Suggestions**: AI assistance for content optimization
- **Real-time Preview**: Live preview of resume as you edit
- **Responsive Design**: Mobile-friendly interface for on-the-go editing

## Tech Stack

### Frontend
- **React** - UI library with Vite for fast development
- **Vite** - Next-generation frontend tooling
- **JavaScript/JSX** - Client-side logic
- **CSS** - Styling and responsive design

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Additional Tools
- **PDF Generation** - For resume export functionality
- **AI/ML APIs** - For intelligent resume suggestions

## Project Structure

```
QuickResume/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── assets/        # Templates and assets
│   │   └── App.jsx        # Main app component
│   └── package.json
├── server/                # Express backend (planned)
└── .gitignore
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd QuickResume
```

2. Install client dependencies
```bash
cd client
npm install
```

3. Install server dependencies (when available)
```bash
cd ../server
npm install
```

4. Create environment files
- Create `.env` in the server directory with MongoDB connection string and API keys

### Running the Application

**Development Mode:**
```bash
# Terminal 1 - Frontend (from client directory)
npm run dev

# Terminal 2 - Backend (from server directory)
npm run dev
```

**Production Build:**
```bash
# Build frontend
cd client
npm run build

# Start backend server
cd ../server
npm start
```

## Learning Outcomes

This project reinforces:
- Full-stack MERN development
- RESTful API design and integration
- Form handling and validation
- Dynamic routing in React
- PDF generation and file handling
- Authentication and authorization
- Database design and management
- State management best practices
- Component-based architecture

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for suggestions and improvements.

## License

This project is open source and available under the MIT License.
