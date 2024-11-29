import React from "react";
import { Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import VideoCategories from "./pages/VideoCategories";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import Categories from "./components/dashboard/Categories";
import Videos from "./components/dashboard/Videos";
import Images from "./components/dashboard/Images";
import Login from "./pages/AdminLogin";
import PrivateRoute from "./components/dashboard/PrivateRoute";
import Layout from "./layout/Layout";
import Committees from "./components/dashboard/Committees";
import EventList from "./components/dashboard/EventList";
import News from "./components/dashboard/News";
import Feedback from "./components/dashboard/Feedback";
import NewsLetter from "./pages/NewsLetter";

function App() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/videos" element={<VideoCategories />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/events" element={<Events />} />
              <Route path="/news" element={<NewsLetter />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/admin/login" element={<Login />} />
            </Routes>
          </Layout>
        }
      />

      <Route
        path="/admin/dashboard/overview"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/dashboard/categories"
        element={
          <PrivateRoute>
            <Categories />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/dashboard/videos"
        element={
          <PrivateRoute>
            <Videos />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/dashboard/images"
        element={
          <PrivateRoute>
            <Images />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/dashboard/committees"
        element={
          <PrivateRoute>
            <Committees />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/dashboard/events"
        element={
          <PrivateRoute>
            <EventList />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/dashboard/news"
        element={
          <PrivateRoute>
            <News />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/dashboard/feedback"
        element={
          <PrivateRoute>
            <Feedback />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
