import Markdown from 'marked-react';
import { useOutletContext } from 'react-router-dom';
import { Refractor, registerLanguage } from 'react-refractor';
// Load any languages you want to use from `refractor`
import bash from 'refractor/lang/bash';
import js from 'refractor/lang/javascript.js';
import php from 'refractor/lang/php.js';
import python from 'refractor/lang/python.js';

// Then register them
registerLanguage(bash);
registerLanguage(js);
registerLanguage(php);
registerLanguage(python);

const renderer = {
  code(snippet, lang) {
    if (!lang) lang = 'bash';
    const allowedLangs = ['js', 'php', 'python'];
    if (!allowedLangs.includes(lang)) lang = 'bash';
    return <Refractor key={this.elementId} language={lang} value={snippet} />;
  }
};

const ChatContainer = ({ messages }) => {
  const { profilePic } = useOutletContext();

  return messages
    .filter(m => m.role !== 'system') // Filter out system messages
    .map(m => (
      <div key={m.id} className={`chat ${m.role === 'assistant' ? 'chat-start' : 'chat-end'}`}>
        {m.role === 'user' && profilePic && (
          <div className='chat-image avatar'>
            <div className='w-20 rounded-full'>
              <img
                src={
                  profilePic.b64_json.includes('data:image/png;base64,')
                    ? profilePic.b64_json
                    : `data:image/png;base64,${profilePic.b64_json}`
                }
                alt='User'
                className='rounded-full shadow-lg'
                width={50}
              />
            </div>
          </div>
        )}
        <div
          className={`chat-bubble ${
            m.role === 'assistant' ? 'chat-bubble-primary' : 'chat-bubble-secondary'
          }`}
        >
          <Markdown gfm renderer={renderer}>
            {m.content}
          </Markdown>
        </div>
      </div>
    ));
};

export default ChatContainer;
