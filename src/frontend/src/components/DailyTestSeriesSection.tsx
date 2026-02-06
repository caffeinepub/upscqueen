import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useGetDailyTestSeriesByDay } from '../hooks/useQueries';
import { getRecentDayKeys, formatDayKey, getTodayDayKey } from '../utils/dayKey';
import { Loader2, ExternalLink, AlertCircle, Calendar } from 'lucide-react';

export default function DailyTestSeriesSection() {
  const recentDays = getRecentDayKeys(7);
  const [selectedDay, setSelectedDay] = useState<bigint>(getTodayDayKey());

  const { data: tests = [], isLoading, isError } = useGetDailyTestSeriesByDay(selectedDay);

  return (
    <section id="daily-test-series" className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Daily Test Series
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice with subject-wise tests every day to strengthen your preparation
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          <Calendar className="h-5 w-5 text-muted-foreground hidden sm:block" />
          {recentDays.map((day) => {
            const isSelected = day === selectedDay;
            const isToday = day === getTodayDayKey();
            return (
              <Button
                key={day.toString()}
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDay(day)}
                className="min-w-[100px]"
              >
                {isToday ? 'Today' : formatDayKey(day).split(',')[0]}
              </Button>
            );
          })}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load test series. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {/* Empty State */}
        {!isLoading && !isError && tests.length === 0 && (
          <Alert className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No tests available for this day. Check back later or select another day.
            </AlertDescription>
          </Alert>
        )}

        {/* Test Cards */}
        {!isLoading && !isError && tests.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => {
              const hasQuestions = test.questionsUrl && test.questionsUrl !== '#';
              const hasAnswers = test.answersUrl && test.answersUrl !== '#';
              const hasVideo = test.videoLectureUrl && test.videoLectureUrl !== '#';

              return (
                <Card key={test.id.toString()} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {test.subject}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{test.testName}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {test.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {/* Questions Link */}
                    <Button
                      variant={hasQuestions ? 'default' : 'outline'}
                      size="sm"
                      className="w-full gap-2"
                      disabled={!hasQuestions}
                      onClick={() => hasQuestions && window.open(test.questionsUrl, '_blank')}
                    >
                      {hasQuestions ? (
                        <>
                          <ExternalLink className="h-4 w-4" />
                          View Questions
                        </>
                      ) : (
                        'Questions Not Available Yet'
                      )}
                    </Button>

                    {/* Answers Link */}
                    <Button
                      variant={hasAnswers ? 'secondary' : 'outline'}
                      size="sm"
                      className="w-full gap-2"
                      disabled={!hasAnswers}
                      onClick={() => hasAnswers && window.open(test.answersUrl, '_blank')}
                    >
                      {hasAnswers ? (
                        <>
                          <ExternalLink className="h-4 w-4" />
                          View Answers
                        </>
                      ) : (
                        'Answers Not Available Yet'
                      )}
                    </Button>

                    {/* Video Lecture Link */}
                    <Button
                      variant={hasVideo ? 'secondary' : 'outline'}
                      size="sm"
                      className="w-full gap-2"
                      disabled={!hasVideo}
                      onClick={() => hasVideo && window.open(test.videoLectureUrl, '_blank')}
                    >
                      {hasVideo ? (
                        <>
                          <ExternalLink className="h-4 w-4" />
                          Watch Video Lecture
                        </>
                      ) : (
                        'Video Not Available Yet'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
