import { Content, ServiceTier, View, Resource, Course, HomepageData, LinkedInPost, TermsOfServiceContent } from './types';

// This data would be managed in the CMS, e.g., under a 'Navigation' collection
export const NAV_LINKS: { name: string; view: View }[] = [
  { name: 'Home', view: 'home' },
  { name: 'Intelligence Core', view: 'hub' },
  { name: 'Mastery Tracks', view: 'courses' },
  { name: 'Inner Circle', view: 'services' },
  { name: 'Strategy Session', view: 'book' },
];

// This data would be managed in the CMS, e.g., as a "Homepage" Single Type
export const HOMEPAGE_DATA: HomepageData = {
  aboutMe: {
    headline: "A Visionary at the Frontier of Web3",
    bio1: "I operate at the intersection of technology, strategy, and market dynamics. My career is dedicated to one mission: solving the most complex problems in the decentralized world. As a consultant, advisor, and researcher, I don't just follow the trends—I provide the frameworks that shape them.",
    bio2: "This Hub is my curated collection of insights, strategies, and tools, designed to forge the next generation of Web3 leaders. My approach balances deep technical understanding with actionable business strategy, ensuring you are not just participating in the new economy, but leading it.",
    imageUrl: "https://picsum.photos/seed/mak-portrait-pro/400/600"
  },
  ebookPromo: {
    headline: "Get My Free Web3 Leader's Playbook",
    description: "Stop consuming endless, disconnected content. My free E-book is your first step to strategic mastery. It contains the foundational mental models I use to advise top Web3 ventures, delivered in a concise, actionable format. This is your blueprint for thinking like a leader.",
    imageUrl: "https://picsum.photos/seed/playbook-pro/800/600",
    cta: "Download Playbook & Unlock My Core"
  },
  coursesPromo: {
    headline: "From Core Concepts to Strategic Mastery",
    description: "The free content in my Intelligence Core builds your foundation. My Mastery Tracks are engineered to accelerate your expertise. These are not just courses; they are structured immersions into the strategic and technical frameworks I've developed over years on the front lines of Web3 innovation. This is your most direct path to acquiring deep, applicable skills.",
    cta: "Explore My Mastery Tracks"
  },
  membershipPromo: {
    headline: "Join My Inner Circle of Web3 Leaders",
    description: "Knowledge is the baseline. A strategic network is the endgame. My premium memberships are your induction into an exclusive alliance of Web3 leaders. Gain ongoing access to my proprietary frameworks, high-signal intelligence, and a community of peers I've personally curated to shape the future of the internet.",
    cta: "Explore Inner Circle Tiers"
  },
  linkedInFeed: {
    headline: "Live from the Frontier",
    description: "My real-time analysis on market signals, emerging protocols, and strategic opportunities. This is where I share my unfiltered thoughts as they happen.",
    cta: "Follow My Analysis on LinkedIn"
  }
};

// This data would be managed in the CMS, e.g., under a 'Posts' collection
export const LINKEDIN_POSTS: LinkedInPost[] = [
    {
        id: 1,
        content: `Many are chasing short-term yield in the latest DeFi protocols. The real, defensible alpha is not in yield, but in **governance**.

The ability to steer a protocol's future is the most undervalued asset in Web3. My focus is on accumulating influence in protocols with strong fundamentals and a clear path to value accrual. That's the long game.`,
        timestamp: '2h ago',
        likes: 128,
        comments: 19,
        shares: 24,
    },
    {
        id: 2,
        content: `I've just published a new framework for evaluating Layer 2 scaling solutions. It's not just about TPS (transactions per second).

My model focuses on three core pillars:
1.  **Security Assumptions:** Does it inherit security from the L1, or introduce new trust assumptions?
2.  **Developer Experience:** How easy is it for teams to migrate and build?
3.  **Economic Sustainability:** What is the long-term fee model and value capture for the native token?

Thinking in frameworks like this is how you move from being a speculator to a strategist. The full analysis is in my Intelligence Core.`,
        timestamp: '1d ago',
        likes: 256,
        comments: 42,
        shares: 51,
    },
    {
        id: 3,
        content: `The next wave of high-impact DAOs will look less like companies and more like city-states.

They will manage complex economies, digital infrastructure, and inter-protocol diplomacy. The most critical skill for DAO leaders won't be finance or marketing, but **statesmanship**.

We're in the very early innings of architecting the institutions of the digital age. A profound opportunity for those with the right vision.`,
        timestamp: '3d ago',
        likes: 412,
        comments: 68,
        shares: 99,
    },
];

// This data would be managed in the CMS, e.g., under an 'Articles' collection
export const INITIAL_FREE_CONTENT: Content[] = [
    {
    id: '1',
    title: 'Expert Insights on LinkedIn',
    description: 'My LinkedIn newsletter is a direct channel for my latest analysis on Web3 trends, market signals, and strategic frameworks. Essential reading for leaders.',
    category: 'Market Analysis',
    imageUrl: 'https://picsum.photos/seed/linkedin-expert/600/400',
    type: 'article',
    fullContent: `In the rapidly evolving Web3 landscape, staying ahead requires more than just news—it demands high-signal intelligence and expert analysis. My LinkedIn newsletter is my direct channel for delivering precisely that. I cut through the market noise to provide you with concise, actionable insights into emerging trends, deep-dives into protocol mechanics, and the strategic frameworks I use to advise top-tier projects.

Each dispatch is a piece of my ongoing research, designed not just to inform, but to equip you with the mental models needed to navigate complexity and identify unique opportunities. This isn't a summary of headlines; it's my personal analysis on where the frontier is moving and how you can position yourself to lead.

Following this newsletter means getting my unfiltered perspective on everything from DeFi and NFTs to governance and decentralized infrastructure. It's the easiest way to access my regular insights and join a curated community of builders, investors, and strategists who are architecting the future. Click the link to subscribe and ensure my intelligence briefings land directly in your inbox.`
  },
  {
    id: '2',
    title: 'Blockchain: Architecting Trust in a Decentralized World',
    description: 'A strategic primer on blockchain technology. I dissect how it works not just technically, but as a new foundation for economic and social coordination.',
    category: 'Core Concepts',
    imageUrl: 'https://picsum.photos/seed/blockchain-arch/600/400',
    type: 'article',
    fullContent: `To lead in Web3, you must understand its bedrock: blockchain. This is more than just a technology; it's a new architecture for trust. At its core, a blockchain is an immutable, distributed ledger. Think of it as a digital book of records, shared and synchronized across a network of computers, where each new entry (a 'block') is cryptographically chained to the last. This creates a permanent, tamper-proof history of all transactions.

From a technical standpoint, this is achieved through decentralization and consensus. Instead of a single entity like a bank controlling the ledger, a distributed network validates transactions via a 'consensus mechanism' (e.g., Proof-of-Work or Proof-of-Stake). This makes the system incredibly resilient to censorship and single points of failure.

But the strategic implication is what truly matters. Blockchain technology replaces the need for trusted intermediaries with verifiable, programmatic trust. This fundamental shift enables peer-to-peer value transfer, self-executing 'smart contracts', and user-owned decentralized applications (dApps). For a leader, understanding this isn't about knowing the code; it's about grasping how this new trust architecture unlocks novel business models, redefines ownership, and creates entirely new markets. This is the foundational mental model for all Web3 strategy.`
  },
  {
    id: '3',
    title: 'NFTs: The New Architecture of Digital Assets',
    description: 'My analysis of Non-Fungible Tokens as a primitive for digital ownership. I explore their impact beyond art, into identity, finance, and intellectual property.',
    category: 'Asset Strategy',
    imageUrl: 'https://picsum.photos/seed/nft-arch/600/400',
    type: 'article',
    fullContent: `Non-Fungible Tokens (NFTs) are often misunderstood as mere digital pictures. From my perspective, they are a fundamental new primitive for digital asset architecture. An NFT is a unique token on a blockchain that represents verifiable ownership of an asset. Unlike fungible tokens like Bitcoin (where one is the same as another), each NFT is unique, creating provable digital scarcity and provenance.

Technically, this is enabled by smart contract standards (like ERC-721 on Ethereum) that define an asset's unique properties and ownership history on an immutable ledger. This solves the 'copy-paste' problem of the digital world, allowing for true ownership of digital goods for the first time.

Strategically, the implications are profound. While the first wave was dominated by art and collectibles, I analyze NFTs as the foundation for the next wave of digital interaction. They can represent in-game assets, software licenses, event tickets, academic credentials, and even fractionalized ownership of real-world assets. For visionaries, the question isn't "what is the next hot PFP project?" but rather "how can I leverage NFTs to build new models for intellectual property rights, community membership, and customer relationships?" They are not just a new asset class; they are a new architecture for value.`
  },
  {
    id: '4',
    title: 'DeFi: The Operating System for Open Finance',
    description: 'Explore my framework for understanding Decentralized Finance not as a product, but as a permissionless financial operating system being built in real-time.',
    category: 'Financial Systems',
    imageUrl: 'https://picsum.photos/seed/defi-os/600/400',
    type: 'article',
    fullContent: `Decentralized Finance (DeFi) is not simply an alternative to traditional banking; I view it as a new, open-source operating system for finance. It leverages smart contracts on public blockchains to create a permissionless, interoperable, and transparent financial infrastructure.

Technically, DeFi protocols are "money legos"—composable smart contracts that can be combined to create sophisticated financial products. This includes decentralized exchanges (DEXs) for peer-to-peer asset swaps, lending platforms for collateralized loans, and stablecoins that provide a non-volatile medium of exchange. All of this operates without centralized intermediaries, with rules enforced by code.

Strategically, this represents a paradigm shift from closed, permissioned systems to an open, competitive financial landscape. For businesses, this means new avenues for capital formation, treasury management, and creating novel financial services. For investors, it offers new yield-generation opportunities, albeit with new categories of risk. My analysis focuses on identifying sustainable DeFi models, assessing protocol risk, and understanding how this new financial operating system will integrate with and ultimately challenge traditional finance. Leaders must understand DeFi not as a niche, but as the future fabric of capital markets.`
  },
  {
    id: '5',
    title: 'Smart Contracts: The Automation of Trust',
    description: 'A guide to the self-executing code that powers Web3. We balance the technical function with the strategic imperative of understanding their power and limitations.',
    category: 'Core Concepts',
    imageUrl: 'https://picsum.photos/seed/smartcontract-trust/600/400',
    type: 'article',
    fullContent: `Smart contracts are the engine of Web3, but the name can be misleading. I prefer to define them as 'programmatic automation of trust.' They are programs stored on a blockchain that automatically execute when predetermined conditions are met, enforcing the terms of an agreement without a human intermediary.

Technically, these are written in languages like Solidity and deployed on a blockchain, where their code becomes immutable and their execution transparent. This creates a powerful guarantee: the logic of the contract will run exactly as written, visible to all parties.

Strategically, understanding smart contracts is not about coding; it's about understanding this new form of trust. They enable DeFi protocols to manage billions in assets, NFTs to enforce royalty payments, and DAOs to execute governance votes automatically. For a non-technical leader, the key insights are:
1.  **Trustless Execution:** Reduces counterparty risk and the need for costly intermediaries.
2.  **Immutability:** Once deployed, the rules are locked, which can be both a strength (security) and a weakness (inability to easily patch bugs).
3.  **Transparency:** All contract logic and transaction history is public, allowing for unprecedented auditability.
Mastering Web3 strategy requires a deep appreciation for both the capabilities and the inherent risks of automating trust through smart contracts.`
  },
   {
    id: '6',
    title: 'Self-Custody: The Principle of Digital Sovereignty',
    description: 'True ownership in Web3 begins with self-custody. This is my essential briefing on wallet security, private key management, and the mindset of digital sovereignty.',
    category: 'Security & Operations',
    imageUrl: 'https://picsum.photos/seed/self-custody/600/400',
    type: 'article',
    fullContent: `In Web3, the phrase "not your keys, not your crypto" is a fundamental law. The concept it describes is self-custody, which I consider the bedrock principle of digital sovereignty. It means you, and only you, are in complete control of your digital assets.

Technically, this is managed through a crypto wallet, which holds your 'private keys'. These keys are the cryptographic proof of ownership, often represented by a 12 or 24-word 'seed phrase'. Your wallet (e.g., a hardware wallet like Ledger or a software wallet like MetaMask) uses these keys to authorize transactions on the blockchain.

The strategic imperative for any individual or organization in Web3 is to master self-custody. While third-party custodians offer convenience, they reintroduce the very intermediary risk that Web3 is designed to eliminate. True ownership and participation in decentralized governance require direct control of your assets. My guidance for leaders is unequivocal:
1.  **Prioritize Hardware Wallets:** For any significant value, offline ('cold') storage is non-negotiable.
2.  **Implement Redundant Seed Phrase Security:** Your seed phrase is your single point of failure. It must be stored securely, offline, and in multiple locations. Never store it digitally.
3.  **Cultivate a Security Mindset:** Every transaction must be verified. Be vigilant against phishing attacks.
Self-custody is a responsibility, but it is the necessary price of true digital freedom and ownership.`
  },
  {
    id: 'demo1',
    title: 'Interactive Demo: Mint Your First NFT',
    description: 'Experience the NFT minting process firsthand. This guided simulation lets you upload art, define properties, and mint a token on a test network.',
    category: 'Interactive Demos',
    imageUrl: 'https://picsum.photos/seed/demomint-tech/600/400',
    type: 'demo',
    demoComponent: 'MintNFTDemo',
  },
  {
    id: 'demo2',
    title: 'Interactive Demo: DAO Governance Vote',
    description: 'Learn how decentralized governance works. Use your simulated voting power to influence the outcome of a strategic protocol proposal.',
    category: 'Interactive Demos',
    imageUrl: 'https://picsum.photos/seed/demodao-gov/600/400',
    type: 'demo',
    demoComponent: 'DaoVotingDemo',
  },
   {
    id: 'demo3',
    title: 'Interactive Demo: DeFi Token Swap',
    description: 'Simulate a core DeFi function by swapping between tokens at mock market rates. Understand the mechanics of a decentralized exchange (DEX).',
    category: 'Interactive Demos',
    imageUrl: 'https://picsum.photos/seed/demotoken-swap/600/400',
    type: 'demo',
    demoComponent: 'TokenSwapDemo',
  },
];

// This data would be managed in the CMS, e.g., under a 'Tiers' collection
export const SERVICE_TIERS: ServiceTier[] = [
  {
    name: 'Strategist',
    price: '$49/mo',
    description: 'For professionals committed to mastering the strategic landscape. Get ongoing access to my core intelligence, frameworks, and a community of peers.',
    features: [
      'Weekly High-Signal Briefings',
      'Full Access to My Intelligence Core',
      'Exclusive Community Access',
      'My Curated Resource Library',
      'Early Access to New Research',
    ],
    isFeatured: false,
    gumroadLink: 'https://gumroad.com',
  },
  {
    name: 'Architect',
    price: '$99/mo',
    description: 'For the builders and founders on the front lines. Get the complete toolkit to build, launch, and scale with conviction.',
    features: [
      'All Strategist benefits',
      'Access to All Mastery Tracks',
      'Downloadable Frameworks & Templates',
      'Monthly Live "Ask Me Anything" Session',
      'Priority Support',
    ],
    isFeatured: true,
    gumroadLink: 'https://gumroad.com',
  },
  {
    name: 'Visionary',
    price: '$249/mo',
    description: 'A strategic alliance for the architects of tomorrow. This is for leaders who require direct, priority access to me to shape markets.',
    features: [
      'All Architect benefits',
      'One 30-min 1:1 Strategy Call/Month',
      'Personalized Feedback on Your Projects',
      'Direct Line for Urgent Questions',
      'Exclusive Partner Offers',
    ],
    isFeatured: false,
    gumroadLink: 'https://gumroad.com',
  },
];

// This data would be managed in the CMS, e.g., under a 'Resources' collection
export const INITIAL_RESOURCES_CONTENT: Resource[] = [
  {
    id: 'ebook01',
    title: "My Web3 Leader's Playbook",
    description: "My foundational guide to Web3, designed for leaders. This isn't just theory; it’s a distillation of the essential mental models and strategic frameworks I use to advise category-defining companies. Get this to build your strategic foundation.",
    type: 'E-Book',
    imageUrl: 'https://picsum.photos/seed/playbook-pro/800/600',
  },
  {
    id: 'res1',
    title: 'My Definitive NFT Launch Framework',
    description: 'My proprietary framework to guide you through every stage of launching a successful NFT project, from market positioning to post-mint utility.',
    type: 'Checklist',
    imageUrl: 'https://picsum.photos/seed/nftlaunch-pro/600/400',
  },
  {
    id: 'res3',
    title: 'My High-Impact DAO Proposal Template',
    description: 'My battle-tested template for structuring effective governance proposals designed to achieve consensus and drive decisive action in a DAO.',
    type: 'Template',
    imageUrl: 'https://picsum.photos/seed/daogov-pro/600/400',
  },
  {
    id: 'res4',
    title: 'My Smart Contract Security Overview for Leaders',
    description: 'An essential guide covering the critical security considerations for non-technical leaders to mitigate risk and build resilient protocols.',
    type: 'Guide',
    imageUrl: 'https://picsum.photos/seed/scsecurity-pro/600/400',
  },
  {
    id: 'res5',
    title: 'My Web3 Go-to-Market Canvas',
    description: 'My strategic framework to help you design, validate, and execute a winning go-to-market strategy for any Web3 venture.',
    type: 'Template',
    imageUrl: 'https://picsum.photos/seed/web3marketing-pro/600/400',
  },
  {
    id: 'res2',
    title: 'My DeFi Yield Strategy Primer',
    description: 'A concise guide to understanding the fundamental strategies of DeFi yield generation, complete with my personal risk management frameworks.',
    type: 'Guide',
    imageUrl: 'https://picsum.photos/seed/yieldfarm-pro/600/400',
  },
];

// This data would be managed in the CMS, e.g., under a 'Courses' collection
export const COURSES_DATA: Course[] = [
    {
    id: 'course-paid-02',
    title: 'Web3 Strategy for Founders & Enterprises',
    subtitle: 'My Playbook for Architecting Market Leadership',
    description: 'This is my definitive masterclass for founders, executives, and investors. I will teach you how to architect defensible business models, design powerful token ecosystems, and navigate the complex Web3 landscape. This is my playbook for building a category-defining venture.',
    type: 'paid',
    price: '$999',
    gumroadLink: 'https://gumroad.com',
    difficulty: 'Advanced',
    audience: 'Non-Technical',
    imageUrl: 'https://picsum.photos/seed/web3strategy-course/800/450',
    modules: [
      { title: 'Module 1: The Web3 Business Frontier', description: 'My framework for analyzing market trends and identifying high-value opportunities.' },
      { title: 'Module 2: The Art of Tokenomics', description: 'Learn my methodology for designing token models that drive network effects and capture value.' },
      { title: 'Module 3: Community-Led Go-to-Market', description: 'Master my system for building and mobilizing a passionate, resilient community.' },
      { title: 'Module 4: Architecting Decentralized Governance', description: 'My approach to structuring your project for long-term success and resilience.' },
      { title: 'Module 5: Navigating the Regulatory Maze', description: 'Understand my strategic approach to the key legal considerations in Web3.' },
    ],
  },
  {
    id: 'course-paid-01',
    title: 'Solidity for Architects',
    subtitle: 'The Smart Contract Bootcamp for High-Impact Builders',
    description: "This is not just another coding course. It's a project-based bootcamp where I teach you my approach to secure, efficient, and scalable smart contract development. We cover everything from EVM fundamentals to advanced security patterns. This is my path to becoming a top 1% Web3 builder.",
    type: 'paid',
    price: '$699',
    gumroadLink: 'https://gumroad.com',
    difficulty: 'Intermediate',
    audience: 'Technical',
    imageUrl: 'https://picsum.photos/seed/solidity-architect/800/450',
    modules: [
      { title: 'Module 1: Thinking on-chain: EVM Fundamentals', description: 'A deep dive into the core concepts of the Ethereum Virtual Machine from a builder\'s perspective.' },
      { title: 'Module 2: Solidity Mastery: From Basics to Patterns', description: 'Master the syntax, data types, and advanced design patterns I use in production.' },
      { title: 'Module 3: Security-First Development', description: 'My framework for identifying and preventing critical vulnerabilities like reentrancy and oracle manipulation.' },
      { title: 'Module 4: The Professional Dev Environment', description: 'Learn my preferred stack for testing and deploying robust contracts with Hardhat.' },
      { title: 'Module 5: Architecting a Full-Stack dApp', description: 'Integrate your smart contracts with a modern frontend using my best practices.' },
    ],
  },
  {
    id: 'course-free-01',
    title: 'Blockchain Fundamentals',
    subtitle: 'Your First Step to Web3 Strategic Thinking',
    description: 'This free course provides my foundational mental models for Web3. In just four lessons, you will gain a rock-solid understanding of what blockchain is and its strategic importance. Complete it to claim your blockchain-verified certificate of completion.',
    type: 'free',
    difficulty: 'Beginner',
    audience: 'Non-Technical',
    imageUrl: 'https://picsum.photos/seed/freecourse-blockchain/800/450',
    modules: [
      { title: 'Lesson 1: What is a Blockchain?', description: 'Understand the core concept of a distributed, immutable ledger.' },
      { title: 'Lesson 2: The Power of Decentralization', description: 'Learn the strategic difference between centralized, decentralized, and distributed systems.' },
      { title: 'Lesson 3: The Anatomy of a Transaction', description: 'Follow the lifecycle of a transaction from creation to confirmation.' },
      { title: 'Lesson 4: Introduction to Smart Contracts', description: 'Discover how self-executing code is automating trust and creating new markets.' },
    ],
    nextSteps: {
      recommendedCourseId: 'course-paid-02'
    }
  },
  {
    id: 'course-free-02',
    title: 'NFTs & Digital Ownership',
    subtitle: 'Understanding the New Asset Class',
    description: 'My introductory briefing on Non-Fungible Tokens. This course explains what NFTs are, their primary use cases, and my key frameworks for evaluating an NFT project. Claim your certificate upon completion and begin your journey into the future of ownership.',
    type: 'free',
    difficulty: 'Beginner',
    audience: 'Non-Technical',
    imageUrl: 'https://picsum.photos/seed/freecourse-nft/800/450',
    modules: [
      { title: 'Lesson 1: What "Non-Fungible" Really Means', description: 'Grasp the core concept of unique, verifiable digital assets.' },
      { title: 'Lesson 2: The Minting Process Explained', description: 'Learn how a digital file becomes a secure asset on the blockchain.' },
      { title: 'Lesson 3: Navigating the NFT Ecosystem', description: 'An overview of the key marketplaces, wallets, and tools I recommend.' },
      { title: 'Lesson 4: The Future of NFTs', description: 'Explore my analysis of use cases beyond art, in gaming, ticketing, and identity.' },
    ],
    nextSteps: {
      recommendedCourseId: 'course-paid-02'
    }
  },
  {
    id: 'course-free-03',
    title: 'DeFi & Open Finance',
    subtitle: 'An Introduction to the New Financial System',
    description: 'In this course, I explain how DeFi is rebuilding the global financial system from the ground up. We will cover lending, DEXs, and yield generation in a clear, strategic way. Complete the course to claim your certificate.',
    type: 'free',
    difficulty: 'Beginner',
    audience: 'Non-Technical',
    imageUrl: 'https://picsum.photos/seed/freecourse-defi/800/450',
    modules: [
      { title: 'Lesson 1: The Vision of DeFi', description: 'Understand the core principles of an open, permissionless financial system.' },
      { title: 'Lesson 2: Core Primitives: Lending & Borrowing', description: 'Learn how you can put your crypto to work or use it as collateral.' },
      { title: 'Lesson 3: Decentralized Exchanges (DEXs)', description: 'Discover the mechanics of peer-to-peer token swaps and liquidity pools.' },
      { title: 'Lesson 4: A Framework for DeFi Risk', description: 'Learn about smart contract risk, impermanent loss, and other key considerations.' },
    ],
    nextSteps: {
      recommendedCourseId: 'course-paid-01'
    }
  },
];

// This data would be managed in the CMS, e.g., as a "Terms of Service" Single Type
export const TERMS_OF_SERVICE_DATA: TermsOfServiceContent = {
  title: "Terms of Service",
  lastUpdated: "October 26, 2023",
  introduction: "Welcome to the Web3 Strategy Hub. These terms and conditions outline the rules and regulations for the use of this website and its services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use this platform if you do not agree to all of the terms and conditions stated on this page.",
  sections: [
    {
      title: "1. Intellectual Property Rights",
      content: "Other than the content you own, under these Terms, Muhammad Ahsan Khan and/or his licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website."
    },
    {
      title: "2. Restrictions",
      content: "You are specifically restricted from all of the following: publishing any Website material in any other media; selling, sublicensing and/or otherwise commercializing any Website material; publicly performing and/or showing any Website material; using this Website in any way that is or may be damaging to this Website; using this Website in any way that impacts user access to this Website; using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity."
    },
    {
      title: "3. Memberships and Paid Content",
      content: "Access to certain areas of this Website is restricted. Memberships and courses are sold via a third-party platform (Gumroad) and are subject to their own terms and conditions. All payments are final and non-refundable. We reserve the right to revoke access to any paid content or membership for any user who violates these terms."
    },
    {
      title: "4. No warranties",
      content: "This Website is provided “as is,” with all faults, and Muhammad Ahsan Khan expresses no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you."
    },
    {
      title: "5. Limitation of liability",
      content: "In no event shall Muhammad Ahsan Khan, nor any of his officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Muhammad Ahsan Khan, including his officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website."
    }
  ]
};