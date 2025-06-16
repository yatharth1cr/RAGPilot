import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful!");
        navigate(data.user.role === "admin" ? "/admin" : "/chat");
      } else {
        toast.error(data.message || "Login failed.");
      }
    } catch (error) {
      toast.error(error.message || "Server error. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl transition-all">
        <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-4 text-center">
          Login
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-base md:text-lg"
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
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-base md:text-lg"
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
                className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition disabled:opacity-50 text-base md:text-lg"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-sm md:text-base text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  to="/choose-signup"
                  className="text-orange-600 hover:underline"
                >
                  Sign Up
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
