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
  useGetAllDailyTestSeries,
  useGetAllDailyPollutionEntries,
  useAddStudyMaterial,
  useDeleteStudyMaterial,
  useAddPreviousYearPaper,
  useDeletePreviousYearPaper,
  useAddDailyPollutionEntry,
  useDeleteDailyPollutionEntry
} from '../hooks/useQueries';
import { ArrowLeft, Plus, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { ContentType } from '../backend';
import type { ExamCategory, Language } from '../data/studyMaterialSample';
import { dateStringToDayKey, formatDayKey } from '../utils/dayKey';

type ContentMode = 'study-material' | 'previous-papers' | 'daily-test-series' | 'daily-pollution';

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

  // Form state for Daily Test Series
  const [dtsDate, setDtsDate] = useState('');
  const [dtsSubject, setDtsSubject] = useState('');
  const [dtsTestName, setDtsTestName] = useState('');
  const [dtsDescription, setDtsDescription] = useState('');
  const [dtsQuestionsUrl, setDtsQuestionsUrl] = useState('');
  const [dtsAnswersUrl, setDtsAnswersUrl] = useState('');
  const [dtsVideoUrl, setDtsVideoUrl] = useState('');

  // Form state for Daily Pollution
  const [dpDate, setDpDate] = useState('');
  const [dpAirQuality, setDpAirQuality] = useState('');
  const [dpPollutionSource, setDpPollutionSource] = useState('');
  const [dpRecommendations, setDpRecommendations] = useState('');

  // Queries
  const { data: studyMaterials = [], isLoading: smLoading } = useGetAllStudyMaterials();
  const { data: previousPapers = [], isLoading: pypLoading } = useGetAllPreviousYearPapers();
  const { data: dailyTestSeries = [], isLoading: dtsLoading } = useGetAllDailyTestSeries();
  const { data: dailyPollution = [], isLoading: dpLoading } = useGetAllDailyPollutionEntries();

  // Mutations
  const addStudyMaterial = useAddStudyMaterial();
  const deleteStudyMaterial = useDeleteStudyMaterial();
  const addPreviousYearPaper = useAddPreviousYearPaper();
  const deletePreviousYearPaper = useDeletePreviousYearPaper();
  const addDailyPollutionEntry = useAddDailyPollutionEntry();
  const deleteDailyPollutionEntry = useDeleteDailyPollutionEntry();

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

  // Handle Daily Test Series submission
  const handleAddDailyTestSeries = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dtsDate || !dtsSubject.trim() || !dtsTestName.trim() || !dtsDescription.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.error('Daily Test Series add functionality is not yet implemented in the backend');
  };

  // Handle Daily Pollution submission
  const handleAddDailyPollution = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dpDate || !dpAirQuality.trim() || !dpPollutionSource.trim() || !dpRecommendations.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const dayKey = dateStringToDayKey(dpDate);
      await addDailyPollutionEntry.mutateAsync({
        day: dayKey,
        airQuality: dpAirQuality,
        pollutionSource: dpPollutionSource,
        recommendations: dpRecommendations
      });
      
      toast.success('Pollution entry added successfully');
      setDpDate('');
      setDpAirQuality('');
      setDpPollutionSource('');
      setDpRecommendations('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to add pollution entry');
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

  const handleDeleteDailyTestSeries = async (id: bigint) => {
    if (!confirm('Are you sure you want to delete this test series entry?')) return;
    toast.error('Daily Test Series delete functionality is not yet implemented in the backend');
  };

  const handleDeleteDailyPollution = async (id: bigint) => {
    if (!confirm('Are you sure you want to delete this pollution entry?')) return;
    
    try {
      await deleteDailyPollutionEntry.mutateAsync(id);
      toast.success('Pollution entry deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete pollution entry');
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
            <TabsList className="grid w-full max-w-3xl grid-cols-4">
              <TabsTrigger value="study-material">Study Material</TabsTrigger>
              <TabsTrigger value="previous-papers">Previous Papers</TabsTrigger>
              <TabsTrigger value="daily-test-series">Daily Test Series</TabsTrigger>
              <TabsTrigger value="daily-pollution">Daily Pollution</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Filter Controls - Only for Study Material and Previous Papers */}
        {(contentMode === 'study-material' || contentMode === 'previous-papers') && (
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
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Add Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New {contentMode === 'study-material' ? 'Study Material' : contentMode === 'previous-papers' ? 'Previous Year Paper' : contentMode === 'daily-test-series' ? 'Daily Test Series' : 'Daily Pollution'}
              </CardTitle>
              {(contentMode === 'study-material' || contentMode === 'previous-papers') && (
                <CardDescription>
                  For {examLabels[selectedExam]} - {languageLabels[selectedLanguage]}
                </CardDescription>
              )}
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
              ) : contentMode === 'previous-papers' ? (
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
              ) : contentMode === 'daily-test-series' ? (
                <form onSubmit={handleAddDailyTestSeries} className="space-y-4">
                  <div>
                    <Label htmlFor="dts-date">Date *</Label>
                    <Input
                      id="dts-date"
                      type="date"
                      value={dtsDate}
                      onChange={(e) => setDtsDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="dts-subject">Subject *</Label>
                    <Input
                      id="dts-subject"
                      value={dtsSubject}
                      onChange={(e) => setDtsSubject(e.target.value)}
                      placeholder="e.g., Mathematics, Physics, General Knowledge"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="dts-test-name">Test Name *</Label>
                    <Input
                      id="dts-test-name"
                      value={dtsTestName}
                      onChange={(e) => setDtsTestName(e.target.value)}
                      placeholder="Enter test name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="dts-description">Description *</Label>
                    <Textarea
                      id="dts-description"
                      value={dtsDescription}
                      onChange={(e) => setDtsDescription(e.target.value)}
                      placeholder="Enter test description"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="dts-questions-url">Questions PDF URL (optional)</Label>
                    <Input
                      id="dts-questions-url"
                      type="url"
                      value={dtsQuestionsUrl}
                      onChange={(e) => setDtsQuestionsUrl(e.target.value)}
                      placeholder="https://example.com/questions.pdf"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dts-answers-url">Answers PDF URL (optional)</Label>
                    <Input
                      id="dts-answers-url"
                      type="url"
                      value={dtsAnswersUrl}
                      onChange={(e) => setDtsAnswersUrl(e.target.value)}
                      placeholder="https://example.com/answers.pdf"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dts-video-url">Video Lecture URL (optional)</Label>
                    <Input
                      id="dts-video-url"
                      type="url"
                      value={dtsVideoUrl}
                      onChange={(e) => setDtsVideoUrl(e.target.value)}
                      placeholder="https://youtu.be/example"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Daily Test Series
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleAddDailyPollution} className="space-y-4">
                  <div>
                    <Label htmlFor="dp-date">Date *</Label>
                    <Input
                      id="dp-date"
                      type="date"
                      value={dpDate}
                      onChange={(e) => setDpDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="dp-air-quality">Air Quality *</Label>
                    <Input
                      id="dp-air-quality"
                      value={dpAirQuality}
                      onChange={(e) => setDpAirQuality(e.target.value)}
                      placeholder="e.g., Good, Moderate, Unhealthy"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="dp-pollution-source">Pollution Source *</Label>
                    <Textarea
                      id="dp-pollution-source"
                      value={dpPollutionSource}
                      onChange={(e) => setDpPollutionSource(e.target.value)}
                      placeholder="Describe the main pollution sources"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="dp-recommendations">Recommendations *</Label>
                    <Textarea
                      id="dp-recommendations"
                      value={dpRecommendations}
                      onChange={(e) => setDpRecommendations(e.target.value)}
                      placeholder="Health recommendations and precautions"
                      rows={3}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={addDailyPollutionEntry.isPending} className="w-full">
                    {addDailyPollutionEntry.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Pollution Entry
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
                Existing {contentMode === 'study-material' ? 'Study Materials' : contentMode === 'previous-papers' ? 'Previous Year Papers' : contentMode === 'daily-test-series' ? 'Daily Test Series' : 'Daily Pollution Entries'}
              </CardTitle>
              {(contentMode === 'study-material' || contentMode === 'previous-papers') && (
                <CardDescription>
                  {examLabels[selectedExam]} - {languageLabels[selectedLanguage]}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {(contentMode === 'study-material' ? smLoading : contentMode === 'previous-papers' ? pypLoading : contentMode === 'daily-test-series' ? dtsLoading : dpLoading) ? (
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
              ) : contentMode === 'previous-papers' ? (
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
              ) : contentMode === 'daily-test-series' ? (
                dailyTestSeries.length === 0 ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      No daily test series entries found.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {dailyTestSeries.map((item) => (
                      <div
                        key={item.id.toString()}
                        className="flex items-start justify-between gap-3 p-3 border border-border rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.testName}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.subject} - {formatDayKey(item.day)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteDailyTestSeries(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                dailyPollution.length === 0 ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      No daily pollution entries found.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {dailyPollution.map((item) => (
                      <div
                        key={item.id.toString()}
                        className="flex items-start justify-between gap-3 p-3 border border-border rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.airQuality}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDayKey(item.day)} - {item.pollutionSource}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteDailyPollution(item.id)}
                          disabled={deleteDailyPollutionEntry.isPending}
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
