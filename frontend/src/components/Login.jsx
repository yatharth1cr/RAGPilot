import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axios";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function Login({ role }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onLoginSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("/auth/login", {
        ...values,
        role,
      });

      const data = response.data;

      if (data.user) {
        login(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful!");

        setTimeout(() => {
          navigate(data.user.role === "admin" ? "/admin" : "/chat");
        }, 1500);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "An error occurred during login"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md transition-all">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          {role === "admin" ? "Admin" : "User"} Login
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={onLoginSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  to={`/signup/${role}`}
                  className="text-orange-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>

      <Toaster richColors position="top-center" />
    </div>
  );
}
