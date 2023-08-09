import { Routes, Route, Outlet, Link, Navigate } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Annotate, Export, Images, Markus, Vocabularies } from '@/pages';

import './App.css';

export const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* re-direct to /images as the default */}
        <Route index element={<Navigate to="/images" />} />

        {/* image list + image import */}
        <Route path="images" element={<Images />} />
        
        {/* image annotation view */}
        <Route path="annotate/:id" element={<Annotate />} />

        {/* TODO vocabulary management */}
        <Route path="vocabularies" element={<Vocabularies />} />

        {/* TODO data export */}
        <Route path="export" element={<Export />}  />

        {/* TODO publish to MARKUS platform */}
        <Route path="markus" element={<Markus />} />

        {/* TODO catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )

}

const Layout = () => {

  return (
    <div className="app-container">
      <Sidebar />  
      <Outlet />
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