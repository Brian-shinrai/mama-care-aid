import { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Heart, Shield, Clock, Globe, Phone, Baby, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-maternal-health.jpg';

const Index = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const { toast } = useToast();

  const features = [
    {
      id: 'availability',
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock support whenever you need guidance, day or night.',
      details: 'Our AI companion never sleeps, ensuring you have access to maternal health guidance at any hour. Whether it\'s 3 AM concerns about baby movements or questions during a busy afternoon, Mama Care AI is always ready to help.',
      gradient: 'gradient-maternal',
      borderColor: 'border-primary/10'
    },
    {
      id: 'risk-detection',
      icon: Shield,
      title: 'Risk Detection',
      description: 'Advanced AI monitoring to identify concerning symptoms and suggest immediate care.',
      details: 'Using advanced pattern recognition, our AI can identify potential warning signs in your symptoms and guide you on when to seek immediate medical attention. This early detection system could be life-saving for you and your baby.',
      gradient: 'gradient-trust',
      borderColor: 'border-trust/20'
    },
    {
      id: 'cultural-sensitivity',
      icon: Globe,
      title: 'Cultural Sensitivity',
      description: 'Tailored guidance respecting local traditions and healthcare practices.',
      details: 'We understand that maternal care varies across cultures. Our AI is trained to respect local traditions while providing medically sound advice, ensuring cultural sensitivity in every interaction.',
      gradient: 'bg-accent',
      borderColor: 'border-accent/20'
    },
    {
      id: 'pregnancy-tracking',
      icon: Baby,
      title: 'Pregnancy Tracking',
      description: 'Week-by-week development guidance and milestone celebrations.',
      details: 'Follow your baby\'s development with weekly updates, milestone celebrations, and personalized guidance for each stage of your pregnancy journey. Track symptoms, appointments, and precious moments.',
      gradient: 'bg-secondary',
      borderColor: 'border-secondary/20'
    },
    {
      id: 'emergency-connect',
      icon: Phone,
      title: 'Emergency Connect',
      description: 'Instant connection to emergency services and healthcare providers.',
      details: 'In critical situations, every second counts. Our emergency connect feature provides instant access to local emergency services, healthcare providers, and emergency protocols specific to your region.',
      gradient: 'bg-warning',
      borderColor: 'border-warning/20'
    },
    {
      id: 'emotional-support',
      icon: Heart,
      title: 'Emotional Support',
      description: 'Compassionate AI companion for mental health and emotional wellbeing.',
      details: 'Pregnancy can be emotionally challenging. Our AI provides empathetic support, helps identify mood patterns, offers coping strategies, and knows when to recommend professional mental health resources.',
      gradient: 'gradient-maternal',
      borderColor: 'border-primary/20'
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    setSelectedFeature(featureId);
    toast({
      title: 'Feature Details',
      description: 'Learn more about this feature in the dialog.',
    });
  };

  const scrollToChat = () => {
    const chatSection = document.getElementById('chat-section');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
      toast({
        title: 'Ready to Chat!',
        description: 'Start your conversation with Mama Care AI below.',
      });
    }
  };
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
              <Button 
                size="lg" 
                variant="secondary" 
                className="shadow-trust hover:shadow-warm transition-all duration-300"
                onClick={scrollToChat}
              >
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
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={feature.id}
                  className={`${feature.borderColor} shadow-gentle hover:shadow-warm transition-all duration-300 group cursor-pointer transform hover:scale-105`}
                  onClick={() => handleFeatureClick(feature.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full ${feature.gradient} mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center justify-center text-primary group-hover:text-primary/80 transition-colors">
                      <span className="text-sm font-medium">Learn More</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Feature Details Dialog */}
          <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
            <DialogContent className="max-w-md">
              {selectedFeature && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                      {(() => {
                        const feature = features.find(f => f.id === selectedFeature);
                        if (!feature) return null;
                        const IconComponent = feature.icon;
                        return (
                          <>
                            <div className={`w-10 h-10 rounded-full ${feature.gradient} flex items-center justify-center`}>
                              <IconComponent className="w-5 h-5 text-primary-foreground" />
                            </div>
                            {feature.title}
                          </>
                        );
                      })()}
                    </DialogTitle>
                    <DialogDescription className="text-left mt-4">
                      {features.find(f => f.id === selectedFeature)?.details}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-3 mt-6">
                    <Button onClick={scrollToChat} className="flex-1">
                      <Heart className="w-4 h-4 mr-2" />
                      Try This Feature
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedFeature(null)}>
                      Close
                    </Button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Main Chat Interface */}
      <section id="chat-section" className="py-20 px-4 bg-gradient-soft">
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