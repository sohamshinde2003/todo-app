
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './page/SignUp';
import Dashboard from './page/Dashboard';
import NoPage from './page/NoPage';
import Login from './page/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route index element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
