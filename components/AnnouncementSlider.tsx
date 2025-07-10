"use client";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IAnnouncement } from "@/types/announcement.types";
import AnnouncementHomeCard from "@/components/AnnouncementHomeCard";

interface AnnouncementSliderProps {
  announcements: IAnnouncement[];
  itemsPerView?: number;
}

const AnnouncementSlider = ({
  announcements,
  itemsPerView = 1,
}: AnnouncementSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate total slides based on items per view
  const totalSlides = Math.ceil(announcements.length / itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Get current items to display
  const getCurrentItems = () => {
    const start = currentIndex * itemsPerView;
    const end = start + itemsPerView;
    return announcements.slice(start, end);
  };

  if (!announcements || announcements.length === 0) {
    return null;
  }

  return (
    <div className="w-full relative">
      {/* Navigation Buttons */}
      <div className="flex items-center justify-between w-full">
        <button
          onClick={prevSlide}
          disabled={announcements.length <= itemsPerView}
          className="p-3 rounded-full bg-primary text-secondary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 z-10"
          aria-label="Previous announcements"
        >
          <FaChevronLeft />
        </button>

        {/* Slider Content */}
        <div className="flex-1 mx-4 overflow-hidden">
          <div className="flex gap-4 justify-center items-center min-h-[400px] transition-opacity duration-300">
            {getCurrentItems().map(
              (announcement: IAnnouncement, itemIndex: number) => (
                <div
                  key={`${currentIndex}-${itemIndex}`}
                  className="flex-shrink-0"
                >
                  <AnnouncementHomeCard announcement={announcement} />
                </div>
              ),
            )}
          </div>
        </div>

        <button
          onClick={nextSlide}
          disabled={announcements.length <= itemsPerView}
          className="p-3 rounded-full bg-primary text-secondary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 z-10"
          aria-label="Next announcements"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Dots Indicator */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-primary"
                  : "bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementSlider;
