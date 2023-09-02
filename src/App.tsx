import { RouterProvider, createBrowserRouter,Route, createRoutesFromElements } from 'react-router-dom'
import Root from './pages/Root';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Root/>} />
    </Route>
  )
);

function App() {

  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
