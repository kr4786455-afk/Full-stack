import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Editor from "./pages/Editor";
import Viewer from "./pages/Viewer";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
  path="/admin"
  element={
    <ProtectedRoute role="admin">
      <Admin />
    </ProtectedRoute>
  }
/>

       <Route
  path="/editor"
  element={
    <ProtectedRoute role="editor">
      <Editor />
    </ProtectedRoute>
  }
/> 

       <Route
  path="/viewer"
  element={
    <ProtectedRoute role="viewer">
      <Viewer />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
