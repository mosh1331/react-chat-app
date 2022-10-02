import React from 'react'
import Lottie from "lottie-react";
import loading from '../loading.json'


const Loader = () => {
  return (
    <Lottie  animationData={loading} loop={true} />
  )
}

export default Loader
