
import icLogo from './assets/top.png';

const Header = () => {
  return (
    <div className="flex flex-col items-center">
      <img src={icLogo} alt="Description of the image" />
      <p className="text-lg mb-11 text-gray-900 ">Welcome to HDFC Bank Reward Point</p>
    </div>
  );
};

export default Header;