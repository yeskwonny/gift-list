import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AuthForm from "./AuthForm";

const Login = () => {
  return (
    <AuthForm
      submitLabel="Login"
      onSubmit={async ({ email, password }) => {
        await signInWithEmailAndPassword(auth, email, password);
      }}
    >
      {/* page navigation */}
      <Link to={"/signup"} style={{ alignSelf: "center" }}>
        <MUILink>Signup</MUILink>
      </Link>
    </AuthForm>
  );
};

export default Login;
