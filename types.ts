export type View = 'home' | 'hub' | 'services' | 'book' | 'admin' | 'courses' | 'courseDetail' | 'takingCourse';

export interface Action {
  label: string;
  view: View;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  actions?: Action[];
}

export interface Content {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  type: 'article' | 'demo';
  demoComponent?: 'MintNFTDemo' | 'DaoVotingDemo' | 'TokenSwapDemo';
  fullContent?: string;
}

export interface ServiceTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  isFeatured: boolean;
  gumroadLink: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'Template' | 'E-Book' | 'Checklist' | 'Guide';
  imageUrl: string;
}

export interface CourseModule {
  title: string;
  description: string;
}

export interface Course {
  id:string;
  title: string;
  subtitle: string;
  description: string;
  type: 'free' | 'paid';
  price?: string;
  gumroadLink?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  audience: 'Non-Technical' | 'Technical';
  imageUrl: string;
  modules: CourseModule[];
  nextSteps?: {
    recommendedCourseId?: string;
  }
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  capturedAt: string;
}

export interface LinkedInPost {
    id: number;
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
    shares: number;
}

// --- CMS-Ready Homepage Content Types ---

export interface AboutMeData {
  headline: string;
  bio1: string;
  bio2: string;
  imageUrl: string;
}

export interface EbookPromoData {
    headline: string;
    description: string;
    imageUrl: string;
    cta: string;
}

export interface CoursesPromoData {
    headline: string;
    description: string;
    cta: string;
}

export interface MembershipPromoData {
    headline: string;
    description: string;
    cta: string;
}

export interface LinkedInFeedData {
    headline: string;
    description: string;
    cta: string;
}

// This represents a "Single Type" in a headless CMS for the homepage
export interface HomepageData {
  aboutMe: AboutMeData;
  ebookPromo: EbookPromoData;
  coursesPromo: CoursesPromoData;
  membershipPromo: MembershipPromoData;
  linkedInFeed: LinkedInFeedData;
}

// --- CMS-Ready Terms of Service Content Types ---
export interface TermsSection {
    title: string;
    content: string;
}

export interface TermsOfServiceContent {
    title: string;
    lastUpdated: string;
    introduction: string;
    sections: TermsSection[];
}