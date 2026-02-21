import { Link, Navigate, useNavigate } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AuthForm from "./AuthForm";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { user, authLoading } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (authLoading) return null;
  if (user) {
    return <Navigate to="/gifts/list" replace />;
  }

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/gifts/list");
    } catch (e) {
      if (e instanceof FirebaseError) {
        switch (e.code) {
          case "auth/user-not-found":
            setError("No account found with this email.");
            break;
          case "auth/wrong-password":
            setError("Incorrect password.");
            break;
          case "auth/invalid-email":
            setError("Invalid email address.");
            break;
          default:
            setError("Login failed. Please try again.");
        }
      } else {
        setError("Unexpected error occurred.");
      }
    }
  };

  return (
    <AuthForm submitLabel="Login" onSubmit={handleLogin} error={error}>
      {/* page navigation */}
      <Link to={"/signup"} style={{ alignSelf: "center" }}>
        <MUILink>Signup</MUILink>
      </Link>
    </AuthForm>
  );
};

export default Login;
