
import {
  Content,
  Resource,
  Course,
  Lead,
  ServiceTier,
  HomepageData,
  LinkedInPost,
  TermsOfServiceContent,
} from '../types';
import {
  INITIAL_FREE_CONTENT,
  INITIAL_RESOURCES_CONTENT,
  COURSES_DATA,
  SERVICE_TIERS,
  LINKEDIN_POSTS,
  HOMEPAGE_DATA,
  TERMS_OF_SERVICE_DATA,
} from '../constants';

// MOCK API DELAY to simulate network latency
const MOCK_DELAY = 300;
const mockApiCall = <T>(data: T): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(data), MOCK_DELAY));


export const fetchLearnContent = async (): Promise<Content[]> => {
  console.log("API (Mock): Fetching 'learnContent'...");
  return mockApiCall(INITIAL_FREE_CONTENT);
};

export const fetchResourcesContent = async (): Promise<Resource[]> => {
  console.log("API (Mock): Fetching 'resourcesContent'...");
  return mockApiCall(INITIAL_RESOURCES_CONTENT);
};

export const fetchCourses = async (): Promise<Course[]> => {
  console.log("API (Mock): Fetching 'courses'...");
  return mockApiCall(COURSES_DATA);
};

export const fetchServiceTiers = async (): Promise<ServiceTier[]> => {
  console.log("API (Mock): Fetching 'serviceTiers'...");
  return mockApiCall(SERVICE_TIERS);
};

export const fetchLinkedInPosts = async (): Promise<LinkedInPost[]> => {
  console.log("API (Mock): Fetching 'linkedInPosts'...");
  return mockApiCall(LINKEDIN_POSTS);
};

export const fetchHomepageData = async (): Promise<HomepageData> => {
  console.log("API (Mock): Fetching 'homepageData'...");
  return mockApiCall(HOMEPAGE_DATA);
};

export const fetchTermsOfService = async (): Promise<TermsOfServiceContent> => {
    console.log("API (Mock): Fetching 'termsOfService'...");
    return mockApiCall(TERMS_OF_SERVICE_DATA);
}

// --- Lead submission using localStorage to mock a backend ---

const LEADS_STORAGE_KEY = 'web3hub_leads';

const getLeadsFromStorage = (): Lead[] => {
    try {
        const storedLeads = localStorage.getItem(LEADS_STORAGE_KEY);
        return storedLeads ? JSON.parse(storedLeads) : [];
    } catch (error) {
        console.error("Failed to get leads from localStorage", error);
        return [];
    }
};

const saveLeadsToStorage = (leads: Lead[]): void => {
    try {
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch (error) {
        console.error("Failed to save leads to localStorage", error);
    }
};


export const fetchLeads = async (): Promise<Lead[]> => {
  console.log("API (Mock): Fetching leads from localStorage...");
  return mockApiCall(getLeadsFromStorage());
};

export const submitLead = async (leadData: Omit<Lead, 'id' | 'capturedAt'>): Promise<Lead> => {
  console.log("API (Mock): Submitting lead to localStorage...", leadData);
  const leads = getLeadsFromStorage();
  const newLead: Lead = {
      ...leadData,
      id: Date.now().toString(),
      capturedAt: new Date().toISOString(),
  };
  const updatedLeads = [newLead, ...leads];
  saveLeadsToStorage(updatedLeads);
  return mockApiCall(newLead);
};
