import { GoogleGenAI } from "@google/genai";
import { Action, View, Content } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. AI features will not function.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;
const model = 'gemini-2.5-flash';

// --- CHATBOT FUNCTIONALITY ---

interface ParsedResponse {
  text: string;
  actions: Action[];
}

export const sendMessageToAI = async (message: string, learnContent: Content[]): Promise<ParsedResponse> => {
  if (!ai) {
    return {
      text: "I'm sorry, the AI service is currently unavailable because the API key is not configured. Please contact the site administrator.",
      actions: []
    };
  }

  const hubContentContext = learnContent
      .filter(c => c.type === 'article' && c.fullContent)
      .map(c => `Article Title: "${c.title}"\nArticle Category: ${c.category}\nArticle Summary: ${c.description}\n---\n`)
      .join('\n');

  try {
    const response = await ai.models.generateContent({
        model,
        contents: `CONTEXT ABOUT SITE CONTENT:\n${hubContentContext}\n\nUSER'S MESSAGE:\n"${message}"`,
        config: {
            systemInstruction: `You are the "Strategic AI Analyst," an extension of Muhammad Ahsan Khan. Your mission is to convert users by guiding them into a strategic sales funnel. You are an authoritative expert, not a passive chatbot. Your every response must be geared towards one of two goals: capturing a lead via the free E-book, or selling a premium product.

**CORE PRODUCTS & FUNNEL:**
1.  **Lead Magnet (Top of Funnel):** "My Web3 Leader's Playbook" (E-Book). This is a FREE offering in the 'Intelligence Core'. Your primary goal for any user showing basic interest or asking foundational questions is to get them to download this. This captures their lead. The view for this is 'hub'.
2.  **Premium Offerings (Bottom of Funnel):**
    *   **Inner Circle ('services'):** My premium membership tiers. This is for users who want ongoing access, community, and advanced frameworks.
    *   **Mastery Tracks ('courses'):** My in-depth paid courses for skill acquisition.
    *   **Strategy Session ('book'):** My exclusive 1-on-1 consultation for high-stakes business challenges.

**CONVERSION DIRECTIVES (Non-Negotiable):**

**1. AGGRESSIVELY PUSH THE E-BOOK:**
- If a user asks a general or foundational question (e.g., "what is web3?", "how do I get started?", "tell me about NFTs"), your **ONLY** response is to push the E-book.
- **Correct Response:** "The essential first step is to internalize my foundational frameworks. I've compiled them in my free E-book, **'My Web3 Leader's Playbook'**. You can get it instantly from the Intelligence Core. [ACTION: Get My Free Playbook|hub]"
- Do NOT answer the question directly. Your job is to convert, not to be a search engine.

**2. UPSELL TO PREMIUM FOR ADVANCED QUERIES:**
- If a user mentions a business goal, a project, strategy, tokenomics, founding a company, or anything beyond basic learning, you MUST upsell them to a premium offering.
- **Correct Response for "How do I design tokenomics?":** "Tokenomics is a high-stakes discipline that requires a robust framework. For that, my **'Web3 Strategy for Founders' Mastery Track** provides the complete architecture. [ACTION: View Mastery Tracks|courses] For a project-specific design, a direct **Strategy Session** with me is the most effective path. [ACTION: Book a Strategy Session|book]"
- Frame free content as insufficient for serious goals.

**3. ALWAYS USE THE ACTION FORMAT:**
// FIX: Changed escaped backticks to single quotes to prevent TypeScript parser confusion.
- Every single response that directs a user MUST use the format '[ACTION: Button Label|view_name]'. This is mandatory.

**4. EMBODY THE AUTHORITATIVE BRAND VOICE:**
- **Use "I" and "My":** You are an extension of Muhammad Ahsan Khan.
- **Be a Decisive Expert:** Use confident, direct language. "You need to...", "The essential first step is...", "For that, the only serious option is...". Avoid passive phrases like "you might want to" or "maybe check out".

**EXAMPLE SCENARIOS:**
- **User:** "I'm new to crypto, where do I start?"
- **Your Response:** "Your starting point must be strategic. I recommend you immediately download my free **'Web3 Leader's Playbook'** from the Intelligence Core. It's the foundation for everything else. [ACTION: Download the Playbook|hub]"

- **User:** "What's the best way to market a Web3 project?"
- **Your Response:** "Go-to-market in Web3 is fundamentally different. For a comprehensive strategy, my **'Inner Circle' membership** provides the ongoing intelligence and frameworks you need. [ACTION: Join the Inner Circle|services] If you need an immediate, tailored plan, you should book a **Strategy Session** with me. [ACTION: Book a Session|book]"

- **User:** "Can you explain DAOs?"
- **Your Response:** "Understanding DAOs begins with the right mental models. I cover this in my free **'Web3 Leader's Playbook'**. It's the prerequisite for any deeper study. [ACTION: Get the Playbook Now|hub]"

// FIX: Changed escaped backticks to single quotes to prevent TypeScript parser confusion.
**STRICT RULE:** Never invent sections or links. Only use the views: 'home', 'hub', 'courses', 'services', 'book'. Your purpose is to convert, not to browse.`,
        }
    });
    
    const rawText = response.text;

    const parsedResponse: ParsedResponse = {
      text: rawText,
      actions: [],
    };

    const actionRegex = /\[ACTION:\s*(.*?)\s*\|\s*(.*?)\]/g;
    const actions: Action[] = [];
    let match;

    while ((match = actionRegex.exec(rawText)) !== null) {
      const label = match[1].trim();
      const view = match[2].trim() as View;
      if (['home', 'hub', 'services', 'book', 'courses'].includes(view)) {
        actions.push({ label, view });
      }
    }

    parsedResponse.text = rawText.replace(actionRegex, '').trim();
    parsedResponse.actions = actions;

    return parsedResponse;

  } catch (error) {
    console.error("Gemini API error:", error);
    return {
        text: "I'm sorry, I encountered an error while processing your request. Please try again.",
        actions: []
    };
  }
};


// --- AI STRATEGY BRIEF FUNCTIONALITY ---
export const getAIStrategyBrief = async (userInput: string): Promise<string> => {
  if (!ai) throw new Error("AI service is not available.");
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: `User's Challenge/Objective: "${userInput}"`,
      config: {
          systemInstruction: `You are Muhammad Ahsan Khan's Strategic AI Analyst. Your task is to analyze a user's stated challenge and structure it into a concise, professional brief for an Executive Strategy Session with him. Your tone should be sharp, insightful, and professional.

          Your output MUST be in Markdown format.

          The brief must contain the following sections, using my exact heading structure:

          - **Primary Objective:** A clear, one-sentence summary of the user's core goal.
          - **Key Themes I've Identified:** A bulleted list of the main strategic domains present in the user's input (e.g., Market Entry Strategy, Token Economic Design, Community Architecture, Competitive Positioning).
          - **Initial Strategic Questions:** A bulleted list of 3-4 powerful questions I would ask to guide the session. These should be designed to uncover root problems and frame the discussion strategically.
          
          Example Input: "I'm struggling to get traction for my new NFT project. Our minting failed and community engagement is low."

          Example Output:
          **Primary Objective:** To diagnose the root causes of a failed NFT launch and architect a new strategy to build a resilient community and drive a successful relaunch.

          **Key Themes I've Identified:**
          - Go-to-Market & Launch Strategy
          - Community Architecture & Engagement
          - Value Proposition & Post-Mint Utility

          **Initial Strategic Questions:**
          - What was the core, defensible value proposition for your holders, and how was this communicated pre-mint?
          - Beyond the initial sale, what is the long-term roadmap for community engagement and value accrual?
          - How does the project differentiate itself and its brand in a saturated marketplace?
          - What were the key success and failure points of the initial community-building efforts?
          `
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API error in getAIStrategyBrief:", error);
    throw new Error("Could not generate a strategic brief.");
  }
};


// --- LEARNING HUB AI FUNCTIONALITY ---
export const getAIAnswerFromHub = async (question: string, context: Content[]): Promise<string> => {
    if (!ai) throw new Error("AI service is not available.");
    
    const contextString = context
        .filter(c => c.type === 'article' && c.fullContent)
        .map(c => `**Article: ${c.title}**\n${c.fullContent}`)
        .join('\n\n---\n\n');

    try {
        const response = await ai.models.generateContent({
            model,
            contents: `Based *only* on the context from Muhammad Ahsan Khan's articles below, answer the user's question. Your tone should be authoritative and direct. Format your response in clear Markdown. If the answer is not in the context, state that the information isn't available in the current knowledge base and suggest a broader exploration of the Hub.\n\n**CONTEXT:**\n${contextString}\n\n**USER QUESTION:**\n${question}`,
            config: {
                systemInstruction: "You are an AI Analyst answering questions based strictly on the provided articles written by Muhammad Ahsan Khan. Be concise, accurate, and maintain his expert tone.",
            }
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API error in getAIAnswerFromHub:", error);
        return "Sorry, I encountered an error while analyzing the knowledge base. Please try asking in a different way.";
    }
}

export const getAILearningPath = async (goal: string, context: Content[]): Promise<string> => {
    if (!ai) throw new Error("AI service is not available.");
    
    const contextString = context
        .filter(c => c.type === 'article')
        .map(c => `- "${c.title}" (Category: ${c.category})`)
        .join('\n');

    try {
        const response = await ai.models.generateContent({
            model,
            contents: `A user wants to achieve this goal: "${goal}".\n\nBased on my available articles, create a logical, step-by-step learning path for them. List the titles of my articles in the recommended order. For each step, add a brief sentence explaining its strategic importance for their journey.\n\n**My Available Articles:**\n${contextString}`,
            config: {
                systemInstruction: "You are an expert curriculum designer, creating learning paths based on Muhammad Ahsan Khan's articles. Your tone is encouraging yet authoritative. Present the path as a numbered list.",
            }
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API error in getAILearningPath:", error);
        return "Sorry, I encountered an error while creating your learning path. Please try describing your goal differently.";
    }
};

// --- AI MEMBERSHIP ADVISOR ---
export const getMembershipRecommendation = async (goals: string[]): Promise<string> => {
    if (!ai) throw new Error("AI service is not available.");

    const prompt = `A user has selected the following goals: ${goals.join(', ')}. Based on my three membership tiers (Strategist, Architect, Visionary), recommend the best tier for them and explain why in 1-2 powerful sentences. Frame it as my direct, expert recommendation. Format the response with the recommended tier name in bold.

    **My Tiers:**
    - **Strategist:** For professionals who need to master fundamentals and stay current. Access my core intelligence, frameworks, and community.
    - **Architect:** For builders and founders. All Strategist benefits + access to all Mastery Tracks, templates, and live AMAs. This is the implementation toolkit.
    - **Visionary:** For leaders requiring direct access to me. All Architect benefits + monthly 1-on-1 strategy calls and project feedback. This is for shaping markets.
    `;
    
    try {
        const response = await ai.models.generateContent({ model, contents: prompt });
        return response.text;
    } catch (error) {
        console.error("Gemini API error in getMembershipRecommendation:", error);
        return "I was unable to generate a recommendation. Please review the tiers and choose the one that best fits your strategic needs.";
    }
};


// --- AI ROADMAP GENERATOR ---
export const getAIRoadmap = async (goal: string): Promise<string> => {
    if (!ai) throw new Error("AI service is not available.");

    const prompt = `A user has stated their goal: "${goal}". Based on my offerings, provide a single, clear, actionable next step. Your response MUST be a single, powerful sentence that funnels the user to the correct offering.

    **My Offerings & Funnel Logic:**
    1.  **"My Web3 Leader's Playbook" (E-Book, in Intelligence Core):** This is the TOP of the funnel. If the goal is about learning, understanding basics, getting started, or any foundational topic (e.g., "learn about web3", "what are DAOs"), you MUST recommend this.
    2.  **Mastery Tracks (Courses):** If the goal is about acquiring a specific, hard skill (e.g., "build a dApp", "learn Solidity", "understand tokenomics"), recommend exploring my **Mastery Tracks**.
    3.  **Inner Circle (Memberships):** If the goal is about ongoing growth, staying up to date, community access, or advanced strategy, recommend joining my **Inner Circle**.
    4.  **Executive Strategy Session:** If the goal is a high-stakes, complex business objective (e.g., "launch my company's NFT project", "develop a go-to-market strategy", "fundraise for my startup"), you MUST recommend booking an **Executive Strategy Session**.

    **Example Responses (follow this tone and structure precisely):**
    - Goal: "learn about web3" -> "Your first step is non-negotiable: download **My Web3 Leader's Playbook** in the Intelligence Core."
    - Goal: "build a dApp" -> "To acquire that skill, you need to enroll in my **'Solidity for Architects' Mastery Track**."
    - Goal: "launch my company's project" -> "For a high-stakes objective like that, the only effective path is a one-on-one **Executive Strategy Session** with me."
    `;
    
    try {
        const response = await ai.models.generateContent({ model, contents: prompt });
        return response.text;
    } catch (error) {
        console.error("Gemini API error in getAIRoadmap:", error);
        return "Your first step is non-negotiable: download **My Web3 Leader's Playbook** in the Intelligence Core.";
    }
};