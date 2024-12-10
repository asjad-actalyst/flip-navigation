import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate, useLocation } from "react-router-dom";

const TabSwitcher = ({ tabs }) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [activeGroupIndex, setActiveGroupIndex] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    // Sync activeTabIndex and activeGroupIndex with the current route
    useEffect(() => {
        const tabIndex = tabs.findIndex(
            (tab) =>
                tab.path === location.pathname ||
                tab.groups?.some((group) => group.path === location.pathname)
        );
        if (tabIndex !== -1) {
            setActiveTabIndex(tabIndex);
            const groupIndex =
                tabs[tabIndex].groups?.findIndex(
                    (group) => group.path === location.pathname
                ) || 0;
            setActiveGroupIndex(groupIndex);
        }
    }, [location.pathname, tabs]);

    const handleTabClick = (index) => {
        if (activeTabIndex !== index) {
            setActiveTabIndex(index);
            setActiveGroupIndex(0); // Reset group index when switching tabs
            navigate(tabs[index].path);
        }
    };

    const handleGroupClick = (index) => {
        if (activeGroupIndex !== index) {
            setActiveGroupIndex(index); // Update the active group index
            const selectedGroup = tabs[activeTabIndex]?.groups[index];
            if (selectedGroup?.path) {
                navigate(selectedGroup.path); // Navigate to the selected group's path
            }
        }
    };

    const tabHandlers = useSwipeable({
        onSwipedLeft: () => {
            if (activeTabIndex < tabs.length - 1) {
                const newIndex = activeTabIndex + 1;
                setActiveTabIndex(newIndex);
                setActiveGroupIndex(0); // Reset group index when switching tabs
                navigate(tabs[newIndex].path);
            }
        },
        onSwipedRight: () => {
            if (activeTabIndex > 0) {
                const newIndex = activeTabIndex - 1;
                setActiveTabIndex(newIndex);
                setActiveGroupIndex(0); // Reset group index when switching tabs
                navigate(tabs[newIndex].path);
            }
        },
        onSwipedUp: () => {
            const groups = tabs[activeTabIndex].groups || [];
            if (activeGroupIndex < groups.length - 1) {
                const newIndex = activeGroupIndex + 1;
                setActiveGroupIndex(newIndex);
                navigate(groups[newIndex].path); // Navigate to the next group's route
            }
        },
        onSwipedDown: () => {
            if (activeGroupIndex > 0) {
                const newIndex = activeGroupIndex - 1;
                setActiveGroupIndex(newIndex);
                navigate(tabs[activeTabIndex].groups[newIndex].path); // Navigate to the previous group's route
            }
        },
        trackTouch: true,
        trackMouse: true,
        delta: 1,
    });

    const currentTab = tabs[activeTabIndex];
    const currentGroup = currentTab.groups ? currentTab.groups[activeGroupIndex] : null;

    return (
        <div style={{ height: "100%" }}>
            {/* Tab Buttons */}
            <div>
                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        justifyContent: "center",
                        padding: "10px",
                    }}
                >
                    {tabs.map((tab, index) => (
                        <div key={tab.label} onClick={() => handleTabClick(index)}>
                            <span style={{ fontWeight: index === activeTabIndex ? "bold" : "" }}>
                                {tab.label.toUpperCase()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Group Buttons */}
            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexDirection: "column",
                    position: "fixed",
                    left: "0px",
                    top: "40%",
                    alignItems: "flex-start",
                    padding: "15px",
                    zIndex: "20"
                }}
            >
                {tabs[activeTabIndex]?.groups &&
                    tabs[activeTabIndex]?.groups.map((group, index) => (
                        <div key={group.label} onClick={() => handleGroupClick(index)}>
                            <span
                                style={{
                                    fontWeight: index === activeGroupIndex ? "bold" : "",
                                }}
                            >
                                {group.label.toUpperCase()}
                            </span>
                        </div>
                    ))}
            </div>

            {/* Swipeable Content Area */}
            <div
                style={{
                    height: "95%",
                    width: "100%", // Ensure full swipeable width
                    touchAction: "none", // Prevent browser interference
                    position: "relative",
                    overflow: "hidden",
                }}
                {...tabHandlers}
            >
                <div
                    className="animated-content"
                    style={{
                        transform: `translateY(-${activeGroupIndex * 100}%)`,
                    }}
                >
                    {tabs[activeTabIndex].groups &&
                        tabs[activeTabIndex].groups.map((group, index) => (
                            <div
                                key={index}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: currentGroup?.bg ? currentGroup.bg : currentTab.bg,
                                }}
                            >
                                {group.component}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default TabSwitcher;
