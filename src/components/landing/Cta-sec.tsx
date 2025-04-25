"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="w-full py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-white/80 md:text-xl mb-8 max-w-[600px]">
              Join thousands of users who are already benefiting from our
              AI-powered health platform. Get started today and take control of
              your health journey.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-white text-teal-600 hover:bg-white/90"
              >
                Download Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-teal-600 bg-white hover:bg-white"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[300px] md:h-[400px]"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "easeInOut",
              }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-[280px] shadow-xl"
            >
              <div className="h-8 w-8 bg-teal-500 rounded-full mb-4"></div>
              <div className="h-4 w-3/4 bg-white/30 rounded-full mb-3"></div>
              <div className="h-4 w-1/2 bg-white/30 rounded-full mb-6"></div>
              <div className="h-20 w-full bg-white/20 rounded-xl"></div>
            </motion.div>
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 4,
                delay: 0.5,
                ease: "easeInOut",
              }}
              className="absolute bottom-0 right-0 bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-[280px] shadow-xl"
            >
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <div className="h-4 w-24 bg-white/30 rounded-full mb-2"></div>
                  <div className="h-3 w-16 bg-white/20 rounded-full"></div>
                </div>
              </div>
              <div className="h-4 w-full bg-white/30 rounded-full mb-3"></div>
              <div className="h-4 w-3/4 bg-white/30 rounded-full mb-3"></div>
              <div className="h-4 w-1/2 bg-white/30 rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
