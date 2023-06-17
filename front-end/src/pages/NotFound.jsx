import * as React from "react";
import { Link } from "react-router-dom";


function NotFound() {

  return (

            <div>
              <nav>
                <Link to="/app/upstreamflow">Page not found</Link>
              </nav>
            </div>


         );
}

export default NotFound;