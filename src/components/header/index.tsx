import logo from "../../assets/images/logo.png";
const Header = () => {
  return (
    <>
      <header className="bg-[#F0F0F0] flex items-center gap-4 w-full py-1 px-[10%]">
        <img src={logo} alt="logo" className="w-[24px]"/>
        <span className="text-sm text-[#5B5B5B]">An Official Website of the <b>Singapore Government</b></span>
      </header>
    </>
  );
};

export default Header;
