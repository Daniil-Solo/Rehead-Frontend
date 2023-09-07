import {Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import { AuthPage } from './pages/auth-page/auth-page';
import { LoginForm } from './pages/auth-page/auth-form/login-form';
import { RegisterForm } from './pages/auth-page/auth-form/register-form';
import { PageNotFound } from './pages/page-not-found/page-not-found';
import {ContentGenerationPage} from './pages/content-generation-page/content-generation-page'
import { WithAuth } from './auth/with-auth';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage> <LoginForm/> </AuthPage>} />
      <Route path="/register" element={<AuthPage> <RegisterForm/> </AuthPage>} />
      <Route path="/content" element={
        <WithAuth>
          <ContentGenerationPage/>
        </WithAuth>
      } />
      <Route path="/" element={
        <WithAuth>
          <Navigate to="/content" replace/>
        </WithAuth>
      } />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
  );
}

export default App;
