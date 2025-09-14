const fetch = require('node-fetch');

// Enhanced LLM adapter that uses OpenAI's Chat Completions API when OPENAI_API_KEY is set.
// Returns { reply } or null if not configured or on failure.
async function queryLLM(message, opts = {}) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;

  try {
    // Enhanced system prompt with marketplace context
    const systemPrompt = opts.system || `You are Ena, the AI assistant for EnergyHub Marketplace - a B2B/B2C platform for energy products and services.

PLATFORM CONTEXT:
- EnergyHub connects buyers and sellers of energy equipment (solar panels, batteries, inverters, etc.)
- Users can be B2B sellers (managing inventory, orders, analytics) or B2C buyers (browsing, purchasing)
- Key features: Product catalog, inventory management, order tracking, promo codes, bulk orders

YOUR ROLE:
- Help users navigate the platform
- Provide product recommendations and energy solutions
- Assist with order management and tracking
- Guide sellers on listing products and managing inventory
- Answer questions about energy products and sustainability
- Be concise but helpful (2-3 sentences max)

TONE: Professional, knowledgeable about energy products, helpful, concise`;

    // Build conversation messages with context
    const messages = [
      { role: 'system', content: systemPrompt }
    ];

    // Add conversation history if provided
    if (opts.conversationHistory && Array.isArray(opts.conversationHistory)) {
      messages.push(...opts.conversationHistory);
    }

    // Add current user message
    messages.push({ role: 'user', content: message });

    const payload = {
      model: opts.model || 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: opts.maxTokens || 300,
      temperature: opts.temperature == null ? 0.3 : opts.temperature
    };

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('LLM query failed:', res.status, text);
      return null;
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content;
    
    // Return enhanced response with metadata
    return { 
      reply: reply?.trim(),
      usage: data?.usage,
      model: data?.model || payload.model
    };
  } catch (err) {
    console.error('LLM query error:', err.message || err);
    return null;
  }
}

// Enhanced fallback responses based on user intent
function getFallbackResponse(message, userContext = {}) {
  if (!message) {
    return "Hi! I'm Ena, your EnergyHub assistant. I can help you find energy products, track orders, or guide you through selling. What can I help you with?";
  }

  const lower = message.toLowerCase();
  const { userRole } = userContext;

  // Order-related queries
  if (lower.includes('order') || lower.includes('track') || lower.includes('delivery')) {
    return "I can help you track orders and manage deliveries. Check your Orders page or provide an order number for specific updates.";
  }

  // Product and buying queries
  if (lower.includes('buy') || lower.includes('product') || lower.includes('solar') || lower.includes('battery')) {
    return "Browse our Product Catalog to find energy equipment from verified sellers. I can help you compare products and find the best deals.";
  }

  // Selling and inventory queries
  if (lower.includes('sell') || lower.includes('list') || lower.includes('inventory') || lower.includes('upload')) {
    if (userRole === 'seller' || userRole === 'b2b') {
      return "Go to Inventory Management to add products, update pricing, or bulk upload. I can guide you through optimizing your listings.";
    } else {
      return "Interested in selling? Visit our Become a Seller page to join EnergyHub's marketplace and reach thousands of buyers.";
    }
  }

  // Promo codes
  if (lower.includes('promo') || lower.includes('discount') || lower.includes('coupon')) {
    return "Check for available promo codes during checkout, or visit seller dashboards to create promotional offers for your products.";
  }

  // General energy topics
  if (lower.includes('energy') || lower.includes('sustainable') || lower.includes('renewable')) {
    return "EnergyHub specializes in renewable energy solutions. I can help you find solar panels, batteries, inverters, and other clean energy equipment.";
  }

  // Default response
  return "I'm here to help with EnergyHub marketplace questions. You can ask about products, orders, selling, or energy solutions. What specific information do you need?";
}

module.exports = { queryLLM, getFallbackResponse };
