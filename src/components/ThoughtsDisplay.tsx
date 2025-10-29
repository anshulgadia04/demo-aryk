import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Thought {
  timestamp: string;
  name: string;
  message: string;
}

interface ThoughtsDisplayProps {
  refreshTrigger?: number; // Not used anymore, but kept for compatibility
}

const ThoughtsDisplay = ({ refreshTrigger }: ThoughtsDisplayProps) => {
  // Static thoughts - manually added (more thoughts for pagination demo)
  const staticThoughts: Thought[] = [
    {
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
      name: "Sarah",
      message: "Taking a moment to breathe and appreciate the small joys in life. This relaxing corner is exactly what I needed today. 🌸"
    },
    {
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
      name: "Michael",
      message: "The gentle sounds and peaceful atmosphere here help me find my center. Grateful for this space to reflect and recharge."
    },
    {
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      name: "Emma",
      message: "Sometimes we need to slow down and just be present. This corner reminds me to appreciate the beauty in simplicity. ✨"
    },
    {
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
      name: "David",
      message: "Nature has a way of healing the soul. Even a few minutes in this peaceful space can transform your entire day."
    },
    {
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
      name: "Luna",
      message: "Mindfulness isn't about emptying your mind, it's about being present with whatever arises. Thank you for this sanctuary. 🧘‍♀️"
    },
    {
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      name: "Alex",
      message: "In the rush of daily life, we forget to pause. This corner reminds me that stillness is not a luxury, but a necessity."
    },
    {
      timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 1.5 days ago
      name: "Maya",
      message: "The soft colors and gentle ambiance here create the perfect environment for reflection and inner peace. 🌿"
    },
    {
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
      name: "James",
      message: "Sometimes the most productive thing you can do is rest. This space understands that beautiful truth."
    }
  ];

  const [thoughts] = useState<Thought[]>(staticThoughts);
  const [currentPage, setCurrentPage] = useState(0);
  const thoughtsPerPage = 3;
  
  // Calculate pagination
  const totalPages = Math.ceil(thoughts.length / thoughtsPerPage);
  const startIndex = currentPage * thoughtsPerPage;
  const endIndex = startIndex + thoughtsPerPage;
  const currentThoughts = thoughts.slice(startIndex, endIndex);
  
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h4 className="text-lg font-serif font-light text-foreground">
          Recent Thoughts ({thoughts.length})
        </h4>
        <p className="text-xs text-muted-foreground mt-1">
          Page {currentPage + 1} of {totalPages}
        </p>
      </div>
      
      <div className="grid gap-4">
        {currentThoughts.map((thought, index) => (
          <div 
            key={`${thought.timestamp}-${index}`}
            className="bg-white/50 backdrop-blur-sm border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="font-medium text-foreground">
                {thought.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDate(thought.timestamp)}
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {thought.message}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 pt-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            className="flex items-center space-x-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-8 h-8 rounded-full text-sm transition-colors ${
                  currentPage === i
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            className="flex items-center space-x-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ThoughtsDisplay;
