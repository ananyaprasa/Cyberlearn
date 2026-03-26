import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ChallengeContext = createContext();

// Challenge data with completion status
const initialChallengesData = [
  {
    id: "base64",
    title: "Base64 Basics",
    category: "Cryptography",
    points: 50,
    difficulty: "easy",
    description: "Decode this message: dof_kpkua_p_ztpsl_ihjr",
    flag: "CyberLearn{why_didnt_i_smile_back}",
    solved: false,
    solvedDate: null
  },
  {
    id: "hidden-html",
    title: "Hidden in Plain Sight",
    category: "OSINT",
    points: 100,
    difficulty: "easy",
    description: "Analyze this satellite image and find the exact coordinates.",
    flag: "CyberLearn{55.7963°N_49.1088°E}",
    hasImage: true,
    imageUrl: "/ctf-images/satellite.jpg",
    solved: false,
    solvedDate: null
  },
  {
    id: "cipher-decode",
    title: "Cipher Decode",
    category: "Cryptography",
    points: 75,
    difficulty: "easy",
    description: "Decrypt the encoded message below to find the flag.",
    cipherText: "L/rzkw.qx@.l@hm/qx",
    flag: "CyberLearn{S0meth1ng_1s_wr0ng}",
    hasCipherText: true,
    solved: false,
    solvedDate: null
  },
  {
    id: "osint-investigation",
    title: "OSINT Investigation",
    category: "OSINT",
    points: 125,
    difficulty: "medium",
    description: "The investigation begins at: emmatruthseeker.wordpress.com. Password: emmaseekstruth.",
    flag: "CyberLearn{cityscape}",
    hasLink: true,
    externalUrl: "https://emmatruthseeker.wordpress.com",
    solved: false,
    solvedDate: null
  },
  {
    id: "crypto-advanced",
    title: "Advanced Cryptography",
    category: "Cryptography",
    points: 250,
    difficulty: "hard",
    description: "Decrypt the encoded message below to find the flag.",
    cipherText: "FUXC2LRAFYWSALJOEAXC4LJNFYWSALJOFUWSALJNFUQC4LRNEAXC4LJNFYWSALROFYXCALRNEAWS4LJOEAWS4LJAFYXC2LJOFUQC2IBOFYXC4IBOFYQC4LRO",
    flag: "CyberLearn{can_you_hack_this}",
    hasCipherText: true,
    solved: false,
    solvedDate: null
  },
  {
    id: "password-crack",
    title: "Password Cracking Challenge",
    category: "Network Security",
    points: 300,
    difficulty: "hard",
    description: "Download the secret file and crack its password to reveal the flag.",
    flag: "CyberLearn{liberty}",
    hasFile: true,
    fileUrl: "/ctf-images/secret.zip",
    fileName: "secret.zip",
    solved: false,
    solvedDate: null
  },
  {
    id: "social-media-osint",
    title: "Social Media Investigation",
    category: "OSINT",
    points: 150,
    difficulty: "medium",
    description: "Find information about the target using social media platforms.",
    flag: "CyberLearn{digital_footprint}",
    solved: false,
    solvedDate: null
  },
  {
    id: "network-scan",
    title: "Network Reconnaissance",
    category: "Reconnaissance",
    points: 200,
    difficulty: "medium",
    description: "Perform network scanning to identify open ports and services.",
    flag: "CyberLearn{port_22_open}",
    solved: false,
    solvedDate: null
  },
  {
    id: "web-recon",
    title: "Web Application Recon",
    category: "Reconnaissance",
    points: 175,
    difficulty: "easy",
    description: "Gather information about the target web application.",
    flag: "CyberLearn{robots_txt_found}",
    solved: false,
    solvedDate: null
  },
  {
    id: "dns-enum",
    title: "DNS Enumeration",
    category: "Reconnaissance",
    points: 125,
    difficulty: "easy",
    description: "Enumerate DNS records to find subdomains.",
    flag: "CyberLearn{subdomain_discovered}",
    solved: false,
    solvedDate: null
  },
  {
    id: "wifi-security",
    title: "WiFi Security Analysis",
    category: "Network Security",
    points: 225,
    difficulty: "medium",
    description: "Analyze WiFi security configurations and find vulnerabilities.",
    flag: "CyberLearn{wpa2_cracked}",
    solved: false,
    solvedDate: null
  },
  {
    id: "hash-cracking",
    title: "Hash Cracking Challenge",
    category: "Cryptography",
    points: 180,
    difficulty: "medium",
    description: "Crack the given hash to reveal the original password.",
    flag: "CyberLearn{rainbow_tables}",
    solved: false,
    solvedDate: null
  }
];

export function ChallengeProvider({ children }) {
  const { user } = useAuth();
  const userEmail = user?.email || 'guest';
  
  const [challenges, setChallenges] = useState(() => {
    // Load from localStorage with user-specific key
    const saved = localStorage.getItem(`cyberlearn-challenges-${userEmail}`);
    return saved ? JSON.parse(saved) : initialChallengesData;
  });

  const [recentActivity, setRecentActivity] = useState(() => {
    const saved = localStorage.getItem(`cyberlearn-activity-${userEmail}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Reset state when user changes
  useEffect(() => {
    const saved = localStorage.getItem(`cyberlearn-challenges-${userEmail}`);
    setChallenges(saved ? JSON.parse(saved) : initialChallengesData);
    
    const savedActivity = localStorage.getItem(`cyberlearn-activity-${userEmail}`);
    setRecentActivity(savedActivity ? JSON.parse(savedActivity) : []);
  }, [userEmail]);

  // Save to localStorage whenever challenges change
  useEffect(() => {
    localStorage.setItem(`cyberlearn-challenges-${userEmail}`, JSON.stringify(challenges));
  }, [challenges, userEmail]);

  useEffect(() => {
    localStorage.setItem(`cyberlearn-activity-${userEmail}`, JSON.stringify(recentActivity));
  }, [recentActivity, userEmail]);

  const solveChallenge = (challengeId, flag) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return false;

    // Check if flag is correct
    if (flag.trim() === challenge.flag) {
      const now = new Date().toISOString();
      
      setChallenges(prev => prev.map(c => 
        c.id === challengeId 
          ? { ...c, solved: true, solvedDate: now }
          : c
      ));

      // Add to recent activity
      const newActivity = {
        id: Date.now(),
        action: "Completed",
        item: challenge.title,
        time: "Just now",
        timestamp: now,
        icon: "✅",
        points: challenge.points
      };

      setRecentActivity(prev => [newActivity, ...prev.slice(0, 9)]); // Keep last 10 activities
      
      return true;
    }
    return false;
  };

  const resetProgress = () => {
    setChallenges(initialChallengesData);
    setRecentActivity([]);
    localStorage.removeItem(`cyberlearn-challenges-${userEmail}`);
    localStorage.removeItem(`cyberlearn-activity-${userEmail}`);
  };

  const getStats = () => {
    const solvedChallenges = challenges.filter(c => c.solved);
    const totalPoints = solvedChallenges.reduce((sum, c) => sum + c.points, 0);
    const solvedCount = solvedChallenges.length;
    
    // Calculate streak (simplified - consecutive days with activity)
    const streak = calculateStreak(recentActivity);
    
    return { totalPoints, solvedCount, streak, totalChallenges: challenges.length };
  };

  const calculateStreak = (activities) => {
    if (activities.length === 0) return 0;
    
    // Simple streak calculation - count recent days with activity
    const today = new Date();
    const recentDays = new Set();
    
    activities.forEach(activity => {
      const activityDate = new Date(activity.timestamp);
      const daysDiff = Math.floor((today - activityDate) / (1000 * 60 * 60 * 24));
      if (daysDiff <= 7) { // Within last week
        recentDays.add(daysDiff);
      }
    });
    
    return Math.min(recentDays.size, 7); // Max 7 day streak
  };

  const getLevelInfo = () => {
    const { totalPoints } = getStats();
    const level = Math.floor(totalPoints / 100) + 1;
    const currentLevelPoints = totalPoints % 100;
    const nextLevelPoints = 100;
    const progress = (currentLevelPoints / nextLevelPoints) * 100;
    
    const levelTitles = {
      1: "Cyber Novice",
      2: "Security Apprentice", 
      3: "Digital Detective",
      4: "Cyber Analyst",
      5: "Security Expert",
      6: "Cyber Specialist",
      7: "Security Master",
      8: "Cyber Elite"
    };
    
    return { 
      level, 
      currentLevelPoints, 
      nextLevelPoints, 
      progress,
      title: levelTitles[level] || "Cyber Legend"
    };
  };

  const value = {
    challenges,
    recentActivity,
    solveChallenge,
    resetProgress,
    getStats,
    getLevelInfo
  };

  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
}

export function useChallenges() {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error('useChallenges must be used within a ChallengeProvider');
  }
  return context;
}