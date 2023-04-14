import { Box, Image, SimpleGrid } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { toaster } from 'evergreen-ui';
import { useNavigate } from "react-router-dom";
import Navbar from '../navbar/navbar';
import imgBg from "../images/bg-img.png";
import AboutUs from './about-us';
import sectionBg from "../images/sections-bg.png";
import metamask from "../assets/icons/meta-mask.webp";
import eth from "../assets/icons/eth.svg";
import pera from "../assets/icons/pera-logo-black.png";
import trust from "../assets/icons/trust-w.png";
import bitcoin from "../assets/icons/bitcoin.webp";
import "../index.css";
import Lottie from 'react-lottie';
import animationData from '../templates/crypto.json';
import {
    connect as connectWallet,
    checkConnection,
    isDisconnected,
    hasHeritage
} from "../utils/helpers.js"
import HeadTag from '../common/headTag';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
}

const Home = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState("");
    const [getStartedLoading, setGetStartedLoading] = useState(false);

    useEffect(() => {
        if (!isDisconnected()) {
            checkConnection().then(async (account) => {
                setUser(account)
            })
        }
    }, [user]);

    const handlegetstarted = async () => {
        setGetStartedLoading(true);

        if (isDisconnected()) {
            await connectWallet();
        }
        const account = await checkConnection();
        setUser(account);

        if (await hasHeritage(account)) {
            navigate('/profile');
        } else {
            navigate('/get-started')
        }
        setGetStartedLoading(false);

    }
    return (
        <>
            <HeadTag title="Home" />

            <div className='App'>
                <Navbar />
                <div className='main'>
                    <div className='main1'>
                        <div className='headings'>
                            <h2>What Happens To</h2>
                            <h2>your <span className='assettext'>Assets</span></h2>
                            <h2>If You Die Today?</h2>
                        </div>
                        <div className="lottie">
                            <Lottie options={defaultOptions} />
                        </div>
                    </div>
                    <div className='textbox'><h6>An alternative means of retrieving lost or possibly lost decentralised assets in cases of asset owner&#39;s death, misplacement of assets passwords, or key phrases potentially resulting in permanent loss of these decentralised assets.</h6></div>
                    <div className='getstartedbutton'>
                        <button className='getstartedbtn' onClick={handlegetstarted}
                        >
                            Get Started
                        </button>
                    </div>
                </div>


                <main>
                    <div className="grid">
                        <SimpleGrid columns={5} spacing={10} w="80%" d="flex" alignItems="center" m="15px auto">
                            <Image src={metamask} alt="meta-mask-logo" />
                            <Image src={bitcoin} alt="meta-mask-logo" />
                            <Image src={trust} alt="meta-mask-logo" />
                            <Image src={pera} alt="meta-mask-logo" />
                            <Image src={eth} alt="meta-mask-logo" />
                        </SimpleGrid>
                    </div>
                    <Box backgroundImage={sectionBg} backgroundRepeat="no-repeat" backgroundSize="cover" backgroundPosition="center">
                        <AboutUs />
                    </Box>
                </main>
            </div>
        </>
    )
};

export default Home;
