"use client"

import { motion } from "framer-motion"

export function VideoSection() {
    return (
        <section className="py-40 px-4 bg-slate-100">
            <div className="max-w-7xl mx-auto"> {/* Increased max-width */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl overflow-hidden shadow-lg"
                >
                    <div className="aspect-w-16 aspect-h-9"> {/* Changed to standard 16:9 video aspect ratio */}
                        <iframe
                            src="https://www.youtube.com/embed/z7Uv_A4bG-U"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}