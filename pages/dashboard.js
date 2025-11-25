import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, Users, Zap } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center text-purple-300">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link href="/" className="text-purple-300 hover:text-purple-200 mb-6 inline-block">← Back</Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Analytics Dashboard</h1>
        </div>
      </header>

      {/* Stats */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-purple-400 text-sm mb-2">Total Artists</div>
                <div className="text-4xl font-bold text-white">{stats.totalArtists}</div>
              </div>
              <Users size={32} className="text-purple-400" />
            </div>
          </div>

          <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-purple-400 text-sm mb-2">Total Artworks</div>
                <div className="text-4xl font-bold text-white">{stats.totalArtworks}</div>
              </div>
              <Zap size={32} className="text-pink-400" />
            </div>
          </div>

          <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-purple-400 text-sm mb-2">Total Sales</div>
                <div className="text-4xl font-bold text-white">{stats.totalSales}</div>
              </div>
              <TrendingUp size={32} className="text-green-400" />
            </div>
          </div>
        </div>

        {/* Top Artists */}
        <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Top Artists</h2>
          <div className="space-y-4">
            {stats.topArtists.map((artist, idx) => (
              <div key={artist.id} className="flex justify-between items-center p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-purple-400">#{idx + 1}</span>
                  <div>
                    <p className="text-white font-semibold">{artist.name}</p>
                    <p className="text-purple-300 text-sm">{artist.followers.toLocaleString()} followers</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-pink-400 font-bold">{artist.totalSales} sales</p>
                  <p className="text-purple-300 text-sm">{artist.artworks.length} artworks</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}