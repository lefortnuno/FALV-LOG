import "./404.scss";
import { Link } from "react-router-dom";
export default function Forbidden() {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>403</h1>
                    <h2>Accés refusé</h2>
                </div>
                <Link to="/home" className="btn btn-outline-danger">
                    Homepage
                </Link>
            </div>
        </div>
    );
}
