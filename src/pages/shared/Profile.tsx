import React, { useRef, useState } from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { useAuth } from '@/src/context/AuthContext';
import { Camera, Lock, Bell, Shield, User, CheckCircle2, Mail, Phone, Calendar, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const Profile = () => {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateUser({ avatar: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('saving');
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    
    try {
      await updateUser({ name: `${firstName} ${lastName}` });
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-foreground">User Profile</h1>
        <p className="text-muted-foreground font-medium">Manage your account settings and preferences.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="space-y-6">
          <Card className="flex flex-col items-center text-center py-12 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-24 bg-navy/5 dark:bg-gold/5 -z-10" />
            <div className="relative group/avatar">
              <div className="h-40 w-40 overflow-hidden rounded-3xl border-4 border-background shadow-2xl ring-4 ring-navy/10 dark:ring-gold/10 transition-all group-hover/avatar:ring-navy dark:group-hover/avatar:ring-gold">
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                  alt={user?.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover/avatar:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-navy dark:bg-gold text-white dark:text-black shadow-xl transition-all hover:scale-110 active:scale-95 z-20"
              >
                <Camera className="h-6 w-6" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </div>
            <div className="mt-8 space-y-2">
              <h2 className="text-2xl font-black text-foreground">{user?.name}</h2>
              <div className="flex items-center justify-center gap-2">
                <span className="rounded-full bg-navy/10 dark:bg-gold/10 px-4 py-1 text-xs font-black uppercase tracking-widest text-navy dark:text-gold">
                  {user?.role}
                </span>
              </div>
              <p className="text-sm font-medium text-muted-foreground mt-4 flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                {user?.email}
              </p>
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-2">
            {[
              { label: 'Personal Info', icon: User, active: true },
              { label: 'Security', icon: Lock, active: false },
              { label: 'Notifications', icon: Bell, active: false },
              { label: 'Privacy', icon: Shield, active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={cn(
                  'flex w-full items-center gap-4 rounded-2xl px-6 py-4 text-sm font-bold transition-all duration-200',
                  item.active 
                    ? 'bg-navy text-white shadow-lg shadow-navy/20' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <item.icon className={cn("h-5 w-5", item.active ? "text-gold" : "text-muted-foreground")} />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Card */}
        <div className="lg:col-span-2 space-y-8">
          <Card title="Personal Information" description="Update your personal information and contact details.">
            <form onSubmit={handleProfileUpdate} className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <Input 
                  label="First Name" 
                  name="firstName"
                  defaultValue={user?.name.split(' ')[0]} 
                  placeholder="John"
                />
                <Input 
                  label="Last Name" 
                  name="lastName"
                  defaultValue={user?.name.split(' ')[1]} 
                  placeholder="Doe"
                />
              </div>
              <Input label="Email Address" defaultValue={user?.email} disabled icon={Mail} />
              <div className="grid gap-6 md:grid-cols-2">
                <Input label="Phone Number" placeholder="+1 (555) 000-0000" icon={Phone} />
                <Input label="Date of Birth" type="date" icon={Calendar} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                  <Info className="h-3 w-3" /> Bio
                </label>
                <textarea 
                  className="flex min-h-[120px] w-full rounded-2xl border border-border bg-card-bg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-navy dark:focus:ring-gold focus:ring-offset-2 transition-all hover:border-muted-foreground/30"
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              <div className="pt-6 border-t border-border flex items-center justify-between gap-4">
                <Button variant="navy" type="submit" disabled={status === 'saving'} className="px-10 h-12">
                  {status === 'saving' ? 'Saving...' : 'Save Changes'}
                </Button>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-2 text-green-500 font-bold text-sm"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      Changes saved!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Card>

          <Card title="Change Password" description="Ensure your account is using a long, random password to stay secure.">
            <form className="space-y-8">
              <Input label="Current Password" type="password" placeholder="••••••••" />
              <div className="grid gap-6 md:grid-cols-2">
                <Input label="New Password" type="password" placeholder="••••••••" />
                <Input label="Confirm New Password" type="password" placeholder="••••••••" />
              </div>
              <div className="pt-6 border-t border-border">
                <Button variant="maroon" className="px-10 h-12">Update Password</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};
