import React from 'react';
import { Link, QrCode, Mail, BarChart3, Shield, Zap } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Link className="w-8 h-8 text-blue-600" />,
      title: "Instant URL Shortening",
      description: "Convert long URLs into short, memorable links in seconds with our powerful shortening algorithm."
    },
    {
      icon: <QrCode className="w-8 h-8 text-green-600" />,
      title: "QR Code Generation",
      description: "Automatically generate QR codes for your shortened URLs, perfect for mobile sharing and print materials."
    },
    {
      icon: <Mail className="w-8 h-8 text-purple-600" />,
      title: "Email Integration",
      description: "Send your shortened URLs directly to your email with integrated Resend email service."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
      title: "Click Analytics",
      description: "Track how many times your links are clicked and monitor engagement in real-time."
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Secure & Reliable",
      description: "Built with security in mind, featuring rate limiting, validation, and secure data storage."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Fast Performance",
      description: "Lightning-fast redirects and optimized database queries for the best user experience."
    }
  ];

  return (
    <section id="features" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Powerful Features
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Everything you need to manage your URLs effectively
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center mb-4">
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-900 ml-3">
                {feature.title}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;