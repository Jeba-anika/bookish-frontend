import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import routes from './Routes/Routes';
import { Toaster } from 'react-hot-toast';



function App() {
  return (
    <div className="max-w-[1440px] lg:mx-auto md:mx-auto sm:mr-5 sm:ml-5 mr-5 ml-5">
      <RouterProvider router={routes}>
      </RouterProvider>
      <Toaster></Toaster>
      
    </div>
  );
}

export default App;
