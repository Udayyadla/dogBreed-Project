import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import ListDogs from "./Components/ListDogs";
import BreedDetails from "./Components/BreedDetails";
import { BreedProvider } from "./Components/BreedContext";
import PrivateComponent from "./Components/PrivateComponent";
import NotFound from "./Components/NotFound";

function App() {
  return (
    <BreedProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateComponent />}>
            <Route path="/dog-breeds" element={<ListDogs />} />
            <Route path="/dog-details" element={<BreedDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BreedProvider>
  );
}

export default App;
