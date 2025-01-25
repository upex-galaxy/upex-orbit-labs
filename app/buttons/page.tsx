'use client';

import { useState, useId } from 'react';
import Button from '../../components/ui/button';

export default function ButtonsPage() {
  const [messages, setMessages] = useState({
    dbClickMessage: '',
    rightClickMessage: '',
    clickMessage: ''
  });
  
  const clickButtonId = useId();


  const handleClick = () => {
    setMessages(prev => ({ ...prev, clickMessage: 'You have done a dynamic click' }));
  };

  const handleDoubleClick = () => {
    setMessages(prev => ({ ...prev, dbClickMessage: 'You have done a double click' }));
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMessages(prev => ({ ...prev, rightClickMessage: 'You have done a right click' }));
  };

  return (
    <div className="max-w-2xl mx-auto h-[80vh] p-6">
      <h1 className="text-3xl font-bold mb-6">Buttons - Practice UPEX</h1>
      
      <div className="space-y-4">
        <div>
          <Button id="dbClick" onDoubleClick={handleDoubleClick}>
            Double Click Me
          </Button>
        </div>
        
        <div>
          <Button 
            id="rightClick" 
            onContextMenu={handleRightClick}
          >
            Right Click Me
          </Button>
        </div>
        
        <div>
          <Button id={clickButtonId} onClick={handleClick}>
            Click Me
          </Button>
        </div>
  
        {/* Messages section */}
        <div className="mt-6 h-[200px] overflow-y-auto space-y-2">
          {messages.dbClickMessage && (
            <div className="p-4 bg-green-100 text-green-700 rounded">
              {messages.dbClickMessage}
            </div>
          )}
          {messages.rightClickMessage && (
            <div className="p-4 bg-green-100 text-green-700 rounded">
              {messages.rightClickMessage}
            </div>
          )}
          {messages.clickMessage && (
            <div className="p-4 bg-green-100 text-green-700 rounded">
              {messages.clickMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}