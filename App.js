// frontend/client/src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import GlobalStyles from './GlobalStyles';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import CoursePage from './pages/CoursePage';
import ProfilePage from './pages/ProfilePage';
import MarketplacePage from './pages/MarketplacePage';
import SettingsPage from './pages/SettingsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';

const AppContainer = styled.div``; // Styles handled by GlobalStyles + class
const MainContentArea = styled.div``; // Styles handled by GlobalStyles + class

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('themeMode') || 'light');

  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    localStorage.setItem('themeMode', newTheme);
  };

   // Add/remove dark class on body for non-styled-component CSS targeting
  useEffect(() => {
      document.body.classList.toggle('dark', themeMode === 'dark');
  }, [themeMode]);

  const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;
  const location = useLocation();
  const showSidebar = isLoggedIn && !['/', '/auth'].includes(location.pathname);
  // Decide if NavBar should be shown (e.g., hide on Auth page)
  const showNavbar = true; // Keep it always visible for simplicity, adjust logic if needed

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      {showNavbar && <NavBar themeMode={themeMode} toggleTheme={toggleTheme} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      <AppContainer className={`app-container ${showSidebar ? 'with-sidebar' : ''}`}>
        {showSidebar && <Sidebar themeMode={themeMode} toggleTheme={toggleTheme} setIsLoggedIn={setIsLoggedIn}/> }
        <MainContentArea className={`main-content-area ${showSidebar ? 'content-with-sidebar' : ''}`}>
          <Routes>
            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} /> {/* Removed unnecessary props */}
            <Route path="/auth" element={!isLoggedIn ? <AuthPage setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/dashboard" />} /> {/* Removed unnecessary props */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/course/:courseId" element={<ProtectedRoute><CoursePage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/marketplace" element={<ProtectedRoute><MarketplacePage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} /> {/* Removed unnecessary props */}
            <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
            <Route path="/login" element={<Navigate to="/auth" />} />
            <Route path="/signup" element={<Navigate to="/auth" />} />
            <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} />} />
          </Routes>
        </MainContentArea>
      </AppContainer>
      {/* Add Footer here if it should always be at the bottom */}
      {/* {showNavbar && <Footer />} */}
    </ThemeProvider>
  );
}
export default App;