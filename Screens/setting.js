import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function Setting({ navigation }) {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity set to 0

  useEffect(() => {
    // Start the fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade to fully visible
      duration: 500, // Duration of the animation
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ebf1e7' }}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>To Do List Setting</Text>
        </View>

        <ScrollView>
          <Section title="Account">
            <SectionRow icon="user" label="Edit Profile" />
            <SectionRow icon="shield" label="Security" />
            <SectionRow icon="lock" label="Privacy" />
          </Section>

          <Section title="Support & About">
            <SectionRow icon="help" label="Help & Support" />
            <SectionRow icon="info" label="Terms & policies" />
          </Section>

          <Section title="Actions">
            <SectionRow icon="flag" label="Report a Problem" />
            <SectionRow icon="users" label="Add Account" />
          </Section>
          
          <Section title="Log out">
          <SectionRow icon="log-out" label="Log Out" onPress={() => navigation.navigate('Login')} />
          </Section>

          <Text style={styles.contentFooter}>Best place to rearrange your ideas ❤️</Text>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const Section = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useState(new Animated.Value(0))[0];

  const toggleSection = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const sectionHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Adjust this based on content size
  });

  return (
    <View style={styles.section}>
      <TouchableOpacity onPress={toggleSection} style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FeatherIcon name={expanded ? "chevron-up" : "chevron-down"} size={20} />
      </TouchableOpacity>
      <Animated.View style={{ height: sectionHeight, overflow: 'hidden' }}>
        <View style={styles.sectionBody}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const SectionRow = ({ icon, label, onPress }) => {
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.rowWrapper}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={[styles.row, { transform: [{ scale: scaleAnim }] }]}
      >
        <View style={[styles.rowIcon, { backgroundColor: '#EBF1E7' }]}>
          <FeatherIcon color="black" name={icon} size={20} />
        </View>
        <Text style={styles.rowLabel}>{label}</Text>
        <View style={styles.rowSpacer} />
        <FeatherIcon color="#C6C6C6" name="chevron-right" size={20}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    marginTop: 6,
  },
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  sectionTitle: {
    marginVertical: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    paddingLeft: 24,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 16,
    height: 50,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowIcon: {
    width: 30,
    height: 30,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});