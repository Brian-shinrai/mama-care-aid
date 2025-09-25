import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic, MicOff, Send, Heart, AlertTriangle, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'normal' | 'warning' | 'emergency';
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Habari! I'm Mama Care, your maternal health companion. I'm here to support you throughout your pregnancy journey. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
      type: 'normal'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response (in real app, this would call your AI service)
    setTimeout(() => {
      const aiResponse = generateAIResponse(text.trim());
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        isUser: false,
        timestamp: new Date(),
        type: aiResponse.type
      };

      setMessages(prev => [...prev, aiMessage]);

      // Speak the response if text-to-speech is available
      if ('speechSynthesis' in window && !isListening) {
        const utterance = new SpeechSynthesisUtterance(aiResponse.text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        speechSynthesis.speak(utterance);
      }

      // Show emergency alert if needed
      if (aiResponse.type === 'emergency') {
        toast({
          variant: 'destructive',
          title: 'Emergency Alert',
          description: 'Please contact emergency services immediately.',
        });
      }
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (userInput: string): { text: string; type: 'normal' | 'warning' | 'emergency' } => {
    const input = userInput.toLowerCase();
    
    // Emergency symptoms detection
    if (input.includes('bleeding') || input.includes('severe pain') || input.includes('can\'t breathe') || 
        input.includes('dizzy') || input.includes('faint') || input.includes('emergency')) {
      return {
        text: "⚠️ These symptoms require immediate medical attention. Please contact your healthcare provider or emergency services right away. Call 911 (US), 999 (Kenya), or go to the nearest hospital immediately. Don't wait - your safety and your baby's safety are the priority.",
        type: 'emergency'
      };
    }

    // Warning symptoms
    if (input.includes('nausea') || input.includes('headache') || input.includes('swollen') || 
        input.includes('tired') || input.includes('worried')) {
      return {
        text: "I understand your concern. While some discomfort is normal during pregnancy, it's important to monitor these symptoms. If they worsen or you feel something isn't right, please contact your healthcare provider. Would you like some gentle suggestions for managing these symptoms?",
        type: 'warning'
      };
    }

    // Nutrition questions
    if (input.includes('food') || input.includes('eat') || input.includes('nutrition') || input.includes('diet')) {
      return {
        text: "Good nutrition is so important for you and your baby! Focus on iron-rich foods like leafy greens and lean meats, folate from fortified cereals and beans, and calcium from dairy or fortified alternatives. Stay hydrated and take your prenatal vitamins. Avoid raw fish, unpasteurized foods, and excessive caffeine. What specific foods are you curious about?",
        type: 'normal'
      };
    }

    // Exercise questions
    if (input.includes('exercise') || input.includes('walk') || input.includes('active') || input.includes('movement')) {
      return {
        text: "Staying active during pregnancy is wonderful! Gentle exercises like walking, swimming, and prenatal yoga are excellent choices. Listen to your body and avoid activities with fall risk. Aim for 150 minutes of moderate activity per week, but always check with your healthcare provider first. What type of activities do you enjoy?",
        type: 'normal'
      };
    }

    // General support responses
    const supportResponses = [
      "You're doing such a great job taking care of yourself and your baby. Every question you ask shows how much you care. What's on your mind today?",
      "Remember, every pregnancy is unique and beautiful. I'm here to support you through any concerns or questions you have. How are you feeling overall?",
      "It's completely normal to have questions and concerns during pregnancy. You're being a wonderful mama already by staying informed. What would you like to know more about?",
      "Your health and peace of mind are so important. I'm here to help you feel confident and supported. What can I help you with today?"
    ];

    return {
      text: supportResponses[Math.floor(Math.random() * supportResponses.length)],
      type: 'normal'
    };
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        variant: 'destructive',
        title: 'Speech Recognition Not Available',
        description: 'Your browser doesn\'t support voice input. Please type your message.',
      });
      return;
    }

    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionClass();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: 'Listening...',
        description: 'Speak now, I\'m listening carefully.',
      });
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast({
        variant: 'destructive',
        title: 'Voice Input Error',
        description: 'Could not hear you clearly. Please try again.',
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  return (
    <Card className="h-[600px] flex flex-col bg-gradient-to-br from-card to-muted/20 border-primary/20 shadow-warm">
      {/* Header */}
      <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-maternal flex items-center justify-center shadow-gentle">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Mama Care AI</h3>
            <p className="text-sm text-muted-foreground">Your 24/7 companion</p>
          </div>
          <div className="ml-auto">
            <Button variant="outline" size="sm" className="gap-2">
              <Phone className="w-4 h-4" />
              Emergency
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.isUser
                    ? 'bg-gradient-maternal text-primary-foreground shadow-gentle'
                    : message.type === 'emergency'
                    ? 'bg-destructive/10 text-destructive border border-destructive/20'
                    : message.type === 'warning'
                    ? 'bg-warning/10 text-warning-foreground border border-warning/20'
                    : 'bg-card text-card-foreground border border-border/50 shadow-sm'
                } transition-all duration-300`}
              >
                {!message.isUser && message.type === 'emergency' && (
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs font-semibold">EMERGENCY ALERT</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 opacity-70 ${message.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isSpeaking && (
            <div className="flex justify-start">
              <div className="bg-accent/10 text-accent-foreground rounded-2xl px-4 py-3 border border-accent/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <p className="text-sm">Speaking...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border/50 bg-gradient-to-r from-background/50 to-muted/30">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about your pregnancy, symptoms, or just chat..."
              className="pr-12 bg-card/80 border-primary/20 focus:border-primary/40 rounded-full"
              disabled={isListening}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={isListening ? stopListening : startListening}
              className={`absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 ${
                isListening ? 'text-destructive hover:text-destructive/80' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {isListening ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button 
            type="submit" 
            disabled={!inputText.trim() || isListening}
            className="rounded-full shadow-gentle hover:shadow-warm transition-all duration-300"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};