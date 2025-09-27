import { BrowserRouter, Route, Routes } from "react-router";

import { Page as _ } from "./_";
import { Page as Reports } from "./reports";
import { Page as Stats } from "./stats";

const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<_ />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
};

export { RouterProvider };
