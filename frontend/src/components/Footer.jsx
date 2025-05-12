import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center lg:text-left">
          {/* Address Section */}
          <div>
            <h2 className="text-lg font-bold mb-2">Address</h2>
            <p className="text-sm">Nakmorod, Ranisonkial</p>
            <p className="text-sm">Thakurgaon</p>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-lg font-bold mb-2">Contact</h2>
            <p className="text-sm">Phone: +880123456789</p>
            <p className="text-sm">Email: aktarul@example.com</p>
          </div>

          {/* Developer Details Section */}
          <div>
            <h2 className="text-lg font-bold mb-2">Developer Details</h2>
            <p className="text-sm">Md Aktarul Islam</p>
            <p className="text-sm">Software Developer</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-4"></div>

        {/* Footer Bottom */}
        <div className="text-center text-sm">
          <p>&copy; {new Date().getFullYear()} All Rights Reserved by Md Aktarul Islam</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
