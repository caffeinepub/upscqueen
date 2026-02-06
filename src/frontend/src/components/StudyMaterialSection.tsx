import { useState } from 'react';
import { BookOpen, Globe, GraduationCap, FileText, Download, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useGetAllStudyMaterials, useGetAllPreviousYearPapers } from '@/hooks/useQueries';
import type { ExamCategory, Language } from '@/data/studyMaterialSample';
import { ContentType } from '@/backend';

type ContentMode = 'study-material' | 'previous-papers';

export default function StudyMaterialSection() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english');
  const [selectedExam, setSelectedExam] = useState<ExamCategory>('tat');
  const [contentMode, setContentMode] = useState<ContentMode>('study-material');

  // Fetch data from backend
  const { data: studyMaterials = [], isLoading: smLoading } = useGetAllStudyMaterials();
  const { data: previousPapers = [], isLoading: pypLoading } = useGetAllPreviousYearPapers();

  const examLabels: Record<ExamCategory, string> = {
    tat: 'TAT',
    tet: 'TET',
    upsc: 'UPSC',
    gpsc: 'GPSC',
    class3: 'Class 3'
  };

  // Create subject key from exam and language
  const getSubjectKey = (exam: ExamCategory, lang: Language) => {
    return `${exam}-${lang}`;
  };

  // Filter items by current selection
  const currentItems = contentMode === 'study-material'
    ? studyMaterials.filter(item => item.subject === getSubjectKey(selectedExam, selectedLanguage))
    : previousPapers.filter(item => item.examName === getSubjectKey(selectedExam, selectedLanguage));

  // Get book-type materials (textbooks) for fallback display
  const textbooks = studyMaterials.filter(
    item => item.contentType === ContentType.PdfBook || item.contentType === ContentType.Book
  );

  // Separate NCERT and GCRT textbooks
  const ncertBooks = textbooks.filter(item => 
    item.title.toLowerCase().includes('ncert')
  );
  const gcrtBooks = textbooks.filter(item => 
    item.title.toLowerCase().includes('gcrt')
  );

  const isLoading = contentMode === 'study-material' ? smLoading : pypLoading;

  const renderTextbookCard = (item: any) => (
    <Card key={item.id.toString()} className="hover:shadow-lg transition-shadow flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            Textbook
          </Badge>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </div>
        <CardTitle className="text-lg leading-tight">
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <CardDescription className="text-sm leading-relaxed flex-1">
          {item.subject}
        </CardDescription>
        {item.url && (
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="w-full gap-2"
              onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
            >
              <ExternalLink className="h-4 w-4" />
              View Book
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <section id="study-material" className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Study Material
            </h3>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Comprehensive study resources for TAT, TET, UPSC, GPSC, and Class 3 exams in multiple languages
          </p>

          {/* Content Mode Toggle */}
          <div className="flex justify-center mb-6">
            <Tabs value={contentMode} onValueChange={(value) => setContentMode(value as ContentMode)} className="w-full max-w-md">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="study-material" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Study Material
                </TabsTrigger>
                <TabsTrigger value="previous-papers" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Previous Year Papers
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Language Selector */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <Select value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as Language)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi (हिंदी)</SelectItem>
                <SelectItem value="gujarati">Gujarati (ગુજરાતી)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Textbooks Section - Always visible when textbooks are available */}
        {contentMode === 'study-material' && textbooks.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-6">
              <h4 className="text-xl font-semibold text-foreground mb-2">
                Featured Textbooks
              </h4>
              <p className="text-sm text-muted-foreground">
                NCERT and GCRT textbooks for comprehensive learning
              </p>
            </div>

            {/* NCERT Textbooks */}
            {ncertBooks.length > 0 && (
              <div className="mb-8">
                <h5 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  NCERT Textbooks
                </h5>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {ncertBooks.map(renderTextbookCard)}
                </div>
              </div>
            )}

            {/* GCRT Textbooks */}
            {gcrtBooks.length > 0 && (
              <div className="mb-8">
                <h5 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  GCRT Textbooks
                </h5>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {gcrtBooks.map(renderTextbookCard)}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Exam Category Tabs */}
        <Tabs value={selectedExam} onValueChange={(value) => setSelectedExam(value as ExamCategory)} className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 mb-8">
            <TabsTrigger value="tat" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">TAT</span>
              <span className="sm:hidden">TAT</span>
            </TabsTrigger>
            <TabsTrigger value="tet" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">TET</span>
              <span className="sm:hidden">TET</span>
            </TabsTrigger>
            <TabsTrigger value="upsc" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">UPSC</span>
              <span className="sm:hidden">UPSC</span>
            </TabsTrigger>
            <TabsTrigger value="gpsc" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">GPSC</span>
              <span className="sm:hidden">GPSC</span>
            </TabsTrigger>
            <TabsTrigger value="class3" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Class 3</span>
              <span className="sm:hidden">C3</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedExam} className="mt-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : currentItems.length === 0 ? (
              <div className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {contentMode === 'study-material' 
                      ? 'No study material available for this selection. Check out the featured textbooks above or try a different exam/language combination.'
                      : 'No previous year papers available for this selection. Try a different exam/language combination.'}
                  </AlertDescription>
                </Alert>

                {/* Show all textbooks as fallback when no filtered results */}
                {contentMode === 'study-material' && textbooks.length > 0 && (
                  <div>
                    <h5 className="text-lg font-medium text-foreground mb-4 text-center">
                      Available Textbooks
                    </h5>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {textbooks.map(renderTextbookCard)}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentItems.map((item: any) => (
                  <Card key={item.id.toString()} className="hover:shadow-lg transition-shadow flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {examLabels[selectedExam]}
                        </Badge>
                        {contentMode === 'previous-papers' && (
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {contentMode === 'study-material' ? item.title : `Year: ${item.year.toString()}`}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <CardDescription className="text-sm leading-relaxed flex-1">
                        {contentMode === 'study-material' ? item.contentType : item.subject}
                      </CardDescription>
                      {contentMode === 'study-material' && item.url && (
                        <div className="mt-4">
                          <Button 
                            variant="outline" 
                            className="w-full gap-2"
                            onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
                          >
                            <ExternalLink className="h-4 w-4" />
                            View Material
                          </Button>
                        </div>
                      )}
                      {contentMode === 'previous-papers' && (
                        <div className="mt-4">
                          <Button disabled variant="outline" className="w-full gap-2">
                            <Download className="h-4 w-4" />
                            Coming Soon
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
