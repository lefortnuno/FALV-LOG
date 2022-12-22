import "./404.scss";
import { Link } from "react-router-dom";
export default function NotFound() {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                    <h2>Page introuvable</h2>
                </div>
                <Link to="/logout" className="btn btn-outline-danger">
                    Homepage
                </Link>
            </div>
        </div>
    );
}
