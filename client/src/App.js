import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Components/Home/Index'
import OnBoard from './Components/Onboard/Index'
import DashBoard from './Components/Dashboard/Index'
import { useCookies } from 'react-cookie'


function App() {
  const [cookie, setCookie, removeCookie] = useCookies(['user'])

  const authToken = cookie.AuthToken
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {authToken && <Route path="/dashboard" element={<DashBoard />} />}
        {authToken && <Route path="/onboard" element={<OnBoard />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
