import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "../utils/axios"; // Make sure axios is configured properly

// Validation schema
const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(10, "Password must be at most 10 characters")
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
});

export default function Signup({ role }) {
  const navigate = useNavigate();

  const handleSignup = async (values, { setSubmitting }) => {
    try {
      await axios.post("/auth/signup", { ...values, role });
      toast.success("Signup successful!");

      setTimeout(() => {
        navigate(role === "admin" ? "/login/admin" : "/login/user");
      }, 1500);
    } catch (error) {
      const message =
        error?.response?.data?.message || "Signup failed. Try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Create Your Account
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/choose-login"
                  className="text-orange-600 hover:underline"
                >
                  Login here
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
