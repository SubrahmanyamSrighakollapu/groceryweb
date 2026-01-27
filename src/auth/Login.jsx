import { Lock, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { styles } from '../styles/authStyles';
import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  // show only the first visible error to avoid multiple messages and scrollbars
  const visibleErrorKey = Object.keys(errors).find(k => errors[k] && touched[k]);

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'emailOrUsername':
        if (!value.trim()) {
          error = 'Email or Username is required';
        } else if (value.length < 3) {
          error = 'Must be at least 3 characters';
        }
        break;

      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({
        ...errors,
        [name]: error
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({
      emailOrUsername: true,
      password: true
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setLoading(true);
        const response = await api.post('/auth/login', {
          email: formData.emailOrUsername,
          password: formData.password
        });

        if (response.status === 1) {
          // Store user data and token in session storage
          sessionStorage.setItem('user', JSON.stringify(response.result.user));
          sessionStorage.setItem('token', response.result.token);
          sessionStorage.setItem('isAuthenticated', 'true');
          
          toast.success('Login successful!');
          
          // Navigate based on role
          if (response.result.user.roleName === 'Super Admin') {
            navigate('/admin');
          } else {
            navigate('/home');
          }
        } else {
          toast.error(response.message || 'Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        toast.error('Login failed. Please check your credentials.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className={styles.card}>
        <div className={styles.avatarCircle}>
          <User className={styles.avatarIcon} />
        </div>
        
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Sign In to continue</p>
        
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <div className={styles.inputWrapper} style={{ 
              border: errors.emailOrUsername && touched.emailOrUsername ? '1px solid #d32f2f' : 'none' 
            }}>
              <div className={styles.inputIcon}>
                <User />
              </div>
              <input
                type="text"
                name="emailOrUsername"
                className={styles.inputField}
                placeholder="Email or Username"
                value={formData.emailOrUsername}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {visibleErrorKey === 'emailOrUsername' && (
              <p className="error-text">{errors.emailOrUsername}</p>
            )} 
          </div>
          
          <div>
            <div className={styles.inputWrapper} style={{ 
              border: errors.password && touched.password ? '1px solid #d32f2f' : 'none' 
            }}>
              <div className={styles.inputIcon}>
                <Lock />
              </div>
              <input
                type="password"
                name="password"
                className={styles.inputField}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {visibleErrorKey === 'password' && (
              <p className="error-text">{errors.password}</p>
            )} 
          </div>
          
          <div className="forget-password">
            <a href="#forgot">Forget Password?</a>
          </div>
          
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        
        <p className={styles.linkText}>
          Don't have an account? <a onClick={() => navigate('/signup')}>Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;