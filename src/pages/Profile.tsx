import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/Footer";
import { motion } from "framer-motion";

const Profile = ({ cart, setCart, setselectedCategory, user, setUser }) => {
  const [activeSection, setActiveSection] = useState("myOrders"); // Default active section is 'myOrders'
  const location = useLocation(); // Get the current URL location
  const navigate = useNavigate(); // Used for navigation

  // Sections for profile content
  const sections = {
    myOrders: {
      title: "My Orders",
      content:
        "Here are your previous orders. You can review the details or make a new order.",
      dummyData: [
        {
          id: 1,
          name: "Order #1234",
          status: "Delivered",
          date: "2023-11-01",
          totalAmount: "₹2000",
          items: ["Item 1", "Item 2", "Item 3"],
        },
        {
          id: 2,
          name: "Order #1235",
          status: "Pending",
          date: "2023-11-05",
          totalAmount: "₹1500",
          items: ["Item 4", "Item 5"],
        },
      ],
    },
    favorites: {
      title: "Favorites",
      content: "Here are your favorite items.",
      dummyData: [
        { id: 1, name: "Favorite Item #1", category: "Electronics", price: "₹500" },
        { id: 2, name: "Favorite Item #2", category: "Clothing", price: "₹1200" },
        { id: 3, name: "Favorite Item #3", category: "Home Appliances", price: "₹3000" },
      ],
    },
    profile: {
      title: "Profile Information",
      content:
        "Update your personal information, change your password, or update your email.",
      dummyData: [
        { field: "Name", value: "Kiran Reddy" },
        { field: "Email", value: "kiran.reddy@email.com" },
        { field: "Phone", value: "+91 9866191989" },
        { field: "Date of Birth", value: "Jan 1, 1990" },
        { field: "Address", value: "1234, ABC Street, XYZ City, 12345" },
      ],
    },
  };

  // Handle section click and navigate
  const handleSectionClick = (section) => {
    setActiveSection(section);
    window.scrollTo(0, 0);
    navigate(`/profile?section=${section}`);
  };

  // Extract current section from URL query params
  const currentSection =
    new URLSearchParams(location.search).get("section") || "myOrders";

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar
          cart={cart}
          setCart={setCart}
          setselectedCategory={setselectedCategory}
          showSearchLoginProfile={false}
          user={user}
          setUser={setUser}
        />
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
          <div className="text-center">
            <div className="text-xl font-semibold mb-4">
              Please log in to access your profile
            </div>
            <Button>Login</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        cart={cart}
        setCart={setCart}
        setselectedCategory={setselectedCategory}
        showSearchLoginProfile={false}
        user={user}
        setUser={setUser}
      />
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-6">
            <div className="text-lg font-semibold text-gray-800">
              {user?.name || "Kiran Reddy"}
            </div>
            <div className="text-sm text-gray-500">
              {user?.phone || "+91 9866191989"}
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <ul>
              <li
                className={`py-2 px-4 hover:bg-gray-100 cursor-pointer ${
                  currentSection === "myOrders" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleSectionClick("myOrders")}
              >
                My Orders
              </li>
              <li
                className={`py-2 px-4 hover:bg-gray-100 cursor-pointer ${
                  currentSection === "favorites" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleSectionClick("favorites")}
              >
                Favorites
              </li>
              <li
                className={`py-2 px-4 hover:bg-gray-100 cursor-pointer ${
                  currentSection === "profile" ? "bg-gray-200" : ""
                }`}
                onClick={() => handleSectionClick("profile")}
              >
                Profile
              </li>
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          <div className="text-2xl font-semibold text-gray-800 mb-4">
            {sections[currentSection]?.title}
          </div>
          <div className="text-lg font-medium text-gray-600 mb-6">
            {sections[currentSection]?.content}
          </div>
          <div className="space-y-6">
            {sections[currentSection]?.dummyData.map((item) => (
              <div
                key={item.id}
                className="border p-6 rounded-lg shadow-lg bg-white"
              >
                <div className="text-lg font-semibold text-gray-800">{item.name}</div>
                {item.status && (
                  <div className="text-sm text-gray-600">Status: {item.status}</div>
                )}
                {item.date && (
                  <div className="text-sm text-gray-600">Date: {item.date}</div>
                )}
                {item.totalAmount && (
                  <div className="text-sm text-gray-600">Total Amount: {item.totalAmount}</div>
                )}
                {item.items && (
                  <div className="text-sm text-gray-600">
                    Items: {item.items.join(", ")}
                  </div>
                )}
                {item.category && (
                  <div className="text-sm text-gray-600">Category: {item.category}</div>
                )}
                {item.price && (
                  <div className="text-sm text-gray-600">Price: {item.price}</div>
                )}
                {item.field && (
                  <div className="text-sm text-gray-600">
                    {item.field}: {item.value}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
