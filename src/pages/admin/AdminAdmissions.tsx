import React, { useState } from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { 
  UserPlus, 
  CheckCircle, 
  XCircle, 
  Search, 
  Mail, 
  Phone, 
  Clock, 
  FileText, 
  User, 
  Calendar, 
  Filter,
  Eye,
  X,
  MapPin,
  GraduationCap,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Application {
  id: number;
  name: string;
  grade: string;
  date: string;
  status: string;
  email: string;
  phone: string;
  previousSchool: string;
  statement: string;
  parentName: string;
}

export const AdminAdmissions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [applications, setApplications] = useState<Application[]>([
    { 
      id: 1, 
      name: 'John Doe Jr.', 
      grade: 'S1', 
      date: '2024-03-15', 
      status: 'Pending', 
      email: 'john@example.com', 
      phone: '+1234567890',
      previousSchool: 'Greenwood Primary School',
      parentName: 'John Doe Sr.',
      statement: 'I am passionate about technology and I believe STAHIZA HUB is the best place to nurture my skills in computer science and mathematics.'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      grade: 'S3', 
      date: '2024-03-14', 
      status: 'Reviewed', 
      email: 'jane@example.com', 
      phone: '+1234567891',
      previousSchool: 'Riverside Academy',
      parentName: 'Mary Smith',
      statement: 'I want to join a community that values both academic excellence and creative expression. STAHIZA HUB seems to have the perfect balance.'
    },
    { 
      id: 3, 
      name: 'Mike Wilson', 
      grade: 'S1', 
      date: '2024-03-12', 
      status: 'Accepted', 
      email: 'mike@example.com', 
      phone: '+1234567892',
      previousSchool: 'St. Peters Junior School',
      parentName: 'Robert Wilson',
      statement: 'My goal is to become an engineer, and the STEM focus at STAHIZA HUB is exactly what I need for my secondary education.'
    },
    { 
      id: 4, 
      name: 'Sarah Davis', 
      grade: 'S5', 
      date: '2024-03-10', 
      status: 'Rejected', 
      email: 'sarah@example.com', 
      phone: '+1234567893',
      previousSchool: 'Central High School',
      parentName: 'Linda Davis',
      statement: 'I am looking for a school with strong leadership programs and a diverse student body to help me prepare for university.'
    },
  ]);

  const filteredApplications = applications.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id: number, newStatus: string) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
    if (selectedApp?.id === id) {
      setSelectedApp(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const stats = [
    { label: 'Total Apps', value: '156', icon: FileText, color: 'text-navy', bg: 'bg-navy/10' },
    { label: 'Pending', value: '24', icon: Clock, color: 'text-gold', bg: 'bg-gold/10' },
    { label: 'Accepted', value: '89', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Rejected', value: '43', icon: XCircle, color: 'text-maroon', bg: 'bg-maroon/10' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admissions Management</h1>
          <p className="text-muted-foreground">Review and process new student applications.</p>
        </div>
        <Button variant="navy" className="gap-2">
          <UserPlus className="h-5 w-5" /> New Application
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 border-none shadow-sm bg-card-bg">
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-md bg-card-bg">
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between bg-muted/50">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" className="flex-1 md:flex-none gap-2">
              <Filter className="h-4 w-4" /> All Grades
            </Button>
            <Button variant="outline" size="sm" className="flex-1 md:flex-none gap-2">
              <Filter className="h-4 w-4" /> Status
            </Button>
          </div>
        </div>

        <div className="divide-y divide-border">
          <AnimatePresence initial={false}>
            {filteredApplications.map((app) => (
              <motion.div 
                key={app.id} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setSelectedApp(app)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center font-bold text-xl text-navy">
                    {app.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-foreground">{app.name}</h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {app.email}</span>
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {app.phone}</span>
                      <span className="font-bold text-navy dark:text-gold">Grade: {app.grade}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center justify-end gap-1">
                      <Calendar className="h-3 w-3" /> {app.date}
                    </p>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                      app.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' : 
                      app.status === 'Accepted' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 
                      app.status === 'Rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                    }`}>
                      {app.status === 'Accepted' ? <CheckCircle className="h-2 w-2" /> : 
                       app.status === 'Rejected' ? <XCircle className="h-2 w-2" /> : 
                       <Clock className="h-2 w-2" />}
                      {app.status}
                    </span>
                  </div>
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-navy hover:bg-navy/10"
                      onClick={() => setSelectedApp(app)}
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20"
                      onClick={() => handleStatusChange(app.id, 'Accepted')}
                      disabled={app.status === 'Accepted'}
                    >
                      <CheckCircle className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-maroon hover:bg-red-50 dark:hover:bg-maroon/10"
                      onClick={() => handleStatusChange(app.id, 'Rejected')}
                      disabled={app.status === 'Rejected'}
                    >
                      <XCircle className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {filteredApplications.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            <p>No applications found matching your search.</p>
          </div>
        )}
      </Card>

      {/* Application Details Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-background w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-[2rem] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-navy flex items-center justify-center text-white">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Application Details</h2>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">ID: #{selectedApp.id}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedApp(null)} className="rounded-full">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Header Info */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase">Student Name</p>
                    <p className="font-bold text-lg">{selectedApp.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase">Applying for</p>
                    <p className="font-bold text-lg text-navy dark:text-gold">Grade {selectedApp.grade}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase">Status</p>
                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase ${
                      selectedApp.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' : 
                      selectedApp.status === 'Accepted' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 
                      selectedApp.status === 'Rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                    }`}>
                      {selectedApp.status}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-bold flex items-center gap-2 border-b border-border pb-2">
                        <User className="h-4 w-4 text-navy" /> Contact Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedApp.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedApp.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>Parent: {selectedApp.parentName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold flex items-center gap-2 border-b border-border pb-2">
                        <GraduationCap className="h-4 w-4 text-navy" /> Academic History
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>Previous School: {selectedApp.previousSchool}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-bold flex items-center gap-2 border-b border-border pb-2">
                        <FileText className="h-4 w-4 text-navy" /> Personal Statement
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed italic bg-muted/30 p-4 rounded-xl border border-border">
                        "{selectedApp.statement}"
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold flex items-center gap-2 border-b border-border pb-2">
                        <FileText className="h-4 w-4 text-navy" /> Documents
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {['Transcripts', 'Rec Letter', 'Birth Cert', 'Photos'].map((doc) => (
                          <div key={doc} className="flex items-center justify-between p-2 rounded-lg bg-muted/50 border border-border text-xs">
                            <span className="font-medium">{doc}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-navy">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-border bg-muted/30 flex items-center justify-between">
                <div className="flex gap-3">
                  <Button 
                    variant="navy" 
                    className="gap-2"
                    onClick={() => handleStatusChange(selectedApp.id, 'Accepted')}
                    disabled={selectedApp.status === 'Accepted'}
                  >
                    <CheckCircle className="h-4 w-4" /> Accept Student
                  </Button>
                  <Button 
                    variant="maroon" 
                    className="gap-2"
                    onClick={() => handleStatusChange(selectedApp.id, 'Rejected')}
                    disabled={selectedApp.status === 'Rejected'}
                  >
                    <XCircle className="h-4 w-4" /> Reject Application
                  </Button>
                </div>
                <Button variant="outline" onClick={() => setSelectedApp(null)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
