import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, ChevronLeft, Play, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMovies } from '../context/MovieContext';
import VideoPlayer from '../components/VideoPlayer';

const Watch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { allMovies, setSelectedMovie, isPlayerOpen, setIsPlayerOpen } = useMovies();
  const [showFullDesc, setShowFullDesc] = useState(false);

  const movie = useMemo(() => {
    return allMovies.find(m => m.id === id);
  }, [allMovies, id]);

  const similarMovies = useMemo(() => {
    if (!movie) return [];
    return allMovies.filter(m => m.genre === movie.genre && m.id !== movie.id).slice(0, 10);
  }, [allMovies, movie]);

  useEffect(() => {
    if (movie) {
      setSelectedMovie(movie);
    }
  }, [movie, setSelectedMovie]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-32 font-sans overflow-x-hidden">
      {/* 1. Full-Screen Backdrop / Video Section */}
      <div className="relative w-full aspect-[3/4] md:aspect-video bg-zinc-900 overflow-hidden">
        <AnimatePresence mode="wait">
            {!isPlayerOpen ? (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10"
                >
                    <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
                    
                    {/* Centered Large Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsPlayerOpen(true)}
                            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-2xl border border-white/20 flex items-center justify-center group"
                        >
                            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl">
                                <Play className="w-6 h-6 text-black fill-current ml-1" />
                            </div>
                        </motion.button>
                    </div>
                </motion.div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-50 bg-black"
                >
                    <VideoPlayer movie={movie} />
                </motion.div>
            )}
        </AnimatePresence>

        {/* Back Button */}
        <button 
            onClick={() => navigate(-1)}
            className="absolute top-8 left-8 z-[60] w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center active:scale-90 transition-transform"
        >
            <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* 2. Glassmorphic Sliding Details Sheet */}
      <motion.div 
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-20 -mt-24 px-6 mb-10"
      >
        <div className="w-full bg-[#111112]/95 backdrop-blur-3xl rounded-[40px] border border-white/5 p-10 pt-12 shadow-[0_-30px_100px_rgba(0,0,0,1)]">
            
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/10 rounded-full" />

            {/* Header: Title & Badges */}
            <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl md:text-5xl font-black text-white">{movie.title}</h1>
                    <div className="bg-white/10 backdrop-blur-md rounded-md px-2 py-0.5 border border-white/10 mt-1">
                        <span className="text-white text-[10px] font-black tracking-widest">4K</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Share2 className="w-5 h-5 text-white/60 hover:text-white cursor-pointer" />
                    <Bookmark className="w-5 h-5 text-white/60 hover:text-white cursor-pointer" />
                </div>
            </div>

            <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em] mb-8">Filamu Times • Release 2024</p>

            {/* Stats & Tags Row */}
            <div className="flex items-center gap-3 mb-10 overflow-x-auto no-scrollbar">
                <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest text-white/80 uppercase">Action</span>
                <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest text-white/80 uppercase">16+</span>
                <div className="bg-primary/20 border border-primary/20 px-3 py-1.5 rounded-full flex items-center gap-1">
                    <Play className="w-2.5 h-2.5 text-primary fill-primary" />
                    <span className="text-primary text-[10px] font-black">4.1</span>
                </div>
            </div>

            {/* Story Line */}
            <div className="mb-10">
                <h3 className="text-white text-lg font-black uppercase tracking-widest mb-4">Story Line</h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                    {movie.description}
                    {!showFullDesc && <span onClick={() => setShowFullDesc(true)} className="text-primary font-black ml-1 cursor-pointer">...More</span>}
                </p>
            </div>

            {/* Star Coast (Cast List) */}
            <div className="mb-10">
                <h3 className="text-white text-lg font-black uppercase tracking-widest mb-6">Star Coast</h3>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                    {/* Mock Cast using similar movie images */}
                    {similarMovies.slice(0, 6).map((m, idx) => (
                        <div key={idx} className="flex-shrink-0 group">
                            <div className="w-16 h-20 md:w-20 md:h-24 rounded-2xl overflow-hidden border border-white/5 shadow-xl transition-transform group-active:scale-95">
                                <img src={m.image} alt="Cast" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sub-Brand Overlay */}
            <div className="pt-8 border-t border-white/5 opacity-30 flex justify-center">
                <span className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.5em]">Filamu Times Premium</span>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Watch;
