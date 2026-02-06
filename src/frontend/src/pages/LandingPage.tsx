import { BookOpen, Target, TrendingUp, Users, FileText, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import ShareThisApp from '@/components/ShareThisApp';
import PreviousYearPapersSection from '@/components/PreviousYearPapersSection';
import CurrentAffairsSection from '@/components/CurrentAffairsSection';
import StudyMaterialSection from '@/components/StudyMaterialSection';
import LoginButton from '@/components/LoginButton';

export default function LandingPage() {
  const navigate = useNavigate();

  const scrollToPapers = () => {
    const element = document.getElementById('previous-papers');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/upscqueen-logo.dim_512x512.png" 
              alt="upscQueen Logo" 
              className="h-10 w-10 sm:h-12 sm:w-12"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">upscQueen</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: '/admin' })}
              className="gap-2"
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
            <LoginButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-accent/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Your UPSC Success Partner
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Master Your UPSC Journey with Expert Guidance
              </h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive study resources, personalized guidance, and proven strategies to help you achieve your civil services dream.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-5 w-5 text-primary" />
                  <span>10,000+ Students</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Expert Mentorship</span>
                </div>
              </div>
              <div className="pt-2">
                <Button 
                  onClick={scrollToPapers}
                  size="lg"
                  className="gap-2"
                >
                  <FileText className="h-5 w-5" />
                  Previous Year Papers
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/assets/generated/upscqueen-hero.dim_1600x900.png" 
                alt="UPSC Study Resources" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive resources and guidance designed specifically for UPSC aspirants
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Curated Study Material
              </h4>
              <p className="text-sm text-muted-foreground">
                Access comprehensive notes, current affairs, and topic-wise resources aligned with UPSC syllabus.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Strategic Planning
              </h4>
              <p className="text-sm text-muted-foreground">
                Get personalized study plans and time management strategies from successful candidates.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Progress Tracking
              </h4>
              <p className="text-sm text-muted-foreground">
                Monitor your preparation with regular assessments and detailed performance analytics.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Community Support
              </h4>
              <p className="text-sm text-muted-foreground">
                Connect with fellow aspirants, share insights, and learn from each other's experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Affairs Section */}
      <CurrentAffairsSection />

      {/* Study Material Section */}
      <StudyMaterialSection />

      {/* Previous Year Papers Section */}
      <PreviousYearPapersSection />

      {/* Share Section */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <ShareThisApp />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <img 
                src="/assets/generated/upscqueen-logo.dim_512x512.png" 
                alt="upscQueen Logo" 
                className="h-8 w-8"
              />
              <span className="font-semibold text-foreground">upscQueen</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2026. Built with ❤️ using{' '}
              <a 
                href="https://caffeine.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
