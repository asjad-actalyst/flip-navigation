import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

const TabSwitcher = ({ tabs, onTabChange }) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabClick = (index) => {
        if (activeTabIndex !== index) {
            setActiveTabIndex(index);
            if (onTabChange) {
                onTabChange(index); // Notify parent of tab change
            }
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (activeTabIndex < tabs.length - 1) {
                const newIndex = activeTabIndex + 1;
                setActiveTabIndex(newIndex);
                if (onTabChange) {
                    onTabChange(newIndex); // Notify parent on swipe
                }
            }
        },
        onSwipedRight: () => {
            if (activeTabIndex > 0) {
                const newIndex = activeTabIndex - 1;
                setActiveTabIndex(newIndex);
                if (onTabChange) {
                    onTabChange(newIndex); // Notify parent on swipe
                }
            }
        },
        trackTouch: true,
        trackMouse: true,
        delta: 10,
    });

    let paddingClasses = "px-4 py-3"; // Default padding
    if (tabs.length === 2) {
        paddingClasses = "px-12 py-3";
    } else if (tabs.length === 3) {
        paddingClasses = "px-4 py-3";
    } else if (tabs.length === 1) {
        paddingClasses = "px-12 py-3";
    } else {
        paddingClasses = "px-4 py-2";
    }

    return (
        <div >
            <div >
                <div style={{ display: "flex", gap: "20px", justifyContent: "center" }} >
                    {tabs.map((tab, index) => (
                        <div
                            key={tab.label}

                            onClick={() => handleTabClick(index)}
                        >
                            {/* Vertical Separator with Fixed Margins */}
                            {index !== 0 && (
                                <div ></div>
                            )}
                            {/* Tab Label */}
                            <span

                            >
                                {tab.label.toUpperCase()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div
                className="bg-bg-page-body pt-[75px] flex-grow overflow-y-auto relative"
                {...handlers}
            >
                {tabs[activeTabIndex] && tabs[activeTabIndex].component}
            </div>
        </div>
    );
};

export default TabSwitcher;
