import React from 'react';

const CancellationRefundPolicies = () => {
  const date = new Date().getFullYear(); // Get current year for "Effective Date"

  return (
    <div className="bg-black text-white py-16 px-6 md:px-12 relative">

      {/* --- Background gradient decorations (top-left & bottom-right) --- */}
      <div
        className="absolute top-0 left-0 w-full h-1/3 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to left bottom, rgba(79,70,229,0.15) 0%, transparent 70%)",
        }}
      ></div>

      <div
        className="absolute bottom-0 right-0 w-full h-1/3 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right top, rgba(220,38,38,0.15) 0%, transparent 70%)",
        }}
      ></div>

      {/* --- Main container --- */}
      <div className="max-w-4xl mx-auto space-y-10">

        {/* --- Page Heading --- */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold mb-4">
            Cancellation & Refund Policies
          </h1>
          <p className="text-gray-400 text-lg">
            <strong>Effective Date:</strong> {date}
          </p>
        </header>

        {/* --- Policy Content Section --- */}
        <section className="space-y-8 text-gray-300 leading-relaxed">

          {/* Intro paragraph */}
          <p>
            At <span className="font-semibold">CupFund</span>, we strive
            to ensure the satisfaction of all our users. Please review our
            cancellation and refund policies below:
          </p>

          {/* Contributors Policy */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-3">
              For Contributors
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Contributions made to crowdfunding campaigns are generally non-refundable.</li>

              <li>
                In the event of a fraudulent campaign, please contact us immediately at{" "}
                <a
                  href="mailto:support@CupFund"
                  className="text-blue-400 hover:underline"
                >
                  support@CupFund
                </a>{" "}
                for assistance.
              </li>
            </ul>
          </div>

          {/* Campaign Creators Policy */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-3">
              For Campaign Creators
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>If you need to cancel your campaign, reach out to our support team as early as possible.</li>
              <li>Funds already distributed to you may not be refundable.</li>
            </ul>
          </div>

          {/* Exceptions Section */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Exceptions
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>If a campaign fails to meet its funding goal, contributions may be refunded.</li>
            </ul>
          </div>

          {/* Contact info */}
          <p>
            If you have any questions or need assistance, please reach out to us at{" "}
            <a
              href="mailto:support@CupFund"
              className="text-blue-400 hover:underline"
            >
              support@CupFund
            </a>.
          </p>

        </section>
      </div>
    </div>
  );
};

export default CancellationRefundPolicies;