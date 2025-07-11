import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import FormInput from "../components/FormInput";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    const ok = register({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    if (ok) {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1000);
    } else {
      setError("Could not register.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <form
        className="bg-white shadow rounded p-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">Create Account</h2>
        {error && (
          <div className="bg-red-100 text-red-600 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-600 px-3 py-2 rounded mb-4 text-sm">
            Registered! Redirecting to login...
          </div>
        )}
        <FormInput
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirm"
          value={form.confirm}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 mt-2"
        >
          Register
        </button>
        <div className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;