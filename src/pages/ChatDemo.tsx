import { ChatWidget } from "@/components/chat/ChatWidget";

const ChatDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            KI-Chat Widget Demo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ein elegantes, modernes Chat-Widget das als iframe auf externen Seiten eingebettet werden kann. 
            Klicken Sie auf den Chat-Button unten rechts, um zu starten.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Elegante Nachrichten-Bubbles</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Typing-Indikator Animation</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Smooth Ein-/Ausblende-Animationen</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Responsive Design</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Als iframe einbettbar</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Verwendung als Widget</h2>
            <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre-wrap">
{`// Als React Component
import { ChatWidget } from './components/chat/ChatWidget';

<ChatWidget 
  title="Ihr KI-Assistent"
  welcomeMessage="Willkommen! Wie kann ich helfen?"
  position="bottom-right"
/>

// Als iframe einbetten
<iframe 
  src="https://ihre-domain.de/chat-widget" 
  width="400" 
  height="600"
  frameBorder="0">
</iframe>`}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Demo starten</h2>
          <p className="text-muted-foreground mb-6">
            Das Chat-Widget ist bereits aktiv! Schauen Sie unten rechts und klicken Sie auf den blauen Button.
          </p>
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Chat-Widget aktiv</span>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget 
        title="KI-Assistent Demo"
        welcomeMessage="Willkommen bei der Chat-Demo! Wie kann ich Ihnen helfen?"
        position="bottom-right"
      />
    </div>
  );
};

export default ChatDemo;