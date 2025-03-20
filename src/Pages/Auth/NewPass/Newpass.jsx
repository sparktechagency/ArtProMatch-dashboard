import { Form, Input, Typography } from "antd";
// import brandlogo from "../../../assets/image/logo.png"
import { Link } from "react-router-dom";
import { FaLockOpen } from "react-icons/fa";

import { useState } from "react";
import { IoIosLock } from "react-icons/io";
const Newpass = () => {
    const [showpassword, setShowpassword] = useState("false");
    const [showConfirmpassword, setShowConfirmPassword] = useState("false");
    const togglePasswordVisibility = () => {
        setShowpassword(!showpassword);
    };
    const toggoleConfirmPasswordVisible = () => {
        setShowConfirmPassword(!showConfirmpassword);
    };



    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };
    return (
        <div className="bg-[ffffff]">
            <div className="container mx-auto">
                <div className="  ">
                    {/* <div className="w-full md:w-[50%] px-3 mt-10">
                        <img src={brandlogo} alt="brandlogo" className="h-full w-full object-cover" />
                    </div> */}
                    <div className="w-full ">
                        <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center ">
                            <Form
                                name="login"
                                initialValues={{ remember: true }}
                                style={{ maxWidth: 550 }}
                                onFinish={onFinish}
                                layout="vertical"
                                className=" bg-[#eae6e6] py-28 mx-4 md:mx-0 px-6 md:px-10 rounded-2xl w-[450px] border-2 shadow-xl"
                            >
                                <div className="mb-4 text-center">
                                    <h2
                                        className=" text-center text-2xl md:text-3xl font-bold mb-6"
                                    >
                                        Set a new password
                                    </h2>
                                    <Typography.Text className=" text-center text-neutral-500 ">
                                        Create a new password. Ensure it differs from
                                        previous ones for security
                                    </Typography.Text>
                                </div>


                                <Form.Item name="new-password" label={<p className=" text-md">New Password</p>}>

                                    <div className="flex justify-between items-center relative">
                                        <Input
                                            required
                                            style={{ padding: "6px" }}
                                            className=" text-md"
                                            type={showpassword ? "password" : "text"}
                                            placeholder="kkk!@#1578525"
                                        />
                                        <div className="flex items-center absolute right-0 px-2">
                                            <button onClick={togglePasswordVisibility} type="button">
                                                {showpassword ? (
                                                    <IoIosLock className="" />
                                                ) : (
                                                    <FaLockOpen className="" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </Form.Item>
                                <Form.Item name="confirm-password" label={<p className=" text-md">Confirm Password</p>}>

                                    <div className="flex justify-between items-center relative">
                                        <Input
                                            required
                                            style={{ padding: "6px" }}
                                            className=" text-md"
                                            type={showConfirmpassword ? "password" : "text"}
                                            placeholder="kkk!@#1578525"
                                        />
                                        <div className="flex items-center absolute right-0 px-2">
                                            <button onClick={toggoleConfirmPasswordVisible} type="button">
                                                {showConfirmpassword ? (
                                                    <IoIosLock className="" />
                                                ) : (
                                                    <FaLockOpen className="" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                </Form.Item>

                                <Form.Item className="text-center my-10">
                                    <Link to="/">
                                        <button
                                            className="bg-primary text-center w-full  p-2 font-semibold  text-white   px-10 py-2 rounded-md shadow-lg"
                                            type="submit"
                                        >
                                            Update Password
                                        </button>
                                    </Link>
                                </Form.Item>
                            </Form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newpass;