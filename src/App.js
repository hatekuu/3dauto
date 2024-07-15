import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const Confirmps = lazy(() => import("./routers/main/confirmps"));
const Confirmrg = lazy(() => import("./routers/main/confirmrg"));
const Register = lazy(() => import("./routers/main/register"));
const Login = lazy(() => import("./routers/main/login"));
const Home = lazy(() => import("./routers/main/home"));

function App() {




  return (
    <Router>
     
      

            <Suspense fallback={<div className="spinner"></div>}>
              <Routes>
       
                <Route path="/3dauto/confirmps" element={<Confirmps />} />
                <Route path="/3dauto/confirmrg" element={<Confirmrg />} />
                <Route path="/3dauto" element={<Home />} />
                <Route path="/3dauto/login" element={<Login />} />
                <Route path="/3dauto/login" element={<Register />} />
       
              </Routes>
            </Suspense>
      
    </Router>
  );
}

export default App;
