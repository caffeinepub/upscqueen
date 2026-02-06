import { useState } from 'react';
import { Newspaper, Calendar, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { currentAffairsData, type Timeframe, type Language } from '@/data/currentAffairsSample';

export default function CurrentAffairsSection() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english');
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('daily');

  const currentItems = currentAffairsData[selectedTimeframe][selectedLanguage] || [];

  return (
    <section id="current-affairs" className="py-16 sm:py-20 bg-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Newspaper className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Current Affairs
            </h3>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Stay updated with the latest current affairs in multiple languages
          </p>

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

        {/* Timeframe Tabs */}
        <Tabs value={selectedTimeframe} onValueChange={(value) => setSelectedTimeframe(value as Timeframe)} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
            <TabsTrigger value="daily" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Daily</span>
              <span className="sm:hidden">Day</span>
            </TabsTrigger>
            <TabsTrigger value="weekly" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Weekly</span>
              <span className="sm:hidden">Week</span>
            </TabsTrigger>
            <TabsTrigger value="monthly" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Monthly</span>
              <span className="sm:hidden">Month</span>
            </TabsTrigger>
            <TabsTrigger value="yearly" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Yearly</span>
              <span className="sm:hidden">Year</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTimeframe} className="mt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {currentItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No current affairs available for this selection.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
