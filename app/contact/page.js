import React from "react";

const ContactUs = () => {
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
          <h1 className="text-4xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-gray-400 text-lg">
            We’d love to hear from you!
          </p>
        </header>

        {/* Contact Details */}
        <section className="bg-neutral-900/50 rounded-lg shadow-lg p-6 md:p-10 text-center space-y-4">
          <p className="text-gray-300 text-lg">
            If you have any questions, feedback, or need support, feel free to
            reach out to us:
          </p>
          <div className="flex flex-col gap-2 text-gray-200">
            <span>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@CupFund.com"
                className="text-blue-400 hover:underline"
              >
                support@CupFund
              </a>
            </span>
            <span>
              <strong>Phone:</strong> +1-800-123-4567
            </span>
            <span>
              <strong>Address:</strong> 123 Creator Lane, Innovation City, CA
              90210
            </span>
          </div>
        </section>

        {/* Social Media */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
          <p className="text-gray-400 mb-6">
            Stay connected and get the latest updates:
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="px-5 py-2 border border-gray-500 rounded-full hover:bg-gray-800 transition"
            >
              Twitter
            </a>
            <a
              href="#"
              className="px-5 py-2 border border-gray-500 rounded-full hover:bg-gray-800 transition"
            >
              Facebook
            </a>
            <a
              href="#"
              className="px-5 py-2 border border-gray-500 rounded-full hover:bg-gray-800 transition"
            >
              Instagram
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
