import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AppText } from "../src/components/AppText";
import { ScreenWrapper } from "../src/components/ScreenWrapper";
import { Colors } from "../src/constants/colors";
import { coursesData } from "../src/data/coursesData";
import { CourseCard } from "../src/components/CourseCard";
import { ProgressCard } from "../src/components/ProgressCard";
import { useEffect, useRef } from "react";

//import { FontAwesome, MaterialIcons, Ionicons } from '../src/utils/icons';

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [180, 100],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  return (
    <ScreenWrapper>
      <Animated.View 
        style={[
          styles.header,
          { 
            height: headerHeight,
            opacity: headerOpacity 
          }
        ]}
      >
        <ImageBackground
          source={require("../assets/splash.jpg")}
          style={styles.headerBackground}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <View>
                <AppText style={styles.greeting}>Welcome back, Coder! 👋</AppText>
                <AppText style={styles.userName}>Let's create something amazing</AppText>
              </View>
              <TouchableOpacity style={styles.profileButton}>
                <FontAwesome name="user-circle" size={40} color={Colors.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <MaterialIcons name="school" size={24} color={Colors.primary} />
                <AppText style={styles.statValue}>5</AppText>
                <AppText style={styles.statLabel}>Courses</AppText>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="trophy" size={24} color={Colors.accent} />
                <AppText style={styles.statValue}>12</AppText>
                <AppText style={styles.statLabel}>Badges</AppText>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <FontAwesome name="star" size={24} color={Colors.secondary} />
                <AppText style={styles.statValue}>85%</AppText>
                <AppText style={styles.statLabel}>Progress</AppText>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>
          {/* Progress Card */}
          <ProgressCard />

          {/* Quick Actions */}
          <View style={styles.section}>
            <AppText style={styles.sectionTitle}>Quick Actions ⚡</AppText>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.quickActions}
            >
              {[
                { icon: '🎮', title: 'Games', screen: '/games' },
                { icon: '🧩', title: 'Puzzles', screen: '/puzzles' },
                { icon: '🏆', title: 'Challenges', screen: '/challenges' },
                { icon: '🎨', title: 'Projects', screen: '/projects' },
                { icon: '🤖', title: 'AI Buddy', screen: '/ai-buddy' },
              ].map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickAction}
                  onPress={() => router.push(action.screen)}
                >
                  <AppText style={styles.quickActionIcon}>{action.icon}</AppText>
                  <AppText style={styles.quickActionText}>{action.title}</AppText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Featured Courses */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <AppText style={styles.sectionTitle}>Your Courses 📚</AppText>
              <TouchableOpacity onPress={() => router.push('/courses')}>
                <AppText style={styles.seeAll}>See All →</AppText>
              </TouchableOpacity>
            </View>
            <View style={styles.coursesGrid}>
              {coursesData.slice(0, 4).map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onPress={() => router.push(`/courses/${course.id}`)}
                  style={styles.courseCard}
                />
              ))}
            </View>
          </View>

          {/* New Courses */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <AppText style={styles.sectionTitle}>New Adventures 🎯</AppText>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              {coursesData.slice(4, 8).map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onPress={() => router.push(`/courses/${course.id}`)}
                  style={styles.horizontalCard}
                  horizontal
                />
              ))}
            </ScrollView>
          </View>

          {/* Daily Challenge */}
          <TouchableOpacity 
            style={styles.dailyChallenge}
            onPress={() => router.push('/daily-challenge')}
          >
            <View style={styles.challengeContent}>
              <AppText style={styles.challengeTitle}>Daily Challenge 🏅</AppText>
              <AppText style={styles.challengeText}>
                Solve today's coding puzzle and earn extra stars!
              </AppText>
            </View>
            <FontAwesome name="arrow-right" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    overflow: 'hidden',
    backgroundColor: Colors.primary,
  },
  headerBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    color: 'white',
    opacity: 0.9,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },
  profileButton: {
    padding: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.border,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
  },
  seeAll: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
  quickActions: {
    marginLeft: -5,
  },
  quickAction: {
    width: 80,
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
  },
  coursesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -5,
  },
  courseCard: {
    width: (width - 50) / 2,
    marginBottom: 15,
    marginHorizontal: 5,
  },
  horizontalScroll: {
    marginLeft: -5,
  },
  horizontalCard: {
    width: 200,
    marginRight: 15,
  },
  dailyChallenge: {
    backgroundColor: Colors.accent,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  challengeContent: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  challengeText: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
});