## Phase 1 : Core PlatForm - Completed

### Overview
MailFlow is a web-based system for creating, managing, and sending email campaigns. It helps users reach multiple recipients, track email performance, and analyze engagement with real-time analytics.

### Project URLs
* Frontend :  http://localhost:3001
* Backend API:  http://localhost:3000

### Implemented Features
* Campaign Management: Create, edit, delete, and send campaigns.
* Recipient Management: Manage contacts and target registered users.
* Email Sending: Integrated with SendGrid, tracks failed deliveries.
* Analytics: Monitor emails sent, opened, and clicked; view charts and detailed stats.
* Tracking: Embedded pixels track opens and link clicks automatically.

### Tech Stacks Used
**Frontend:**
* React.js
* Bootstrap styling
* Axios for API calls
* Recharts

**Backend:**
* Node.js/Express.js
* JWT Authenciation

**Database:**
* Mongoose for models
* MongoDB

**Email Service:**
* SendGrid

### WorkFlow
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


## Installation Setup
1.Clone the repository:

git clone https://github.com/Anasmohamedamd/MailFlow-Interview-Sys.git
cd MailFlow-Interview-Sys

2.Install backend dependencies:

cd backend
npm install

3.Install frontend dependencies:

cd frontend
npm install

4.start backend server:

cd backend
npm run dev

5.start frontend server:
cd frontend
npm start

## API Endpoints

Authenciation:

-POST /auth/register - Create a register
-POST /auth/login - Create a login
-GET  /auth/users - Get users 
-GET  /auth/users/:id - Get a user by ID
-PUT  /auth/users/:id - Update a user by ID 
-DELETE  /auth/users/:id - Delete a user ID


Campaign

-POST /campaign/create – Create a new campaign
-GET /campaign/read – Get all campaigns for logged-in user
-PUT /campaign/update/:id – Update campaign by ID
-DELETE /campaign/delete/:id – Delete campaign by ID
-POST /campaign/send/:id – Send campaign emails

Contacts

-POST /contact/create – Create contact
-GET /contact/read – Get all contacts
-PUT /contact/update/:id – Update contact
-DELETE /contact/delete/:id – Delete contact

Analytics

-GET /analytics/read – Get all campaign analytics for logged-in user
-GET /analytics/:campaignId – Get analytics for a specific campaign
-GET /analytics/open/:campaignId – Track email open
-GET /analytics/click/:campaignId – Track email click

