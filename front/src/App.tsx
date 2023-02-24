import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Breadcrumb from './components/Breadcrumb';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css';
import PersonalInformation from './pages/Personal';
import AddressInformation from './pages/Address';
import PasswordInformation from './pages/Password';
import ProfessionalInformation from './pages/Professional';
import PersonalProvider from './context/personalContext';
import AddressProvider from './context/addressContext';
import PasswordProvider from './context/passwordContext';
import ProfessionalProvider from './context/professionalContext';

function App() {

  return (
    <PersonalProvider>
      <AddressProvider>
        <PasswordProvider>
          <ProfessionalProvider>
            <div className='App'>
              <Sidebar />
              <div style={{ width: '100%' }}>
                <Breadcrumb />
                <BrowserRouter>
                  <Navbar />
                  <Routes>
                    <Route path='/general-data' element={<PersonalInformation />} />
                    <Route path='/adress' element={<AddressInformation />} />
                    <Route path='/password' element={<PasswordInformation />} />
                    <Route path='/professional' element={<ProfessionalInformation />} />
                  </Routes>
                </BrowserRouter>
              </div>
            </div>
          </ProfessionalProvider>
        </PasswordProvider>
      </AddressProvider>
    </PersonalProvider>
  );
}

export default App;
