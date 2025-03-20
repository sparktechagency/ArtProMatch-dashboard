import { Form, Input } from "antd";
import { Link } from "react-router-dom";
const ForgatePassword = () => {
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };
    return (
        <div className="bg-[ffffff]">
            <div className="container mx-auto">
                <div className=" ">
                    {/* <div className="w-full md:w-[50%] px-3 mt-10">
                        <img src={brandlogo} alt="brandlogo" className="h-full w-full object-cover" />
                    </div> */}
                    <div className="w-full">
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
                                        Forget Password
                                    </h2>

                                </div>

                                <Form.Item
                                    name="email"
                                    label={<p className="text-md font-semibold">Email Address :</p>}
                                    style={{}}
                                >
                                    <Input
                                        required
                                        style={{ padding: "6px" }}
                                        className=" text-md"
                                        placeholder="esteban_schiller@gmail.com"
                                    />
                                </Form.Item>


                                <Form.Item className="text-center">
                                    <Link to="/varification">
                                        <button
                                            className="bg-primary text-center w-full  p-2 font-semibold    text-white px-10 py-2 rounded-md shadow-lg"
                                            type="submit"
                                        >
                                            Send a code
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

export default ForgatePassword;