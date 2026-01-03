'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@repo/ui/core/utils';

const tabs = [
  {
    name: 'auth.ts',
    code: `import { thonlabs } from '@thonlabs/auth'

export const auth = thonlabs({
  projectId: process.env.THONLABS_PROJECT_ID,
  secret: process.env.THONLABS_SECRET,
  
  providers: {
    google: true,
    github: true,
    email: true,
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  }
})`,
  },
  {
    name: 'middleware.ts',
    code: `import { auth } from './auth'
 
export default auth.middleware({
  publicRoutes: ['/'],
  
  // Redirect unauthenticated users
  signInPath: '/auth/login',
})

export const config = {
  matcher: ['/((?!api|_next/static).*)'],
}`,
  },
];

export default function HeroCodeBlock() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(tabs[activeTab]?.code || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative max-w-2xl mx-auto"
    >
      {/* Glow effect behind the code block */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent blur-3xl opacity-50" />

      <div className="relative rounded-xl border border-border/50 bg-gray-950/80 backdrop-blur-xl overflow-hidden shadow-2xl">
        {/* Window header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-gray-900/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-muted-foreground ml-2 font-mono">
              ~/my-app
            </span>
          </div>
          <button
            onClick={copyToClipboard}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border/30 bg-gray-900/30">
          {tabs.map((tab, index) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(index)}
              className={cn(
                'px-4 py-2.5 text-sm font-mono transition-colors relative',
                activeTab === index
                  ? 'text-foreground bg-gray-950/50'
                  : 'text-muted-foreground hover:text-foreground/80',
              )}
            >
              {tab.name}
              {activeTab === index && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
        </div>

        {/* Code */}
        <div className="p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-300">
            {tabs[activeTab]?.code?.split('\n').map((line, i) => (
              <div key={i} className="leading-relaxed">
                <span className="text-gray-600 select-none w-8 inline-block text-right mr-4">
                  {i + 1}
                </span>
                <span>{highlightCode(line)}</span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </motion.div>
  );
}

function highlightCode(line: string) {
  // Simple syntax highlighting
  return line
    .split(/('.*?'|".*?"|\{|\}|\(|\)|,|:|=>|\.\.\.)/g)
    .map((part, i) => {
      if (part.startsWith("'") || part.startsWith('"')) {
        return (
          <span key={i} className="text-emerald-400">
            {part}
          </span>
        );
      }
      if (
        ['import', 'export', 'from', 'const', 'default', 'true', 'false'].some(
          (kw) => part.includes(kw),
        )
      ) {
        const highlighted = part.replace(
          /(import|export|from|const|default|true|false)/g,
          (match) => `__KW__${match}__KW__`,
        );
        return highlighted.split('__KW__').map((p, j) =>
          ['import', 'export', 'from', 'const', 'default'].includes(p) ? (
            <span key={`${i}-${j}`} className="text-purple-400">
              {p}
            </span>
          ) : ['true', 'false'].includes(p) ? (
            <span key={`${i}-${j}`} className="text-amber-400">
              {p}
            </span>
          ) : (
            <span key={`${i}-${j}`}>{p}</span>
          ),
        );
      }
      if (part === '=>') {
        return (
          <span key={i} className="text-purple-400">
            {part}
          </span>
        );
      }
      if (/^\d+$/.test(part.trim())) {
        return (
          <span key={i} className="text-amber-400">
            {part}
          </span>
        );
      }
      if (part.includes('//')) {
        return (
          <span key={i} className="text-gray-500">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
}
