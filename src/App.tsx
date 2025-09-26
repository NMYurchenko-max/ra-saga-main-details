import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ServicesList from '@/components/ServicesList';
import ServiceDetails from '@/components/ServiceDetails';

function App() {
  return (
    <BrowserRouter basename="/ra-saga-main-details">
      <div className="app">
        <Routes>
          <Route path="/" element={<ServicesList />} />
          <Route path="/:id/details" element={<ServiceDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
