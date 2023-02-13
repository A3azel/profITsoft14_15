import React from 'react';
import PageContainer from "../components/PageContainer";
import AllCars from "../pages/AllCars/containers/AllCars";
import PageAccessValidator from "../components/PageAccessValidator";
const AllCarsPage = () => (
    <PageAccessValidator>
        <PageContainer>
            <AllCars/>
        </PageContainer>
    </PageAccessValidator>
);


export default AllCarsPage;