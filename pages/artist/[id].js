import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Shield, Search } from 'lucide-react';

export default function Home() {
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const res = await fetch('/api/artists');
      const data = await res.json();
      setArtists(data);
    } catch (error) {
      console.error('Failed to fetch artists:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ✨ NFT Art Gallery
            </h1>
            <nav className="flex gap-4">
              <Link href="/" className="text-purple-300 hover:text-purple-200">Gallery</Link>
              <Link href="/dashboard" className="text-purple-300 hover:text-purple-200">Dashboard</Link>
            </nav>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-purple-400" size={20} />
            <input
              type="text"
              placeholder="Search artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center text-purple-300">Loading artists...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtists.map(artist => (
              <Link key={artist.id} href={`/artist/${artist.id}`}>
                <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-6 hover:border-purple-400 transition cursor-pointer group">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition">{artist.avatar}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-bold text-white">{artist.name}</h2>
                    {artist.verified && <Shield size={18} className="text-green-400" />}
                  </div>
                  <p className="text-purple-300 text-sm mb-4">{artist.bio}</p>
                  <div className="flex justify-between text-xs text-purple-400">
                    <span>{artist.followers.toLocaleString()} followers</span>
                    <span>{artist.artworks.length} artworks</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}