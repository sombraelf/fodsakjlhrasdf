import { ChatWidget } from "@/components/chat/ChatWidget";
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Neues KI-Chat Widget</span>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            Elegantes KI-Chat Widget
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Ein modernes, funktionsfähiges Chat-Interface das viel besser ist als Flowise. 
            Perfekt als Widget für externe Seiten oder als iframe einbettbar.
          </p>
          
          <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-3 h-auto">
            <MessageCircle className="h-5 w-5 mr-2" />
            Chat Demo starten
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Moderne Chat-UI</h3>
            <p className="text-muted-foreground">
              Elegante Nachrichten-Bubbles mit smooth Animationen und Typing-Indikator.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Widget-fähig</h3>
            <p className="text-muted-foreground">
              Perfekt als iframe einbettbar oder als React Component verwendbar.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
            <p className="text-muted-foreground">
              Funktioniert perfekt auf Desktop, Tablet und Mobile Geräten.
            </p>
          </div>
        </div>

        {/* Demo Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Live Demo</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Klicken Sie auf den Chat-Button unten rechts, um das Widget zu testen!
          </p>
          <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">Widget ist aktiv</span>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget 
        title="KI-Assistent"
        welcomeMessage="Hallo! Willkommen bei unserem neuen KI-Chat Widget. Wie kann ich Ihnen helfen?"
        position="bottom-right"
      />
    </div>
  );
};

export default Index;
