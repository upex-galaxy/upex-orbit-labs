/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../app/hooks/useAuth';

const OrbitLabsLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login, error } = useAuth();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    login(formData);
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-20 p-8">
      <div className="w-full max-w-4xl bg-gray-900/40 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="hidden md:flex flex-col items-center justify-center p-12 bg-gray-900/20">
            <div className="text-center">
              <img 
                src="/upexorbitlabs.webp" 
                alt="Orbit Labs" 
                className="w-48 h-48 object-contain mb-6"
              />
              <h2 className="text-2xl font-bold text-white mb-4">Welcome to UPEX</h2>
              <p className="text-gray-300">Access your Orbit Labs dashboard</p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="md:hidden flex justify-center mb-8">
              <img 
                src="/upexorbitlabs.webp" 
                alt="Orbit Labs" 
                className="w-24 h-24 object-contain"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label 
                    htmlFor="username" 
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                              focus:ring-2 focus:ring-blue-500 focus:border-transparent
                              text-gray-100 placeholder-gray-400 transition-colors"
                    placeholder="Enter your username"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="password" 
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                text-gray-100 placeholder-gray-400 transition-colors"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                                hover:text-gray-200 transition-colors"
                    >
                      {showPassword ? 
                        <EyeOff className="w-5 h-5" /> : 
                        <Eye className="w-5 h-5" />
                      }
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm bg-red-900/20 border border-red-800 
                              rounded-lg p-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                         py-3 px-4 rounded-lg font-medium hover:from-blue-700 
                         hover:to-purple-700 transition-all duration-200 
                         focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                         focus:ring-offset-gray-900"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrbitLabsLogin;