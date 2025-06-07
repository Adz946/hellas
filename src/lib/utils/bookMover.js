'use client';
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Get direction for slide animation based on section order
const getAnimationDirection = (currentSection, previousSection) => {
    const sectionOrder = ['contact', 'event', 'date', 'time', 'location', 'review'];
    
    const currentIndex = sectionOrder.indexOf(currentSection);
    const previousIndex = sectionOrder.indexOf(previousSection);
    
    // Return 1 for forward, -1 for backward
    return currentIndex > previousIndex ? 1 : -1;
};

// Animation variants - Y-axis slide only
const slideVariants = {
    enter: (direction) => ({
        y: direction > 0 ? 50 : -50,
        opacity: 0,
    }),
    center: {
        y: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        y: direction < 0 ? 50 : -50,
        opacity: 0,
    }),
};

// Transition configuration
const slideTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.4,
};

// Main animated section wrapper component
export function BookMover({ section: Section, activeSection, onAdvance }) {
    const previousSectionRef = useRef(activeSection);
    
    // Get direction and update ref
    const direction = getAnimationDirection(activeSection, previousSectionRef.current);
    previousSectionRef.current = activeSection;

    return (
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
                key={activeSection}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
            >
                <Section onAdvance={onAdvance} />
            </motion.div>
        </AnimatePresence>
    );
}