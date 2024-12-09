import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

const TabSwitcher = ({ tabs, onTabChange }) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabClick = (index) => {
        if (activeTabIndex !== index) {
            setActiveTabIndex(index);
            onTabChange?.(index);
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            console.log("Swiped Left");
            if (activeTabIndex < tabs.length - 1) {
                const newIndex = activeTabIndex + 1;
                setActiveTabIndex(newIndex);
                onTabChange?.(newIndex);
            }
        },
        onSwipedRight: () => {
            console.log("Swiped Right");
            if (activeTabIndex > 0) {
                const newIndex = activeTabIndex - 1;
                setActiveTabIndex(newIndex);
                onTabChange?.(newIndex);
            }
        },
        trackTouch: true,
        trackMouse: true,
        delta: 1,
       
    });

    return (
        <div style={{ height: "100%", padding: "10px 0px" }}>
            {/* Tab Buttons */}
            <div>
                <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
                    {tabs.map((tab, index) => (
                        <div key={tab.label} onClick={() => handleTabClick(index)}>
                            {index !== 0 && <div />}
                            <span>{tab.label.toUpperCase()}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Swipeable Content Area */}
            <div
                style={{
                    height: "100%",
                    width: "100%", // Ensure full swipeable width
                    background: tabs[activeTabIndex].bg,
                    
                    touchAction: "pan-y", // Avoid browser interference
                }}
                {...handlers}
            >
                {tabs[activeTabIndex] && tabs[activeTabIndex].component}
            </div>
        </div>
    );
};

export default TabSwitcher;
