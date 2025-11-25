const artists = [
  {
    id: 1,
    name: 'Luna Chen',
    verified: true,
    followers: 12400,
    avatar: '🎨',
    bio: 'Digital surrealist exploring dreams through pixels',
    artworks: [
      { id: 1, title: 'Nebula Dreams', price: '2.5', sales: 8, image: '🌌' },
      { id: 2, title: 'Cosmic Flow', price: '1.8', sales: 5, image: '✨' },
      { id: 3, title: 'Digital Eden', price: '3.2', sales: 12, image: '🌿' }
    ]
  },
  {
    id: 2,
    name: 'Alex Rivera',
    verified: true,
    followers: 8900,
    avatar: '🖌️',
    bio: 'Abstract geometrist pushing computational art boundaries',
    artworks: [
      { id: 4, title: 'Infinite Patterns', price: '1.5', sales: 3, image: '🔷' },
      { id: 5, title: 'Color Theory', price: '2.1', sales: 6, image: '🎭' },
      { id: 6, title: 'Fractals', price: '1.9', sales: 4, image: '🪻' }
    ]
  },
  {
    id: 3,
    name: 'Zara Kim',
    verified: false,
    followers: 3200,
    avatar: '✏️',
    bio: 'Emerging artist exploring digital portraiture',
    artworks: [
      { id: 7, title: 'Untitled #47', price: '0.8', sales: 1, image: '👤' },
      { id: 8, title: 'Echo', price: '1.2', sales: 2, image: '🔊' },
      { id: 9, title: 'Reflection', price: '0.9', sales: 0, image: '🪞' }
    ]
  }
];

export default function handler(req, res) {
  const { id } = req.query;
  const artist = artists.find(a => a.id === parseInt(id));
  
  if (!artist) {
    return res.status(404).json({ error: 'Artist not found' });
  }
  
  res.status(200).json(artist);
}