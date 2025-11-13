import { Lead } from '../types';

const LEADS_STORAGE_KEY = 'web3hub_leads';

export const getLeads = (): Lead[] => {
    try {
        const storedLeads = localStorage.getItem(LEADS_STORAGE_KEY);
        return storedLeads ? JSON.parse(storedLeads) : [];
    } catch (error) {
        console.error("Failed to get leads from localStorage", error);
        return [];
    }
};

export const saveLeads = (leads: Lead[]): void => {
    try {
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch (error) {
        console.error("Failed to save leads to localStorage", error);
    }
};

export const addLead = (leadData: Omit<Lead, 'id' | 'capturedAt'>): Lead => {
    const leads = getLeads();
    const newLead: Lead = {
        ...leadData,
        id: Date.now().toString(),
        capturedAt: new Date().toISOString(),
    };
    const updatedLeads = [newLead, ...leads];
    saveLeads(updatedLeads);
    return newLead;
};