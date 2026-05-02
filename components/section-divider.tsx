"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <motion.div
      className="my-20 hidden h-20 w-px origin-top bg-gradient-to-b from-transparent via-gray-400/50 to-transparent sm:block dark:via-white/20"
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
