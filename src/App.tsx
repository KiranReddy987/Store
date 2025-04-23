import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SubCatPage from "./pages/SubCatPage";
import SearchPage from "./pages/SearchPage";
import Profile from "./pages/Profile";
import { useState } from "react";
import Classification from "./pages/Classification";

const queryClient = new QueryClient();

const App = () => {
  const [selectedCategory, setselectedCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  console.log(selectedCategory);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Index
                  selectedCategory={selectedCategory}
                  setselectedCategory={setselectedCategory}
                  cart={cart}
                  setCart={setCart}
                  user={user}
                  setUser={setUser}
                />
              }
            />
            {/* 
            <Route 
              path="/category/:category/:subcategory?" 
              element={
                <Category 
                  selectedCategory={selectedCategory} 
                  setselectedCategory={setselectedCategory} 
                  cart={cart} 
                  setCart={setCart}
                  user={user}
                  setUser={setUser}
                />
              } 
            /> 
            */}
            <Route
              path="/classify/:categoryId"
              element={
                <Classification
                  selectedCategory={selectedCategory}
                  setselectedCategory={setselectedCategory}
                  cart={cart}
                  setCart={setCart}
                  user={user}
                  setUser={setUser}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  setselectedCategory={setselectedCategory}
                  cart={cart}
                  setCart={setCart}
                  user={user}
                  setUser={setUser}
                />
              }
            />
            <Route
              path="/:category"
              element={
                <SubCatPage
                  selectedCategory={selectedCategory}
                  setselectedCategory={setselectedCategory}
                  cart={cart}
                  setCart={setCart}
                  user={user}
                  setUser={setUser}
                />
              }
            />
            <Route
              path="/search/:searchText"
              element={
                <SearchPage
                  selectedCategory={selectedCategory}
                  setselectedCategory={setselectedCategory}
                  cart={cart}
                  setCart={setCart}
                  user={user}
                  setUser={setUser}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
