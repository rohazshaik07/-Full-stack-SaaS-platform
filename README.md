# CareerSync - AI-Driven Job Preparation SaaS

![CareerSync Banner](https://res.cloudinary.com/ded4wm8pu/image/upload/v1748426776/Screenshot_2025-05-28_153323_lpwbhv.png)

CareerSync is a full-stack SaaS platform designed to empower job seekers by optimizing their resumes for ATS (Applicant Tracking Systems) and enhancing job preparation. This project features a robust resume upload system with AI-powered analysis, secure authentication, and a freemium monetization model, showcasing skills in full-stack development, API design, and secure file handling.

**Check my project [CareerSync](https://full-stack-saa-s-platform.vercel.app) ✨** 
## Features

- **Resume Upload System**:
  - Supports PDF (.pdf) and Microsoft Word (.doc, .docx) formats with a 10MB size limit.
  - Extracts personal information (name, email, phone) using `pdf2json` and `mammoth`.
  - Performs ATS optimization with keyword analysis, formatting suggestions, and scoring (based on keywords, formatting, and length).
  - Provides detailed feedback with matched/missing keywords and actionable suggestions.
- **Secure Authentication**:
  - Supports Google OAuth and GitHub OAuth via Auth.js for user authentication.
- **Monetization**:
  - Freemium model with usage limits (e.g., 5 resume saves/month for free users).
  - Mock premium tier for unlimited features, simulated without a payment gateway.
- **Database**:
  - Stores resumes securely in MongoDB, associated with user accounts.
- **Scalable Architecture**:
  - Frontend built with Next.js, React, and Tailwind CSS (glassmorphism UI).
  - Backend powered by Node.js/Express.js with RESTful APIs.
  - Deployed on Vercel (frontend) and Render (backend).

## Tech Stack

- **Frontend**:
  - Next.js 13+ (App Router)
  - React 18+
  - Tailwind CSS
  - shadcn/ui components
  - Lucide React (icons)
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - `pdf2json` (PDF parsing)
  - `mammoth` (Word document parsing)
  - `multer` (file uploads)
- **Authentication**:
  - Auth.js with Google OAuth and GitHub OAuth
- **Deployment**:
  - Frontend: Vercel
  - Backend: Render (free tier)

## Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Google Cloud Console and GitHub Developer Settings credentials for OAuth
- GitHub account for repository hosting
- Vercel and Render accounts for deployment

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/your-username/careersync.git
cd careersync
```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd careersync-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create an `uploads` directory for temporary file storage:
   ```bash
   mkdir uploads
   ```
4. Create a `.env` file with the following variables:
   ```
   PORT=3001
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/careersync?retryWrites=true&w=majority
   NEXTAUTH_SECRET=your-nextauth-secret
   ```
   - Replace `<username>` and `<password>` with your MongoDB Atlas credentials.
   - Generate a `NEXTAUTH_SECRET` using `openssl rand -base64 32`.
5. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:3001`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd careersync-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
   NEXTAUTH_URL=https://your-vercel-domain.vercel.app
   NEXTAUTH_SECRET=your-nextauth-secret
   AUTH_GOOGLE_ID=your-google-client-id
   AUTH_GOOGLE_SECRET=your-google-client-secret
   AUTH_GITHUB_ID=your-github-client-id
   AUTH_GITHUB_SECRET=your-github-client-secret
   ```
   - Use the same `NEXTAUTH_SECRET` as the backend.
   - Obtain `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` from Google Cloud Console.
   - Obtain `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET` from GitHub Developer Settings.
4. Start the frontend server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`.

## API Endpoints

- **POST `/api/resume/upload`**:
  - Uploads and parses a resume, returning personal info and ATS analysis.
  - Request: `multipart/form-data` with `resume` (file) and `jobRole` (string).
  - Response:
    ```json
    {
      "resumeId": "string",
      "personalInfo": {
        "name": "string",
        "email": "string",
        "phone": "string"
      },
      "atsScore": {
        "score": {
          "total": number,
          "details": {
            "keywords": number,
            "formatting": number,
            "length": number
          }
        },
        "matchedKeywords": ["string"],
        "missingKeywords": ["string"],
        "suggestions": ["string"]
      }
    }
    ```
- **POST `/api/resume/ats-score`**: Calculates ATS score for resume text.
- **GET `/api/resume`**: Retrieves all resumes for the authenticated user.
- **GET `/api/resume/:id`**: Retrieves a specific resume by ID.
- **POST `/api/subscriptions/upgrade`**: Simulates upgrading to the premium tier (mock).

All endpoints are secured with Auth.js middleware.

## Deployment

### Backend (Render)

1. Push the `careersync-backend` code to a GitHub repository.
2. Create a new Web Service on Render:
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm run dev`
3. Add environment variables in Render’s dashboard:
   ```
   PORT=3001
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/careersync?retryWrites=true&w=majority
   NEXTAUTH_SECRET=your-nextauth-secret
   ```
4. Deploy and note the backend URL (e.g., `https://careersync-backend.onrender.com`).

### Frontend (Vercel)

1. Push the `careersync-frontend` code to a GitHub repository.
2. Import the repository into Vercel and deploy.
3. Add environment variables in Vercel’s dashboard:
   ```
   NEXT_PUBLIC_BACKEND_URL=https://careersync-backend.onrender.com
   NEXTAUTH_URL=https://your-vercel-domain.vercel.app
   NEXTAUTH_SECRET=your-nextauth-secret
   AUTH_GOOGLE_ID=your-google-client-id
   AUTH_GOOGLE_SECRET=your-google-client-secret
   AUTH_GITHUB_ID=your-github-client-id
   AUTH_GITHUB_SECRET=your-github-client-secret
   ```

## Security Considerations

- File uploads are restricted to PDF/Word files (max 10MB) with server-side validation.
- All API endpoints are protected with Auth.js (Google and GitHub OAuth).
- Text extraction is sanitized to prevent XSS attacks.
- Rate limiting is implemented to prevent abuse.
- Temporary files in `uploads` are deleted after processing.

## Best Practices for Users

- Use PDF format for best compatibility.
- Keep resumes under 5MB for optimal performance.
- Use standard section headings (Experience, Education, Skills).
- Avoid complex layouts, tables, and graphics.
- Ensure text is selectable (not embedded in images).
- Include relevant keywords for the target job role.

## Future Improvements

- Support multi-file uploads for batch processing.
- Add resume versioning to track improvements.
- Include cover letter analysis.
- Implement job description matching for tailored optimization.
- Generate interview questions based on resume content.

## Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For support or feature requests, contact [shaikrohaz@gmail.com](mailto:shaikrohaz@gmail.com) or open an issue on GitHub.

---

**Built by [Rohaz Shaik] | [LinkedIn](https://linkedin.com/in/rohazshaik) **
