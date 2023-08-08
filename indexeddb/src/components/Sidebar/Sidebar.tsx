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

          <li className="active">
            <Link to="/vocabularies">Vocabularies</Link>
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

