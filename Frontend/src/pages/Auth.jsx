import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import apiService from "../api/apiService";
import "./auth.css";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("student");

  const navigate = useNavigate();
  const { login: authLogin, isAuthenticated } = useAuth();

  // If authenticated, go to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleFormSwitch = (toSignup) => {
    setIsFlipping(true);
    setTimeout(() => {
      setIsSignup(toSignup);
      setIsFlipping(false);
    }, 250);
  };

  // Manual login
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoggingIn(true);

    try {
      const response = await apiService.auth.login({ email, password });
      // response now only contains { user } - no token since it's in httpOnly cookie
      authLogin(response.user);
      navigate("/");
    } catch (error) {
      console.error('Login failed:', error);
      alert(error.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Register
  const handleRegister = async () => {
    if (!email || !password || !username) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoggingIn(true);

    try {
      await apiService.auth.register({ name: username, email, password, role });
      // After register, log in automatically
      const response = await apiService.auth.login({ email, password });
      authLogin(response.user);
      navigate("/");
    } catch (error) {
      console.error('Register failed:', error);
      alert(error.message || "Registration failed.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="shader-gradient-background">
        <ShaderGradientCanvas style={{ position: "fixed", inset: 0, zIndex: -1 }}>
          <ShaderGradient
            animate="on"
            axesHelper="off"
            brightness={1.2}
            cAzimuthAngle={170}
            cDistance={4.3}
            cPolarAngle={70}
            cameraZoom={1}
            color1="#5F736F"
            color2="#4A5B55"
            color3="#34463D"
            destination="onCanvas"
            embedMode="off"
            envPreset="city"
            format="gif"
            fov={45}
            frameRate={10}
            gizmoHelper="hide"
            grain="off"
            lightType="3d"
            pixelDensity={1}
            positionX={0}
            positionY={0.9}
            positionZ={-0.3}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={45}
            rotationY={0}
            rotationZ={0}
            shader="defaults"
            type="waterPlane"
            uAmplitude={0}
            uDensity={1.1}
            uFrequency={0}
            uSpeed={0.1}
            uStrength={3.5}
            uTime={0}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </div>

      <div className="wrapper">
        <div className={`form ${isFlipping ? "flip-2-ver-right-fwd" : ""}`}>
          <div className="title">
            {isSignup ? "Create Account" : "Welcome Back"}
          </div>

          {/* LOGIN */}
          {!isSignup && (
            <>
              <div className="input-container">
                <input
                  className="login-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoggingIn}
                />
              </div>

              <div className="input-container password-container">
                <input
                  className="login-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoggingIn}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoggingIn}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>

              <div className="login-button">
                <button 
                  className="login-btn" 
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Logging in..." : "Login"}
                </button>
              </div>

              <div className="auth-footer-text login-footer">
                No account?{" "}
                <span onClick={() => handleFormSwitch(true)}>
                  Create one
                </span>
              </div>
            </>
          )}

          {/* SIGNUP */}
          {isSignup && (
            <>
              <div className="input-container">
                <input
                  className="login-input"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="input-container">
                <input
                  className="login-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-container password-container">
                <input
                  className="login-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>

              <div className="input-container role-selector">
                <label className="role-label">I am a:</label>
                <div className="role-options">
                  <label className={`role-option ${role === 'student' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={role === 'student'}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <span className="role-icon">👨‍🎓</span>
                    <span className="role-text">Student</span>
                  </label>
                  <label className={`role-option ${role === 'teacher' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="role"
                      value="teacher"
                      checked={role === 'teacher'}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <span className="role-icon">👨‍🏫</span>
                    <span className="role-text">Teacher</span>
                  </label>
                </div>
              </div>

              <div className="login-button">
                <button className="login-btn" onClick={handleRegister}>
                  Register
                </button>
              </div>

              <div className="auth-footer-text login-footer">
                Already registered?{" "}
                <span onClick={() => handleFormSwitch(false)}>
                  Sign in
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
