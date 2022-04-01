import React from "react";
import { useSpring, animated  } from "react-spring";
const LoadingPage = () => {
  const styles = useSpring({
    loop: true,
    to: [{ height : "100vh",opacity: 1 }, { height : "0%",opacity: 0 }],
    from: { height : "0%",opacity: 0 },
    trail:3000
  });
  return (
    <animated.div style={styles}>
      <div className="preloader flex-column justify-content-center align-items-center">
        <img
          className="animation__shake"
          src="./img/logo.png"
          alt="logo"
          height={60}
          width={60}
        />
      </div>
    </animated.div>
  );
};
export default LoadingPage;
