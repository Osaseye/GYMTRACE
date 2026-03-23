import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 bg-background-dark text-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
          Ready to reach your fitness goals?
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Join thousands of members who are already enjoying a smarter, more efficient workout environment.
        </p>
        <Link to="/register" className="inline-block px-10 py-4 bg-primary text-white font-bold rounded-full text-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all">
          Get Started Today
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
