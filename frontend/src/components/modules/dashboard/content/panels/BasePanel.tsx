"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { Loader2, Copy, Check } from "lucide-react";
import { useState } from "react";

interface BasePanelProps {
  title: string;
  description: string;
  children: ReactNode;
  onSubmit?: () => void;
  isLoading?: boolean;
  response?: any;
  endpoint?: string;
  method?: string;
}

export const BasePanel = ({ 
  title, 
  description, 
  children, 
  onSubmit, 
  isLoading, 
  response, 
  endpoint,
  method = "POST"
}: BasePanelProps) => {
  const [copied, setCopied] = useState(false);

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        {endpoint && (
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded text-xs font-mono font-semibold ${
              method === 'GET' ? 'bg-green-100 text-green-800' : 
              method === 'POST' ? 'bg-blue-100 text-blue-800' : 
              'bg-gray-100 text-gray-800'
            }`}>
              {method}
            </span>
            <code className="text-sm bg-gray-100 px-3 py-1 rounded font-mono text-gray-800">
              {endpoint}
            </code>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Request</h3>
          <div className="space-y-4">
            {children}
            {onSubmit && (
              <Button 
                onClick={onSubmit} 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Execute Request"
                )}
              </Button>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Response</h3>
            {response && (
              <Button
                variant="outline"
                size="sm"
                onClick={copyResponse}
                className="text-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            )}
          </div>
          <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-auto">
            {response ? (
              <pre className="text-sm text-gray-800">
                {JSON.stringify(response, null, 2)}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Response will appear here after executing the request</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};