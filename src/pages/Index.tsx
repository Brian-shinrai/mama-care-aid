import { ChatInterface } from '@/components/ChatInterface';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, Clock, Globe, Phone, Baby } from 'lucide-react';
import heroImage from '@/assets/hero-maternal-health.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-maternal opacity-90" />
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Supportive maternal care community" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Mama Care AI
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Your 24/7 maternal health companion, providing personalized pregnancy guidance, 
              symptom monitoring, and emergency support for mothers everywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" variant="secondary" className="shadow-trust hover:shadow-warm transition-all duration-300">
                <Heart className="w-5 h-5 mr-2" />
                Start Caring Journey
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20">
                <Phone className="w-5 h-5 mr-2" />
                Emergency Help
              </Button>
            </div>
          </div>
          
          {/* Chat Interface Preview */}
          <div className="hidden lg:block">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-warm border border-white/20">
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-border/30">
                  <div className="w-8 h-8 rounded-full bg-gradient-maternal flex items-center justify-center">
                    <Heart className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Mama Care AI</p>
                    <p className="text-xs text-muted-foreground">Online now</p>
                  </div>
                </div>
                <div className="bg-card rounded-2xl p-3 border border-primary/10">
                  <p className="text-sm">Habari! How are you feeling today? I'm here to support you and your baby. 💕</p>
                </div>
                <div className="bg-gradient-maternal rounded-2xl p-3 ml-8">
                  <p className="text-sm text-primary-foreground">I have some questions about nutrition...</p>
                </div>
                <div className="bg-card rounded-2xl p-3 border border-primary/10">
                  <p className="text-sm">Great question! Let's talk about healthy foods for you and baby...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Maternal Support
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Culturally sensitive AI companion designed specifically for expectant mothers 
              in rural and underserved communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-primary/10 shadow-gentle hover:shadow-warm transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-maternal mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">24/7 Availability</h3>
                <p className="text-muted-foreground">
                  Round-the-clock support whenever you need guidance, day or night.
                </p>
              </CardContent>
            </Card>

            <Card className="border-trust/20 shadow-gentle hover:shadow-trust transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-trust mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Risk Detection</h3>
                <p className="text-muted-foreground">
                  Advanced AI monitoring to identify concerning symptoms and suggest immediate care.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20 shadow-gentle hover:shadow-warm transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-accent mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Cultural Sensitivity</h3>
                <p className="text-muted-foreground">
                  Tailored guidance respecting local traditions and healthcare practices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 shadow-gentle hover:shadow-warm transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Baby className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Pregnancy Tracking</h3>
                <p className="text-muted-foreground">
                  Week-by-week development guidance and milestone celebrations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-warning/20 shadow-gentle hover:shadow-warm transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-warning mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-warning-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Emergency Connect</h3>
                <p className="text-muted-foreground">
                  Instant connection to emergency services and healthcare providers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 shadow-gentle hover:shadow-warm transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-maternal mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Emotional Support</h3>
                <p className="text-muted-foreground">
                  Compassionate AI companion for mental health and emotional wellbeing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Chat Interface */}
      <section className="py-20 px-4 bg-gradient-soft">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Start Your Conversation
            </h2>
            <p className="text-xl text-muted-foreground">
              Chat with Mama Care AI about your pregnancy, symptoms, or any concerns. 
              Use text or voice - whatever feels most comfortable for you.
            </p>
          </div>
          <ChatInterface />
        </div>
      </section>

      {/* Emergency Resources */}
      <section className="py-16 px-4 bg-destructive/5 border-t border-destructive/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-destructive mb-4">Emergency Resources</h3>
          <p className="text-destructive/80 mb-6">
            If you're experiencing severe symptoms, don't wait. Contact emergency services immediately.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-4 text-center">
                <Phone className="w-6 h-6 text-destructive mx-auto mb-2" />
                <p className="font-semibold text-destructive">Kenya Emergency</p>
                <p className="text-destructive/80">999</p>
              </CardContent>
            </Card>
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-4 text-center">
                <Phone className="w-6 h-6 text-destructive mx-auto mb-2" />
                <p className="font-semibold text-destructive">US Emergency</p>
                <p className="text-destructive/80">911</p>
              </CardContent>
            </Card>
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-4 text-center">
                <Phone className="w-6 h-6 text-destructive mx-auto mb-2" />
                <p className="font-semibold text-destructive">Local Clinic</p>
                <p className="text-destructive/80">Contact Info</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-primary/5 border-t border-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-maternal flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <h4 className="text-xl font-bold text-foreground">Mama Care AI</h4>
          </div>
          <p className="text-muted-foreground mb-4">
            Empowering mothers with AI-powered healthcare support for safer pregnancies.
          </p>
          <p className="text-sm text-muted-foreground">
            Always consult with healthcare professionals for medical decisions. 
            This AI assistant provides supportive information, not medical diagnosis.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;