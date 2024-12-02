import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx'
import ErrorPage from './pages/ErrorPage.tsx';
import LoginSignUpPage from './pages/LoginSignUpPage.tsx';
import MainPage from './pages/MainPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import CardsPage from './pages/CardsPage.tsx';
import DecksPage from './pages/DecksPage.tsx';
import DeckBuilderPage from './pages/DeckBuilderPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: '/login',
        element: <LoginSignUpPage />
      },
      {
        path: '/dashboard',
        element: <DashboardPage />
      },
      {
        path: '/cards',
        element: <CardsPage />
      },
      {
        path: '/cards/:id',
        element: <CardsPage />
      },
      {
        path: '/decks',
        element: <DecksPage />
      },
      {
        path: '/decks/:id',
        element: <DecksPage />
      },
      {
        path: '/decks/:id/edit',
        element: <DeckBuilderPage />
      },
      {
        path: '/deck-builder',
        element: <DeckBuilderPage />
      },
      {
        path: '/profile/:id',
        element: <ProfilePage />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}