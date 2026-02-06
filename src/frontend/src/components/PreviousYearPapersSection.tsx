import { FileText, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PaperItem {
  id: string;
  title: string;
  category: 'prelims' | 'mains';
  description?: string;
}

const papers: PaperItem[] = [
  // Prelims Papers
  {
    id: 'prelims-gs-1',
    title: 'General Studies Paper I',
    category: 'prelims',
    description: 'History, Geography, Polity, Economy, Environment'
  },
  {
    id: 'prelims-csat',
    title: 'CSAT (Paper II)',
    category: 'prelims',
    description: 'Comprehension, Logical Reasoning, Analytical Ability'
  },
  // Mains Papers
  {
    id: 'mains-essay',
    title: 'Essay Paper',
    category: 'mains',
    description: 'Essay writing on diverse topics'
  },
  {
    id: 'mains-gs-1',
    title: 'General Studies I',
    category: 'mains',
    description: 'Indian Heritage, History, Society, Geography'
  },
  {
    id: 'mains-gs-2',
    title: 'General Studies II',
    category: 'mains',
    description: 'Governance, Constitution, Polity, Social Justice'
  },
  {
    id: 'mains-gs-3',
    title: 'General Studies III',
    category: 'mains',
    description: 'Technology, Economy, Environment, Security'
  },
  {
    id: 'mains-gs-4',
    title: 'General Studies IV',
    category: 'mains',
    description: 'Ethics, Integrity, Aptitude'
  },
  {
    id: 'mains-optional',
    title: 'Optional Subject',
    category: 'mains',
    description: 'Choose from available optional subjects'
  }
];

export default function PreviousYearPapersSection() {
  const prelimsPapers = papers.filter(p => p.category === 'prelims');
  const mainsPapers = papers.filter(p => p.category === 'mains');

  return (
    <section id="previous-papers" className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            UPSC Previous Year Question Papers
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access previous year question papers to understand exam patterns and practice effectively
          </p>
        </div>

        <div className="space-y-12">
          {/* Prelims Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="default" className="text-base px-4 py-1.5">
                Prelims
              </Badge>
              <h4 className="text-xl font-semibold text-foreground">
                Preliminary Examination Papers
              </h4>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {prelimsPapers.map((paper) => (
                <Card key={paper.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg mb-1">{paper.title}</CardTitle>
                        {paper.description && (
                          <CardDescription className="text-sm">
                            {paper.description}
                          </CardDescription>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      disabled
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Mains Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="text-base px-4 py-1.5">
                Mains
              </Badge>
              <h4 className="text-xl font-semibold text-foreground">
                Main Examination Papers
              </h4>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainsPapers.map((paper) => (
                <Card key={paper.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 bg-secondary/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="h-5 w-5 text-secondary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg mb-1">{paper.title}</CardTitle>
                        {paper.description && (
                          <CardDescription className="text-sm">
                            {paper.description}
                          </CardDescription>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      disabled
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
