import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MemberDetailsPage from "./components/organisms/MemberDetailsPage";
import Layout from "./components/organisms/Layout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/:section" element={<MemberDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
