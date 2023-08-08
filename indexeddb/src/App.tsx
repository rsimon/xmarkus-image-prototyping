import { Routes, Route, Outlet, Link, Navigate } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';

export const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* re-direct to /images as the default */}
        <Route index element={<Navigate to="/images" />} />

        {/* image list + image import */}
        <Route path="images" element={<Page />} />
        
        {/* image annotation view */}
        <Route path="annotate/:id" element={<Page />} />

        {/* TODO vocabulary management */}
        <Route path="vocabularies" element={<Page />} />

        {/* TODO data export */}
        <Route path="export" element={<Page />}  />

        {/* TODO publish to MARKUS platform */}
        <Route path="markus" element={<Page />} />

        {/* TODO catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )

}

const Page = () => {
  return (<div>Hello World</div>)
}

const Layout = () => {

  return (
    <div className="container">
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