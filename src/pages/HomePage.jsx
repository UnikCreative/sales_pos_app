import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const HomePage = () => {
  return (

    <MainLayout>
        <div className="bg-light p-5 mt-4 rounded-3">
                    <h1>Welcome to the simple POS small business website</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non sed molestiae quo maiores. Natus dolores quaerat doloremque, sed totam temporibus quibusdam, cum aperiam blanditiis eligendi maiores provident veniam deserunt aliquam!</p>

                    <Link to='/pos' className="btn btn-primary">Click to sell products</Link>
                </div>
    </MainLayout>
  )
};

export default HomePage;
