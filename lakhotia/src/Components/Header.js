import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaBell } from "react-icons/fa";

const Header = ({ onLogout, onToggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState({ username: "User", email: "No email", id: "" });
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Task Assigned", message: "You have a new task assigned by Admin", time: "2 mins ago", unread: true },
    { id: 2, title: "Quotation Approved", message: "Quotation #1234 has been approved", time: "1 hour ago", unread: true },
    { id: 3, title: "System Update", message: "The system will be down for maintenance at 12 PM", time: "5 hours ago", unread: false },
  ]);

  const dropdownRef = useRef();
  const notificationRef = useRef();

  // ✅ Load user details from localStorage
  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const id = localStorage.getItem("user_id");

    setUser({
      username: username || "User",
      email: email || "No email",
      id: id || "",
    });
  }, []);

  // ✅ Handle click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("user_id");
    if (onLogout) onLogout();
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header style={styles.header}>
      {/* Left Section */}
      <div style={styles.leftSection}>
        <button
          style={styles.toggleButton}
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
        <div style={styles.brand}>Lakhotia WorkFlow</div>
      </div>

      {/* Right Section */}
      <div style={styles.rightSection}>
        {/* Notification Bell */}
        <div style={styles.notificationWrapper} ref={notificationRef}>
          <div 
            style={styles.iconButton} 
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <FaBell style={styles.bellIcon} />
            {unreadCount > 0 && <span style={styles.badge}>{unreadCount}</span>}
          </div>

          {showNotifications && (
            <div style={styles.notificationDropdown}>
              <div style={styles.dropdownHeader}>
                <span style={styles.dropdownTitle}>Notifications</span>
                <button style={styles.markReadButton} onClick={markAllAsRead}>Mark all as read</button>
              </div>
              <div style={styles.notificationList}>
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div 
                      key={n.id} 
                      style={{
                        ...styles.notificationItem,
                        backgroundColor: n.unread ? "#f0f7ff" : "transparent"
                      }}
                      onClick={() => markAsRead(n.id)}
                    >
                      <div style={styles.notificationContent}>
                        <div style={styles.notificationTitle}>{n.title}</div>
                        <div style={styles.notificationMessage}>{n.message}</div>
                        <div style={styles.notificationTime}>{n.time}</div>
                      </div>
                      {n.unread && <div style={styles.unreadDot}></div>}
                    </div>
                  ))
                ) : (
                  <div style={styles.emptyState}>No new notifications</div>
                )}
              </div>
              <div style={styles.dropdownFooter}>
                <button style={styles.viewAllButton}>View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div style={styles.userSection} ref={dropdownRef}>
          <div
            style={styles.profileCircle}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {user.username ? user.username.charAt(0).toUpperCase() : "U"}
          </div>

          {showDropdown && (
            <div style={styles.dropdown}>
              <div style={styles.userInfoDropdown}>
                <div style={styles.userName}>{user.username}</div>
                <div style={styles.userEmail}>{user.email}</div>
              </div>
              <button style={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// 🎨 Styling
const styles = {
  header: {
    backgroundColor: "#fff8dc",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "60px",
    padding: "0 25px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100, // Increased z-index to stay above other elements
    fontFamily: "'Poppins', sans-serif",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  toggleButton: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#333",
    padding: "6px",
    borderRadius: "6px",
    transition: "background 0.3s",
  },
  brand: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#222",
    letterSpacing: "0.5px",
  },
  notificationWrapper: {
    position: "relative",
  },
  iconButton: {
    position: "relative",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.05)",
    }
  },
  bellIcon: {
    fontSize: "20px",
    color: "#444",
  },
  badge: {
    position: "absolute",
    top: "4px",
    right: "4px",
    backgroundColor: "#ef4444",
    color: "white",
    fontSize: "10px",
    fontWeight: "bold",
    borderRadius: "50%",
    width: "16px",
    height: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 0 0 2px #fff8dc",
  },
  notificationDropdown: {
    position: "absolute",
    top: "60px",
    right: "0",
    backgroundColor: "#ffffff",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    width: "320px",
    zIndex: 110,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #e5e7eb",
  },
  dropdownHeader: {
    padding: "12px 16px",
    borderBottom: "1px solid #f3f4f6",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  dropdownTitle: {
    fontWeight: "600",
    fontSize: "15px",
    color: "#111827",
  },
  markReadButton: {
    background: "none",
    border: "none",
    color: "#3b82f6",
    fontSize: "12px",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "4px",
    "&:hover": {
      textDecoration: "underline",
    }
  },
  notificationList: {
    maxHeight: "360px",
    overflowY: "auto",
  },
  notificationItem: {
    padding: "12px 16px",
    borderBottom: "1px solid #f3f4f6",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#f9fafb",
    }
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "2px",
  },
  notificationMessage: {
    fontSize: "13px",
    color: "#6b7280",
    lineHeight: "1.4",
  },
  notificationTime: {
    fontSize: "11px",
    color: "#9ca3af",
    marginTop: "4px",
  },
  unreadDot: {
    width: "8px",
    height: "8px",
    backgroundColor: "#3b82f6",
    borderRadius: "50%",
    marginTop: "6px",
    marginLeft: "8px",
  },
  emptyState: {
    padding: "32px 16px",
    textAlign: "center",
    color: "#9ca3af",
    fontSize: "14px",
  },
  dropdownFooter: {
    padding: "10px",
    borderTop: "1px solid #f3f4f6",
    textAlign: "center",
    backgroundColor: "#f9fafb",
  },
  viewAllButton: {
    background: "none",
    border: "none",
    color: "#3b82f6",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    width: "100%",
    padding: "6px",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "rgba(59, 130, 246, 0.05)",
    }
  },
  userSection: {
    position: "relative",
    cursor: "pointer",
  },
  profileCircle: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    }
  },
  dropdown: {
    position: "absolute",
    top: "45px",
    right: "0",
    backgroundColor: "#fff",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    padding: "12px",
    zIndex: 110,
    minWidth: "180px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    border: "1px solid #e5e7eb",
  },
  userInfoDropdown: {
    borderBottom: "1px solid #f3f4f6",
    paddingBottom: "8px",
  },
  userName: {
    fontWeight: "600",
    color: "#111827",
    fontSize: "15px",
  },
  userEmail: {
    fontSize: "13px",
    color: "#6b7280",
  },
  logoutButton: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    transition: "background 0.3s",
    "&:hover": {
      backgroundColor: "#2563eb",
    }
  },
};

export default Header;

