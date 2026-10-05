import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Instagram, Heart, MessageCircle, Eye, Sparkles, TrendingUp, Compass, MapPin, X, ArrowUpRight } from 'lucide-react';

interface AestheticPost {
  id: string;
  image: string;
  location: string;
  caption: string;
  tags: string[];
  likes: number;
  comments: number;
  timeAgo: string;
  category: 'conservatory' | 'patisserie' | 'espresso' | 'details';
  // Data visualization metrics
  colorPalette: { name: string; hex: string; percent: number }[];
  aestheticScore: number;
  chromaTemp: string; // e.g. "3100K Warm"
  sparkline: number[];
}

const INITIAL_POSTS: AestheticPost[] = [
  {
    id: 'post-1',
    image: '/src/assets/images/cake_pistachio_bliss_1791177998979.jpg',
    location: 'Kohsar Market, F-6 Islamabad',
    caption: 'Freshly plated Aatis Pistachio Bliss with crushed Iranian pistachios & whipped mascarpone. Morning batch just arrived from our patisserie kitchen.',
    tags: ['#ellascafe', '#pistachiobliss', '#islamabadcafes', '#artisanpatisserie'],
    likes: 642,
    comments: 48,
    timeAgo: '4m ago',
    category: 'patisserie',
    colorPalette: [
      { name: 'Pistachio Sage', hex: '#638870', percent: 46 },
      { name: 'Warm Cream', hex: '#EBE3D3', percent: 34 },
      { name: 'Crushed Gold', hex: '#C38B52', percent: 20 }
    ],
    aestheticScore: 98,
    chromaTemp: '3200K Morning',
    sparkline: [12, 18, 29, 45, 62, 78, 92]
  },
  {
    id: 'post-2',
    image: '/src/assets/images/hero_green_cup_1791177988782.jpg',
    location: 'Conservatory Room, Islamabad',
    caption: 'The art of morning microfoam. Hand-poured tulip on our dark forest ceramic fluted cup. 100% single-origin Ethiopian roast.',
    tags: ['#latteart', '#singleorigin', '#greenceramics', '#ellascoffee'],
    likes: 894,
    comments: 72,
    timeAgo: '18m ago',
    category: 'espresso',
    colorPalette: [
      { name: 'Botanical Green', hex: '#1A2F23', percent: 52 },
      { name: 'Caramel Crema', hex: '#C38B52', percent: 28 },
      { name: 'Linen Neutral', hex: '#F8F5EE', percent: 20 }
    ],
    aestheticScore: 99,
    chromaTemp: '2900K Golden',
    sparkline: [24, 38, 52, 70, 88, 110, 134]
  },
  {
    id: 'post-3',
    image: '/src/assets/images/cake_chocolate_dream_1791178009334.jpg',
    location: 'Patisserie Lab, Lahore Gulberg',
    caption: 'Mirror-glaze perfection. 70% Valrhona dark chocolate entremet with single-estate hazelnut core and tempered chocolate heart.',
    tags: ['#valrhonachocolate', '#entremet', '#mirrorglaze', '#lahorefoodies'],
    likes: 512,
    comments: 39,
    timeAgo: '32m ago',
    category: 'patisserie',
    colorPalette: [
      { name: 'Noir Chocolate', hex: '#261711', percent: 54 },
      { name: 'Bronze Truffle', hex: '#87532B', percent: 26 },
      { name: 'Warm Sand', hex: '#F6EEE6', percent: 20 }
    ],
    aestheticScore: 96,
    chromaTemp: '3400K Studio',
    sparkline: [14, 20, 31, 42, 59, 70, 84]
  },
  {
    id: 'post-4',
    image: '/src/assets/images/special_signature_latte_1791178030278.jpg',
    location: 'Beverly Centre, Blue Area',
    caption: 'Müil Velvet brew on aged olive wood with vintage brass spoon. Smooth sweetness meeting double ristretto intensity.',
    tags: ['#spanishlatte', '#muilcoffee', '#woodentray', '#coffeetime'],
    likes: 720,
    comments: 61,
    timeAgo: '46m ago',
    category: 'espresso',
    colorPalette: [
      { name: 'Espresso Velvet', hex: '#3B271A', percent: 48 },
      { name: 'Honey Wood', hex: '#A56C36', percent: 32 },
      { name: 'Forest Linen', hex: '#283E30', percent: 20 }
    ],
    aestheticScore: 97,
    chromaTemp: '3050K Warm',
    sparkline: [30, 44, 58, 79, 95, 118, 142]
  },
  {
    id: 'post-5',
    image: '/src/assets/images/cake_berry_delight_1791178019409.jpg',
    location: 'High Tea Terrace, Kohsar F-6',
    caption: 'Ruby berry compote glistening on Madagascar vanilla bean cheesecake. Tart wild blueberries balancing velvety sweetness.',
    tags: ['#berrycheesecake', '#wildberries', '#hightea', '#ellascakes'],
    likes: 685,
    comments: 53,
    timeAgo: '1h ago',
    category: 'patisserie',
    colorPalette: [
      { name: 'Berry Crimson', hex: '#8B2C42', percent: 44 },
      { name: 'Vanilla Custard', hex: '#FAF3E3', percent: 36 },
      { name: 'Deep Blackberry', hex: '#311728', percent: 20 }
    ],
    aestheticScore: 95,
    chromaTemp: '3300K Daylight',
    sparkline: [18, 25, 38, 54, 71, 88, 106]
  },
  {
    id: 'post-6',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    location: 'Main Dining Conservatory, Islamabad',
    caption: 'Midday sunlight casting soft shadows through our arched conservatory windows. Marble tops, warm jazz, and the aroma of roasted beans.',
    tags: ['#cafevibes', '#conservatory', '#marbledesign', '#islamabadlife'],
    likes: 1042,
    comments: 94,
    timeAgo: '2h ago',
    category: 'conservatory',
    colorPalette: [
      { name: 'Sunlit Marble', hex: '#EAE6DD', percent: 50 },
      { name: 'Olive Foliage', hex: '#485E4D', percent: 30 },
      { name: 'Antique Brass', hex: '#B8860B', percent: 20 }
    ],
    aestheticScore: 99,
    chromaTemp: '4200K Natural',
    sparkline: [40, 65, 92, 130, 168, 210, 260]
  }
];

export const AestheticFeed: React.FC = () => {
  const [posts, setPosts] = useState<AestheticPost[]>(INITIAL_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalPost, setActiveModalPost] = useState<AestheticPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [livePulse, setLivePulse] = useState(0);

  // Live telemetry interval simulating real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePulse((prev) => prev + 1);
      // Randomly increment likes on a random post to simulate live engagement
      setPosts((prevPosts) => {
        const randIndex = Math.floor(Math.random() * prevPosts.length);
        return prevPosts.map((p, i) => {
          if (i === randIndex) {
            const newSparkline = [...p.sparkline.slice(1), p.sparkline[p.sparkline.length - 1] + Math.floor(Math.random() * 4) + 1];
            return {
              ...p,
              likes: p.likes + 1,
              sparkline: newSparkline
            };
          }
          return p;
        });
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + (likedPosts[id] ? -1 : 1) } : p))
    );
  };

  const filteredPosts = posts.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

  return (
    <section id="aesthetic-feed" className="py-20 md:py-28 bg-[#F8F5EE] border-t border-[#1A2F23]/10 relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Section Header with Real-Time Telemetry Data */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#44634E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#44634E]" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#44634E]">
                Live From @ellas.pk · Real-Time Aesthetic Telemetry
              </span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A2F23] tracking-tight">
              Moments Captured in Daylight
            </h2>
            <p className="text-sm text-[#556259] max-w-lg mt-2 leading-relaxed">
              Curated glimpses from our coffee bar, pastry station, and conservatory room. Hover over any frame to inspect its harmonic color spectrum.
            </p>
          </div>

          {/* Telemetry Dashboard Data Viz Cards */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {/* Viz 1: Live Color Temperature */}
            <div className="bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#1A2F23]/10 shadow-xs">
              <div className="text-[10px] uppercase font-bold text-[#7B887E] tracking-wider">
                Ambiance Temp
              </div>
              <div className="text-sm font-semibold text-[#1A2F23] font-mono tabular-nums flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#C38B52]" />
                3,180K Warm
              </div>
            </div>

            {/* Viz 2: Extraction Sweetness / Brix */}
            <div className="bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#1A2F23]/10 shadow-xs">
              <div className="text-[10px] uppercase font-bold text-[#7B887E] tracking-wider">
                Roast Extraction
              </div>
              <div className="text-sm font-semibold text-[#1A2F23] font-mono tabular-nums flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#44634E]" />
                21.4% Yield
              </div>
            </div>

            {/* Viz 3: Conservatory Mood */}
            <div className="bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#1A2F23]/10 shadow-xs">
              <div className="text-[10px] uppercase font-bold text-[#7B887E] tracking-wider">
                Conservatory Mood
              </div>
              <div className="text-sm font-semibold text-[#1A2F23] flex items-center gap-1.5 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C38B52]" />
                Serene &amp; Sunlit
              </div>
            </div>

            {/* Instagram Link CTA */}
            <a
              href="https://www.instagram.com/ellas.pk?stkn=eHljODd6cG1heXUx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1A2F23] hover:bg-[#122219] text-white text-xs font-semibold rounded-2xl transition-colors shadow-xs"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@ellas.pk</span>
              <ArrowUpRight className="w-3 h-3 text-[#C38B52]" />
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-medium text-[#556259]">
          <span className="text-[#7B887E] mr-1 shrink-0">Filter Feed:</span>
          {[
            { id: 'all', label: 'All Aesthetics' },
            { id: 'patisserie', label: 'Patisserie Lab' },
            { id: 'espresso', label: 'Espresso Bar' },
            { id: 'conservatory', label: 'Conservatory Room' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-full transition-all shrink-0 cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-[#1A2F23] text-white shadow-xs'
                  : 'bg-white hover:bg-[#F2ECE1] text-[#4A554D] border border-[#1A2F23]/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3D Hover-Parallax Interactive Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <ParallaxPostCard
              key={post.id}
              post={post}
              isLiked={!!likedPosts[post.id]}
              onLike={(e) => handleLike(post.id, e)}
              onClick={() => setActiveModalPost(post)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox / Post Detail Modal */}
      {activeModalPost && (
        <PostModal
          post={activeModalPost}
          isLiked={!!likedPosts[activeModalPost.id]}
          onLike={() => handleLike(activeModalPost.id)}
          onClose={() => setActiveModalPost(null)}
        />
      )}
    </section>
  );
};

interface ParallaxPostCardProps {
  post: AestheticPost;
  isLiked: boolean;
  onLike: (e: React.MouseEvent) => void;
  onClick: () => void;
}

const ParallaxPostCard: React.FC<ParallaxPostCardProps> = ({ post, isLiked, onLike, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Parallax tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imageRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // tilt angle
    const rotateY = ((x - centerX) / centerX) * 12;

    const moveX = ((x - centerX) / centerX) * -14; // image shift
    const moveY = ((y - centerY) / centerY) * -14;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.25,
      ease: 'power2.out',
      transformPerspective: 1000
    });

    gsap.to(imageRef.current, {
      x: moveX,
      y: moveY,
      scale: 1.12,
      duration: 0.35,
      ease: 'power2.out'
    });

    if (glareRef.current) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 60%)`;
      glareRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!cardRef.current || !imageRef.current) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)'
    });

    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out'
    });

    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group relative bg-white rounded-[28px] overflow-hidden shadow-[0_4px_24px_rgba(26,47,35,0.06)] hover:shadow-[0_24px_48px_rgba(26,47,35,0.14)] border border-[#1A2F23]/10 transition-all duration-300 cursor-pointer transform-gpu"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Aspect Ratio Container for Image */}
      <div className="relative aspect-square overflow-hidden bg-[#ECE5D8]">
        <img
          ref={imageRef}
          src={post.image}
          alt={post.caption}
          className="w-full h-full object-cover will-change-transform"
          referrerPolicy="no-referrer"
        />

        {/* Glare overlay for 3D effect */}
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 z-10"
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold text-white tracking-wide flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C38B52]" />
            {post.chromaTemp}
          </div>

          <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#1A2F23] font-mono tabular-nums shadow-sm">
            {post.aestheticScore}% Aesthetic Score
          </div>
        </div>

        {/* Hover Data Visualization Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end text-white transition-opacity duration-300 z-20 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Location & Time */}
          <div className="flex items-center justify-between text-xs text-white/80 mb-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C38B52]" />
              {post.location}
            </span>
            <span>{post.timeAgo}</span>
          </div>

          {/* Caption preview */}
          <p className="text-xs text-white/95 line-clamp-2 leading-relaxed mb-4">
            {post.caption}
          </p>

          {/* Color Palette Spectrum Data Visualization */}
          <div className="space-y-1.5 bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/15 mb-3">
            <div className="flex justify-between text-[10px] text-white/80 font-mono">
              <span>COLOR SPECTRUM</span>
              <span>HARMONIC RATIO</span>
            </div>
            {/* Color spectrum segment bar */}
            <div className="flex h-2 rounded-full overflow-hidden w-full gap-[1px]">
              {post.colorPalette.map((col, idx) => (
                <div
                  key={idx}
                  style={{ width: `${col.percent}%`, backgroundColor: col.hex }}
                  className="h-full relative group/bar"
                  title={`${col.name}: ${col.percent}%`}
                />
              ))}
            </div>
            {/* Swatch labels */}
            <div className="flex justify-between items-center text-[9px] text-white/70">
              {post.colorPalette.map((col, idx) => (
                <span key={idx} className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: col.hex }} />
                  {col.name} ({col.percent}%)
                </span>
              ))}
            </div>
          </div>

          {/* Engagement bar */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-4 text-xs font-semibold">
              <button
                type="button"
                onClick={onLike}
                className="flex items-center gap-1 hover:text-[#C38B52] transition-colors pointer-events-auto"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#C38B52] text-[#C38B52]' : ''}`} />
                <span className="font-mono tabular-nums">{post.likes}</span>
              </button>
              <div className="flex items-center gap-1 text-white/80">
                <MessageCircle className="w-4 h-4" />
                <span className="font-mono tabular-nums">{post.comments}</span>
              </div>
            </div>

            {/* Sparkline mini chart */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-white/60">Velocity:</span>
              <MiniSparkline data={post.sparkline} color="#C38B52" />
            </div>
          </div>
        </div>
      </div>

      {/* Card Bottom: Quiet unboxed metadata */}
      <div className="p-4 sm:p-5 flex items-center justify-between text-xs text-[#556259]">
        <div className="flex items-center gap-2">
          <Instagram className="w-3.5 h-3.5 text-[#C38B52]" />
          <span className="font-semibold text-[#1A2F23]">@ellas.pk</span>
          <span className="text-[#7B887E]">· {post.timeAgo}</span>
        </div>

        <div className="flex items-center gap-1.5 font-medium text-[#1A2F23]">
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#C38B52] text-[#C38B52]' : 'text-[#7B887E]'}`} />
          <span className="font-mono tabular-nums">{post.likes}</span>
        </div>
      </div>
    </div>
  );
};

// Mini SVG sparkline generator
const MiniSparkline: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 50;
  const height = 16;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

// Lightbox Modal for Post Inspection
const PostModal: React.FC<{
  post: AestheticPost;
  isLiked: boolean;
  onLike: () => void;
  onClose: () => void;
}> = ({ post, isLiked, onLike, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-[#1A2F23]/60 backdrop-blur-xs transition-opacity" />

      <div className="relative w-full max-w-3xl bg-[#F8F5EE] rounded-[32px] overflow-hidden shadow-2xl border border-[#1A2F23]/10 z-10 grid grid-cols-1 md:grid-cols-12 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#1A2F23] flex items-center justify-center shadow-xs"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Photo */}
        <div className="md:col-span-7 bg-[#EFE8DC] relative aspect-square flex items-center justify-center">
          <img
            src={post.image}
            alt={post.caption}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Right: Instagram Info & Data Viz Breakdown */}
        <div className="md:col-span-5 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* User row */}
            <div className="flex items-center gap-3 pb-3 border-b border-[#1A2F23]/10">
              <div className="w-9 h-9 rounded-full bg-[#1A2F23] text-white flex items-center justify-center font-serif-display font-bold text-sm">
                E
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-[#1A2F23]">ellas.pk</h4>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C38B52]" />
                  <span className="text-[10px] text-[#7B887E]">Verified Cafe</span>
                </div>
                <p className="text-[11px] text-[#556259]">{post.location}</p>
              </div>
            </div>

            {/* Caption */}
            <p className="text-xs text-[#1E2520] leading-relaxed">
              {post.caption}
            </p>

            <div className="flex flex-wrap gap-1 text-[11px] text-[#C38B52] font-medium">
              {post.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>

            {/* Data Viz: Color Spectrum Extraction */}
            <div className="p-3 bg-white rounded-2xl border border-[#1A2F23]/10 space-y-2">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#7B887E]">
                Extracted Harmonic Palette
              </div>
              <div className="flex h-3 rounded-full overflow-hidden gap-[1px]">
                {post.colorPalette.map((col, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${col.percent}%`, backgroundColor: col.hex }}
                    className="h-full"
                    title={`${col.name}: ${col.percent}%`}
                  />
                ))}
              </div>
              <div className="space-y-1">
                {post.colorPalette.map((col, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[10px] text-[#556259]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: col.hex }} />
                      <span>{col.name}</span>
                    </div>
                    <span className="font-mono tabular-nums font-semibold">{col.percent}% · {col.hex}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#1A2F23]/10 flex items-center justify-between">
            <div>
              <button
                onClick={onLike}
                className="flex items-center gap-2 text-sm font-semibold text-[#1A2F23] hover:text-[#C38B52] transition-colors"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-[#C38B52] text-[#C38B52]' : ''}`} />
                <span className="font-mono tabular-nums">{post.likes} likes</span>
              </button>
              <p className="text-[10px] text-[#7B887E] mt-0.5">{post.timeAgo}</p>
            </div>

            <a
              href="https://www.instagram.com/ellas.pk?stkn=eHljODd6cG1heXUx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold px-4 py-2 bg-[#1A2F23] text-white rounded-full hover:bg-[#122219] flex items-center gap-1.5"
            >
              <span>View on Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C38B52]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
