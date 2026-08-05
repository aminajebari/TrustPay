// app/components/Dashboard.tsx
"use client"
import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Header from './Header';
import ChatPanel from './ChatPanel';
import OrganizationsPanel from './OrganizationsPanel';
import { Menu } from 'lucide-react';
import { Message, PayrollSummary, WorkerSummary } from '@/utils/interface';
import { blockchainMcpTools, setWalletContext } from '@/lib/payroll-mcp-tools';
import Footer from './Footer';
import { getCluster } from '@/utils/helper';

type ChatMessage = Message & {
  id: string;
};

type GroqMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  tool_call_id?: string;
  tool_calls?: ToolCall[];
};

type ToolCall = {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
};

type GroqResponse = {
  choices: Array<{
    message: {
      role: 'assistant';
      content?: string | null;
      tool_calls?: ToolCall[];
    };
    finish_reason: string;
  }>;
};

const GROQ_API_KEY_STORAGE_KEY = 'trustpay:groq-api-key';

interface JsonSchemaProperty {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description?: string;
  enum?: string[];
}

interface ZodDef {
  typeName: string;
  shape?: (() => Record<string, unknown>) | Record<string, unknown>;
  description?: string;
  values?: string[] | Set<string>;
  innerType?: { _def: ZodDef };
}

interface ZodType {
  _def: ZodDef;
  [key: string]: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyToolExecute = (args: any, ctx: any) => Promise<unknown>;

// Build Groq-compatible tool definitions from MCP tools.
const getGroqTools = () => {
  return Object.entries(blockchainMcpTools).map(([name, tool]) => {
    const properties: Record<string, JsonSchemaProperty> = {};
    const required: string[] = [];

    try {
      const schema = tool.inputSchema;
      if (schema && typeof schema === 'object' && '_def' in schema) {
        const schemaObj = schema as unknown as ZodType;
        const def = schemaObj._def;

        if (def.typeName === 'ZodObject' && def.shape) {
          const shape = typeof def.shape === 'function' ? def.shape() : def.shape;

          Object.entries(shape).forEach(([key, zodType]) => {
            if (!zodType || typeof zodType !== 'object' || !('_def' in zodType)) return;

            const innerDef = (zodType as ZodType)._def;
            let actualDef = innerDef;
            let isOptional = false;

            if (innerDef.typeName === 'ZodOptional') {
              isOptional = true;
              actualDef = innerDef.innerType?._def || innerDef;
            }

            let type: JsonSchemaProperty['type'] = 'string';
            if (actualDef.typeName === 'ZodString') type = 'string';
            else if (actualDef.typeName === 'ZodNumber') type = 'number';
            else if (actualDef.typeName === 'ZodBoolean') type = 'boolean';
            else if (actualDef.typeName === 'ZodObject') type = 'object';
            else if (actualDef.typeName === 'ZodArray') type = 'array';

            properties[key] = {
              type,
              description: actualDef.description || innerDef.description || `${key} parameter`,
            };

            if (actualDef.typeName === 'ZodEnum' && actualDef.values) {
              properties[key].enum = Array.isArray(actualDef.values)
                ? actualDef.values
                : Array.from(actualDef.values);
            }

            if (!isOptional) required.push(key);
          });
        }
      }
    } catch (error) {
      console.error(`Error parsing schema for ${name}:`, error);
    }

    return {
      type: 'function' as const,
      function: {
        name,
        description: tool.description || 'No description provided.',
        parameters: {
          type: 'object',
          properties,
          required,
        },
      },
    };
  });
};

const formatToolResponse = (toolName: string, toolArgs: Record<string, unknown>, toolOutput: unknown): string => {
  const lines: string[] = [];

  let outputData: Record<string, unknown> = {};
  if (typeof toolOutput === 'string') {
    try { outputData = JSON.parse(toolOutput); }
    catch { outputData = { result: toolOutput }; }
  } else if (typeof toolOutput === 'object' && toolOutput !== null) {
    outputData = toolOutput as Record<string, unknown>;
  }

  if ('error' in outputData) {
    return `\n### ❌ Error\n\n${outputData.error}\n`;
  }

  if ('success' in outputData && !outputData.success) {
    return `\n### ⚠️ Operation Failed\n\n${'message' in outputData ? outputData.message : ''}\n`;
  }

  lines.push('', '### ✅ Operation Successful', '');

  if ('message' in outputData && outputData.message) {
    lines.push(`📝 ${outputData.message}`, '');
  }
  if ('signature' in outputData && outputData.signature) {
    lines.push(`🔗 **Transaction ID**: \`${outputData.signature}\``);
  }
  if ('workerPda' in outputData && outputData.workerPda) {
    lines.push(`👤 **Worker Address**: \`${outputData.workerPda}\``);
  }
  if ('orgPda' in outputData && outputData.orgPda) {
    lines.push(`🏢 **Organization Address**: \`${outputData.orgPda}\``);
  }
  if ('signature' in outputData || 'workerPda' in outputData || 'orgPda' in outputData) {
    lines.push('');
  }

  if ('organizations' in outputData && Array.isArray(outputData.organizations)) {
    lines.push('### 📋 Your Organizations', '');
    outputData.organizations.forEach((org: unknown, index: number) => {
      const orgData = org as Record<string, unknown>;
      lines.push(
        `**${index + 1}. ${orgData.name || 'Unknown'}**`,
        `- Treasury: **${Number(orgData.treasury || 0).toFixed(2)} SOL**`,
        `- Workers: ${orgData.workersCount || 0}`,
        ...(orgData.publicKey ? [`- Address: \`${orgData.publicKey}\``] : []),
        ''
      );
    });
  }

  if ('organization' in outputData && typeof outputData.organization === 'object') {
    const org = outputData.organization as Record<string, unknown>;
    lines.push(
      '### 🏢 Organization Details', '',
      `**Name**: ${org.name || 'Unknown'}`,
      `**Treasury Balance**: ${Number(org.treasury || 0).toFixed(2)} SOL`,
      `**Total Workers**: ${org.workersCount || 0}`
    );
    if (org.workers && Array.isArray(org.workers) && org.workers.length > 0) {
      lines.push('', '#### 👥 Workers', '');
      org.workers.forEach((worker: unknown, index: number) => {
        const w = worker as Record<string, unknown>;
        lines.push(
          `**${index + 1}.** \`${w.publicKey || 'N/A'}\``,
          `- Salary: **${Number(w.salary || 0).toFixed(2)} SOL**`,
          `- Last Paid: ${w.lastPaid ? new Date(Number(w.lastPaid) * 1000).toLocaleDateString() : 'Never'}`,
          ''
        );
      });
    }
  }

  if ('results' in outputData && Array.isArray(outputData.results)) {
    lines.push('### 💰 Payroll Processing Results', '');
    outputData.results.forEach((result: unknown) => {
      const r = result as Record<string, unknown>;
      lines.push(`${r.success ? '✅' : '❌'} Worker \`${r.workerPublicKey || 'Unknown'}\`: ${r.message || 'No details'}`);
    });
    lines.push('');
  }

  const displayedKeys = ['success', 'message', 'signature', 'workerPda', 'orgPda', 'organizations', 'organization', 'results', 'error'];
  const remainingKeys = Object.keys(outputData).filter(key => !displayedKeys.includes(key));
  if (remainingKeys.length > 0) {
    lines.push('### 📊 Additional Details', '');
    remainingKeys.forEach(key => {
      const value = outputData[key];
      lines.push(`- **${key}**: ${typeof value === 'object' ? `\`${JSON.stringify(value)}\`` : value}`);
    });
    lines.push('');
  }

  return lines.join('\n');
};

const Dashboard = () => {
  const [isPayrollOpen, setIsPayrollOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [organizations, setOrganizations] = useState<PayrollSummary[]>([]);
  const [userApiKey, setUserApiKey] = useState<string>('');
  const [apiKeySet, setApiKeySet] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { publicKey, signTransaction, signAllTransactions } = useWallet();

  const CLUSTER: string = process.env.NEXT_PUBLIC_CLUSTER || 'devnet';

  useEffect(() => {
    setWalletContext(publicKey || null, signTransaction || null);
  }, [publicKey, signTransaction]);

  useEffect(() => {
    if (!publicKey || !signTransaction || !signAllTransactions) return;
    Object.values(blockchainMcpTools).forEach((tool) => {
      const ctx = (tool as unknown as Record<string, unknown>)._walletCtx;
      if (ctx && typeof ctx === 'object') {
        (ctx as Record<string, unknown>).signAllTransactions = signAllTransactions;
      }
    });
  }, [publicKey, signTransaction, signAllTransactions]);

  useEffect(() => {
    const storedApiKey = window.localStorage.getItem(GROQ_API_KEY_STORAGE_KEY) || '';
    const hasStoredKey = !!storedApiKey.trim();

    setUserApiKey(storedApiKey);
    setApiKeySet(hasStoredKey);
    setMessages([{
      id: 'initial',
      role: 'bot' as const,
      content: hasStoredKey
        ? 'Hi! I can help manage your payroll organizations. Ask me to create orgs, add workers, process payroll, or fetch details.'
        : 'Welcome! To get started, I need your Groq API key. Please enter it below to enable chat functionality.',
      timestamp: new Date(),
    }]);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsPayrollOpen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loadOrganizations = async () => {
      const tool = blockchainMcpTools.fetch_user_organizations;
      if (!tool?.execute) return;
      try {
        const result = await (tool.execute as AnyToolExecute)({}, { toolCallId: 'load-orgs', messages: [] });
        if (typeof result === 'object' && result !== null && 'success' in result && result.success && Array.isArray((result as Record<string, unknown>).organizations)) {
          const mappedOrgs: PayrollSummary[] = ((result as Record<string, unknown>).organizations as unknown[]).map((org: unknown) => {
            const orgData = org as Record<string, unknown>;
            const workerCount = Number(orgData.workersCount || 0);
            return {
              id: String(orgData.publicKey || orgData.name || ''),
              orgName: String(orgData.name || 'Unknown'),
              treasury: Number(orgData.treasury || 0),
              createdAt: Number(orgData.createdAt || 0),
              workers: Array.from({ length: workerCount }, () => ({}) as WorkerSummary),
            };
          });
          setOrganizations(mappedOrgs);
        }
      } catch (error) {
        console.error('Failed to load organizations:', error);
      }
    };
    if (publicKey) loadOrganizations();
  }, [publicKey]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedApiKey = userApiKey.trim();
    if (trimmedApiKey) {
      window.localStorage.setItem(GROQ_API_KEY_STORAGE_KEY, trimmedApiKey);
      setUserApiKey(trimmedApiKey);
      setApiKeySet(true);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'bot' as const,
        content: 'Great! Groq API key configured. Now I can help manage your payroll organizations.',
        timestamp: new Date(),
      }]);
    }
  };

  const getActiveApiKey = () => userApiKey.trim();

  const generateResponse = async (userInput: string) => {
    setIsLoading(true);

    try {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'user' as const,
        content: userInput,
        timestamp: new Date(),
      }]);

      const systemPrompt: GroqMessage = {
        role: 'system',
        content: `You are a helpful payroll management assistant on Solana blockchain.

Your available organizations:
${organizations.map(org => `- ${org.orgName} (ID: ${org.id})`).join('\n')}

When users ask to:
- "Show organizations" or "list my orgs" → use fetch_user_organizations (no parameters needed)
- "Show details for [ORG_NAME]" → use fetch_organization_details with orgPda from the list above
- "Create organization [NAME]" → use create_organization with the name parameter
- "Add worker" → use add_worker with orgPda, workerPublicKey, and salaryInSol
- "Fund treasury" → use fund_treasury with orgPda and amountInSol
- "Process payroll" → use process_payroll with orgPda
- "Withdraw [AMOUNT] from [ORG_NAME]" → use withdraw_from_treasury with orgPda and amountInSol

CRITICAL RULES:
1. When a user mentions an organization by name, look it up above to get its orgPda/ID
2. Always extract ALL required parameters from user requests
3. For fetch_organization_details, you MUST provide the orgPda parameter
4. If a parameter is missing, ask the user for it
5. Be conversational and friendly
6. After tools execute, provide a brief, natural summary - the tool results are already formatted nicely

Available tools: ${Object.keys(blockchainMcpTools).join(', ')}

SOLANA EXPLORER LINKS:
When displaying transaction signatures or addresses, ALWAYS provide clickable Solana Explorer links:
- Transaction: https://explorer.solana.com/tx/[SIGNATURE]?cluster=${getCluster(CLUSTER)}
- Address: https://explorer.solana.com/address/[ADDRESS]?cluster=${getCluster(CLUSTER)}

IMPORTANT: Always include cluster parameter in links.`,
      };

      const conversationMessages: GroqMessage[] = [
        systemPrompt,
        ...messages.filter(m => m.id !== 'initial').map((m) => ({
          role: (m.role === 'bot' ? 'assistant' : 'user') as 'assistant' | 'user',
          content: m.content,
        })),
        {
          role: 'user',
          content: userInput,
        }
      ];

      const tools = getGroqTools();
      let fullResponse = '';
      let iterations = 0;
      const maxIterations = 5;
      const activeApiKey = getActiveApiKey();

      while (iterations < maxIterations) {
        iterations++;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${activeApiKey}`,
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: conversationMessages,
            tools,
            tool_choice: 'auto',
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`Groq API failed (${response.status}): ${errorData.error?.message || 'Unknown error'}`);
        }

        const data: GroqResponse = await response.json();
        const choice = data.choices[0];

        if (!choice || !choice.message) {
          throw new Error('Invalid API response structure');
        }

        const message = choice.message;

        conversationMessages.push({
          role: 'assistant',
          content: message.content || '',
          tool_calls: message.tool_calls,
        });

        if (message.content) {
          fullResponse += message.content + '\n';
        }

        if (message.tool_calls && message.tool_calls.length > 0) {
          for (const toolCall of message.tool_calls) {
            const toolName = toolCall.function.name;
            const toolArgs = JSON.parse(toolCall.function.arguments || '{}');

            let toolOutput: unknown;
            try {
              const tool = blockchainMcpTools[toolName as keyof typeof blockchainMcpTools];
              if (!tool?.execute) throw new Error(`Unknown tool: ${toolName}`);

              toolOutput = await (tool.execute as AnyToolExecute)(toolArgs, {
                toolCallId: toolCall.id,
                messages: []
              });

              if (toolOutput && typeof toolOutput === 'object' && Symbol.asyncIterator in toolOutput) {
                let str = '';
                for await (const chunk of toolOutput as AsyncIterable<unknown>) {
                  if (typeof chunk === 'string') str += chunk;
                }
                toolOutput = str;
              }
            } catch (error) {
              console.error(`Tool execution error for ${toolName}:`, error);
              toolOutput = { error: (error as Error).message };
            }

            fullResponse += formatToolResponse(toolName, toolArgs, toolOutput);

            const toolContent = typeof toolOutput === 'string'
              ? toolOutput
              : JSON.stringify(toolOutput, null, 2);

            conversationMessages.push({
              role: 'tool',
              content: toolContent,
              tool_call_id: toolCall.id,
            });
          }

          continue;
        }

        if (choice.finish_reason === 'stop') {
          break;
        }
      }

      if (!fullResponse.trim()) {
        fullResponse = "I received your message but couldn't generate a response. Please try again.";
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'bot' as const,
        content: fullResponse.trim(),
        timestamp: new Date(),
      }]);

      if (publicKey) {
        const tool = blockchainMcpTools.fetch_user_organizations;
        const refreshResult = await (tool.execute as AnyToolExecute)({}, { toolCallId: 'refresh', messages: [] });
        if (refreshResult && typeof refreshResult === 'object' && 'success' in refreshResult && refreshResult.success) {
          const mappedOrgs: PayrollSummary[] = ((refreshResult as Record<string, unknown>).organizations as unknown[]).map((org: unknown) => {
            const orgData = org as Record<string, unknown>;
            const workerCount = Number(orgData.workersCount || 0);
            return {
              id: String(orgData.publicKey || orgData.name || ''),
              orgName: String(orgData.name || 'Unknown'),
              treasury: Number(orgData.treasury || 0),
              workers: Array.from({ length: workerCount }, () => ({}) as WorkerSummary),
              createdAt: Number(orgData.createdAt || 0),
            };
          });
          setOrganizations(mappedOrgs);
        }
      }
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'bot' as const,
        content: `Sorry, something went wrong: ${(error as Error).message}`,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim()) {
      generateResponse(input);
      setInput('');
    }
  };

  const formatLamports = (lamports: number) => lamports.toFixed(2) + ' SOL';

  const handleViewDetails = (orgName: string) => {
    generateResponse(`Show details for organization ${orgName}`);
  };

  const handleTogglePanel = () => setIsPayrollOpen(!isPayrollOpen);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#030712] via-[#0A1628] to-[#030712] pt-16 sm:pt-20">
      <Header />

      {!publicKey && (
        <div className="fixed top-16 sm:top-20 right-2 sm:right-4 z-40 p-3 sm:p-4 bg-slate-800 text-white rounded-lg text-xs sm:text-sm max-w-[90vw] sm:max-w-none">
          <p>Connect your wallet to enable transactions.</p>
        </div>
      )}

      <main className="max-w-[95vw] lg:max-w-[75vw] mx-auto px-3 sm:px-6 pb-6 mt-4 sm:mt-8">
        <div className="max-w-full min-h-[calc(100vh-35rem)] flex flex-col lg:flex-row gap-4 sm:gap-6">
          <ChatPanel
            messages={messages}
            input={input}
            isLoading={isLoading || !apiKeySet}
            isPayrollOpen={isPayrollOpen}
            publicKey={publicKey}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            apiKeySet={apiKeySet}
            userApiKey={userApiKey}
            onApiKeyChange={setUserApiKey}
            onApiKeySubmit={handleApiKeySubmit}
          />

          <OrganizationsPanel
            organizations={organizations}
            selectedOrg={selectedOrg}
            isOpen={isPayrollOpen}
            onToggle={handleTogglePanel}
            onSelectOrg={setSelectedOrg}
            onViewDetails={handleViewDetails}
            formatLamports={formatLamports}
          />

          {!isPayrollOpen && (
            <button
              onClick={handleTogglePanel}
              className="fixed right-4 sm:right-6 bottom-20 sm:bottom-auto sm:top-32 p-3 bg-linear-to-r from-[#1A56DB] to-[#3B82F6] hover:from-[#3B82F6] hover:to-[#1A56DB] text-white rounded-xl shadow-lg transition-all duration-200 z-40"
              aria-label="Open organizations panel"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
