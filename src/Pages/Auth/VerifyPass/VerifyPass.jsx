import { Form, Typography } from "antd";
import { Link } from "react-router-dom";
import { useState } from 'react';
import OtpInput from 'react-otp-input';
const VerifyPass = () => {
    const [otp, setOtp] = useState('');
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };
    const handleResendotp = () => {

    }


    return (
        <div className="bg-[ffffff]">
            <div className="container mx-auto">
                <div className=" ">
                    {/* <div className="w-full md:w-[50%] px-3 mt-10">
                        <img src={brandlogo} alt="brandlogo" className="h-full w-full object-cover" />
                    </div> */}
                    <div className="w-full  ">
                        <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center ">
                            <Form
                                name="varify-password"
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
                                        Check your email
                                    </h2>
                                    <Typography.Text className="text-neutral-500 text-center text-base ">
                                        We sent a reset link to contact@dscode...com
                                        enter 5 digit code that mentioned in the email
                                    </Typography.Text>
                                </div>

                                <Form.Item
                                    name="otp"
                                    label={""}
                                >
                                    <div className="flex justify-center items-center  my-10">
                                        <OtpInput
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={5}
                                            renderSeparator={<span className="lg:w-5 "> </span>}
                                            renderInput={(props) => (
                                                <input
                                                    {...props}
                                                    className="w-8 h-8 bg-transparent border-2 rounded-md text-xl mx-1 "
                                                />
                                            )}
                                        />
                                    </div>

                                </Form.Item>


                                <Form.Item className="text-center">
                                    <Link to="/reset-password" >
                                        <button
                                            className="bg-primary text-center w-full  p-2 font-semibold    text-white px-10 py-2 rounded-md shadow-lg"
                                            type="submit"
                                        >
                                            Varify Code
                                        </button>
                                    </Link>
                                </Form.Item>
                                <p className="my-5 text-center text-neutral-500"> You have not received the email? <span onClick={handleResendotp} className="text-blue-500 cursor-pointer">  Resend</span> </p>
                            </Form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyPass;