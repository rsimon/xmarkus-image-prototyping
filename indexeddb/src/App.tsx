import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';

export const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PageA />} />

        <Route path="images" element={<PageB />} />
        <Route path="vocabularies" element={<PageC />} />
        <Route path="export" />
        <Route path="markus" />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )

}

const Layout = () => {

  return (
    <div className="container">
      <aside>
        <Sidebar />
      </aside>
  
      <main>
        <Outlet />
      </main>
    </div>
  );
}

const NotFound = () => {

  return (
    <div>
      <h2>Nothing to see here.</h2>
      <p>
        <Link to="/">Back</Link>
      </p>
    </div>
  )

}