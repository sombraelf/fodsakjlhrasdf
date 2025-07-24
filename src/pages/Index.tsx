import { ChatWidget } from "@/components/chat/ChatWidget";
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles, Zap, Code, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemId);
      toast({
        title: "Code kopiert!",
        description: "Der Code wurde in die Zwischenablage kopiert.",
      });
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      toast({
        title: "Fehler",
        description: "Code konnte nicht kopiert werden.",
        variant: "destructive",
      });
    }
  };

  const iframeCode = `<iframe
  src="${window.location.origin}/chat-demo"
  width="100%"
  height="600"
  frameborder="0"
  style="border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);"
  title="iurFRIEND KI-Chat">
</iframe>`;

  const embedScript = `<script>
  // Chat Widget laden
  const script = document.createElement('script');
  script.src = '${window.location.origin}/chat-widget.js';
  script.onload = function() {
    window.iurFRIENDChat.init({
      title: 'Freund - KI von iurFRIEND',
      position: 'bottom-right',
      apiEndpoint: 'https://flowise.iurfriend.net/api/v1/prediction/55d57180-f5fc-459f-8869-6480b6645f21'
    });
  };
  document.head.appendChild(script);
</script>`;

  const reactCode = `import { ChatWidget } from './components/chat/ChatWidget';

function App() {
  return (
    <div>
      {/* Ihr Content */}
      
      <ChatWidget 
        title="Freund - KI von iurFRIEND"
        welcomeMessage="Hallo, ich heiße \\"Freund\\" und bin die KI von iurFRIEND..."
        position="bottom-right"
      />
    </div>
  );
}`;
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

        {/* Integration Documentation */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <div className="text-center mb-8">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Integration & Einbettung</h2>
            <p className="text-lg text-muted-foreground">
              Binden Sie das iurFRIEND Chat-Widget ganz einfach in Ihre Website ein
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* iframe Integration */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-100 rounded-lg p-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">iframe Einbettung</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Perfekt für WordPress, HTML-Seiten oder jede Website ohne React.
              </p>
              <div className="relative bg-gray-50 rounded-lg p-4 border">
                <pre className="text-sm text-gray-700 overflow-x-auto">
                  <code>{iframeCode}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(iframeCode, "iframe")}
                >
                  {copiedItem === "iframe" ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Script Integration */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-green-100 rounded-lg p-2">
                  <Code className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Script Integration</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Dynamische Einbettung als schwebebdes Widget auf jeder Seite.
              </p>
              <div className="relative bg-gray-50 rounded-lg p-4 border">
                <pre className="text-sm text-gray-700 overflow-x-auto">
                  <code>{embedScript}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(embedScript, "script")}
                >
                  {copiedItem === "script" ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* React Integration */}
            <div className="space-y-4 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-purple-100 rounded-lg p-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">React Component</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Für React-Anwendungen - vollständig anpassbar und typisiert.
              </p>
              <div className="relative bg-gray-50 rounded-lg p-4 border">
                <pre className="text-sm text-gray-700 overflow-x-auto">
                  <code>{reactCode}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(reactCode, "react")}
                >
                  {copiedItem === "react" ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="text-lg font-semibold mb-4">Widget Features:</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Echte Flowise KI Integration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Responsive Design</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Smooth Animationen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">DSGVO-konform</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Typing Indicator</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Anpassbares Design</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Mobile optimiert</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Keine Dependencies</span>
              </div>
            </div>
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
        title="Freund - KI von iurFRIEND"
        welcomeMessage="Hallo, ich heiße &quot;Freund&quot; und bin die KI von iurFRIEND. Ich beantworte gerne alle Fragen zum Thema Trennung, Scheidung und Familienrecht."
        position="bottom-right"
      />
    </div>
  );
};

export default Index;
