import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  Send,
  Zap,
  Globe,
  Upload
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card } from '@/src/components/ui/Card';

export const AdmissionsPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    transcripts: null,
    recommendation: null,
    idCopy: null,
    photos: null,
  });

  const handleFileChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [key]: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="h-24 w-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-4xl font-black tracking-tight">Application Received!</h1>
          <p className="text-muted-foreground text-lg">
            Thank you for applying to STAHIZA HUB. Our admissions team will review your application and get back to you via email within 3-5 business days.
          </p>
          <Link to="/">
            <Button variant="navy" size="lg" className="w-full mt-4">Return Home</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold selection:text-black">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 bg-navy rounded-lg flex items-center justify-center text-white shadow-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-xl font-black tracking-tighter">STAHIZA <span className="text-gold">HUB</span></span>
          </Link>
          <Link to="/role-selection">
            <Button variant="outline" size="sm" className="font-bold">Login</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest mb-6">
              Admissions 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[0.9]">
              Join the <span className="text-navy">Future</span> of Learning.
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
              Start your journey with STAHIZA HUB. We are looking for passionate students ready to excel in a modern, connected environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Application Form & Info */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black mb-6">Why Choose Us?</h2>
              <div className="space-y-6">
                {[
                  { icon: ShieldCheck, title: "Accredited Excellence", desc: "Our curriculum meets the highest national standards for secondary education." },
                  { icon: Zap, title: "AI-Powered Learning", desc: "Every student gets a personalized AI Tutor to assist with complex subjects." },
                  { icon: Globe, title: "Global Community", desc: "Connect with students and teachers across the region through our digital hub." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-12 w-12 rounded-xl bg-navy/5 flex items-center justify-center text-navy shrink-0">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-navy text-white border-none p-8">
              <h3 className="text-2xl font-black mb-4">Admission Requirements</h3>
              <ul className="space-y-3">
                {[
                  "Previous academic transcripts",
                  "Recommendation letter from previous school",
                  "Copy of birth certificate or ID",
                  "Passport size photographs (2)",
                  "Completed application form"
                ].map((req, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className="h-5 w-5 text-gold" /> {req}
                  </li>
                ))}
              </ul>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-muted/30 border border-border">
                <Calendar className="h-8 w-8 text-gold mb-4" />
                <h4 className="font-bold mb-1">Deadline</h4>
                <p className="text-xs text-muted-foreground">August 15, 2026</p>
              </div>
              <div className="p-6 rounded-3xl bg-muted/30 border border-border">
                <Clock className="h-8 w-8 text-maroon mb-4" />
                <h4 className="font-bold mb-1">Processing</h4>
                <p className="text-xs text-muted-foreground">3-5 Business Days</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <Card className="p-8 shadow-2xl border-none bg-card-bg sticky top-24">
              <h3 className="text-2xl font-black mb-8">Online Application</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Student Full Name" placeholder="John Doe" required />
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Applying for Grade</label>
                    <select className="flex h-10 w-full rounded-md border border-border bg-card-bg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-navy">
                      <option>S1 (Senior One)</option>
                      <option>S2 (Senior Two)</option>
                      <option>S3 (Senior Three)</option>
                      <option>S4 (Senior Four)</option>
                      <option>S5 (Senior Five)</option>
                      <option>S6 (Senior Six)</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Parent/Guardian Email" type="email" placeholder="parent@example.com" required />
                  <Input label="Phone Number" placeholder="+256 000 000 000" required />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Previous School</label>
                  <Input placeholder="Enter the name of your last school" required />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { key: 'transcripts', label: 'Academic Transcripts', icon: FileText },
                    { key: 'recommendation', label: 'Recommendation Letter', icon: FileText },
                    { key: 'idCopy', label: 'Birth Certificate / ID', icon: ShieldCheck },
                    { key: 'photos', label: 'Passport Photos (2)', icon: User },
                  ].map((doc) => (
                    <div key={doc.key} className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground">{doc.label}</label>
                      <div className="relative group">
                        <input 
                          type="file" 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                          onChange={(e) => handleFileChange(doc.key, e)}
                          required
                        />
                        <div className={`flex items-center gap-3 p-3 rounded-xl border-2 border-dashed transition-all ${
                          files[doc.key] ? 'border-green-500 bg-green-50/50 dark:bg-green-900/10' : 'border-border group-hover:border-navy'
                        }`}>
                          <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                            files[doc.key] ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                          }`}>
                            {files[doc.key] ? <CheckCircle2 className="h-5 w-5" /> : <Upload className="h-4 w-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate">
                              {files[doc.key] ? files[doc.key]?.name : 'Click to upload'}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              {files[doc.key] ? `${(files[doc.key]!.size / 1024 / 1024).toFixed(2)} MB` : 'PDF or Image'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Why do you want to join STAHIZA HUB?</label>
                  <textarea 
                    className="flex min-h-[100px] w-full rounded-md border border-border bg-card-bg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-navy"
                    placeholder="Tell us about your goals..."
                    required
                  />
                </div>

                <div className="p-4 rounded-xl bg-muted/50 border border-border flex items-start gap-3">
                  <div className="h-5 w-5 rounded border border-navy flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-navy" />
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-tight">
                    By submitting this form, I certify that the information provided is accurate and I agree to the terms of the admissions process.
                  </p>
                </div>

                <Button type="submit" variant="navy" className="w-full h-12 text-lg font-bold gap-2">
                  Submit Application <Send className="h-5 w-5" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-10 w-10 bg-navy rounded-lg flex items-center justify-center text-white">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-xl font-black tracking-tighter">STAHIZA <span className="text-gold">HUB</span></span>
          </div>
          <p className="text-sm text-muted-foreground font-medium mb-4">
            © 2026 STAHIZA HUB. Empowering the next generation of leaders.
          </p>
          <div className="flex items-center justify-center gap-6 text-xs font-bold uppercase tracking-widest">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <Link to="/login" className="hover:text-gold transition-colors">Login</Link>
            <Link to="/signup" className="hover:text-gold transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
