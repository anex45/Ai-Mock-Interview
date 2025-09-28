# AI Mock Interview Platform

## Project Description

The **AI Mock Interview Platform** is a web application designed to help users practice and improve their interview skills. This platform uses AI to provide real-time feedback on users' answers, enabling them to hone their responses and perform better in actual interviews. The application features a sleek, modern design with consistent color schemes and intuitive navigation.

### Key Features
- **Interactive Mock Interviews:** Users can participate in mock interviews, answer questions, and receive instant feedback.
- **Speech-to-Text Integration:** Users can record their answers verbally, and the application will convert their speech to text for analysis.
- **Real-Time Feedback:** The AI analyzes users' answers, providing ratings and constructive feedback to help them improve.
- **User Authentication:** Secure login and user management using Clerk for authentication.

## Technologies Used

- **Frontend:** React, Next.js, Tailwind CSS, Clerk for authentication
- **Backend:** Custom API for managing interview data and feedback
- **Database:** DRIZZLE ORM database setup with schema for user answers and feedback
- **Speech Recognition:** `react-hook-speech-to-text` for speech-to-text functionality

## Setup Instructions

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anex45/AI_Interview.git
   cd ai-mock-interview-platform

2.Install the dependency :
    npm install
    # or
    yarn install