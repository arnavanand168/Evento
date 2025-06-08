import React from "react";

function Footer() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        <div className="md:max-w-96">
          <img
            className="h-9"
            src="/Evento_logo-horizontal.svg"
            alt="dummyLogoDark"
          />
          <p className="mt-6 text-sm">
          Making every celebration memorable-Evento is your trusted partner for weddings, anniversaries, birthdays, and corporate events across India.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Contact Us</h2>
            <div className="text-sm space-y-2">
              <a href="tel:+917982191718">+91 7982191718</a>
              <br></br>
              <a href="mailto:arnav-anand@outlook.com">arnav-anand@outlook.com</a>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2025 © Evento. All Right Reserved.
      </p>
    </footer>
  );
}

export default Footer;
