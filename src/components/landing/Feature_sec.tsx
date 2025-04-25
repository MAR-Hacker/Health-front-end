"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Stethoscope,
  Clock,
  Shield,
  Brain,
  TabletIcon as DeviceTablet,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="h-10 w-10 text-teal-500" />,
      title: "AI-Powered Symptom Checking",
      description:
        "Advanced algorithms analyze your symptoms and provide accurate assessments based on the latest medical knowledge.",
    },
    {
      icon: <Stethoscope className="h-10 w-10 text-teal-500" />,
      title: "Seamless Telemedicine",
      description:
        "Connect with healthcare professionals remotely for consultations, follow-ups, and prescriptions.",
    },
    {
      icon: <Activity className="h-10 w-10 text-teal-500" />,
      title: "Real-Time Health Tracking",
      description:
        "Maintain a comprehensive health history record of past diagnoses, medical conditions, and treatments, enabling users and healthcare providers to track illness patterns and treatment outcomes over time.",
    },
    {
      icon: <Clock className="h-10 w-10 text-teal-500" />,
      title: "Instant Triage Guidance",
      description:
        "Receive immediate recommendations on the appropriate level of care based on your symptoms.",
    },
    {
      icon: <Shield className="h-10 w-10 text-teal-500" />,
      title: "Secure & Private Platform",
      description:
        "Your health data is protected with enterprise-grade security and encryption protocols.",
    },
    {
      icon: <DeviceTablet className="h-10 w-10 text-teal-500" />,
      title: "Emergency Ambulance Service",
      description:
        "Book an ambulance in case of emergencies with just a few taps, ensuring timely medical assistance.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="w-full py-20 bg-white dark:bg-slate-900">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Transforming Healthcare with Technology
          </h2>
          <p className="text-slate-600 dark:text-slate-300 md:text-xl max-w-[800px] mx-auto">
            Our app combines cutting-edge AI, telemedicine, and health tracking
            to deliver a comprehensive healthcare solution.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="mb-4"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
