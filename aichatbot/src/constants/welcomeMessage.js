export const WELCOME_MESSAGE =
  "Hello! 👋 I'm the Spur AI support assistant. I can help answer questions about:\n\n" +
  '📦 Shipping & Delivery\n' +
  '🔄 Returns & Refunds\n' +
  '💳 Cash on Delivery (COD)\n' +
  '📧 Contact & Support';

export function createWelcomeMessage() {
  return { text: WELCOME_MESSAGE, sender: 'bot', id: 'welcome' };
}
