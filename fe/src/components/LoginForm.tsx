import React, { useState } from 'react'

const LoginForm = () => {
    const [login, setLogin] = useState(true);

    return (
        <div className="my-auto mx-auto">
            <div className="w-full max-w-xs">
                <form className="bg-primary shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    {login === true ? (
                        <div>
                            <div className="mb-4">
                                <label className="block text-white text-sm font-bold mb-2">
                                    Username
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                            </div>
                            <div className="mb-6">
                                <label className="block text-white text-sm font-bold mb-2">
                                    Password
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                                {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                            </div>
                            <div className="flex items-center justify-between mb-3">
                                <button className="w-full bg-accent-orange hover:bg-opacity-90 hover:text-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Login
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <a className="inline-block align-baseline font-bold text-xs text-white">
                                    Don't have an account? <a className="text-accent-orange hover:text-opacity-70 cursor-pointer" onClick={() => setLogin(false)}>Register</a>
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="mb-4">
                                <label className="block text-white text-sm font-bold mb-2">
                                    Username
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="example@mail.com" />
                            </div>
                            <div className="mb-1">
                                <label className="block text-white text-sm font-bold mb-2">
                                    Password
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                            </div>
                            <div className="mb-6">
                                <label className="block text-white text-sm font-bold mb-2">
                                    Confirm Password
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                            </div>
                            <div className="flex items-center justify-between mb-3">
                                <button className="w-full bg-accent-orange hover:bg-opacity-90 hover:text-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Register
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <a className="inline-block align-baseline font-bold text-xs text-white">
                                    Already have an account? <a className="text-accent-orange hover:text-opacity-70 cursor-pointer" onClick={() => setLogin(true)}>Sign In</a>
                                </a>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default LoginForm;
