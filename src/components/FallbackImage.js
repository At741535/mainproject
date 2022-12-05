import { CircularProgress,styled } from '@mui/material';
import { useEffect,useState } from 'react'
import defaultImage from "../images/placeholder_img.jpg";

const LoaderWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    position: absolute;
  }
  img{
    opacity: 0.3;
  }
`;


export function ImageWithFallback({ fallback = defaultImage,src,...rest }) {

  const [loaded,setLoaded] = useState(false)
  const imageStyle = !loaded ? { display: "none" } : {};

  const [imgSrc,setImgSrc] = useState(src)
  const onError = () => setImgSrc(fallback)
  useEffect(() => {
    setImgSrc(src)
  },[src])

  return (
    <>
      {!loaded && <LoaderWrapper>
        <CircularProgress />
        <img src={fallback} alt="Loading" />
      </LoaderWrapper>}
      <img
        alt="NFT"
        src={imgSrc || fallback}
        onError={onError}
        onLoad={() => setLoaded(true)}
        style={imageStyle}
        {...rest}
      />
    </>
  )
}