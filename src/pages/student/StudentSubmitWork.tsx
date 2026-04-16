import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Upload, File, X, CheckCircle, AlertCircle, ArrowLeft, Send, Loader2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { supabaseService, Assignment } from '@/src/lib/supabaseService';
import { useAuth } from '@/src/context/AuthContext';

export const StudentSubmitWork = () => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState('');
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!user?.classGroup) return;
      try {
        const data = await supabaseService.getAssignments(user.classGroup);
        setAssignments(data);
        if (data.length > 0) {
          setSelectedAssignmentId(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching assignments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [user?.classGroup]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !user || !selectedAssignmentId) return;

    setIsUploading(true);
    try {
      // In a real app, we would upload the file to Supabase Storage first
      // and then save the submission record with the file URL.
      // For this demo, we'll simulate the file upload and just save the record.
      
      const fileUrl = `https://example.com/submissions/${file.name}`; // Mock URL
      
      await supabaseService.submitAssignment({
        assignment_id: selectedAssignmentId,
        student_id: user.id,
        student_name: user.name,
        file_url: fileUrl,
        file_name: file.name,
        status: 'submitted'
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting assignment:', error);
    } finally {
      setIsUploading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 p-6"
      >
        <div className="relative">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            className="rounded-full bg-green-500/10 p-10 dark:bg-green-500/20 relative z-10"
          >
            <CheckCircle className="h-24 w-24 text-green-500" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-green-500/20"
          />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-4xl font-black text-foreground tracking-tight">Assignment Submitted!</h1>
          <p className="text-muted-foreground font-medium max-w-md mx-auto leading-relaxed">
            Your work has been successfully uploaded to the STAHIZA HUB. 
            Your teacher has been notified and you'll receive feedback soon.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <Button variant="navy" className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs" onClick={() => setIsSubmitted(false)}>
            Submit Another
          </Button>
          <Button variant="outline" className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs" onClick={() => window.history.back()}>
            Go to Dashboard
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-black text-foreground tracking-tight">Submit Your Work</h1>
        <p className="text-muted-foreground font-medium">Upload your completed assignments for review.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="rounded-[3rem] p-10 border-2">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-navy" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Select Assignment</label>
                <div className="relative">
                  <select 
                    className="flex h-14 w-full rounded-2xl border-2 border-border bg-card-bg px-6 py-2 text-sm font-bold focus:outline-none focus:border-gold appearance-none transition-all cursor-pointer"
                    value={selectedAssignmentId}
                    onChange={(e) => setSelectedAssignmentId(e.target.value)}
                  >
                    {assignments.map(assignment => (
                      <option key={assignment.id} value={assignment.id}>
                        {assignment.title}
                      </option>
                    ))}
                    {assignments.length === 0 && <option disabled>No assignments available</option>}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Upload Your Files</label>
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded-[2.5rem] border-3 border-dashed p-16 transition-all cursor-pointer group overflow-hidden",
                    isDragging 
                      ? "border-gold bg-gold/5 scale-[0.99]" 
                      : "border-border hover:border-gold/50 hover:bg-muted/30"
                  )}
                >
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                  
                  <AnimatePresence mode="wait">
                    {!file ? (
                      <motion.div 
                        key="upload-prompt"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col items-center text-center space-y-4"
                      >
                        <div className="h-20 w-20 bg-muted rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                          <Upload className="h-10 w-10 text-muted-foreground group-hover:text-gold transition-colors" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-lg font-black text-foreground">Drag and drop or click to upload</p>
                          <p className="text-sm text-muted-foreground font-medium">PDF, DOCX, or ZIP (Max 10MB)</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="file-selected"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center text-center space-y-4 w-full"
                      >
                        <div className="h-24 w-24 bg-navy/10 dark:bg-gold/10 rounded-[2rem] flex items-center justify-center relative">
                          <File className="h-12 w-12 text-navy dark:text-gold" />
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </motion.div>
                        </div>
                        <div className="space-y-1 w-full max-w-xs">
                          <p className="text-xl font-black text-foreground truncate">{file.name}</p>
                          <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">
                            {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to submit
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-maroon hover:bg-maroon/10 font-bold rounded-xl"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                          }}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove File
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="h-14 rounded-2xl px-8 font-black uppercase tracking-widest text-xs flex-1"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="navy" 
                  className="h-14 rounded-2xl px-12 font-black uppercase tracking-widest text-xs flex-[2] shadow-xl shadow-navy/20" 
                  disabled={!file || isUploading || !selectedAssignmentId}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      Submit Assignment
                      <Send className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </Card>

        <div className="mt-8 p-6 bg-muted/30 rounded-3xl border border-border flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-gold shrink-0 mt-1" />
          <div className="space-y-1">
            <h4 className="font-black text-foreground text-sm uppercase tracking-wider">Submission Guidelines</h4>
            <p className="text-xs text-muted-foreground font-medium leading-relaxed">
              Ensure your file is clearly named (e.g., <span className="font-bold">Math_Quiz_YourName.pdf</span>). 
              Late submissions may be subject to point deductions according to the class policy. 
              You can only submit one file per assignment.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
