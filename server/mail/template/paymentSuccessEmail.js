exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
    return `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>Payment Confirmation</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style type="text/tailwindcss">
              @layer utilities {
                  .bg-primary {
                      background-color: #4f46e5;
                  }
                  .text-primary {
                      color: #4f46e5;
                  }
                  .border-primary {
                      border-color: #4f46e5;
                  }
              }
          </style>
      </head>
      
      <body class="bg-gray-50 font-sans">
          <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden my-8">
              <!-- Header -->
              <div class="bg-primary py-6 px-8 text-center">
                  <a href="https://notex-app.vercel.app" class="inline-block">
                      <h1 class="text-3xl font-bold text-white">NoteX</h1>
                  </a>
                  <h2 class="text-xl text-white mt-2">Payment Confirmation</h2>
              </div>
              
              <!-- Content -->
              <div class="px-8 py-10">
                  <p class="text-gray-700 mb-6">Dear ${name},</p>
                  
                  <div class="bg-blue-50 border-l-4 border-primary p-4 mb-6">
                      <p class="text-gray-800 font-medium">We have successfully received your payment of</p>
                      <p class="text-2xl font-bold text-primary mt-1">₹${amount}</p>
                  </div>
                  
                  <div class="space-y-4 mb-8">
                      <div class="flex justify-between border-b pb-2">
                          <span class="text-gray-600">Order ID:</span>
                          <span class="font-medium">${orderId}</span>
                      </div>
                      <div class="flex justify-between border-b pb-2">
                          <span class="text-gray-600">Payment ID:</span>
                          <span class="font-medium">${paymentId}</span>
                      </div>
                      <div class="flex justify-between border-b pb-2">
                          <span class="text-gray-600">Date:</span>
                          <span class="font-medium">${new Date().toLocaleDateString()}</span>
                      </div>
                  </div>
                  
                  <a href="https://notex-app.vercel.app/dashboard" 
                     class="inline-block bg-primary hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
                      Access Your Courses
                  </a>
              </div>
              
              <!-- Footer -->
              <div class="bg-gray-50 px-8 py-6 text-center">
                  <p class="text-gray-600 text-sm mb-2">If you have any questions or need assistance, please contact us at</p>
                  <a href="mailto:support@notex.com" class="text-primary hover:underline">support@notex.com</a>
                  
                  <div class="mt-4 pt-4 border-t border-gray-200">
                      <p class="text-xs text-gray-500">© ${new Date().getFullYear()} NoteX. All rights reserved.</p>
                  </div>
              </div>
          </div>
      </body>
      
      </html>`
}