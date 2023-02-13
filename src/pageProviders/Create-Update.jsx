import React from 'react';
import PageContainer from "../components/PageContainer";
import CreateUpdateCar from "../pages/CreateUpdate/containers/Create-Update";
import PageAccessValidator from "../components/PageAccessValidator";

const CreateUpdatePage = () => (
    <PageAccessValidator>
        <PageContainer>
            <CreateUpdateCar/>
        </PageContainer>
    </PageAccessValidator>
);

export default CreateUpdatePage;