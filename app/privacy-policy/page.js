import React from 'react';

const PrivacyPolicy = () => {
  const date = new Date().getFullYear(); // Get current year for "Effective Date"

  return (
    <div className="bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>

        {/* Effective Date */}
        <p className="text-gray-200 mb-6">
          <strong>Effective Date:</strong> {date}
        </p>

        {/* Intro Paragraph */}
        <p className="text-gray-200 mb-6">
          At CupFund, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information.
        </p>

        {/* Section: Information Collected */}
        <h2 className="text-xl font-bold mb-4">Information We Collect:</h2>
        <ul className="list-disc pl-6 mb-6">
          <li className="text-gray-200">Personal Information: Name, email address, phone number, etc.</li>
          <li className="text-gray-200">Payment Information: Processed securely through Razorpay.</li>
          <li className="text-gray-200">Usage Data: Information on how you use our site.</li>
        </ul>

        {/* Section: How Information Is Used */}
        <h2 className="text-xl font-bold mb-4">How We Use Your Information:</h2>
        <ul className="list-disc pl-6 mb-6">
          <li className="text-gray-200">To provide and maintain our service.</li>
          <li className="text-gray-200">To notify you about changes to our service.</li>
          <li className="text-gray-200">To provide customer support.</li>
          <li className="text-gray-200">To gather insights that improve our service.</li>
        </ul>

        {/* Data Security */}
        <p className="text-gray-200 mb-6">
          <strong>Data Security:</strong> We use industry-standard encryption to protect your personal data and payment information.
        </p>

        {/* User Rights */}
        <p className="text-gray-200 mb-6">
          <strong>Your Rights:</strong> You can access, update, and delete your personal information anytime.  
          Contact us at 
          <a href="mailto:support@CupFund.com" className="text-blue-500 hover:underline"> support@CupFund.com</a>.
        </p>

        {/* Ending link */}
        <p className="text-gray-200">
          For more details, please read our full 
          <a href="#" className="text-blue-500 hover:underline"> Privacy Policy</a>.
        </p>

        {/* Decorative gradient backgrounds */}
        <div
          className="absolute top-0 left-0 z-0 h-1/3 w-full"
          style={{
            backgroundImage: "linear-gradient(to left bottom, rgba(79, 70, 229, 0.2) 0%, transparent 50%, transparent 100%)",
          }}
        ></div>

        <div
          className="absolute top-0 right-0 z-0 h-1/3 w-full"
          style={{
            backgroundImage: "linear-gradient(to right bottom, rgba(220, 38, 38, 0.2) 0%, transparent 50%, transparent 100%)",
          }}
        ></div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;