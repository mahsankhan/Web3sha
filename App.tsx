import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import BookingSection from './components/BookingSection';
import Chatbot from './components/Chatbot';
import AdminDashboard from './components/AdminDashboard';
import { View, Content, Resource, Course, Lead, ServiceTier, HomepageData, LinkedInPost, TermsOfServiceContent } from './types';
import * as apiService from './services/apiService';
import MembershipPromo from './components/MembershipPromo';
import AboutMe from './components/AboutMe';
import LearningHubSection from './components/LearningHubSection';
import CoursesSection from './components/CoursesSection';
import CourseDetail from './components/CourseDetail';
import FreeCourseExperience from './components/FreeCourseExperience';
import CoursesPromo from './components/CoursesPromo';
import ScrollToTopButton from './components/ScrollToTopButton';
import HomePageSkeleton from './components/skeletons/HomePageSkeleton';
import LinkedInFeed from './components/LinkedInFeed';
import EbookPromo from './components/EbookPromo';
import TermsOfServiceModal from './components/TermsOfServiceModal';


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isLoading, setIsLoading] = useState(true);

  // Data states, populated from the API service for CMS readiness
  const [learnContent, setLearnContent] = useState<Content[]>([]);
  const [resourcesContent, setResourcesContent] = useState<Resource[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [serviceTiers, setServiceTiers] = useState<ServiceTier[]>([]);
  const [linkedinPosts, setLinkedinPosts] = useState<LinkedInPost[]>([]);
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [termsContent, setTermsContent] = useState<TermsOfServiceContent | null>(null);
  
  // UI State
  const [isTermsVisible, setIsTermsVisible] = useState(false);
  
  // Session-based access after submitting lead
  const [sessionUnlocked, setSessionUnlocked] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeFreeCourse, setActiveFreeCourse] = useState<Course | null>(null);

  // Fetch all data on initial app load from the centralized apiService
  useEffect(() => {
    const loadAppData = async () => {
      try {
        setIsLoading(true);
        const [
            learn, 
            resources, 
            coursesData, 
            leadsData,
            tiers,
            posts,
            homeData,
            termsData
        ] = await Promise.all([
          apiService.fetchLearnContent(),
          apiService.fetchResourcesContent(),
          apiService.fetchCourses(),
          apiService.fetchLeads(),
          apiService.fetchServiceTiers(),
          apiService.fetchLinkedInPosts(),
          apiService.fetchHomepageData(),
          apiService.fetchTermsOfService(),
        ]);
        setLearnContent(learn);
        setResourcesContent(resources);
        setCourses(coursesData);
        setLeads(leadsData);
        setServiceTiers(tiers);
        setLinkedinPosts(posts);
        setHomepageData(homeData);
        setTermsContent(termsData);

      } catch (error) {
        console.error("Failed to load application data from API", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAppData();
  }, []);


  const handleUnlock = async (leadData: Omit<Lead, 'id' | 'capturedAt'>) => {
    try {
      const newLead = await apiService.submitLead(leadData);
      setLeads(prev => [newLead, ...prev]);
      setSessionUnlocked(true); // Unlock content for the current session
    } catch (error) {
      console.error("Failed to submit lead", error);
    }
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('courseDetail');
  };
  
  const handleStartFreeCourse = (course: Course) => {
    setActiveFreeCourse(course);
    setCurrentView('takingCourse');
  };
  
  const handleExitCourse = () => {
    setSelectedCourse(null);
    setActiveFreeCourse(null);
    setCurrentView('courses');
  };


  const renderContent = () => {
    if (isLoading || !homepageData) {
      return <HomePageSkeleton />;
    }

    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero setView={setCurrentView} />
            <AboutMe data={homepageData.aboutMe} />
            <EbookPromo setView={setCurrentView} data={homepageData.ebookPromo} />
            <MembershipPromo setView={setCurrentView} data={homepageData.membershipPromo} tiers={serviceTiers} />
            <CoursesPromo setView={setCurrentView} data={homepageData.coursesPromo} />
            <LinkedInFeed data={homepageData.linkedInFeed} posts={linkedinPosts} />
          </>
        );
      case 'hub':
        return <LearningHubSection 
                  learnContent={learnContent}
                  resourcesContent={resourcesContent}
                  isUnlocked={sessionUnlocked}
                  onUnlock={handleUnlock}
                />;
      case 'courses':
         return <CoursesSection courses={courses} onCourseSelect={handleSelectCourse} />;
      case 'courseDetail':
        return selectedCourse && <CourseDetail course={selectedCourse} onBack={() => setCurrentView('courses')} onStartFreeCourse={handleStartFreeCourse} />;
      case 'takingCourse':
        return activeFreeCourse && <FreeCourseExperience course={activeFreeCourse} onExit={handleExitCourse} setView={setCurrentView} courses={courses} />;
      case 'services':
        return <ServicesSection tiers={serviceTiers} />;
      case 'book':
        return <BookingSection />;
      case 'admin':
        return <AdminDashboard leads={leads} />;
      default:
        return <Hero setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-light font-sans flex flex-col">
      <Header currentView={currentView} setView={setCurrentView} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        {renderContent()}
      </main>
      <Footer onShowTerms={() => setIsTermsVisible(true)} />
      <Chatbot setView={setCurrentView} learnContent={learnContent} />
      <ScrollToTopButton />
      {isTermsVisible && termsContent && (
        <TermsOfServiceModal 
          content={termsContent} 
          onClose={() => setIsTermsVisible(false)} 
        />
      )}
    </div>
  );
};

export default App;