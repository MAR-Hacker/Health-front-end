"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import GetStarted from "../sample/getstarted";

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-b from-teal-50 to-white dark:from-slate-900 dark:to-slate-800 overflow-hidden">
      <div className="container px-4 md:px-6 py-10 md:py-14 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col space-y-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block px-3 py-1 text-sm font-medium text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/30 rounded-full"
            >
              Next-Generation Healthcare
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-slate-800 dark:text-white"
            >
              AI-Powered Healthcare in Your Pocket
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-slate-600 dark:text-slate-300 md:text-xl max-w-[600px]"
            >
              Experience personalized care with our AI-driven health app that
              combines symptom checking, telemedicine, and real-time health
              tracking—all in one secure platform.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <GetStarted />
              <Button
                size="lg"
                variant="outline"
                className="border-teal-600 text-teal-600 hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900/20"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="relative w-[280px] md:w-[320px] h-[560px] md:h-[640px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-blue-600 rounded-[40px] shadow-xl transform rotate-3"></div>
                <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-[36px] shadow-lg overflow-hidden transform -rotate-1">
                  <Image
                    src="/assets/hero-img.jpg"
                    alt="Health App Interface"
                    width={320}
                    height={640}
                    className="object-cover w-full h-full"
                  />
                </div>
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-6 -right-6 w-24 h-24 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-teal-700 dark:text-teal-300 font-bold text-sm text-center">
                    AI-Powered
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="w-full flex justify-center pb-10"
      >
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          <Image
            src="/placeholder.svg?height=40&width=120"
            alt="Partner Logo"
            width={120}
            height={40}
            className="opacity-70 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/placeholder.svg?height=40&width=120"
            alt="Partner Logo"
            width={120}
            height={40}
            className="opacity-70 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/placeholder.svg?height=40&width=120"
            alt="Partner Logo"
            width={120}
            height={40}
            className="opacity-70 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/placeholder.svg?height=40&width=120"
            alt="Partner Logo"
            width={120}
            height={40}
            className="opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
      </motion.div> */}
    </section>
  );
}
