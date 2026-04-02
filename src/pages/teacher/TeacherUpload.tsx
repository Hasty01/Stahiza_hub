import React, { useState } from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Upload, File, X, CheckCircle, Video, FileText, Loader2 } from 'lucide-react';
import { supabaseService } from '@/src/lib/supabaseService';
import { useAuth, ClassGroup } from '@/src/context/AuthContext';

export const TeacherUpload = () => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [classGroup, setClassGroup] = useState<ClassGroup>('S1');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !user) return;
    setIsUploading(true);

    try {
      // In a real app, we would upload to Supabase Storage first
      // const { data, error } = await supabase.storage.from('resources').upload(`public/${file.name}`, file);
      // const url = supabase.storage.from('resources').getPublicUrl(data.path).data.publicUrl;
      
      const url = URL.createObjectURL(file); // Mock URL for now

      await supabaseService.addResource({
        title,
        description: `Resource for ${classGroup}`,
        subject,
        type: file.type.includes('video') ? 'video' : 'pdf',
        fileUrl: url,
        classGroup,
        teacherId: user.id,
        teacherName: user.name
      });

      setIsUploaded(true);
      setTimeout(() => {
        setIsUploaded(false);
        setFile(null);
        setTitle('');
      }, 3000);
    } catch (error) {
      console.error('Error uploading resource:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Upload Learning Resources</h1>
        <p className="text-gray-500">Share notes, videos, and study materials with your students.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col items-center text-center p-8 border-navy/30 bg-navy/5">
          <div className="rounded-full bg-navy p-4 text-white mb-4">
            <FileText className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold">Upload PDF Notes</h3>
          <p className="text-sm text-gray-500 mb-6">Share lecture notes, cheat sheets, and reading materials.</p>
          <Button variant="navy" className="w-full" onClick={() => document.getElementById('file-input')?.click()}>Select PDF</Button>
        </Card>

        <Card className="flex flex-col items-center text-center p-8 border-maroon/30 bg-maroon/5">
          <div className="rounded-full bg-maroon p-4 text-white mb-4">
            <Video className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold">Upload Video Lecture</h3>
          <p className="text-sm text-gray-500 mb-6">Share recorded lectures or educational video content.</p>
          <Button variant="maroon" className="w-full" onClick={() => document.getElementById('file-input')?.click()}>Select Video</Button>
        </Card>
      </div>

      <Card title="Resource Details">
        <form onSubmit={handleUpload} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input 
              label="Resource Title" 
              placeholder="e.g. Introduction to Calculus" 
              required 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Subject</label>
              <select 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy dark:border-gray-800 dark:bg-black"
              >
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Chemistry</option>
                <option>Biology</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Class Group</label>
              <select 
                value={classGroup}
                onChange={(e) => setClassGroup(e.target.value as any)}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy dark:border-gray-800 dark:bg-black"
              >
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
                <option value="S4">S4</option>
                <option value="S5">S5</option>
                <option value="S6">S6</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium">File Upload</label>
            <div className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-12 transition-colors hover:border-navy dark:border-gray-800 dark:hover:border-navy">
              <input 
                id="file-input"
                type="file" 
                className="absolute inset-0 cursor-pointer opacity-0" 
                onChange={handleFileChange}
              />
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm font-medium">Drag and drop or click to upload</p>
              <p className="text-xs text-gray-500 mt-1">PDF, MP4, or DOCX (Max 100MB)</p>
            </div>
          </div>

          {file && (
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <File className="h-5 w-5 text-navy" />
                <div className="text-sm">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <Button type="submit" variant="navy" className="w-full" disabled={!file || isUploaded || isUploading}>
            {isUploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isUploaded ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" /> Resource Uploaded!
              </span>
            ) : 'Upload Resource'}
          </Button>
        </form>
      </Card>
    </div>
  );
};
