import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./modules/home";
import SignUp from "./modules/auth/Pages/SignUp";
import SignIn from "./modules/auth/Pages/SignIn";
import NotFound from "./components/NotFound";
import MainLayout from "./layouts/MainLayout/MainLayout";
import UserProvider from "./contexts/UserContext/UserContext";
import ProtectedRoute from "./routers/ProtectedRoute"
import ProductDetails from "./modules/home/productDetails/ProductDetails";
import BookingDetals from "./modules/home/bookingDetails/bookingDetails";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="details/:detailsid" element={<ProductDetails />} />
          
            <Route element={<ProtectedRoute />}>
            <Route path="room-details/:detailsid" element={<BookingDetals />} />
        

            </Route>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;