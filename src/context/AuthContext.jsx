// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('egyptrip_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('egyptrip_user');
      }
    }
    setLoading(false);
  }, []);

  // دالة تسجيل الدخول
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();
      
      const foundUser = users.find(u => 
        (u.email === email || u.username === email) && u.password === password
      );

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('egyptrip_user', JSON.stringify(userWithoutPassword));
        return { success: true, user: userWithoutPassword };
      }
      return { success: false, message: 'Invalid email or password' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Server error. Please try again.' };
    }
  };

  // دالة التسجيل مع إضافة المستخدم إلى db.json
  const register = async (userData) => {
    try {
      // أولاً: جلب جميع المستخدمين الحاليين
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();
      
      // التحقق من وجود المستخدم مسبقاً
      const existingUser = users.find(u => 
        u.email === userData.email || u.username === userData.username
      );
      
      if (existingUser) {
        return { success: false, message: 'User already exists with this email or username' };
      }

      // إنشاء ID فريد للمستخدم الجديد
      const newId = (Math.max(...users.map(u => parseInt(u.id))) + 1).toString();
      
      // إنشاء مستخدم جديد
      const newUser = {
        id: newId,
        ...userData,
        role: userData.role || 'user',
        avatar: '👤',
        joinedDate: new Date().toISOString().split('T')[0],
        bio: userData.role === 'guide' ? 'Professional tour guide' : 'Travel enthusiast'
      };

      // إرسال POST request لإضافة المستخدم إلى db.json
      const postResponse = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      });

      if (!postResponse.ok) {
        throw new Error('Failed to add user to database');
      }

      // حفظ المستخدم في localStorage (بدون كلمة المرور)
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('egyptrip_user', JSON.stringify(userWithoutPassword));
      
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('egyptrip_user');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('egyptrip_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};