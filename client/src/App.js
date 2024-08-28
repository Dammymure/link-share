import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import AddLinks from './pages/AddLinks';
import Profile from './pages/Profile';
import Home from './components/Home';
import Preview from './pages/Preview';

function App() {
  return (
    <div className="font-Instrument font overflow-hidden">
      <BrowserRouter>
        <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
        </div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/add-links" element={<AddLinks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/preview" element={<Preview />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/get-a-quotation" element={<GetQuotation />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
