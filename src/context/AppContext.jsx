import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setuser] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [products, setProducts]=useState([])
  const [searchQuery, setSearchQuery]=useState({});
  const value = { navigate, user, setuser, isSeller, setIsSeller, products, searchQuery, setSearchQuery, currency};
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
