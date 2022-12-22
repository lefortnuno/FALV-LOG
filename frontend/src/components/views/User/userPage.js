import Home from "../Dashbord/home";
import Head from "../../Header/head";
import Menu from "../../Header/menu";
function userPage() {
    return (
        <div>
            <Head />
            <Menu />
            <main id="main" className="main">
                <Home />
            </main>
        </div>
    );
}
export default userPage;
