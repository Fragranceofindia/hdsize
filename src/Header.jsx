
import myImage from './assets/icici_logo.jpeg';

const Header = () => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-lg text-gray-900 ">Welcome to HDFC Bank Reward Point</p>
      <img className="w-4/5 mx-auto mb-10" src={myImage} alt="Description of the image" />
    </div>
  );
};

export default Header;