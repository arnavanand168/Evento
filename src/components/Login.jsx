import React from 'react';
import { useAppContext } from '../context/AppContext';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Login = ({ onClose }) => {
  const [mode, setMode] = React.useState("login");

  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState("");

  const [signupName, setSignupName] = React.useState("");
  const [signupMobile, setSignupMobile] = React.useState("");
  const [signupEmail, setSignupEmail] = React.useState("");
  const [signupPassword, setSignupPassword] = React.useState("");
  const [signupError, setSignupError] = React.useState("");

  const { setuser } = useAppContext();

  const onLoginSubmit = (event) => {
    event.preventDefault();
    if (!isValidEmail(loginEmail)) {
      setLoginError("Please enter a valid email address.");
      return;
    }
    setLoginError("");
    setuser({
      email: loginEmail,
      name: "Demo User"
    });
    if (onClose) onClose();
  };

  const onSignupSubmit = (event) => {
    event.preventDefault();
    if (!isValidEmail(signupEmail)) {
      setSignupError("Please enter a valid email address.");
      return;
    }
    setSignupError("");
    setuser({
      email: signupEmail,
      name: signupName
    });
    if (onClose) onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className="relative z-10 bg-white/95 shadow-2xl rounded-2xl p-8 w-[340px] md:w-[400px] h-[500px] flex flex-col items-center mx-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
        {mode === "login" ? (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 mt-2">Login</h2>
            <p className="text-sm text-gray-500 mb-5 text-center">Welcome back! Please Sign In to continue</p>
            <form onSubmit={onLoginSubmit} className="w-full flex flex-col gap-4 flex-grow">
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 rounded-full px-5 py-2 text-sm outline-none focus:border-primary"
                required
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 rounded-full px-5 py-2 text-sm outline-none focus:border-primary"
                required
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
              />
              {loginError && (
                <div className="text-xs text-red-500">{loginError}</div>
              )}
              <button
                type="submit"
                className="bg-primary text-white rounded-full py-2 font-medium mt-2 hover:bg-primary-dull transition"
              >
                Login
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              Don’t have an account?{" "}
              <span
                className="text-primary hover:underline cursor-pointer"
                onClick={() => { setMode("signup"); setLoginError(""); }}
              >
                Sign Up
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 mt-2">Sign Up</h2>
            <p className="text-sm text-gray-500 mb-5 text-center">Create your Evento account to get started</p>
            <form onSubmit={onSignupSubmit} className="w-full flex flex-col gap-4 flex-grow">
              <input
                type="text"
                placeholder="Full Name"
                className="border border-gray-300 rounded-full px-5 py-2 text-sm outline-none focus:border-primary"
                required
                value={signupName}
                onChange={e => setSignupName(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Mobile No."
                className="border border-gray-300 rounded-full px-5 py-2 text-sm outline-none focus:border-primary"
                required
                value={signupMobile}
                onChange={e => setSignupMobile(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 rounded-full px-5 py-2 text-sm outline-none focus:border-primary"
                required
                value={signupEmail}
                onChange={e => setSignupEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 rounded-full px-5 py-2 text-sm outline-none focus:border-primary"
                required
                value={signupPassword}
                onChange={e => setSignupPassword(e.target.value)}
              />
              {signupError && (
                <div className="text-xs text-red-500">{signupError}</div>
              )}
              <button
                type="submit"
                className="bg-primary text-white rounded-full py-2 font-medium mt-2 hover:bg-primary-dull transition"
              >
                Sign Up
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              Already have an account?{" "}
              <span
                className="text-primary hover:underline cursor-pointer"
                onClick={() => { setMode("login"); setSignupError(""); }}
              >
                Login
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
