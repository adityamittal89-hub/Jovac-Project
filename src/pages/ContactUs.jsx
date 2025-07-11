import React, { useState } from "react";
import FormInput from "../components/FormInput";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form data:", form);
    setSuccess(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Contact Us</h2>
      <form className="bg-white shadow rounded p-8" onSubmit={handleSubmit}>
        {success && (
          <div className="bg-green-100 text-green-600 px-3 py-2 rounded mb-4 text-sm">
            Message sent! We'll get back to you soon.
          </div>
        )}
        <FormInput
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 mt-2"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;