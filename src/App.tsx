import { RouterProvider, createBrowserRouter,Route, createRoutesFromElements } from 'react-router-dom'
import Root from './pages/Root';
import { ThemeProvider } from './components/theme-provider';
import {Toaster} from "@/components/ui/toaster";
import LoginPage from './pages/Login';
import SignUpPage from './pages/Register';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/app/Dashboard';
import Projects from './pages/app/Projects';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Root/>} ></Route>
      <Route path='login' element={<LoginPage/>}></Route>
      <Route path='sign-up' element={<SignUpPage/>}></Route>
      <Route element={<DashboardLayout/>}>
        <Route path='dashboard' element={<Dashboard/>}></Route>
        <Route path='projects' element={<Projects/>}></Route>
      </Route>
    </Route>
  )
);

function App() {

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Toaster/>
    <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
    </>
  )
}

export default App
