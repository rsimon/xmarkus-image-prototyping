import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {

  // TODO use location to highlight current route
  const location = useLocation();

  return (
    <aside>
      <nav>
        <ul>
          <li>
            <Link to="/images">Images</Link>
          </li>

          <li>
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

