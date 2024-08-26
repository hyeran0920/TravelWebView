import { RouterProvider } from "react-router-dom";
import root from "./router/root";
import './App.css';
import { Suspense } from 'react';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={root} />
      </Suspense>
    </div>
  );
}

export default App;
