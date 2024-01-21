import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements,  } from 'react-router-dom'
import Root from './pages/Root';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import LoginPage from './pages/Login';
import SignUpPage from './pages/Register';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/app/Dashboard';
import Projects from './pages/app/Projects';
import PrivateRoute from './lib/PrivateRoute';
import { Provider } from 'react-redux';
import { store } from './store';
import PublicRoute from './lib/PublicRoute';
import RootLayout from './layouts/RootLayout';
import ProjectLayout from './layouts/ProjectLayout';
import ProjectDashboard from './pages/projects/ProjectDashboard';
import ProjectSettings from './pages/projects/settings';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
        <Route path='/' element={<Root />} ></Route>
        <Route element={<PublicRoute />}>
          <Route path='login' element={<LoginPage />}></Route>
          <Route path='sign-up' element={<SignUpPage />}></Route>
        </Route>
        <Route element={<DashboardLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path='dashboard' element={<Dashboard />}></Route>
            <Route path='projects' element={<Projects />}></Route>
          </Route>
        </Route>
        <Route element={<ProjectLayout/>}>
          <Route element={<PrivateRoute/>}>

            <Route path="project/:projectId" element={<ProjectDashboard/>}></Route>
            <Route path="project/:projectId/bugs" element={<h1>This is bugs page </h1>}></Route>
            <Route path="project/:projectId/settings" element={<ProjectSettings/>}></Route>

          </Route>

        </Route>
    </Route>
  )
);

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Provider store={store}>
          <RootLayout>
          <Toaster />
          <RouterProvider router={router}></RouterProvider>
          </RootLayout>
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default App
