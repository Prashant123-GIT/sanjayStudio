import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginSelection = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-studio-accent/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="font-serif text-4xl md:text-5xl text-studio-white mb-4">
                        Welcome to Sanjay Studio
                    </h1>
                    <p className="text-studio-white/60 text-lg font-light tracking-wide">
                        Please select your portal to continue
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Visitor / Client Portal */}
                    <Link to="/visitor-login" className="group">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-10 rounded-2xl h-full flex flex-col items-center justify-center text-center hover:bg-zinc-900/80 hover:border-studio-accent/30 transition-all duration-300 group-hover:transform group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-studio-accent/10"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-studio-accent/20 transition-colors duration-300">
                                <svg className="w-8 h-8 text-studio-white group-hover:text-studio-accent transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-serif text-studio-white mb-3 group-hover:text-studio-accent transition-colors duration-300">Client Portal</h2>
                            <p className="text-studio-white/50 text-sm leading-relaxed">
                                Access your personalized photo gallery and project details.
                            </p>
                        </motion.div>
                    </Link>

                    {/* Admin Portal */}
                    <Link to="/admin-access" className="group">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-10 rounded-2xl h-full flex flex-col items-center justify-center text-center hover:bg-zinc-900/80 hover:border-amber-500/30 transition-all duration-300 group-hover:transform group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-amber-500/10"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors duration-300">
                                <svg className="w-8 h-8 text-studio-white group-hover:text-amber-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-serif text-studio-white mb-3 group-hover:text-amber-500 transition-colors duration-300">Admin Portal</h2>
                            <p className="text-studio-white/50 text-sm leading-relaxed">
                                Manage clients, projects, and upload new content securely.
                            </p>
                        </motion.div>
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <Link to="/" className="text-studio-white/40 hover:text-studio-white text-sm tracking-widest uppercase transition-colors">
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginSelection;
