import axios from 'axios';
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

const STRAPI_URL = process.env.STRAPI_API_URL || 'http://localhost:1337';

const api = axios.create({
  baseURL: STRAPI_URL,
});

// Helper to extract the 'attributes' from Strapi's response format
const unwrapStrapi = (response: any) => {
    if (!response.data) return response;
    
    if (Array.isArray(response.data)) {
        return response.data.map((item: any) => ({ id: item.id, ...item.attributes }));
    }
    
    if (response.data.id && response.data.attributes) {
        return { id: response.data.id, ...response.data.attributes };
    }

    return response.data;
};

export const fetchLearnContent = async (): Promise<Content[]> => {
  console.log("API (Strapi): Fetching 'learnContent'...");
  const response = await api.get('/api/learn-contents');
  return unwrapStrapi(response.data);
};

export const fetchResourcesContent = async (): Promise<Resource[]> => {
  console.log("API (Strapi): Fetching 'resourcesContent'...");
  const response = await api.get('/api/resources');
  return unwrapStrapi(response.data);
};

export const fetchCourses = async (): Promise<Course[]> => {
  console.log("API (Strapi): Fetching 'courses'...");
  const response = await api.get('/api/courses?populate=modules');
  return unwrapStrapi(response.data);
};

export const fetchServiceTiers = async (): Promise<ServiceTier[]> => {
  console.log("API (Strapi): Fetching 'serviceTiers'...");
  const response = await api.get('/api/service-tiers');
  return unwrapStrapi(response.data);
};

export const fetchLinkedInPosts = async (): Promise<LinkedInPost[]> => {
  console.log("API (Strapi): Fetching 'linkedInPosts'...");
  const response = await api.get('/api/linked-in-posts');
  return unwrapStrapi(response.data);
};

export const fetchHomepageData = async (): Promise<HomepageData> => {
  console.log("API (Strapi): Fetching 'homepageData'...");
  const response = await api.get('/api/homepage?populate=deep'); // 'populate=deep' gets all component data
  return unwrapStrapi(response.data);
};

export const fetchTermsOfService = async (): Promise<TermsOfServiceContent> => {
    console.log("API (Strapi): Fetching 'termsOfService'...");
    const response = await api.get('/api/terms-of-service?populate=deep');
    return unwrapStrapi(response.data);
}

// --- Lead submission ---

export const fetchLeads = async (): Promise<Lead[]> => {
  console.log("API (Strapi): Fetching leads...");
  const response = await api.get('/api/leads');
  return unwrapStrapi(response.data);
};

export const submitLead = async (leadData: Omit<Lead, 'id' | 'capturedAt'>): Promise<Lead> => {
  console.log("API (Strapi): Submitting lead...", leadData);
  // Strapi expects data to be wrapped in a 'data' object
  const response = await api.post('/api/leads', { data: leadData });
  return unwrapStrapi(response.data);
};
