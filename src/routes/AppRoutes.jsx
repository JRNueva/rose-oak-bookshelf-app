import { Routes, Route } from 'react-router-dom';
import TrendingPage from "../pages/TrendingPage";
import BrowsePage from "../pages/BrowsePage";
import RandomPage from "../pages/RandomPage";
import AboutMePage from "../pages/AboutMePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TrendingPage />} />
      <Route path="/browse-books" element={<BrowsePage />} />
      <Route path="/random-books" element={<RandomPage />} />
      <Route path="/about-me" element={<AboutMePage />} />
    </Routes>
  );
}