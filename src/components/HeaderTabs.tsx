import React, { useState } from 'react';
import { motion } from 'framer-motion';

const tabs = ['Trending', 'New', 'Movies', 'Serials', 'TV Shows'];

const HeaderTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Trending');

    return (
        <div className="w-full h-14 flex items-center justify-center bg-transparent mt-2">
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar px-6 max-w-full">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="relative flex flex-col items-center group flex-shrink-0"
                        >
                            <span 
                                className={`text-sm font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                                    isActive ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
                                }`}
                            >
                                {tab}
                            </span>
                            {isActive && (
                                <motion.div 
                                    layoutId="activeTabUnderline"
                                    className="absolute -bottom-2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(255,184,0,0.8)]"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default HeaderTabs;
