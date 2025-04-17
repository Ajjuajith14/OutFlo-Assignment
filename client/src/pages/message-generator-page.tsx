import React from "react";
import MessageGenerator from "../components/message-generator";

const MessageGeneratorPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">LinkedIn Message Generator</h1>
      <MessageGenerator />
    </div>
  );
};

export default MessageGeneratorPage;