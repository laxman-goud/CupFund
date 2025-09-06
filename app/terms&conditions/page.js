import React from 'react';

const TermsAndConditions = () => {
  const date = new Date().getFullYear();

  return (
    <div className="bg-black text-white py-16 px-6 md:px-12 relative">
      {/* Background Gradient Decorations */}
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

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold mb-4">Terms & Conditions</h1>
          <p className="text-gray-400 text-lg">
            <strong>Effective Date:</strong> {date}
          </p>
        </header>

        {/* Terms Content */}
        <section className="space-y-8 text-gray-300 leading-relaxed">
          <p>
            Welcome to <span className="font-semibold">CupFund</span>. By
            using our website, you agree to comply with and be bound by the
            following terms and conditions:
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-3">
              User Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information during registration.</li>
              <li>Use the platform in accordance with all applicable laws and regulations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Prohibited Activities
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fraudulent activities or impersonation.</li>
              <li>Posting harmful, offensive, or illegal content.</li>
            </ul>
          </div>

          <p>
            <strong>Intellectual Property:</strong> All content on this site is
            the property of CupFund or its content suppliers and is
            protected by intellectual property laws.
          </p>

          <p>
            <strong>Disclaimer:</strong> We do not guarantee the success of any
            crowdfunding campaign. Contributions are made at your own risk.
          </p>

          <p>
            <strong>Changes to Terms:</strong> We may update these terms from
            time to time. Continued use of the site constitutes acceptance of
            the revised terms.
          </p>

          <p>
            For more details, please read our full{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Terms & Conditions
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
