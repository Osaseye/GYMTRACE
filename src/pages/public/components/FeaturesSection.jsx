import React from 'react';
import { CreditCard, QrCode, Calendar, BarChart3, Smartphone, Activity } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <QrCode size={32} className="text-primary" />,
      title: "Seamless Access",
      description: "Enter the gym instantly with a secure, dynamic QR code generated right on your phone."
    },
    {
      icon: <BarChart3 size={32} className="text-blue-500" />,
      title: "Real-Time Analytics",
      description: "Check live occupancy levels before you leave home to avoid the crowds."
    },
    {
      icon: <Calendar size={32} className="text-purple-500" />,
      title: "Smart Scheduling",
      description: "Book classes and sessions effortlessly with our integrated calendar system."
    },
    {
      icon: <CreditCard size={32} className="text-orange-500" />,
      title: "Easy Payments",
      description: "Manage your membership and payments securely within the app."
    },
    {
      icon: <Smartphone size={32} className="text-pink-500" />,
      title: "Mobile First",
      description: "Designed for your smartphone, giving you control wherever you are."
    },
    {
      icon: <Activity size={32} className="text-green-600" />,
      title: "Workout Tracking",
      description: "Log your progress and visualize your improvements over time."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">Features</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-background-dark mb-4">
            Everything you need to <span className="text-primary">excel</span>
          </h3>
          <p className="max-w-2xl mx-auto text-xl text-gray-500">
            GYMTRACE provides a comprehensive suite of tools to enhance your gym experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-gray-100">
              <div className="w-14 h-14 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
