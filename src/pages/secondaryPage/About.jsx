import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="py-16 text-center bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-blue-600">CodePlay</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            We're revolutionizing online education with innovative courses and a vibrant learning community.
          </p>
        </div>
      </section>

      {/* Founding Story */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" 
                alt="Team working" 
                className="rounded-lg shadow-md w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020 by educators and technologists, CodePlay began with a simple mission: make quality education accessible to everyone.
              </p>
              <p className="text-gray-600">
                We saw the limitations of traditional education and built a platform that breaks down barriers to learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-blue-600">Our Mission</h3>
              <p className="text-gray-600">
                Empower learners worldwide through affordable, high-quality tech education.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-blue-600">Our Vision</h3>
              <p className="text-gray-600">
                A world where anyone can learn the skills they need to thrive in the digital economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8">By The Numbers</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm">Students</div>
            </div>
            <div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm">Courses</div>
            </div>
            <div>
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Ready to start your learning journey? Explore our courses today.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Browse Courses
          </button>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-6 bg-gray-800 text-white text-center">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} CodePlay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;