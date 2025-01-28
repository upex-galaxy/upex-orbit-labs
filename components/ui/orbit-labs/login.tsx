import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

const OrbitLabsLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = () => {
    if (!username && !password) {
      setError("Fail: Username and password are required for login.");
      return;
    }

    if (!username) {
      setError("Fail: Username is required for login.");
      return;
    }

    if (!password) {
      setError("Fail: Password is required for login.");
      return;
    }

    const lowerCaseUsername = username.toLowerCase();

    if (lowerCaseUsername === 'admin' && password === 'upex2025') {
      if (typeof window !== 'undefined') {
        try {
          localStorage.clear();
          const loginTime = new Date().getTime();
          localStorage.setItem('loginTime', loginTime.toString());
          const sessionDuration = 1 * 60 * 1000;
          
          const checkSession = () => {
            const storedTime = localStorage.getItem('loginTime');
            if (storedTime && (new Date().getTime() - Number(storedTime)) > sessionDuration) {
              localStorage.clear();
              router.push('/orbit-labs');
            }
          };
          
          setInterval(checkSession, 60 * 1000);
        } catch (error) {
          console.error('Error en login:', error);
        }
      }
      router.push('/orbit-labs/inventory');
      return;
    }

    if (lowerCaseUsername === 'admin' && password === 'admin') {
      setError('Fail: Username and password do not match any user in this service.');
      return;
    }

    if (lowerCaseUsername === 'barbie') {
      setError("Hola Jefa, no tiene cuenta todavía");
      return;
    }
    if (lowerCaseUsername === 'kenny') {
      setError("aburrido de lolcito? no tienes usuario acá usa el que te pasaron");
      return;
    }
    if (lowerCaseUsername === 'ely') {
      setError("Aquí no hay Helado! entra con el otro usuario");
      return;
    }
    if (lowerCaseUsername === 'yeyu') {
      setError("Hola amor, estoy practicando <3");
      return;
    }

    if (lowerCaseUsername === 'admin') {
      setError('You are Locked: Sorry, this user has been locked out.');
      return;
    }
    setError('Fail: Invalid username or password.');
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <img src="/logo.webp" alt="Orbit Labs" className="mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white">Orbit Labs</h2>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}>
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-400 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-400 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 font-medium">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrbitLabsLogin;