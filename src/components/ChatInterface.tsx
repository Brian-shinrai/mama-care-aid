import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic, MicOff, Send, Heart, AlertTriangle, Phone, Languages } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'normal' | 'warning' | 'emergency';
}

export const ChatInterface = () => {
  const [language, setLanguage] = useState<'en' | 'sw'>('en');
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Update initial message when language changes
  useEffect(() => {
    const initialMessage = {
      id: '1',
      text: language === 'en' 
        ? "Habari! I'm Mama Care, your maternal health companion. I'm here to support you throughout your pregnancy journey. How can I help you today?"
        : "Habari mama! Mimi ni Mama Care, mwenzako wa afya ya uzazi. Niko hapa kukusaidia katika safari yako ya ujauzito. Naweza kukusaidia vipi leo?",
      isUser: false,
      timestamp: new Date(),
      type: 'normal' as const
    };
    setMessages([initialMessage]);
  }, [language]);

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
    if (input.includes('bleeding') || input.includes('severe pain') || input.includes("can't breathe") || 
        input.includes('dizzy') || input.includes('faint') || input.includes('emergency') ||
        input.includes('kutokwa damu') || input.includes('maumivu makali') || input.includes('dharura')) {
      return {
        text: language === 'en' 
          ? "⚠️ These symptoms require immediate medical attention. Please contact your healthcare provider or emergency services right away. Call 911 (US), 999 (Kenya), or go to the nearest hospital immediately. Don't wait - your safety and your baby's safety are the priority."
          : "⚠️ Dalili hizi zinahitaji matibabu ya haraka. Tafadhali wasiliana na mhudumu wako wa afya au huduma za dharura mara moja. Piga simu 999 (Kenya) au nenda hospitali ya karibu. Usisubiri - usalama wako na wa mtoto wako ni kipaumbele.",
        type: 'emergency'
      };
    }

    // Warning symptoms
    if (input.includes('nausea') || input.includes('headache') || input.includes('swollen') || 
        input.includes('tired') || input.includes('worried') || input.includes('kichefuchefu') ||
        input.includes('maumivu ya kichwa') || input.includes('uvimbe') || input.includes('uchovu')) {
      return {
        text: language === 'en'
          ? "I understand your concern. While some discomfort is normal during pregnancy, it's important to monitor these symptoms. If they worsen or you feel something isn't right, please contact your healthcare provider. Would you like some gentle suggestions for managing these symptoms?"
          : "Naelewa wasiwasi wako. Ingawa matatizo kadha wa kadha ni ya kawaida wakati wa ujauzito, ni muhimu kufuatilia dalili hizi. Zikiongezeka au ukahisi hakuna hali nzuri, tafadhali wasiliana na mhudumu wako wa afya. Je, ungependa mapendekezo ya pole ya kushughulika na dalili hizi?",
        type: 'warning'
      };
    }

    // Nutrition questions
    if (input.includes('food') || input.includes('eat') || input.includes('nutrition') || input.includes('diet') ||
        input.includes('chakula') || input.includes('kula') || input.includes('lishe')) {
      const nutritionResponses = language === 'en' ? [
        "Good nutrition is so important for you and your baby! Focus on iron-rich foods like leafy greens and lean meats, folate from fortified cereals and beans, and calcium from dairy or fortified alternatives. Stay hydrated and take your prenatal vitamins. What specific foods are you curious about?",
        "Eating well during pregnancy gives your baby the best start! Include plenty of fruits, vegetables, whole grains, and protein. Don't forget your iron and folic acid supplements. Would you like some meal ideas or recipes?",
        "Your baby depends on you for nutrition, so every bite counts! Try to eat colorful fruits and vegetables, lean proteins, and healthy fats like avocados and nuts. What are your favorite foods right now?"
      ] : [
        "Lishe nzuri ni muhimu sana kwako na mtoto wako! Zingatia vyakula vyenye chuma kama mboga za majani na nyama konda, folate kutoka nafaka zilizoimarishwa na maharage, na kalsiamu kutoka maziwa. Kunywa maji mengi na tumia dawa za ujauzito. Je, ni vyakula gani maalum unavyotaka kujua?",
        "Kula vizuri wakati wa ujauzito kumpa mtoto wako mwanzo mzuri! Jumuisha matunda mengi, mboga, nafaka nzima, na protini. Usimsahau chuma na folic acid. Je, ungependa maoni ya milo au mapishi?",
        "Mtoto wako anategemea wewe kwa lishe, kwa hivyo kila kitu unachokula ni muhimu! Jaribu kula matunda na mboga zenye rangi mbalimbali, protini konda, na mafuta mazuri kama parachichi na karanga. Ni vyakula gani unavyovipenda sasa hivi?"
      ];
      
      return {
        text: nutritionResponses[Math.floor(Math.random() * nutritionResponses.length)],
        type: 'normal'
      };
    }

    // Exercise questions
    if (input.includes('exercise') || input.includes('walk') || input.includes('active') || input.includes('movement') ||
        input.includes('mazoezi') || input.includes('kutembea') || input.includes('kujigamba')) {
      const exerciseResponses = language === 'en' ? [
        "Staying active during pregnancy is wonderful! Gentle exercises like walking, swimming, and prenatal yoga are excellent choices. Listen to your body and avoid activities with fall risk. What type of activities do you enjoy?",
        "Movement is medicine during pregnancy! Walking is perfect - it's free, safe, and you can do it anywhere. Swimming is also fantastic as it supports your growing belly. How active were you before pregnancy?",
        "Exercise helps with energy, mood, and preparing for labor! Start slowly if you're new to fitness. Even 10-15 minutes of walking daily makes a difference. Would you like some safe exercise ideas?"
      ] : [
        "Kuendelea kujigamba wakati wa ujauzito ni nzuri sana! Mazoezi ya upole kama kutembea, kuogelea, na yoga ya ujauzito ni chaguo bora. Sikiliza mwili wako na epuka shughuli za hatari ya kuanguka. Ni aina gani za shughuli unazofurahia?",
        "Kujigamba ni dawa wakati wa ujauzito! Kutembea ni kamili - ni bure, salama, na unaweza kufanya popote. Kuogelea pia ni bora kwa kuunga mkono tumbo lako linaloongezeka. Ulikuwa mzalendo kimazoezi kabla ya ujauzito?",
        "Mazoezi yanasaidia nguvu, hisia, na maandalizi ya kujifungua! Anza polepole kama hujawahi kujigamba. Hata dakika 10-15 za kutembea kila siku kunaleta mabadiliko. Je, ungependa maoni ya mazoezi salama?"
      ];
      
      return {
        text: exerciseResponses[Math.floor(Math.random() * exerciseResponses.length)],
        type: 'normal'
      };
    }

    // Sleep and rest questions
    if (input.includes('sleep') || input.includes('tired') || input.includes('rest') || input.includes('insomnia') ||
        input.includes('kulala') || input.includes('uchovu') || input.includes('mapumziko')) {
      const sleepResponses = language === 'en' ? [
        "Sleep can be challenging during pregnancy! Try sleeping on your side with a pillow between your knees. Create a bedtime routine and avoid screens before bed. How many hours are you getting?",
        "Your body is working hard growing a baby, so feeling tired is normal! Try short naps (20-30 minutes) if possible. Gentle stretching before bed can help you relax. What's keeping you awake at night?",
        "Good sleep is crucial for both you and baby's development. If heartburn is bothering you, try eating earlier and sleeping slightly elevated. A warm bath before bed can be very soothing. What helps you feel most comfortable?"
      ] : [
        "Kulala kunaweza kuwa changamoto wakati wa ujauzito! Jaribu kulala upande wako na mto kati ya magoti. Tengeneza ratiba ya kulala na epuka skrini kabla ya kulala. Unalala masaa mangapi?",
        "Mwili wako unafanya kazi kuu kukuza mtoto, kwa hivyo kuhisi uchovu ni kawaida! Jaribu kulala ufupi (dakika 20-30) ikiwezekana. Kujinyoosha kidogo kabla ya kulala kunaweza kukusaidia. Ni nini kinachokuzuia kulala usiku?",
        "Usingizi mzuri ni muhimu kwa maendeleo yako na ya mtoto. Kama moto wa kifuani unakusumbua, jaribu kula mapema na kulala ukiwa umeinuliwa kidogo. Bafu ya maji ya joto kabla ya kulala inaweza kutuliza sana. Ni nini kinachokufanya uhisi umetulia zaidi?"
      ];
      
      return {
        text: sleepResponses[Math.floor(Math.random() * sleepResponses.length)],
        type: 'normal'
      };
    }

    // Baby questions
    if (input.includes('baby') || input.includes('kick') || input.includes('move') || input.includes('ultrasound') ||
        input.includes('mtoto') || input.includes('kupiga') || input.includes('kusonga') || input.includes('picha za tumbo')) {
      const babyResponses = language === 'en' ? [
        "It's so exciting to feel your baby move! Those first flutters usually start around 16-25 weeks. Every baby has their own rhythm. When did you first feel your little one moving?",
        "Your baby is growing and developing so beautifully! Each kick and movement shows they're healthy and active. Have you started talking or singing to your baby? They can hear your voice!",
        "Baby movements are one of pregnancy's greatest joys! If you haven't felt movement for a while and you're past 28 weeks, try having a cold drink and lying on your side. When was your last ultrasound?",
        "Your little miracle is developing their personality already! Some babies are night owls, others are early birds. Keep track of their active times - it's amazing how consistent they can be. What time is your baby most active?"
      ] : [
        "Ni jambo la kusisimua sana kuhisi mtoto wako akisonga! Misigizigio ya kwanza huanza karibu wiki 16-25. Kila mtoto ana mlolongo wake mwenyewe. Ulimhisi lini mtoto wako akisonga kwa mara ya kwanza?",
        "Mtoto wako anakua na kuendeleza vizuri sana! Kila kipigo na msigizigio kunaonyesha ana afya nzuri na ni mkangavu. Umeanza kuongea au kuimbia mtoto wako? Anaweza kusikia sauti yako!",
        "Misigizigio ya mtoto ni mojawapo ya furaha kubwa za ujauzito! Kama hujamhisi akisonga kwa muda na umepita wiki 28, jaribu kunywa kinywaji baridi na kulala upande wako. Picha za tumbo za mwisho zilikuwa lini?",
        "Mujiza wako mdogo anaendeleza umbo lake tayari! Baadhi ya watoto ni wa usiku, wengine ni wa alfajiri. Fuatilia nyakati zao za kuwa hai - ni ajabu jinsi wanavyoweza kuwa na utaratibu. Ni wakati gani mtoto wako ana shughuli zaidi?"
      ];
      
      return {
        text: babyResponses[Math.floor(Math.random() * babyResponses.length)],
        type: 'normal'
      };
    }

    // General support responses
    const supportResponses = language === 'en' ? [
      "You're doing such a wonderful job taking care of yourself and your baby. Every question you ask shows how much you care. What's on your mind today?",
      "Remember, every pregnancy is unique and beautiful in its own way. I'm here to support you through any concerns or questions you have. How are you feeling overall?",
      "It's completely normal to have questions and concerns during pregnancy. You're being an amazing mama already by staying informed. What would you like to know more about?",
      "Your health and peace of mind are so important. I'm here to help you feel confident and supported throughout this journey. What can I help you with today?",
      "Pregnancy is such a special time, filled with wonder and sometimes worry. That's all perfectly normal! I'm here to walk alongside you. How has your day been?",
      "You're growing a miracle inside you! It's natural to have lots of questions and feelings. I'm here to listen and support you. What's been on your heart lately?"
    ] : [
      "Unafanya kazi nzuri sana kujitunza wewe na mtoto wako. Kila swali unalojiuliza linaonyesha jinsi unavyojali. Kuna nini kinachokupitia aklini leo?",
      "Kumbuka, kila ujauzito ni wa kipekee na mzuri kwa njia yake mwenyewe. Niko hapa kukuunga mkono katika wasiwasi au maswali yoyote uliyo nayo. Unahisi vipi kwa ujumla?",
      "Ni jambo la kawaida kabisa kuwa na maswali na wasiwasi wakati wa ujauzito. Unafanya nzuri kuwa mama kwa kujifahamisha. Je, ungependa kujua zaidi kuhusu nini?",
      "Afya yako na amani ya akili ni muhimu sana. Niko hapa kukusaidia kuhisi ujasiri na msaada katika safari hii nzima. Naweza kukusaidia nini leo?",
      "Ujauzito ni wakati maalum, umejaa ajabu na wakati mwingine wasiwasi. Hiyo yote ni ya kawaida kabisa! Niko hapa kutembea pamoja nawe. Siku yako imekuwaje?",
      "Unakuza mujiza ndani yako! Ni jambo la asili kuwa na maswali na hisia nyingi. Niko hapa kusikiliza na kukuunga mkono. Ni nini kimekuwa kikupitia rohoni hivi karibuni?"
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
    recognition.lang = language === 'en' ? 'en-US' : 'sw-KE';

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
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Mama Care AI</h3>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? 'Your 24/7 companion' : 'Mwenzako wa siku 24/7'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
              className="gap-2 text-xs"
            >
              <Languages className="w-4 h-4" />
              {language === 'en' ? 'Kiswahili' : 'English'}
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Phone className="w-4 h-4" />
              {language === 'en' ? 'Emergency' : 'Dharura'}
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
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border/50 bg-gradient-to-r from-background/50 to-muted/30">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={language === 'en' 
                ? "Ask about your pregnancy, symptoms, or just chat..."
                : "Uliza kuhusu ujauzito wako, dalili, au ongea tu..."
              }
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