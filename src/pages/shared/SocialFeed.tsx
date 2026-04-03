import React, { useState } from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SocialFeed = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Principal Mark',
      role: 'Admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mark',
      content: 'Congratulations to our basketball team for winning the regional championship! 🏆🏀 #EduStreamPride',
      image: 'https://picsum.photos/seed/basketball/800/400',
      likes: 124,
      comments: 12,
      time: '2 hours ago',
    },
    {
      id: 2,
      user: 'Ms. Sarah',
      role: 'Teacher',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      content: 'The science fair was a huge success! So proud of all the innovative projects our students presented today. 🧪✨',
      image: 'https://picsum.photos/seed/science/800/400',
      likes: 89,
      comments: 5,
      time: '5 hours ago',
    },
  ]);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    const newPost = {
      id: posts.length + 1,
      user: 'You',
      role: 'Student',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      content: postText,
      likes: 0,
      comments: 0,
      time: 'Just now',
    };

    setPosts([newPost, ...posts]);
    setPostText('');
  };

  const handleLike = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Social Feed</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">Trending</Button>
          <Button variant="ghost" size="sm">Latest</Button>
        </div>
      </div>

      <Card className="p-4 border-none shadow-md bg-card-bg">
        <form onSubmit={handlePost}>
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-navy flex items-center justify-center text-white shrink-0">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-4">
              <textarea 
                className="w-full bg-transparent border-none focus:ring-0 resize-none text-sm min-h-[80px] text-foreground placeholder:text-muted-foreground" 
                placeholder="What's on your mind?"
                rows={2}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <span className="text-lg font-bold">@</span>
                  </Button>
                </div>
                <Button type="submit" variant="navy" size="sm" disabled={!postText.trim()}>Post</Button>
              </div>
            </div>
          </div>
        </form>
      </Card>

      <div className="space-y-6">
        <AnimatePresence initial={false}>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="p-0 overflow-hidden border-none shadow-md bg-card-bg">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={post.avatar} alt={post.user} className="h-10 w-10 rounded-full border border-border" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-foreground">{post.user}</h4>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          post.role === 'Admin' ? 'bg-maroon/10 text-maroon' : post.role === 'Teacher' ? 'bg-navy/10 text-navy dark:text-navy-light' : 'bg-gold/10 text-gold'
                        }`}>
                          {post.role}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">{post.time}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="px-4 pb-4">
                  <p className="text-sm leading-relaxed text-foreground">{post.content}</p>
                </div>

                {post.image && (
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img src={post.image} alt="Post" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                )}

                <div className="p-4 flex items-center justify-between border-t border-border">
                  <div className="flex gap-6">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-maroon transition-colors group"
                    >
                      <Heart className={`h-5 w-5 ${post.likes > 100 ? 'fill-maroon text-maroon' : 'group-hover:fill-maroon'}`} /> {post.likes}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-navy transition-colors">
                      <MessageCircle className="h-5 w-5" /> {post.comments}
                    </button>
                  </div>
                  <button className="text-muted-foreground hover:text-gold transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
