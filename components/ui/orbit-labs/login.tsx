/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../app/hooks/useAuth';
import styles from '../../../styles/login.module.css'; 

const OrbitLabsLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login, error } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/logo.webp" alt="Orbit Labs" className="mx-auto mb-4" />
        <h2 className={styles.title}>Orbit Labs</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <div>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>

          <div>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.togglePassword}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className={styles.error}>{error}</div>
          )}

          <button type="submit" className={styles.button}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrbitLabsLogin;