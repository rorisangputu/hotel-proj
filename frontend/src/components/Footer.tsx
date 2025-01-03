const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="w-[90%] mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-semibold tracking-tight">
          MernHolidays.com
        </span>
        <span className="text-white font-bold tracking-tight flex flex-col md:flex-row gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
