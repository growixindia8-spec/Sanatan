import React from 'react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const reviews = [
    { text: "मैंने बहुत करीब से देखा है कि Sanatan Dharma Manav Kalyan Foundation किस तरह जरूरतमंद लोगों तक मदद पहुँचाने की कोशिश करता है।", name: "Rahul S.", city: "Mumbai" },
    { text: "आज के समय में सेवा और संस्कृति दोनों को साथ लेकर चलना आसान नहीं है, लेकिन यह Foundation वही काम कर रहा है।", name: "Priya V.", city: "Delhi" },
    { text: "अगर समाज में वास्तविक बदलाव लाना है, तो ऐसे सेवा और जागरूकता अभियानों को support करना बहुत जरूरी है।", name: "Amitabh K.", city: "Varanasi" },
    { text: "जब मैंने Foundation के कार्यों के बारे में जाना, तब महसूस हुआ कि यह सिर्फ NGO नहीं, बल्कि समाज में सकारात्मक बदलाव लाने का एक मजबूत प्रयास है।", name: "Sita R.", city: "Pune" }
  ];

  return (
    <section className="py-16 bg-cream overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-maroon mb-2">Community Voices</h2>
        <p className="text-gray-600">Real stories from donors, volunteers & families</p>
      </div>
      
      <div className="relative flex overflow-x-hidden group py-4">
        <motion.div 
          className="flex space-x-6 whitespace-nowrap px-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
        >
          {[...reviews, ...reviews].map((review, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 min-w-[300px] md:min-w-[400px] whitespace-normal">
              <p className="text-gray-700 font-devanagari italic mb-6">"{review.text}"</p>
              <div>
                <p className="font-bold text-charcoal">{review.name}</p>
                <p className="text-xs text-gray-500">{review.city}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
