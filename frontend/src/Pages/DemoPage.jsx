import React from "react";

const DemoPage = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">📧 MailFlow Demo Instructions</h2>

      {/* Overview */}
      <div className="card p-4 shadow-sm mb-4">
        <h4>Overview</h4>
        <p>
          MailFlow helps you create, manage, and send email campaigns with AI
          assistance. You can manage contacts, track analytics, and optimize send
          times using AI suggestions.
        </p>
      </div>

      {/* Instructions */}
      <div className="card p-4 shadow-sm mb-4">
        <h4>How to Use</h4>
        <ol>
          <li>Create a campaign by entering a title and message.</li>
          <li>Add recipients from your contacts or registered users.</li>
          <li>Send campaigns via MailFlow’s email service.</li>
          <li>Use AI features to enhance your emails:
            <ul>
              <li>Generate professional email content automatically.</li>
              <li>Get catchy subject line suggestions.</li>
              <li>Personalize emails for specific recipients.</li>
              <li>Get AI + Analytics suggestions for best send time.</li>
              <li>Run A/B tests to generate multiple email variations.</li>
            </ul>
          </li>
          <li>View analytics for emails sent, opened, and clicked to improve future campaigns.</li>
          <li>Always preview your campaigns before sending.</li>
          <li>Ensure your contacts are valid and up-to-date.</li>
        </ol>
      </div>

      {/* Getting Started */}
      <div className="card p-4 shadow-sm mb-4">
        <h4>Getting Started</h4>
        <ol>
          <li>Register or login to MailFlow.</li>
          <li>Add contacts under the Contacts section.</li>
          <li>Create your first campaign under Campaigns.</li>
          <li>Use AI features to enhance your email content.</li>
          <li>Send your campaign and monitor analytics.</li>
        </ol>
      </div>

    </div>
  );
};

export default DemoPage;
