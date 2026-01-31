import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  quizTitle: string;
  accuracy: number;
  createdAt: string;
}

export default function Leaderboard() {

    const fakeData: LeaderboardEntry[] = [
    {
      id: "1",
      playerName: "Harish Juyal",
      score: 95,
      quizTitle: "Space & Astronomy",
      accuracy: 97,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hrs ago
    },
    {
      id: "2",
      playerName: "Aditi Sharma",
      score: 89,
      quizTitle: "React Basics",
      accuracy: 92,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      playerName: "Rohan Mehta",
      score: 85,
      quizTitle: "TypeScript Fundamentals",
      accuracy: 88,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "4",
      playerName: "Priya Verma",
      score: 80,
      quizTitle: "Node.js Deep Dive",
      accuracy: 84,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "5",
      playerName: "Arjun Patel",
      score: 75,
      quizTitle: "SQL Essentials",
      accuracy: 79,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // ⚡ Use fake data while backend is not connected
  const { data: leaderboard = fakeData, isLoading = false } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/leaderboard"],
    queryFn: async () => fakeData, // replace later with actual fetch()
    initialData: fakeData,
  });
  
  // const { data: leaderboard, isLoading } = useQuery<LeaderboardEntry[]>({
  //   queryKey: ["/api/leaderboard"],
  // });

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Less than an hour ago";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-orange-500" />;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <section id="leaderboard" className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="skeleton w-64 h-10 rounded mx-auto mb-4" />
            <div className="skeleton w-48 h-6 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6">
                <div className="skeleton w-20 h-20 rounded-full mx-auto mb-4" />
                <div className="skeleton w-32 h-6 rounded mx-auto mb-2" />
                <div className="skeleton w-24 h-4 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const topThree = leaderboard?.slice(0, 3) || [];
  const remaining = leaderboard?.slice(3) || [];

  return (
    <section id="leaderboard" className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Leaderboard</h2>
          <p className="text-lg text-muted-foreground">Top performers across all quizzes</p>
        </motion.div>
        
        {/* Top 3 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {topThree.map((entry, index) => {
            const rank = index + 1;
            const isFirst = rank === 1;
            
            return (
              <motion.div 
                key={entry.id}
                className={`bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all ${
                  isFirst ? "lg:scale-110 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary" : ""
                } ${rank === 2 ? "order-2 lg:order-1" : ""} ${rank === 3 ? "order-3" : ""} ${rank === 1 ? "order-1 lg:order-2" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                data-testid={`top-player-${rank}`}
              >
                <div className="text-center">
                  <div className={`w-${isFirst ? '20' : '20'} h-${isFirst ? '20' : '20'} rounded-full bg-gradient-to-br ${
                    rank === 1 ? "from-yellow-400 to-yellow-500" : 
                    rank === 2 ? "from-gray-300 to-gray-400" : 
                    "from-orange-400 to-orange-500"
                  } flex items-center justify-center text-white text-${isFirst ? '4xl' : '3xl'} font-bold mx-auto mb-4 shadow-xl`}>
                    {rank}
                  </div>
                  <div className={`w-${isFirst ? '16' : '16'} h-${isFirst ? '16' : '16'} rounded-full bg-muted flex items-center justify-center mx-auto mb-3 text-${isFirst ? '3xl' : '3xl'}`}>
                    {getRankIcon(rank) || getInitials(entry.playerName)}
                  </div>
                  <h3 className={`text-${isFirst ? 'xl' : 'xl'} font-bold ${isFirst ? 'text-yellow-600' : rank === 2 ? 'text-gray-600' : 'text-orange-600'} mb-1`}>
                    {entry.playerName}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{entry.quizTitle}</p>
                  <div className={`text-${isFirst ? '4xl' : '3xl'} font-bold ${isFirst ? 'text-yellow-600' : rank === 2 ? 'text-gray-600' : 'text-orange-600'}`}>
                    {entry.score}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">points</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Leaderboard Table */}
        {remaining.length > 0 && (
          <motion.div 
            className="bg-card border border-border rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Player</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Quiz</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Score</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Accuracy</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {remaining.map((entry, index) => {
                    const rank = index + 4; // Starting from 4th place
                    const gradientColors = [
                      "from-blue-500 to-purple-500",
                      "from-green-500 to-teal-500", 
                      "from-pink-500 to-rose-500",
                      "from-indigo-500 to-purple-500"
                    ];
                    
                    return (
                      <tr key={entry.id} className="hover:bg-muted/50 transition-colors" data-testid={`leaderboard-entry-${rank}`}>
                        <td className="px-6 py-4">
                          <span className="text-lg font-bold text-muted-foreground">{rank}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradientColors[index % gradientColors.length]} flex items-center justify-center text-white font-bold`}>
                              {getInitials(entry.playerName)}
                            </div>
                            <span className="font-medium text-foreground">{entry.playerName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-muted-foreground">{entry.quizTitle}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-lg font-bold text-primary">{entry.score}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-success">{entry.accuracy}%</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-muted-foreground">{formatTimeAgo(entry.createdAt)}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
        
        {leaderboard?.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg" data-testid="no-scores-message">
              No scores yet. Be the first to complete a quiz!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
