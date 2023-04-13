import { Player } from '@lottiefiles/react-lottie-player';
import { PropTypes } from 'prop-types';

const Loader = ({ speed }) => (
  <div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-white flex justify-center pt-16">
    <Player
      src="https://assets2.lottiefiles.com/packages/lf20_BvR4Heww3W.json"
      className="h-96 w-96"
      autoplay
      loop
      speed={speed}
    />
  </div>
);

Loader.propTypes = {
  speed: PropTypes.number.isRequired,
};

export default Loader;
