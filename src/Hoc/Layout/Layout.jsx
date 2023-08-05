import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";
import Navbar from "../../Components/Navigation/Navbar/Navbar";
import UserAuthContextApi, {
  UserAuthContext,
} from "../../Hoc/ContextApi/UserAuthContextApi";
import { AiOutlineMenuFold } from "react-icons/ai";

const Layout = () => {
  const [sidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1020) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    // Call handleResize initially to set the initial state based on the window width
    handleResize();

    // Add the event listener for the resize event
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <UserAuthContextApi>
      <UserAuthContext.Provider>
        <div className="flex ">
          <div
            className={`flex-none w-1/6 ${
              sidebar
                ? "transition-all delay-75 "
                : "w-24  transition-all delay-100 duration-300"
            }`}
          >
            <div className="sticky top-0 min-h-screen max-h-screen overflow-hidden shadow-xl ">
              <AiOutlineMenuFold
                className="text-3xl cursor-pointer lg:visible invisible absolute text-white right-2 top-2 "
                onClick={() => {
                  setShowSidebar(!sidebar);
                }}
              />
              <Sidebar sidebar={sidebar} />
            </div>
          </div>
          <div
            className="flex-auto z-10"
            style={{
              background:
                "linear-gradient(to right, #f6f6f5, #f8f8f8, #dfdce6, #e1e5ec,#eff9ff)",
            }}
          >
            <div className="z-50 ">
              <Navbar sidebar={sidebar} />
            </div>
            <div
              className="relative  mt-[4.1rem]  -z-10"
              style={{
                background:
                  "linear-gradient(to right, #f9f8ff, #f7f9fc, #fcfbf7, #f8f7f9, #f9f8ff)",
              }}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </UserAuthContext.Provider>
    </UserAuthContextApi>
  );
};

export default Layout;
