import { createAgent } from 'langchain';
import { SqliteSaver } from '@langchain/langgraph-checkpoint-sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import { SYSTEM_PROMPT } from '../constants/systemPrompt.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const checkpointDbPath = path.join(__dirname, '../../data/agent-checkpoints.db');

let agent;
let agentInitPromise;

async function getAgent() {
  if (agent) return agent;

  if (!agentInitPromise) {
    agentInitPromise = (async () => {
      const checkpointer = SqliteSaver.fromConnString(checkpointDbPath);
      await checkpointer.setup();

      agent = createAgent({
        model: 'openai:gpt-5-nano',
        tools: [],
        systemPrompt: SYSTEM_PROMPT,
        checkpointer,
      });

      return agent;
    })();
  }

  return agentInitPromise;
}

export async function generateReply(message, sessionId) {
  const agent = await getAgent();

  const result = await agent.invoke(
    { messages: [{ role: 'user', content: message }] },
    { configurable: { thread_id: sessionId } }
  );

  const lastMessage = result.messages.at(-1);
  return typeof lastMessage.content === 'string'
    ? lastMessage.content
    : String(lastMessage.content);
}
