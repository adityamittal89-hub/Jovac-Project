import React from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-white border-t mt-8">
    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
      <div className="text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Bartrly. All rights reserved.
      </div>
      <div className="flex gap-4 mt-2 md:mt-0">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-xl text-gray-500 hover:text-indigo-600" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-xl text-gray-500 hover:text-indigo-600" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;