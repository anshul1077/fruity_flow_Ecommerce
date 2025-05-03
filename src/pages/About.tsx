// src/pages/About.tsx

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white text-gray-800">

      {/* Hero Section */}
      <Section
        title="Welcome to FreshBasket"
        subtitle="Bringing Nature's Best to Your Doorstep"
        description="At FreshBasket, we connect you directly with farmers to deliver the freshest fruits and vegetables every day. Our passion is quality, sustainability, and community."
        emoji="🍏"
        bg="bg-green-100"
      />

      {/* Our Story */}
      <Section
        title="Our Story"
        subtitle="From Local Farms to You"
        description="Founded with a vision to make healthy eating accessible, we work with local farmers to ensure every product is handpicked, fresh, and responsibly sourced."
        emoji="🌾"
        bg="bg-white"
        reverse
      />

      {/* Our Mission */}
      <Section
        title="Our Mission"
        subtitle="Healthier Lives, Happier Planet"
        description="We aim to reduce food miles, support eco-friendly farming, and minimize packaging waste while giving you nutrient-rich produce daily."
        emoji="🌍"
        bg="bg-green-100"
      />

      {/* Why Choose Us */}
      <FeaturesSection />

      {/* Contact Info */}
      <Section
        title="Get in Touch"
        subtitle="We'd love to hear from you!"
        description="Whether you have questions, suggestions, or feedback, we're just a message away. Your satisfaction is our top priority!"
        emoji="💬"
        bg="bg-white"
        reverse
      />
    </div>
  );
}

interface SectionProps {
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  bg: string;
  reverse?: boolean;
}

function Section({ title, subtitle, description, emoji, bg, reverse = false }: SectionProps) {
  return (
    <section className={`${bg} py-20`}>
      <div className={`container mx-auto px-6 flex flex-col md:flex-row items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
        <motion.div
          initial={{ opacity: 0, x: reverse ? 100 : -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 mb-8 md:mb-0"
        >
          <div className="text-7xl md:text-8xl text-green-600 mb-4">{emoji}</div>
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-2">{title}</h2>
          <h3 className="text-xl md:text-2xl text-green-500 mb-4">{subtitle}</h3>
          <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:w-1/2 flex justify-center"
        >
          <div className="w-64 h-64 bg-green-200 rounded-full flex items-center justify-center shadow-inner hover:scale-105 transition-transform duration-300">
            <span className="text-8xl">{emoji}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { title: "100% Fresh Produce", desc: "Handpicked daily from local farms.", emoji: "🥬" },
    { title: "Quick Delivery", desc: "Delivered to your door within hours.", emoji: "🚚" },
    { title: "Eco Packaging", desc: "Minimal plastic and compostable bags.", emoji: "♻️" },
    { title: "Support Farmers", desc: "Empowering small-scale farmers.", emoji: "🤝" },
  ];

  return (
    <section className="bg-green-50 py-20">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-green-700 mb-12"
        >
          Why Choose FreshBasket?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow text-left flex items-start gap-4"
            >
              <div className="text-4xl">{feature.emoji}</div>
              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-1">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
