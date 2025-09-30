## Phase 1 : Core PlatForm - Completed

### Overview
MailFlow is a web-based system for creating, managing, and sending email campaigns. It helps users reach multiple recipients, track email performance, and analyze engagement with real-time analytics.

<img width="1897" height="880" alt="image" src="https://github.com/user-attachments/assets/dbfafe3f-8644-48a6-8546-14bb5340fa91" />


## Project URLs
* Frontend :  http://localhost:3001
* Backend API:  http://localhost:3000

## Implemented Features
* Campaign Management: Create, edit, delete, and send campaigns.
* Recipient Management: Manage contacts and target registered users.
* Email Sending: Integrated with SendGrid, tracks failed deliveries.
* Analytics: Monitor emails sent, opened, and clicked; view charts and detailed stats.
* Tracking: Embedded pixels track opens and link clicks automatically.

## Tech Stacks Used
**Frontend:**
* React.js
* Bootstrap styling
* Axios for API calls
* Recharts

**Backend:**
* Node.js/Express.js
* JWT for Authenciation
* Bcrypt for hashing password
* Cors

**Database:**
* Mongoose for models
* MongoDB

**Email Service:**
* SendGrid

## WorkFlow
* User creates a campaign with a title and message.
* Selects recipients from contacts or registered users.
* Sends the campaign via SendGrid.
* Analytics track sent, opened, and clicked emails.
* Dashboard displays charts and detailed campaign stats.

## Benefits
* Simplifies email marketing and communication.
* Provides real-time insights into campaign performance.
* Prevents duplicate emails and tracks failed deliveries.

## Attached Screenshots
**1.Dashboard**

<img width="1920" height="875" alt="image" src="https://github.com/user-attachments/assets/5ab81746-ba6c-4437-a5e7-2a3e2d71a020" />

**2.Campaign**

<img width="1901" height="867" alt="image" src="https://github.com/user-attachments/assets/7c2ddc9a-6451-4891-ac6a-c7242a5ab724" />

**3.Contact**

<img width="1912" height="881" alt="image" src="https://github.com/user-attachments/assets/8e642c54-5344-41bb-bfe8-e21e53841143" />

**4.Analytics**

<img width="1897" height="879" alt="image" src="https://github.com/user-attachments/assets/18b5b51c-e084-4555-b1bb-b99b057e171d" />

## Phase 2 : AI Integration - Completed

## Overview
Phase 2 enhances MailFlow with AI-powered features for content generation, subject line suggestions, personalization, send-time optimization, and A/B testing using OpenAI.

## Project URLs
* AI API : http://localhost:5002

## Implemented AI Features

* Generate Email Content: Automatically create professional email content based on campaign title or description.
* Suggest Subject Lines: Generate multiple catchy and engaging subject lines.
* Personalize Emails: Customize emails for recipients using names and company information.
* Suggest Best Send Time: Analyze campaign analytics to suggest the optimal send time.
* Run A/B Tests: Generate multiple content variations to test performance.

## Tech Stack

* AI Integration: OpenAI API (GPT-4o-mini), Axios
* Backend: Node.js/Express.js, MongoDB/Mongoose, JWT auth, AI endpoints
* Frontend: React.js, Bootstrap, Axios, Recharts

## Workflow

* User creates a campaign.
* User can generate AI-powered content, suggest subject lines, personalize emails, get send-time suggestions, and create A/B test variations.
* All AI actions update the campaign form in real-time.
* Campaigns are sent and analytics continue to track performance.

## Benefits

* Faster Campaign Creation: Automatically generate professional email content, saving time and effort.
* Higher Engagement: Suggests catchy subject lines that increase open rates.
* Personalization at Scale: Customize emails for each recipient with names, company info, or other details.
* Optimized Send Time: Analyzes past campaign data to recommend the best time to send emails for higher engagement.
* Data-Driven Decisions: AI-generated A/B test variations help determine the most effective content.

## Installation Setup
**1.Clone the repository:**

* git clone https://github.com/Anasmohamedamd/MailFlow-Interview-Sys.git
* cd MailFlow-Interview-Sys

**2.Install backend dependencies:**

* cd backend
* npm install

**3.Install frontend dependencies:**

* cd frontend
* npm install

**4.start backend server:**

* cd backend
* npm run dev

**5.start frontend server:**

* cd frontend
* npm start

**6.start ai server:**

* cd ai-service
* npm run dev

## API Endpoints

**Authenciation:**

* POST /auth/register - Create a register
* POST /auth/login - Create a login
* GET  /auth/users - Get users 
* GET  /auth/users/:id - Get a user by ID
* PUT  /auth/users/:id - Update a user by ID 
* DELETE  /auth/users/:id - Delete a user ID


**Campaign:**

* POST /campaign/create – Create a new campaign
* GET /campaign/read – Get all campaigns for logged-in user
* PUT /campaign/update/:id – Update campaign by ID
* DELETE /campaign/delete/:id – Delete campaign by ID
* POST /campaign/send/:id – Send campaign emails

**Contacts:**

* POST /contact/create – Create contact
* GET /contact/read – Get all contacts
* PUT /contact/update/:id – Update contact
* DELETE /contact/delete/:id – Delete contact

**Analytics:**

* GET /analytics/read – Get all campaign analytics for logged-in user
* GET /analytics/:campaignId – Get analytics for a specific campaign
* GET /analytics/open/:campaignId – Track email open
* GET /analytics/click/:campaignId – Track email click

**AI Service:**

* POST /ai/generate-email – Generate email content
* POST /ai/subject-lines – Suggest subject lines
* POST /ai/personalize – Personalize email content
* POST /ai/suggest-send-time – Suggest optimal send time
* POST /ai/run-ab-test – Generate A/B test variations