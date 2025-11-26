import user from '../../../assets/image/user.png';

const RightSideBar = () => {
  return (
    <div className=" p-5 text-textColor ">
      <div className="flex justify-between items-center mb-10">
        <p>Media (1)</p>
        <img src={user} alt="Zoom" className="cursor-pointer" />
      </div>
      <img src={user} alt="" className="pt-5 py-16" />
      <p className=" text-center px-2 py-2 shadow-md shadow-neutral-400 mb-5">
        Attachments (1)
      </p>
      <div className="  px-2 py-2 shadow-md shadow-neutral-400">
        <p>Filedzfdsfgdhg.pdf</p>
        <p>2.00 mb</p>
      </div>
    </div>
  );
};

export default RightSideBar;
