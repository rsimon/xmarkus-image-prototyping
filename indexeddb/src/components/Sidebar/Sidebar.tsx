import { Link, useLocation } from 'react-router-dom';

import './Sidebar.css';

export const Sidebar = () => {

  // TODO use location to highlight current route
  const location = useLocation();

  return (
    <aside className="main-nav">
      <nav>
        <ul>
          <li>
            <Link to="/images">Images</Link>
          </li>

          <li>
            <Link className="rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" to="/vocabularies">Vocabularies</Link>
          </li>

          <li>
            <Link to="/export">Export</Link>
          </li>

          <li>
            <Link to="/markus">MARKUS</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )

}

