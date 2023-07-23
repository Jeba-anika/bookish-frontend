import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Footer from '../../../Shared/Footer/Footer';
import AdvertiseSection from '../AdvertiseSection/AdvertiseSection';
import Banner from '../Banner/Banner';
import CategorySection from '../CategorySection/CategorySection';
import PurposeSection from '../PurposeSection/PurposeSection';

const Home = () => {
    const categories = useLoaderData()
    
    return (
        <div>
            <Banner></Banner>
            <PurposeSection></PurposeSection>
            <CategorySection categories={categories} ></CategorySection>
            <AdvertiseSection></AdvertiseSection>
        </div>
    );
};

export default Home;