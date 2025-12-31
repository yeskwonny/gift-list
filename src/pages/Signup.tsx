import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";
import { Link as MUILink } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Signup = () => {
  return (
    <AuthForm
      submitLabel="Sign up"
      onSubmit={async ({ email, password }) => {
        await createUserWithEmailAndPassword(auth, email, password);
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
