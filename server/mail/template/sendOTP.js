const sendOTP = (otp) => {
    return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Your Verification Code | CodePlay</title>
    <style>
      /* Modern CSS Reset */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      /* Premium Styling */
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        background-color: #f8fafc;
        color: #0f172a;
        line-height: 1.6;
        padding: 24px;
      }
      
      .email-card {
        max-width: 480px;
        margin: 0 auto;
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 
          0 10px 15px -3px rgba(0, 0, 0, 0.02),
          0 4px 6px -4px rgba(0, 0, 0, 0.02);
        border: 1px solid rgba(241, 245, 249, 0.8);
      }
      
      .header {
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        padding: 28px;
        text-align: center;
      }
      
      .header h1 {
        font-size: 22px;
        font-weight: 600;
        letter-spacing: -0.01em;
      }
      
      .content {
        padding: 32px;
      }
      
      .intro-text {
        color: #475569;
        margin-bottom: 24px;
        font-size: 15px;
      }
      
      .otp-display {
        background: #f1f5f9;
        border-radius: 12px;
        padding: 24px;
        margin: 32px 0;
        text-align: center;
        position: relative;
        overflow: hidden;
      }
      
      .otp-display::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6);
      }
      
      .otp-code {
        font-family: 'Space Mono', monospace;
        font-size: 40px;
        font-weight: 700;
        letter-spacing: 8px;
        color: #0f172a;
        display: inline-block;
        padding: 8px 16px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(15, 23, 42, 0.05);
      }
      
      .timer {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #fef2f2;
        color: #dc2626;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 500;
        margin-top: 16px;
      }
      
      .footer {
        text-align: center;
        padding: 24px;
        color: #94a3b8;
        font-size: 13px;
        border-top: 1px solid #f1f5f9;
      }
      
      .security-note {
        background: #f8fafc;
        border-left: 3px solid #e2e8f0;
        padding: 12px 16px;
        font-size: 13px;
        color: #64748b;
        margin-top: 24px;
        border-radius: 0 6px 6px 0;
      }
    </style>
  </head>
  <body>
    <div class="email-card">
      <div class="header">
        <h1>Account Verification</h1>
      </div>
      
      <div class="content">
        <p class="intro-text">Please use this verification code to secure your NoteX account:</p>
        
        <div class="otp-display">
          <div class="otp-code">${otp}</div>
          <div class="timer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Expires in 5 minutes
          </div>
        </div>
        
        <div class="security-note">
          For security reasons, please don't share this code with anyone.
        </div>
      </div>
      
      <div class="footer">
        © ${new Date().getFullYear()} NoteX • All rights reserved
      </div>
    </div>
  </body>
  </html>`;
  };
  
  module.exports = sendOTP;


// const sendOTP = (otp) => {
//   return `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Your Verification Code | CodePlay</title>
//   <style>
//     /* Modern CSS Reset */
//     * {
//       margin: 0;
//       padding: 0;
//       box-sizing: border-box;
//     }
    
//     /* Premium Styling */
//     body {
//       font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//       background-color: #f8fafc;
//       color: #0f172a;
//       line-height: 1.6;
//       padding: 24px;
//     }
    
//     .email-container {
//       max-width: 480px;
//       margin: 0 auto;
//       background: white;
//       border-radius: 16px;
//       overflow: hidden;
//       box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
//       border: 1px solid rgba(241, 245, 249, 0.8);
//       transition: transform 0.2s ease, box-shadow 0.2s ease;
//     }
    
//     .email-container:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
//     }
    
//     .header {
//       background: linear-gradient(135deg, #6366f1, #8b5cf6);
//       color: white;
//       padding: 28px;
//       text-align: center;
//     }
    
//     .header h1 {
//       font-size: 22px;
//       font-weight: 600;
//       letter-spacing: -0.01em;
//     }
    
//     .content {
//       padding: 32px;
//     }
    
//     .intro-text {
//       color: #475569;
//       margin-bottom: 24px;
//       font-size: 15px;
//     }
    
//     .otp-container {
//       background: #f8fafc;
//       border-radius: 12px;
//       padding: 24px;
//       margin: 32px 0;
//       text-align: center;
//       position: relative;
//       overflow: hidden;
//       border: 1px solid rgba(226, 232, 240, 0.6);
//     }
    
//     .otp-container::before {
//       content: "";
//       position: absolute;
//       top: 0;
//       left: 0;
//       right: 0;
//       height: 4px;
//       background: linear-gradient(90deg, #6366f1, #8b5cf6);
//     }
    
//     .otp-code {
//       font-family: 'Roboto Mono', monospace;
//       font-size: 42px;
//       font-weight: 700;
//       letter-spacing: 8px;
//       color: #0f172a;
//       display: inline-block;
//       padding: 12px 24px;
//       background: white;
//       border-radius: 8px;
//       box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
//       margin: 12px 0;
//       animation: fadeIn 0.5s ease;
//     }
    
//     @keyframes fadeIn {
//       from { opacity: 0; transform: translateY(10px); }
//       to { opacity: 1; transform: translateY(0); }
//     }
    
//     .timer {
//       display: inline-flex;
//       align-items: center;
//       gap: 6px;
//       background: #fef2f2;
//       color: #dc2626;
//       padding: 8px 16px;
//       border-radius: 20px;
//       font-size: 14px;
//       font-weight: 500;
//       margin-top: 16px;
//     }
    
//     .cta-button {
//       display: block;
//       width: 100%;
//       background: linear-gradient(135deg, #6366f1, #8b5cf6);
//       color: white;
//       text-align: center;
//       padding: 14px;
//       border-radius: 8px;
//       text-decoration: none;
//       font-weight: 600;
//       margin: 24px 0;
//       transition: all 0.2s ease;
//       border: none;
//       cursor: pointer;
//     }
    
//     .cta-button:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
//     }
    
//     .security-note {
//       background: #f8fafc;
//       border-left: 3px solid #e2e8f0;
//       padding: 14px 16px;
//       font-size: 14px;
//       color: #64748b;
//       margin-top: 24px;
//       border-radius: 0 6px 6px 0;
//     }
    
//     .footer {
//       text-align: center;
//       padding: 24px;
//       color: #94a3b8;
//       font-size: 13px;
//       border-top: 1px solid #f1f5f9;
//     }
    
//     .footer-links {
//       margin-top: 12px;
//     }
    
//     .footer-link {
//       color: #64748b;
//       text-decoration: none;
//       margin: 0 8px;
//       transition: color 0.2s ease;
//     }
    
//     .footer-link:hover {
//       color: #6366f1;
//     }
//   </style>
// </head>
// <body>
//   <div class="email-container">
//     <div class="header">
//       <h1>Account Verification</h1>
//     </div>
    
//     <div class="content">
//       <p class="intro-text">Please use this verification code to complete your CodePlay account setup:</p>
      
//       <div class="otp-container">
//         <div class="otp-code">${otp}</div>
//         <div class="timer">
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//             <circle cx="12" cy="12" r="10"></circle>
//             <polyline points="12 6 12 12 16 14"></polyline>
//           </svg>
//           Expires in 5 minutes
//         </div>
//       </div>
      
//       <a href="https://codeplay-edtech-project.vercel.app/verify" class="cta-button">Verify My Account</a>
      
//       <div class="security-note">
//         <strong>Security Tip:</strong> Never share this code with anyone, including CodePlay support. We'll never ask for it.
//       </div>
//     </div>
    
//     <div class="footer">
//       © ${new Date().getFullYear()} CodePlay
//       <div class="footer-links">
//         <a href="https://codeplay-edtech-project.vercel.app/help" class="footer-link">Help</a>
//         <a href="https://codeplay-edtech-project.vercel.app/privacy" class="footer-link">Privacy</a>
//         <a href="https://codeplay-edtech-project.vercel.app/terms" class="footer-link">Terms</a>
//       </div>
//     </div>
//   </div>
// </body>
// </html>`;
// };

// module.exports = sendOTP;