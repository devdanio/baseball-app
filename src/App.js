import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import PlayerList from "./components/PlayerList";
import PlayerDetail from "./components/PlayerDetail";
import EditPlayer from "./components/EditPlayer";

const Layout = () => {
  return <Outlet />;
};
function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Single Season Hit Leaders</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PlayerList />} />

          <Route path="/player/:id" element={<PlayerDetail />} />
          <Route path="/player/:id/edit" element={<EditPlayer />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
