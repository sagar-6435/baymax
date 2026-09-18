import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../theme';

const AppHeader = ({ notificationCount = 3, showNotifications = true, showBack = false, onBack }) => {
  return (
    <View style={styles.headerRow}>
      <View style={styles.logoContainer}>
        {showBack ? (
          <TouchableOpacity onPress={onBack} style={{marginRight: 12}}>
            <Ionicons name="arrow-back" size={28} color={colors.black} />
          </TouchableOpacity>
        ) : (
          <FontAwesome5 name="heartbeat" size={28} color={colors.primary} style={styles.pulseIcon} />
        )}
        <View>
          <Text style={styles.appTitle}>Bay<Text style={{color: colors.primary}}>Max</Text></Text>
          <Text style={styles.appSubtitle}>Your Health • Your Knowledge • Our Care</Text>
        </View>
      </View>
      
      {showNotifications && (
        <TouchableOpacity style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={28} color={colors.black} />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingTop: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: colors.white
  },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  pulseIcon: { marginRight: 8 },
  appTitle: { fontSize: 24, fontWeight: '900', color: colors.black },
  appSubtitle: { fontSize: 10, color: colors.darkGray, fontWeight: '500' },
  
  notificationBtn: { padding: 4, position: 'relative' },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  badgeText: { color: colors.white, fontSize: 10, fontWeight: 'bold' },
});

export default AppHeader;
