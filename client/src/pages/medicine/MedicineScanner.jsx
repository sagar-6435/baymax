import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { colors, globalStyles } from '../../theme';

const MedicineScanner = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleScan = () => {
    // Simulate taking a photo and sending to an API
    navigation.navigate('CameraScanResult', { mockItem: 'Paracetamol 500mg' });
  };

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={styles.permissionBtnText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back">
        <View style={styles.overlay}>
          {/* Top Bar */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={32} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.flashButton}>
              <Ionicons name="flash-outline" size={28} color={colors.white} />
            </TouchableOpacity>
          </View>

          {/* Scanner Reticle */}
          <View style={styles.reticleContainer}>
            <View style={[styles.reticleCorner, styles.topLeft]} />
            <View style={[styles.reticleCorner, styles.topRight]} />
            <View style={[styles.reticleCorner, styles.bottomLeft]} />
            <View style={[styles.reticleCorner, styles.bottomRight]} />
            <Text style={styles.instructionText}>Align medicine bottle or pill strip within the frame</Text>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <TouchableOpacity style={styles.galleryButton}>
              <Ionicons name="image-outline" size={28} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.captureButton} onPress={handleScan}>
              <View style={styles.captureInner} />
            </TouchableOpacity>
            <View style={{ width: 44 }} />
          </View>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.black },
  permissionText: { color: colors.white, fontSize: 16, marginBottom: 20 },
  permissionBtn: { backgroundColor: colors.primary, padding: 15, borderRadius: 10 },
  permissionBtnText: { color: colors.black, fontWeight: 'bold' },
  
  camera: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'space-between' },
  
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingTop: 50, 
    paddingHorizontal: 20 
  },
  backButton: { padding: 4 },
  flashButton: { padding: 4 },
  
  reticleContainer: {
    alignSelf: 'center',
    width: 250,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  reticleCorner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: colors.primary,
  },
  topLeft: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 16 },
  topRight: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 16 },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 16 },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 16 },
  
  instructionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    position: 'absolute',
    bottom: -40,
    width: '120%'
  },
  
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 40,
  },
  galleryButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  captureInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.white
  }
});

export default MedicineScanner;
