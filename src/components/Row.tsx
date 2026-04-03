import React, { useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface RowProps {
  title: string;
  movies: Movie[];
  variant?: 'poster' | 'backdrop';
}

const Row: React.FC<RowProps> = ({ title, movies, variant = 'poster' }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  if (movies.length === 0) return null;

  return (
    <div className="relative mb-12 group/row font-sans">
      <div className="flex items-center justify-between mb-5 md:mb-8 px-2">
        <h2 className="text-lg md:text-2xl font-black uppercase tracking-[0.05em] text-white/95 group-hover:text-primary transition-colors duration-500">
          {title}
        </h2>
        
        <button className="flex items-center gap-1.5 text-[9px] md:text-xs font-black text-zinc-600 hover:text-white transition-all uppercase tracking-[0.25em] hover:translate-x-1">
            See all
            <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
        </button>
      </div>

      <div 
        ref={rowRef}
        className="flex gap-4 md:gap-5 overflow-x-scroll no-scrollbar pb-6 scroll-smooth snap-x snap-mandatory px-2"
      >
        <AnimatePresence initial={false}>
          {movies.map((movie) => (
            <div key={movie.id} className="snap-start">
              <MovieCard 
                movie={movie} 
                variant={variant} 
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Row;
