import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
    BookOpen,
    Calendar,
    Clock,
    Edit3,
    Link,
    Mail,
    MapPin,
    Settings,
    Share2,
    Star,
    Trophy,
    Users
} from "lucide-react-native";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import { AppText } from "../src/components/AppText";
import { ScreenWrapper } from "../src/components/ScreenWrapper";
import { Colors } from "../src/constants/colors";

export default function ProfileScreen() {
  const router = useRouter();
  
  const [user, setUser] = useState({
    name: "Code Learner",
    username: "@codelearner",
    bio: "Passionate about learning to code and building amazing projects! Always excited to learn something new.",
    avatar: "😎",
    level: 6,
    xp: 4320,
    nextLevelXP: 6000,
    progress: 72,
    streak: 7,
    joined: "January 2024",
    location: "Digital World",
    website: "kids2coding.com/learners",
    email: "learner@kids2coding.com",
  });

  const stats = {
    completedLessons: 35,
    completedCourses: 3,
    totalHours: 28.5,
    accuracy: 87,
    badges: 8,
    rank: 4,
    friends: 24,
  };

  const achievements = [
    { id: "1", title: "Quick Learner", date: "Jan 12", icon: "⚡" },
    { id: "2", title: "Weekend Warrior", date: "Jan 18", icon: "🏋️‍♂️" },
    { id: "3", title: "Perfect Score", date: "Jan 20", icon: "💯" },
    { id: "4", title: "7-Day Streak", date: "Jan 22", icon: "🔥" },
    { id: "5", title: "Course Master", date: "Jan 25", icon: "🎓" },
    { id: "6", title: "Community Helper", date: "Jan 28", icon: "🤝" },
  ];

  const recentActivity = [
    { time: "2h ago", action: "Completed JavaScript Quiz", xp: "+50 XP" },
    { time: "Yesterday", action: "Earned Quick Learner badge", xp: "+100 XP" },
    { time: "2 days ago", action: "Finished HTML Basics course", xp: "+200 XP" },
    { time: "3 days ago", action: "Helped a fellow learner", xp: "+25 XP" },
    { time: "1 week ago", action: "Reached 30-day streak", xp: "+150 XP" },
  ];

  const handleEditProfile = () => {
    router.push("/profile/edit");
  };

  const handleShareProfile = () => {
    Alert.alert(
      "Share Profile",
      "Share your learning journey with others!",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Copy Link", onPress: () => {
          // Copy profile link to clipboard
          Alert.alert("Copied!", "Profile link copied to clipboard.");
        }},
        { text: "Share", onPress: () => {
          // Share profile
        }}
      ]
    );
  };

  return (
    <ScreenWrapper scrollable>
      {/* Header */}
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <AppText style={styles.backText}>← Back</AppText>
            </TouchableOpacity>
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={styles.headerAction}
                onPress={handleShareProfile}
              >
                <Share2 size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerAction}
                onPress={() => router.push("/settings")}
              >
                <Settings size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <AppText style={styles.avatarText}>{user.avatar}</AppText>
              </View>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={handleEditProfile}
              >
                <Edit3 size={16} color={Colors.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.userInfo}>
              <AppText style={styles.userName}>{user.name}</AppText>
              <AppText style={styles.userUsername}>{user.username}</AppText>
              <AppText style={styles.userBio}>{user.bio}</AppText>
            </View>

            <View style={styles.userMeta}>
              <View style={styles.metaItem}>
                <Calendar size={14} color="rgba(255,255,255,0.8)" />
                <AppText style={styles.metaText}>Joined {user.joined}</AppText>
              </View>
              <View style={styles.metaItem}>
                <MapPin size={14} color="rgba(255,255,255,0.8)" />
                <AppText style={styles.metaText}>{user.location}</AppText>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Level Progress */}
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View style={styles.levelBadge}>
              <Trophy size={20} color={Colors.warning} />
              <AppText style={styles.levelNumber}>Level {user.level}</AppText>
            </View>
            <AppText style={styles.levelXP}>{user.xp} / {user.nextLevelXP} XP</AppText>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${user.progress}%` }]} />
          </View>
          <AppText style={styles.progressText}>{user.progress}% to next level</AppText>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <BookOpen size={24} color={Colors.primary} />
            <AppText style={styles.statValue}>{stats.completedLessons}</AppText>
            <AppText style={styles.statLabel}>Lessons</AppText>
          </View>
          <View style={styles.statCard}>
            <Clock size={24} color={Colors.success} />
            <AppText style={styles.statValue}>{stats.totalHours}h</AppText>
            <AppText style={styles.statLabel}>Hours</AppText>
          </View>
          <View style={styles.statCard}>
            <Star size={24} color={Colors.warning} />
            <AppText style={styles.statValue}>{stats.accuracy}%</AppText>
            <AppText style={styles.statLabel}>Accuracy</AppText>
          </View>
          <View style={styles.statCard}>
            <Users size={24} color={Colors.accent} />
            <AppText style={styles.statValue}>{stats.friends}</AppText>
            <AppText style={styles.statLabel}>Friends</AppText>
          </View>
        </View>

        {/* Streak */}
        <View style={styles.streakCard}>
          <View style={styles.streakContent}>
            <View style={styles.streakIcon}>
              <AppText style={styles.streakEmoji}>🔥</AppText>
            </View>
            <View style={styles.streakInfo}>
              <AppText style={styles.streakTitle}>Current Streak</AppText>
              <AppText style={styles.streakValue}>{user.streak} days</AppText>
            </View>
          </View>
          <AppText style={styles.streakText}>
            Keep going! 3 more days for a badge!
          </AppText>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText style={styles.sectionTitle}>Achievements 🏆</AppText>
            <TouchableOpacity onPress={() => router.push("/badges")}>
              <AppText style={styles.seeAll}>See All →</AppText>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.achievementsList}
          >
            {achievements.map(achievement => (
              <TouchableOpacity 
                key={achievement.id}
                style={styles.achievementCard}
                onPress={() => router.push(`/achievements/${achievement.id}`)}
              >
                <View style={styles.achievementIcon}>
                  <AppText style={styles.achievementEmoji}>{achievement.icon}</AppText>
                </View>
                <AppText style={styles.achievementTitle}>{achievement.title}</AppText>
                <AppText style={styles.achievementDate}>{achievement.date}</AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText style={styles.sectionTitle}>Recent Activity 📝</AppText>
          </View>
          <View style={styles.activityList}>
            {recentActivity.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <AppText style={styles.activityEmoji}>⚡</AppText>
                </View>
                <View style={styles.activityContent}>
                  <AppText style={styles.activityAction}>{activity.action}</AppText>
                  <AppText style={styles.activityTime}>{activity.time}</AppText>
                </View>
                <View style={styles.activityXP}>
                  <AppText style={styles.xpText}>{activity.xp}</AppText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Courses Progress */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText style={styles.sectionTitle}>Courses Progress 📚</AppText>
            <TouchableOpacity onPress={() => router.push("/courses")}>
              <AppText style={styles.seeAll}>Continue →</AppText>
            </TouchableOpacity>
          </View>
          <View style={styles.coursesProgress}>
            <View style={styles.courseProgressItem}>
              <View style={styles.courseInfo}>
                <View style={[styles.courseColor, { backgroundColor: Colors.primary }]} />
                <AppText style={styles.courseName}>Web Basics</AppText>
              </View>
              <View style={styles.courseProgress}>
                <View style={styles.courseProgressBar}>
                  <View style={[styles.courseProgressFill, { width: '85%' }]} />
                </View>
                <AppText style={styles.courseProgressText}>85%</AppText>
              </View>
            </View>
            <View style={styles.courseProgressItem}>
              <View style={styles.courseInfo}>
                <View style={[styles.courseColor, { backgroundColor: Colors.warning }]} />
                <AppText style={styles.courseName}>JavaScript</AppText>
              </View>
              <View style={styles.courseProgress}>
                <View style={styles.courseProgressBar}>
                  <View style={[styles.courseProgressFill, { width: '60%' }]} />
                </View>
                <AppText style={styles.courseProgressText}>60%</AppText>
              </View>
            </View>
            <View style={styles.courseProgressItem}>
              <View style={styles.courseInfo}>
                <View style={[styles.courseColor, { backgroundColor: Colors.success }]} />
                <AppText style={styles.courseName}>Python</AppText>
              </View>
              <View style={styles.courseProgress}>
                <View style={styles.courseProgressBar}>
                  <View style={[styles.courseProgressFill, { width: '30%' }]} />
                </View>
                <AppText style={styles.courseProgressText}>30%</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.contactCard}>
          <View style={styles.contactHeader}>
            <Mail size={20} color={Colors.primary} />
            <AppText style={styles.contactTitle}>Contact Information</AppText>
          </View>
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Mail size={16} color={Colors.textLight} />
              <AppText style={styles.contactText}>{user.email}</AppText>
            </View>
            <View style={styles.contactItem}>
              <Link size={16} color={Colors.textLight} />
              <AppText style={styles.contactText}>{user.website}</AppText>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => router.push("/profile/edit/contact")}
          >
            <AppText style={styles.contactButtonText}>Update Contact Info</AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    color: "white",
    fontSize: 16,
  },
  headerActions: {
    flexDirection: "row",
  },
  headerAction: {
    padding: 8,
    marginLeft: 10,
  },
  profileInfo: {
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "white",
  },
  avatarText: {
    fontSize: 48,
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  userName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  userUsername: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 15,
  },
  userBio: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  userMeta: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    marginLeft: 8,
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
    marginTop: -30,
  },
  levelCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  levelBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  levelNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginLeft: 10,
  },
  levelXP: {
    fontSize: 14,
    color: Colors.textLight,
    fontWeight: "600",
  },
  progressBar: {
    height: 10,
    backgroundColor: Colors.borderLight,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: "center",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    width: "48%",
    backgroundColor: Colors.surface,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginTop: 10,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textLight,
  },
  streakCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  streakContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  streakIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.warning + "20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  streakEmoji: {
    fontSize: 24,
  },
  streakInfo: {
    flex: 1,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textLight,
  },
  streakValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
  },
  streakText: {
    fontSize: 14,
    color: Colors.textLight,
    fontStyle: "italic",
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.text,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
  achievementsList: {
    marginBottom: 10,
  },
  achievementCard: {
    width: 120,
    backgroundColor: Colors.surface,
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.borderLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  achievementEmoji: {
    fontSize: 24,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 5,
    textAlign: "center",
  },
  achievementDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  activityList: {
    gap: 15,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 15,
    padding: 15,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.borderLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  activityEmoji: {
    fontSize: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: Colors.textLight,
  },
  activityXP: {
    backgroundColor: Colors.success + "20",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  xpText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.success,
  },
  coursesProgress: {
    gap: 15,
  },
  courseProgressItem: {
    backgroundColor: Colors.surface,
    borderRadius: 15,
    padding: 15,
  },
  courseInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  courseColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  courseName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  courseProgress: {
    flexDirection: "row",
    alignItems: "center",
  },
  courseProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.borderLight,
    borderRadius: 3,
    overflow: "hidden",
    marginRight: 15,
  },
  courseProgressFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  courseProgressText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
  },
  contactCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  contactHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginLeft: 10,
  },
  contactInfo: {
    gap: 15,
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactText: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.textLight,
  },
  contactButton: {
    backgroundColor: Colors.borderLight,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
});