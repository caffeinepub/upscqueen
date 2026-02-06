import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import AdminGuard from '../components/admin/AdminGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  useGetAllStudyMaterials, 
  useGetAllPreviousYearPapers,
  useAddStudyMaterial,
  useDeleteStudyMaterial,
  useAddPreviousYearPaper,
  useDeletePreviousYearPaper
} from '../hooks/useQueries';
import { ArrowLeft, Plus, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { ContentType } from '../backend';
import type { ExamCategory, Language } from '../data/studyMaterialSample';

type ContentMode = 'study-material' | 'previous-papers';

export default function AdminContentManagerPage() {
  return (
    <AdminGuard>
      <AdminContentManager />
    </AdminGuard>
  );
}

function AdminContentManager() {
  const navigate = useNavigate();
  const [contentMode, setContentMode] = useState<ContentMode>('study-material');
  const [selectedExam, setSelectedExam] = useState<ExamCategory>('tat');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english');

  // Form state for Study Material
  const [smTitle, setSmTitle] = useState('');
  const [smDescription, setSmDescription] = useState('');
  const [smUrl, setSmUrl] = useState('');
  const [smContentType, setSmContentType] = useState<ContentType>(ContentType.PdfBook);

  // Form state for Previous Year Papers
  const [pypTitle, setPypTitle] = useState('');
  const [pypDescription, setPypDescription] = useState('');
  const [pypUrl, setPypUrl] = useState('');
  const [pypYear, setPypYear] = useState('');

  // Queries
  const { data: studyMaterials = [], isLoading: smLoading } = useGetAllStudyMaterials();
  const { data: previousPapers = [], isLoading: pypLoading } = useGetAllPreviousYearPapers();

  // Mutations
  const addStudyMaterial = useAddStudyMaterial();
  const deleteStudyMaterial = useDeleteStudyMaterial();
  const addPreviousYearPaper = useAddPreviousYearPaper();
  const deletePreviousYearPaper = useDeletePreviousYearPaper();

  const examLabels: Record<ExamCategory, string> = {
    tat: 'TAT',
    tet: 'TET',
    upsc: 'UPSC',
    gpsc: 'GPSC',
    class3: 'Class 3'
  };

  const languageLabels: Record<Language, string> = {
    english: 'English',
    hindi: 'Hindi',
    gujarati: 'Gujarati'
  };

  // Create subject key from exam and language
  const getSubjectKey = (exam: ExamCategory, lang: Language) => {
    return `${exam}-${lang}`;
  };

  // Filter items by current selection
  const currentStudyMaterials = studyMaterials.filter(
    item => item.subject === getSubjectKey(selectedExam, selectedLanguage)
  );

  const currentPreviousPapers = previousPapers.filter(
    item => item.examName === getSubjectKey(selectedExam, selectedLanguage)
  );

  // Handle Study Material submission
  const handleAddStudyMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!smTitle.trim() || !smDescription.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await addStudyMaterial.mutateAsync({
        title: smTitle,
        subject: getSubjectKey(selectedExam, selectedLanguage),
        contentType: smContentType,
        url: smUrl || '#'
      });
      
      toast.success('Study material added successfully');
      setSmTitle('');
      setSmDescription('');
      setSmUrl('');
      setSmContentType(ContentType.PdfBook);
    } catch (error: any) {
      toast.error(error.message || 'Failed to add study material');
    }
  };

  // Handle Previous Year Paper submission
  const handleAddPreviousYearPaper = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pypTitle.trim() || !pypDescription.trim() || !pypYear.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const yearNum = parseInt(pypYear);
    if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
      toast.error('Please enter a valid year');
      return;
    }

    try {
      await addPreviousYearPaper.mutateAsync({
        year: BigInt(yearNum),
        subject: pypDescription,
        examName: getSubjectKey(selectedExam, selectedLanguage),
        url: pypUrl || '#'
      });
      
      toast.success('Previous year paper added successfully');
      setPypTitle('');
      setPypDescription('');
      setPypUrl('');
      setPypYear('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to add previous year paper');
    }
  };

  // Handle delete
  const handleDeleteStudyMaterial = async (id: bigint) => {
    if (!confirm('Are you sure you want to delete this study material?')) return;
    
    try {
      await deleteStudyMaterial.mutateAsync(id);
      toast.success('Study material deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete study material');
    }
  };

  const handleDeletePreviousYearPaper = async (id: bigint) => {
    if (!confirm('Are you sure you want to delete this previous year paper?')) return;
    
    try {
      await deletePreviousYearPaper.mutateAsync(id);
      toast.success('Previous year paper deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete previous year paper');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate({ to: '/' })}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                Admin Content Manager
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Content Mode Toggle */}
        <div className="mb-6">
          <Tabs value={contentMode} onValueChange={(value) => setContentMode(value as ContentMode)}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="study-material">Study Material</TabsTrigger>
              <TabsTrigger value="previous-papers">Previous Year Papers</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Filter Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter by Category</CardTitle>
            <CardDescription>Select exam category and language</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Exam Category</Label>
                <Select value={selectedExam} onValueChange={(value) => setSelectedExam(value as ExamCategory)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tat">TAT</SelectItem>
                    <SelectItem value="tet">TET</SelectItem>
                    <SelectItem value="upsc">UPSC</SelectItem>
                    <SelectItem value="gpsc">GPSC</SelectItem>
                    <SelectItem value="class3">Class 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Language</Label>
                <Select value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as Language)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi (हिंदी)</SelectItem>
                    <SelectItem value="gujarati">Gujarati (ગુજરાતી)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Add Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New {contentMode === 'study-material' ? 'Study Material' : 'Previous Year Paper'}
              </CardTitle>
              <CardDescription>
                For {examLabels[selectedExam]} - {languageLabels[selectedLanguage]}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {contentMode === 'study-material' ? (
                <form onSubmit={handleAddStudyMaterial} className="space-y-4">
                  <div>
                    <Label htmlFor="sm-title">Title *</Label>
                    <Input
                      id="sm-title"
                      value={smTitle}
                      onChange={(e) => setSmTitle(e.target.value)}
                      placeholder="Enter title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="sm-description">Description *</Label>
                    <Textarea
                      id="sm-description"
                      value={smDescription}
                      onChange={(e) => setSmDescription(e.target.value)}
                      placeholder="Enter description"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="sm-content-type">Content Type</Label>
                    <Select 
                      value={smContentType} 
                      onValueChange={(value) => setSmContentType(value as ContentType)}
                    >
                      <SelectTrigger id="sm-content-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ContentType.PdfBook}>PDF Book</SelectItem>
                        <SelectItem value={ContentType.VideoLecture}>Video Lecture</SelectItem>
                        <SelectItem value={ContentType.Course}>Course</SelectItem>
                        <SelectItem value={ContentType.Book}>Book</SelectItem>
                        <SelectItem value={ContentType.Audio}>Audio</SelectItem>
                        <SelectItem value={ContentType.Music}>Music</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sm-url">External Link URL (optional)</Label>
                    <Input
                      id="sm-url"
                      type="url"
                      value={smUrl}
                      onChange={(e) => setSmUrl(e.target.value)}
                      placeholder="https://example.com/resource"
                    />
                  </div>
                  <Button type="submit" disabled={addStudyMaterial.isPending} className="w-full">
                    {addStudyMaterial.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Study Material
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleAddPreviousYearPaper} className="space-y-4">
                  <div>
                    <Label htmlFor="pyp-title">Title *</Label>
                    <Input
                      id="pyp-title"
                      value={pypTitle}
                      onChange={(e) => setPypTitle(e.target.value)}
                      placeholder="Enter title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pyp-year">Year *</Label>
                    <Input
                      id="pyp-year"
                      type="number"
                      value={pypYear}
                      onChange={(e) => setPypYear(e.target.value)}
                      placeholder="2023"
                      min="2000"
                      max="2100"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pyp-description">Description *</Label>
                    <Textarea
                      id="pyp-description"
                      value={pypDescription}
                      onChange={(e) => setPypDescription(e.target.value)}
                      placeholder="Enter description"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pyp-url">External Link URL (optional)</Label>
                    <Input
                      id="pyp-url"
                      type="url"
                      value={pypUrl}
                      onChange={(e) => setPypUrl(e.target.value)}
                      placeholder="https://example.com/paper"
                    />
                  </div>
                  <Button type="submit" disabled={addPreviousYearPaper.isPending} className="w-full">
                    {addPreviousYearPaper.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Previous Year Paper
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* List of Items */}
          <Card>
            <CardHeader>
              <CardTitle>
                Existing {contentMode === 'study-material' ? 'Study Materials' : 'Previous Year Papers'}
              </CardTitle>
              <CardDescription>
                {examLabels[selectedExam]} - {languageLabels[selectedLanguage]}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(contentMode === 'study-material' ? smLoading : pypLoading) ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : contentMode === 'study-material' ? (
                currentStudyMaterials.length === 0 ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      No study materials found for this selection.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-3">
                    {currentStudyMaterials.map((item) => (
                      <div
                        key={item.id.toString()}
                        className="flex items-start justify-between gap-3 p-3 border border-border rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Type: {item.contentType}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteStudyMaterial(item.id)}
                          disabled={deleteStudyMaterial.isPending}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                currentPreviousPapers.length === 0 ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      No previous year papers found for this selection.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-3">
                    {currentPreviousPapers.map((item) => (
                      <div
                        key={item.id.toString()}
                        className="flex items-start justify-between gap-3 p-3 border border-border rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">Year: {item.year.toString()}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.subject}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeletePreviousYearPaper(item.id)}
                          disabled={deletePreviousYearPaper.isPending}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
