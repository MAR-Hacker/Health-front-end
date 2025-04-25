"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function HowItWorksSection() {
  const steps = [
    {
      title: "Check Your Symptoms",
      description:
        "Input your symptoms and let our AI analyze them for accurate health assessments.",
    },
    {
      title: "Receive Personalized Guidance",
      description:
        "Get instant triage recommendations and personalized care pathways.",
    },
    {
      title: "Connect with Healthcare Providers",
      description:
        "Consult with doctors remotely through secure video or chat sessions.",
    },
    {
      title: "Track Your Health Progress",
      description:
        "Monitor your health metrics in real-time through wearable device integration.",
    },
  ];

  return (
    <section className="w-full py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-slate-600 dark:text-slate-300 md:text-xl max-w-[800px] mx-auto">
            Our intuitive platform makes managing your health simple and
            effective
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-500/20 z-10"></div>
            <Image
              src="/assets/hero-image.jpg"
              alt="App Interface Demonstration"
              fill
              className="object-cover"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div className="bg-white/90 dark:bg-slate-800/90 p-4 rounded-full shadow-lg">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#0D9488"
                      strokeWidth="4"
                    />
                    <path
                      d="M40 50L50 60L70 40"
                      stroke="#0D9488"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 mt-1">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <CheckCircle2 className="h-6 w-6 text-teal-500" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
