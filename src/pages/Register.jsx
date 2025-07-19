import React from "react";
import { SignUp } from "@clerk/clerk-react";

const Register = () => (
  <div className="flex items-center justify-center min-h-[70vh]">
    <div className="w-full max-w-md">
      <SignUp
        path="/register"
        routing="path"
        signInUrl="/login"
        redirectUrl="/dashboard"
      />
    </div>
  </div>
);

export default Register;

