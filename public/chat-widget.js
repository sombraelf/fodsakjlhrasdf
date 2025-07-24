// iurFRIEND Chat Widget - Standalone JavaScript Version
(function() {
  'use strict';
  
  window.iurFRIENDChat = {
    init: function(config) {
      const defaultConfig = {
        title: 'Freund - KI von iurFRIEND',
        position: 'bottom-right',
        apiEndpoint: 'https://flowise.iurfriend.net/api/v1/prediction/55d57180-f5fc-459f-8869-6480b6645f21',
        welcomeMessage: 'Hallo, ich heiße "Freund" und bin die KI von iurFRIEND. Ich beantworte gerne alle Fragen zum Thema Trennung, Scheidung und Familienrecht.'
      };
      
      this.config = Object.assign(defaultConfig, config);
      this.isOpen = false;
      this.messages = [{
        id: '1',
        content: this.config.welcomeMessage,
        isBot: true,
        timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
      }];
      
      this.createStyles();
      this.createWidget();
    },
    
    createStyles: function() {
      const styles = `
        .iurfriend-chat-widget {
          position: fixed;
          z-index: 9999;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        
        .iurfriend-chat-button {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fc9a3f, #ffb366);
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(252, 154, 63, 0.3);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .iurfriend-chat-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(252, 154, 63, 0.4);
        }
        
        .iurfriend-chat-window {
          position: fixed;
          width: 380px;
          height: 600px;
          background: #fff9f2;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform: translateY(20px) scale(0.9);
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .iurfriend-chat-window.open {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        
        .iurfriend-chat-header {
          background: linear-gradient(135deg, #fc9a3f, #ffb366);
          color: white;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .iurfriend-chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          background: #fff9f2;
        }
        
        .iurfriend-message {
          margin-bottom: 16px;
          display: flex;
        }
        
        .iurfriend-message.bot {
          justify-content: flex-start;
        }
        
        .iurfriend-message.user {
          justify-content: flex-end;
        }
        
        .iurfriend-message-bubble {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 18px;
          word-wrap: break-word;
        }
        
        .iurfriend-message.bot .iurfriend-message-bubble {
          background: #fff3e0;
          color: #4a3d2a;
          border-bottom-left-radius: 6px;
        }
        
        .iurfriend-message.user .iurfriend-message-bubble {
          background: #fc9a3f;
          color: white;
          border-bottom-right-radius: 6px;
        }
        
        .iurfriend-chat-input {
          padding: 16px;
          border-top: 1px solid #e5ddd4;
          background: #fff9f2;
          display: flex;
          gap: 8px;
        }
        
        .iurfriend-input-field {
          flex: 1;
          border: 1px solid #e5ddd4;
          border-radius: 12px;
          padding: 12px 16px;
          outline: none;
          background: white;
          resize: none;
          min-height: 44px;
          max-height: 120px;
        }
        
        .iurfriend-send-button {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #fc9a3f, #ffb366);
          border: none;
          cursor: pointer;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .iurfriend-typing {
          padding: 8px 16px;
          background: #fff3e0;
          border-radius: 18px;
          border-bottom-left-radius: 6px;
          max-width: 80%;
          color: #4a3d2a;
        }
        
        .iurfriend-typing-dots {
          display: inline-flex;
          gap: 4px;
        }
        
        .iurfriend-typing-dot {
          width: 8px;
          height: 8px;
          background: #fc9a3f;
          border-radius: 50%;
          animation: iurfriend-bounce 1.4s infinite both;
        }
        
        .iurfriend-typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .iurfriend-typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes iurfriend-bounce {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .iurfriend-bottom-right {
          bottom: 20px;
          right: 20px;
        }
        
        .iurfriend-bottom-left {
          bottom: 20px;
          left: 20px;
        }
        
        .iurfriend-bottom-right .iurfriend-chat-window {
          bottom: 80px;
          right: 0;
        }
        
        .iurfriend-bottom-left .iurfriend-chat-window {
          bottom: 80px;
          left: 0;
        }
      `;
      
      const styleSheet = document.createElement('style');
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
    },
    
    createWidget: function() {
      const widget = document.createElement('div');
      widget.className = `iurfriend-chat-widget iurfriend-${this.config.position}`;
      
      widget.innerHTML = `
        <div class="iurfriend-chat-window" id="iurfriend-chat-window">
          <div class="iurfriend-chat-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
              <span style="font-weight: 600;">${this.config.title}</span>
            </div>
            <button onclick="window.iurFRIENDChat.close()" style="background: none; border: none; color: white; cursor: pointer; padding: 4px;">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
          <div class="iurfriend-chat-messages" id="iurfriend-messages"></div>
          <div class="iurfriend-chat-input">
            <textarea id="iurfriend-input" class="iurfriend-input-field" placeholder="Ihre Frage..." rows="1"></textarea>
            <button onclick="window.iurFRIENDChat.sendMessage()" class="iurfriend-send-button">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
              </svg>
            </button>
          </div>
        </div>
        
        <button onclick="window.iurFRIENDChat.toggle()" class="iurfriend-chat-button">
          <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        </button>
      `;
      
      document.body.appendChild(widget);
      this.renderMessages();
      
      // Enter key handler
      document.getElementById('iurfriend-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
    },
    
    toggle: function() {
      this.isOpen = !this.isOpen;
      const window = document.getElementById('iurfriend-chat-window');
      if (this.isOpen) {
        window.classList.add('open');
      } else {
        window.classList.remove('open');
      }
    },
    
    close: function() {
      this.isOpen = false;
      document.getElementById('iurfriend-chat-window').classList.remove('open');
    },
    
    renderMessages: function() {
      const container = document.getElementById('iurfriend-messages');
      container.innerHTML = '';
      
      this.messages.forEach(message => {
        const messageEl = document.createElement('div');
        messageEl.className = `iurfriend-message ${message.isBot ? 'bot' : 'user'}`;
        messageEl.innerHTML = `
          <div class="iurfriend-message-bubble">
            ${message.content}
            <div style="font-size: 11px; opacity: 0.7; margin-top: 4px;">
              ${message.timestamp}
            </div>
          </div>
        `;
        container.appendChild(messageEl);
      });
      
      container.scrollTop = container.scrollHeight;
    },
    
    showTyping: function() {
      const container = document.getElementById('iurfriend-messages');
      const typingEl = document.createElement('div');
      typingEl.className = 'iurfriend-message bot';
      typingEl.id = 'iurfriend-typing';
      typingEl.innerHTML = `
        <div class="iurfriend-typing">
          <div class="iurfriend-typing-dots">
            <div class="iurfriend-typing-dot"></div>
            <div class="iurfriend-typing-dot"></div>
            <div class="iurfriend-typing-dot"></div>
          </div>
        </div>
      `;
      container.appendChild(typingEl);
      container.scrollTop = container.scrollHeight;
    },
    
    hideTyping: function() {
      const typingEl = document.getElementById('iurfriend-typing');
      if (typingEl) {
        typingEl.remove();
      }
    },
    
    sendMessage: function() {
      const input = document.getElementById('iurfriend-input');
      const content = input.value.trim();
      
      if (!content) return;
      
      const userMessage = {
        id: Date.now().toString(),
        content: content,
        isBot: false,
        timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
      };
      
      this.messages.push(userMessage);
      input.value = '';
      this.renderMessages();
      this.showTyping();
      
      // Call Flowise API
      fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: content
        })
      })
      .then(response => response.json())
      .then(data => {
        this.hideTyping();
        const botMessage = {
          id: (Date.now() + 1).toString(),
          content: data.text || data.answer || 'Entschuldigung, ich konnte keine Antwort generieren.',
          isBot: true,
          timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
        };
        this.messages.push(botMessage);
        this.renderMessages();
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der API:', error);
        this.hideTyping();
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          content: 'Entschuldigung, es gab ein Problem bei der Verbindung zum Server. Bitte versuchen Sie es später erneut.',
          isBot: true,
          timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
        };
        this.messages.push(errorMessage);
        this.renderMessages();
      });
    }
  };
})();