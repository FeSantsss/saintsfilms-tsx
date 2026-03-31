import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "./components/Footer";
import ScrollBar from "./components/ScrollBar";
import { lazy, Suspense } from "react";

import Loader from "./components/Loader";

const Chat = lazy(() => import("./components/Chat"));

function App() {
  return (
    <>
      <Header />
      <ScrollBar />

      <Suspense>
        <Chat />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <main>
              <Outlet />
            </main>
          </motion.div>
        </AnimatePresence>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;
