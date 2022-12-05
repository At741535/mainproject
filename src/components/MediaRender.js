import ReactPlayer from 'react-player'
import { useGLTF,OrbitControls,Center,Bounds } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from 'react';
import { ImageWithFallback } from './FallbackImage';
import { styled } from '@mui/system';

const GLBContainer = styled("div")`
    height: 450px;
    width: 100%;
`;

const GlbPlayer = styled(Canvas)`
    height : 100%;
    width : 100%;
`;

const ObjectModel = ({ url }) => {
    const { scene } = useGLTF(url);
    return (
        <mesh>
            <primitive object={scene} />
        </mesh>
    );
}

const CanvasSetup = ({ children }) => {
    return (
        <GlbPlayer camera={{ position: [0,0,15],near: 1,far: 40 }}>
            <color attach="background" args={['white']} />
            <ambientLight intensity={0.5} color="#FFFFFF" />
            <directionalLight castShadow position={[2.5,12,12]} intensity={1} />
            <pointLight position={[-20,-20,-20]} intensity={1} />
            <pointLight position={[20,20,20]} intensity={0.3} />
            {children}
        </GlbPlayer>
    );
};

const ModelRender = ({ animationURL }) => {
    return (
        <GLBContainer>
            <CanvasSetup>
                <Suspense fallback={null}>
                    <Bounds fit clip observe>
                        <Center>
                            <ObjectModel url={animationURL} />
                        </Center>
                        <OrbitControls />
                    </Bounds>
                </Suspense>
            </CanvasSetup>
        </GLBContainer>
    )
}

const contentRender = (animationURL = "",imageUrl = "",fullMode) => {
    if (!animationURL || !fullMode) {
        let bigImage = (imageUrl || "").replace('=s250',fullMode ? '=s2048' : '=s1000')
        bigImage = (imageUrl || "").replace('w=500',fullMode ? 'w=2048' : 'w=1000')
        return (
            <ImageWithFallback className="nft-image" src={bigImage} alt="NFT" />
        )
    }
    const animationType = (animationURL || '').includes(".glb") ? "animation" : "video"

    if (animationType === "video") {
        return (
            <ReactPlayer
                playsinline
                playing
                muted
                loop
                url={animationURL}
                controls
                width="100%"
                height="100%"
                config={{
                    file: {
                        attributes: {
                            poster: imageUrl,
                        },
                    },
                }}
            />
        )
    }

    return (
        <div>
            <ModelRender animationURL={animationURL} />
        </div>
    )
}

export function MediaRender({ animationURL = "",imageUrl = "",fullMode = false }) {

    return (
        <>
            {contentRender(animationURL,imageUrl,fullMode)}
        </>
    )

}
