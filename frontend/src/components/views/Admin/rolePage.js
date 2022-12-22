import Head from "../../Header/head";
import { Outlet } from "react-router-dom";
import Menu from "../../Header/menu";
function rolePage() {
    return (
        <div>
            <Head />
            <Menu />
            <main id="main" className="main">
                <Outlet />
            </main>
        </div>
    );
}

export default rolePage;
