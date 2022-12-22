import "../../Flexor/assets/css/style.css";
import "../../NiceAdmin/assets/css/style.css";
import "../../Flexor/assets/vendor/bootstrap/css/bootstrap.min.css";
import "../../NiceAdmin/assets/vendor/bootstrap/css/bootstrap.min.css";
import "../../NiceAdmin/assets/css/style.css";
import "../../NiceAdmin/assets/img/favicon.png";
import "../../NiceAdmin/assets/img/apple-touch-icon.png";
import "../../NiceAdmin/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../../NiceAdmin/assets/vendor/boxicons/css/boxicons.min.css";
import "../../NiceAdmin/assets/vendor/bootstrap/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../Header/menu";
import Footer from "../Header/footer";
import Header from "../Header/header";
import Map from "./map";
import React from "react";
import AuthHooks from '../hooks/AuthHooks';

function Home() {

    const navigate = useNavigate();
    const { userInfo, logOutUser } = AuthHooks();
    React.useEffect(() => {
        console.log(" generation Navbar")
    }, []);
    const logOut = () => {
        console.log("Deconnection utilisateur employé ")
        logOutUser();
        navigate("/")
    }

    return (
        <div>
            {/* <Head/> */}
            <Menu />
            <Header/>
            <main id="main" className="main">
                <div Name="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/dashboard">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </nav>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card sales-card">
                                        Madagascar
                                        <Map/>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
export default Home;
