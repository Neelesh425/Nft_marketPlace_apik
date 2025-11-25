const artists = [
  {
    id: 1,
    name: 'Luna Chen',
    verified: true,
    followers: 12400,
    artworks: [
      { sales: 8 },
      { sales: 5 },
      { sales: 12 }
    ]
  },
  {
    id: 2,
    name: 'Alex Rivera',
    verified: true,
    followers: 8900,
    artworks: [
      { sales: 3 },
      { sales: 6 },
      { sales: 4 }
    ]
  },
  {
    id: 3,
    name: 'Zara Kim',
    verified: false,
    followers: 3200,
    artworks: [
      { sales: 1 },
      { sales: 2 },
      { sales: 0 }
    ]
  }
];

export default function handler(req, res) {
  const totalArtists = artists.length;
  const totalArtworks = artists.reduce((sum, a) => sum + a.artworks.length, 0);
  const totalSales = artists.reduce((sum, a) => sum + a.artworks.reduce((s, art) => s + art.sales, 0), 0);
  
  const topArtists = artists.sort((a, b) => {
    const bSales = b.artworks.reduce((s, art) => s + art.sales, 0);
    const aSales = a.artworks.reduce((s, art) => s + art.sales, 0);
    return bSales - aSales;
  });

  res.status(200).json({
    totalArtists,
    totalArtworks,
    totalSales,
    topArtists
  });
}