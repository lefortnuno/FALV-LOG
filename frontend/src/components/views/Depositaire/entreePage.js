import Head from "../../Header/head";
import { Outlet } from "react-router-dom";
import Menu from "../../Header/menu";
export default function EntreePage(){
    return(
        <div>
            <Head />
            <Menu />
            <main id="main" className="main">
                <Outlet />
            </main>
        </div>
    );
}