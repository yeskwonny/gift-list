import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { Link as MUILink } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../hooks/useAuth";

const Signup = () => {
  const { user, authLoading } = useAuth();
  const navigate = useNavigate();
  if (authLoading) return null;

  if (user) {
    return <Navigate to="/gifts/list" replace />;
  }

  return (
    <AuthForm
      submitLabel="Sign up"
      onSubmit={async ({ email, password }) => {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          toast.success("Account created!");
          navigate("/gifts/list", { replace: true });
        } catch (error) {
          if (error instanceof FirebaseError) {
            toast.error(error.message);
          } else {
            toast.error("Something went wrong");
          }
        }
      }}
    >
      {/* page navigation */}
      <Link to={"/login"} style={{ alignSelf: "center" }}>
        <MUILink>Login</MUILink>
      </Link>
    </AuthForm>
  );
};

export default Signup;
