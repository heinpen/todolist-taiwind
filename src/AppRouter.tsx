import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { PrivateRoutes } from './components/PrivateRoutes/PrivateRoutes';
import { Pages } from './pages';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Pages.Root />}>
      <Route path="/" element={<PrivateRoutes />}>
        <Route index element={<Pages.Todo />} />
        <Route path="/about" element={<Pages.About />} />
      </Route>
      <Route path="/login" element={<Pages.Login />} />
    </Route>,
  ),
);
