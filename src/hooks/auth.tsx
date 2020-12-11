/* eslint-disable no-alert */
import React, { createContext, useState, useContext, useCallback } from 'react';

interface IAuthContext {
  logged: boolean;
  signIn(email: string, password: string): void;
  signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(() => {
    const isLogged = localStorage.getItem('@minha-carteira:logged');

    return !!isLogged;
  });

  const signIn = useCallback((email: string, password: string) => {
    if (email === 'rodrigo@email.com' && password === '123') {
      localStorage.setItem('@minha-carteira:logged', 'true');
      setLogged(true);
    } else {
      alert('Senha ou usuário inválido');
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@minha-carteira:logged');
    setLogged(false);
  }, []);

  return (
    <AuthContext.Provider value={{ logged, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
