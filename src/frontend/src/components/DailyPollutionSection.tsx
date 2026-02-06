import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useGetDailyPollutionByDay } from '../hooks/useQueries';
import { getRecentDayKeys, formatDayKey, getTodayDayKey } from '../utils/dayKey';
import { Loader2, AlertCircle, Calendar, Wind } from 'lucide-react';

export default function DailyPollutionSection() {
  const recentDays = getRecentDayKeys(7);
  const [selectedDay, setSelectedDay] = useState<bigint>(getTodayDayKey());

  const { data: pollutionEntries = [], isLoading, isError } = useGetDailyPollutionByDay(selectedDay);

  // Helper function to get air quality badge variant
  const getAirQualityVariant = (airQuality: string): 'default' | 'secondary' | 'destructive' => {
    const quality = airQuality.toLowerCase();
    if (quality.includes('good')) return 'default';
    if (quality.includes('moderate')) return 'secondary';
    return 'destructive';
  };

  return (
    <section id="daily-pollution" className="py-16 sm:py-20 bg-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Daily Pollution
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay informed about daily air quality and pollution levels with expert recommendations
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
              Failed to load pollution data. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {/* Empty State */}
        {!isLoading && !isError && pollutionEntries.length === 0 && (
          <Alert className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No pollution data available for this day. Check back later or select another day.
            </AlertDescription>
          </Alert>
        )}

        {/* Pollution Cards */}
        {!isLoading && !isError && pollutionEntries.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pollutionEntries.map((entry) => (
              <Card key={entry.id.toString()} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant={getAirQualityVariant(entry.airQuality)} className="text-xs">
                      {entry.airQuality}
                    </Badge>
                    <Wind className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg">Air Quality Report</CardTitle>
                  <CardDescription>
                    {formatDayKey(entry.day)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      Pollution Source
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {entry.pollutionSource}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      Recommendations
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {entry.recommendations}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
