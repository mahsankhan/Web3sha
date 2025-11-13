import React, { useState, useMemo } from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onSelect: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect }) => (
  <div 
    className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2 flex flex-col cursor-pointer group"
    onClick={onSelect}
  >
    <div className="relative">
      <img src={course.imageUrl} alt={course.title} className="w-full h-56 object-cover" />
      <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold text-white rounded-full ${course.type === 'free' ? 'bg-green-500' : 'bg-primary'}`}>
        {course.type === 'free' ? 'Free Track' : course.price}
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
        <span>{course.audience}</span>
        <span>{course.difficulty}</span>
      </div>
      <h3 className="text-xl font-bold mb-2 text-light group-hover:text-primary transition-colors">{course.title}</h3>
      <p className="text-gray-400 text-sm flex-grow mb-4">{course.subtitle}</p>
      <button className="mt-auto w-full bg-background hover:bg-primary/20 text-primary font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
        View Mastery Track
      </button>
    </div>
  </div>
);

interface CoursesSectionProps {
  courses: Course[];
  onCourseSelect: (course: Course) => void;
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ courses, onCourseSelect }) => {
  const [filter, setFilter] = useState<'all' | 'free' | 'paid'>('all');

  const filteredCourses = useMemo(() => {
    if (filter === 'all') return courses;
    return courses.filter(course => course.type === filter);
  }, [courses, filter]);
  
  const FilterButton: React.FC<{type: 'all' | 'free' | 'paid', label: string}> = ({ type, label }) => (
    <button
      onClick={() => setFilter(type)}
      className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
        filter === type
          ? 'bg-primary text-white'
          : 'bg-card hover:bg-card/70 text-gray-300'
      }`}
    >
      {label}
    </button>
  );

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">My Web3 Mastery Tracks</h2>
        <p className="max-w-3xl mx-auto text-gray-400">
          Beyond mere information, these are the structured learning paths I have personally engineered to provide the most direct route to Web3 mastery. Choose your track and begin the journey from participant to leader.
        </p>
      </div>
      
      <div className="flex justify-center flex-wrap gap-3 mb-12">
        <FilterButton type="all" label="All Tracks" />
        <FilterButton type="free" label="Free" />
        <FilterButton type="paid" label="Paid" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} onSelect={() => onCourseSelect(course)} />
        ))}
      </div>
    </section>
  );
};

export default CoursesSection;