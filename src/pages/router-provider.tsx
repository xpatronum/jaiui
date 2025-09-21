import { BrowserRouter, Route, Routes } from "react-router";

import { Page as _ } from "./_";

const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<_ />} />
      </Routes>
    </BrowserRouter>
  );
};

export { RouterProvider };
