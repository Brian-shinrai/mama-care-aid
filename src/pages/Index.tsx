import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "@/components/ChatInterface";
import { Home, Lightbulb, Info, ChevronDown, Heart, Shield, Globe, CheckCircle, AlertCircle, Baby, Clock, Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-maternal-health.jpg";

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
    document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' });
    toast({
      title: 'Chat is Ready! 💕',
      description: 'Your caring AI companion is waiting to help you.',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Navigation Header with Dropdowns */}
      <div className="bg-card/80 backdrop-blur-md border-b border-border/50 shadow-gentle sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            {/* Home Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 hover-scale text-base font-medium">
                  <Home className="w-5 h-5" />
                  <span className="hidden sm:inline">Home</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-card/95 backdrop-blur-md">
                <DropdownMenuItem className="flex items-start gap-3 p-4">
                  <Heart className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm mb-1">Welcome</div>
                    <div className="text-xs text-muted-foreground">Your maternal health journey starts here</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-start gap-3 p-4">
                  <Baby className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm mb-1">About Mama Care</div>
                    <div className="text-xs text-muted-foreground">AI-powered support for expectant mothers</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Solutions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 hover-scale text-base font-medium">
                  <Lightbulb className="w-5 h-5" />
                  <span className="hidden sm:inline">Solutions</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-card/95 backdrop-blur-md">
                <DropdownMenuItem className="flex items-start gap-3 p-4">
                  <AlertCircle className="w-5 h-5 text-warning mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm mb-1">Risk Detection</div>
                    <div className="text-xs text-muted-foreground">Early warning system for pregnancy complications</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-start gap-3 p-4">
                  <CheckCircle className="w-5 h-5 text-trust mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm mb-1">Pregnancy Tracking</div>
                    <div className="text-xs text-muted-foreground">Monitor your baby's development week by week</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-start gap-3 p-4">
                  <Globe className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm mb-1">Cultural Sensitivity</div>
                    <div className="text-xs text-muted-foreground">Respect for traditional practices and beliefs</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* About Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 hover-scale text-base font-medium">
                  <Info className="w-5 h-5" />
                  <span className="hidden sm:inline">About</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 bg-card/95 backdrop-blur-md">
                <DropdownMenuItem className="flex items-start gap-3 p-4">
                  <Heart className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm mb-1">Our Mission</div>
                    <div className="text-xs text-muted-foreground">Reducing maternal mortality through AI-powered early detection and culturally sensitive support</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-start gap-3 p-4">
                  <Shield className="w-5 h-5 text-trust mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm mb-1">Why We Exist</div>
                    <div className="text-xs text-muted-foreground">Every mother deserves access to quality healthcare information</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-start gap-3 p-4">
                  <Globe className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm mb-1">Our Values</div>
                    <div className="text-xs text-muted-foreground">Compassion, cultural respect, and evidence-based care</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Hero Section with Blurred Background */}
      <div 
        className="relative min-h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 backdrop-blur-sm bg-black/40"></div>
        </div>

        {/* Content with Enhanced Visibility */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6 py-12 md:py-0">
          <div className="inline-block animate-fade-in">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-maternal flex items-center justify-center shadow-warm mx-auto mb-6 border-4 border-white/20">
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] animate-fade-in">
            Mama Care AI
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] animate-fade-in">
            Your Trusted Companion for a Safe Pregnancy Journey
          </p>
          <p className="text-base md:text-lg lg:text-xl text-white/95 max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium leading-relaxed animate-fade-in">
            Empowering expectant mothers with AI-driven insights, culturally sensitive support, 
            and 24/7 access to maternal health information.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 shadow-warm text-base md:text-lg px-6 md:px-8 py-5 md:py-6 font-semibold hover-scale animate-fade-in"
            onClick={scrollToChat}
          >
            Start Your Journey
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Maternal Care
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for a healthy pregnancy, powered by AI and delivered with compassion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.id}
                  className={`hover:shadow-warm transition-all duration-300 cursor-pointer hover:-translate-y-1 ${feature.borderColor}`}
                  onClick={() => handleFeatureClick(feature.id)}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-${feature.gradient} flex items-center justify-center mb-4 shadow-gentle`}>
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chat Interface Section */}
      <section id="chat-section" className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Talk to Mama Care AI
            </h2>
            <p className="text-xl text-muted-foreground">
              Your compassionate companion is ready to answer your questions
            </p>
          </div>
          
          <ChatInterface />
        </div>
      </section>

      {/* Feature Details Dialog */}
      <Dialog open={selectedFeature !== null} onOpenChange={() => setSelectedFeature(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-3">
              {selectedFeature && (() => {
                const feature = features.find(f => f.id === selectedFeature);
                if (!feature) return null;
                const Icon = feature.icon;
                return (
                  <>
                    <div className={`w-10 h-10 rounded-lg bg-${feature.gradient} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    {feature.title}
                  </>
                );
              })()}
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              {selectedFeature && features.find(f => f.id === selectedFeature)?.details}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
