'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slideImages = [
    { src: "/images/IMG_A.png", alt: "Security Example A" },
    { src: "/images/IMG_B.png", alt: "Security Example B" },
    { src: "/images/IMG_C.png", alt: "Security Example C" },
    { src: "/images/IMG_D.png", alt: "Security Example D" },
    { src: "/images/IMG_E.png", alt: "Security Example E" }
];

export default function MobileSlideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const slideRef = useRef(null);

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slideImages.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slideImages.length) % slideImages.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Touch handlers for swipe navigation
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextSlide();
        } else if (isRightSwipe) {
            prevSlide();
        }
    };

    // Click handlers for left/right navigation
    const handleLeftClick = (e) => {
        e.preventDefault();
        prevSlide();
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        nextSlide();
    };

    return (
        <div className="relative w-full overflow-hidden lg:hidden">
            {/* Main slideshow container */}
            <div 
                ref={slideRef}
                className="relative w-full aspect-[4/3] cursor-pointer"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {/* Images */}
                <div 
                    className="flex transition-transform duration-500 ease-out h-full"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {slideImages.map((image, index) => (
                        <img
                            key={index}
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover flex-shrink-0"
                        />
                    ))}
                </div>

                {/* Left click area */}
                <button
                    onClick={handleLeftClick}
                    className="absolute left-0 top-0 w-1/3 h-full z-10 flex items-center justify-start pl-4
                               bg-transparent hover:bg-black/10 transition-colors duration-200"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="w-8 h-8 text-white/80 drop-shadow-lg" />
                </button>

                {/* Right click area */}
                <button
                    onClick={handleRightClick}
                    className="absolute right-0 top-0 w-1/3 h-full z-10 flex items-center justify-end pr-4
                               bg-transparent hover:bg-black/10 transition-colors duration-200"
                    aria-label="Next image"
                >
                    <ChevronRight className="w-8 h-8 text-white/80 drop-shadow-lg" />
                </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 py-4 bg-primary">
                {slideImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                            index === currentIndex 
                                ? 'bg-accent' 
                                : 'bg-inactive hover:bg-main'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}