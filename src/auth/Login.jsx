import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { styles } from '../styles/authStyles';
import { useNavigate } from 'react-router-dom';
import heroBg from '../assets/MainPage/super-market.jpg';


const Login = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Blurred background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(2px)',
        transform: 'scale(1.05)',
        zIndex: 0,
      }} />
      {/* White overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        zIndex: 1,
      }} />
      {/* Card */}
      <div className="auth-container" style={{ position: 'relative', zIndex: 2 }}>
      <div className={styles.card}>
        <div className={styles.avatarCircle}>
          <User className={styles.avatarIcon} />
        </div>

        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Sign In to continue</p>

        <form onSubmit={(e) => e.preventDefault()} noValidate>
          <div>
            <div className={styles.inputWrapper}>
              <div className={styles.inputIcon}>
                <Mail />
              </div>
              <input
                type="email"
                name="email"
                className={styles.inputField}
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <div className={styles.inputWrapper} style={{ position: 'relative' }}>
              <div className={styles.inputIcon}>
                <Lock />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className={styles.inputField}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#64748b'
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="forget-password">
            <a href="#forgot">Forget Password?</a>
          </div>

          <button type="submit" className={styles.button}>
            Log In
          </button>
        </form>

        <p className={styles.linkText}>
          Don't have an account? 
          <a
            onClick={() => navigate('/signup')}
            style={{ cursor: 'pointer', color: '#EC5609', marginLeft: '4px' }}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
      </div>
  );
};

export default Login;
