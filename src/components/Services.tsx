import React from 'react';
import { motion } from 'motion/react';
import { Layout, Code, Palette, Camera, Check, ArrowRight, Sparkles } from 'lucide-react';
import { services } from '../config/site';

export function Services() {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return <Layout className="w-6 h-6 text-[#2563EB]" />;
      case 'Code': return <Code className="w-6 h-6 text-[#2563EB]" />;
      case 'Palette': return <Palette className="w-6 h-6 text-[#2563EB]" />;
      case 'Camera': return <Camera className="w-6 h-6 text-[#2563EB]" />;
      default: return <Sparkles className="w-6 h-6 text-[#2563EB]" />;
    }
  };

  return (
    <section id="services" className="py-28 px-6 max-w-7xl mx-auto relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#2563EB] font-semibold mb-3 hover:scale-105 transition-transform duration-200 cursor-default"
          >
            <Sparkles className="w-3.5 h-3.5" /> Capabilities & Services
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-medium tracking-tight text-neutral-900 dark:text-white"
          >
            What I Bring To The Table
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md font-light leading-relaxed"
        >
          Combining aesthetic precision with technical velocity. Tailored for ambitious founders, digital products, and creative brands.
        </motion.p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative p-8 rounded-[2rem] bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800/80 shadow-lg shadow-neutral-200/50 dark:shadow-black/20 flex flex-col justify-between hover:border-[#2563EB] transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="p-3.5 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/20 group-hover:scale-110 transition-transform">
                  {getServiceIcon(service.icon)}
                </div>
                <span className="font-mono text-xs font-bold text-neutral-400">
                  0{index + 1}
                </span>
              </div>

              <h3 className="text-2xl font-medium text-neutral-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-sm font-semibold text-[#2563EB] mb-4">
                "{service.tagline}"
              </p>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Deliverables checklist */}
              <div className="space-y-2 pt-4 border-t border-neutral-200 dark:border-neutral-800/60">
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Key Deliverables
                </p>
                {service.deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-xs font-medium text-neutral-800 dark:text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-neutral-900 dark:text-white group-hover:text-[#2563EB] transition-colors"
                data-cursor-text="Inquire"
              >
                <span>Request Proposal</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#2563EB]" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
