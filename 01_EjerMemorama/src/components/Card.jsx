import React from 'react';
import { Code, Database, Terminal, Server, Cpu, Layers, GitBranch, Tablet } from 'lucide-react';

const techIcons = [
  { icon: Code, name: 'Code' },
  { icon: Database, name: 'Database' },
  { icon: Terminal, name: 'Terminal' },
  { icon: Server, name: 'Server' },
  { icon: Cpu, name: 'Cpu' },
  { icon: Layers, name: 'Layers' },
  { icon: GitBranch, name: 'GitBranch' },
  { icon: Tablet, name: 'Tablet' }
];

const Card = ({ icon, isFlipped, isMatched, onClick }) => {
  const Icon = icon;
  
  return (
    <div 
      className={`
        relative w-24 h-24 cursor-pointer 
        transition-all duration-300 
        ${isMatched ? 'opacity-50' : ''}
      `}
      onClick={onClick}
    >
      <div 
        className={`
          absolute inset-0 
          flex items-center justify-center 
          rounded-lg 
          border-2 border-white
          bg-transparent 
          transition-all duration-300 
          ${isFlipped ? 'rotate-y-180' : ''}
        `}
      >
        {isFlipped || isMatched ? (
          <Icon 
            className="text-white w-12 h-12" 
            strokeWidth={1.5} 
          />
        ) : (
          <div 
            className="
              w-full h-full 
              bg-gray-800 
              flex items-center justify-center
            "
          >
            <span className="text-white font-bold text-lg">?</span>
          </div>
        )}
      </div>
    </div>
  );
};

export { Card, techIcons };