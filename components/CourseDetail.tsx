import React from 'react';
import { Course } from '../types';
import { ArrowLeftIcon, BookOpenIcon } from './Icons';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  onStartFreeCourse: (course: Course) => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack, onStartFreeCourse }) => {
  
  const handleEnrollClick = () => {
    if (course.type === 'free') {
      onStartFreeCourse(course);
    } else if (course.gumroadLink) {
      window.open(course.gumroadLink, '_blank');
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-300 hover:text-primary font-semibold transition-colors duration-300"
        >
          <ArrowLeftIcon />
          Back to All Mastery Tracks
        </button>
      </div>

      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-10 order-2 lg:order-1">
                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                    <span className="bg-background px-3 py-1 rounded-full">{course.audience}</span>
                    <span className="bg-background px-3 py-1 rounded-full">{course.difficulty}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-light mb-2">{course.title}</h1>
                <h2 className="text-lg text-gray-300 mb-6">{course.subtitle}</h2>
                <p className="text-gray-400 leading-relaxed mb-8">{course.description}</p>
                
                <button
                    onClick={handleEnrollClick}
                    className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 text-lg"
                >
                    {course.type === 'free' ? 'Start Free Course Now' : `Enroll Now - ${course.price}`}
                </button>
            </div>
            <div className="order-1 lg:order-2">
                 <img src={course.imageUrl} alt={course.title} className="w-full h-64 lg:h-full object-cover" />
            </div>
        </div>

        <div className="bg-background/50 p-8 lg:p-10 border-t border-gray-700">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><BookOpenIcon /> Course Curriculum</h3>
            <div className="space-y-4">
                {course.modules.map((module, index) => (
                    <div key={index} className="bg-card/60 p-4 rounded-lg border-l-4 border-primary/50">
                        <h4 className="font-semibold text-light">{module.title}</h4>
                        <p className="text-sm text-gray-400">{module.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CourseDetail;