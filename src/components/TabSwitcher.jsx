import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate, useLocation } from "react-router-dom";
import CardComponent from "../../CardComponent";

const TabSwitcher = ({ tabs }) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    // Sync activeTabIndex with the current route
    useEffect(() => {
        const tabIndex = tabs.findIndex((tab) => tab.path === location.pathname);
        if (tabIndex !== -1) {
            setActiveTabIndex(tabIndex);
        }
    }, [location.pathname, tabs]);

    const handleTabClick = (index) => {
        if (activeTabIndex !== index) {
            setActiveTabIndex(index);
            navigate(tabs[index].path); // Navigate to the corresponding route
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (activeTabIndex < tabs.length - 1) {
                const newIndex = activeTabIndex + 1;
                setActiveTabIndex(newIndex);
                navigate(tabs[newIndex].path); // Navigate to the next route
            }
        },
        onSwipedRight: () => {
            if (activeTabIndex > 0) {
                const newIndex = activeTabIndex - 1;
                setActiveTabIndex(newIndex);
                navigate(tabs[newIndex].path); // Navigate to the previous route
            }
        },
        trackTouch: true,
        trackMouse: true,
        delta: 1,
    });

    return (
        <div style={{  padding: "10px 0px" }}>
            {/* Tab Buttons */}
            <div>
                <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
                    {tabs.map((tab, index) => (
                        <div key={tab.label} onClick={() => handleTabClick(index)}>
                            {index !== 0 && <div />}
                            <span style={{ fontWeight: index === activeTabIndex ? "bold" : "" }}>
                                {tab.label.toUpperCase()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Swipeable Content Area */}
            <div
                style={{
                   
                    width: "100%", // Ensure full swipeable width
                    background: tabs[activeTabIndex].bg,
                    touchAction: "pan-y", // Avoid browser interference
                    paddingBottom:"250px"
                }}
                {...handlers}
            >
                <h2 style={{ padding: "30px 0px" }}>{tabs[activeTabIndex] && tabs[activeTabIndex].component}</h2>
                <CardComponent/>
            </div>
        </div>
    );
};

export default TabSwitcher;
