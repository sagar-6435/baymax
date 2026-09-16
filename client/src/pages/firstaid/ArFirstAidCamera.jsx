import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const ArFirstAidCamera = ({ navigation }) => {
  const [isScanning, setIsScanning] = useState(true);

  return (
    <View style={styles.container}>
      {/* Mock Camera Background */}
      <View style={styles.cameraView}>
        {/* AR Overlay Frame */}
        <View style={styles.viewfinderFrame}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
          
          {isScanning && (
            <View style={styles.scanningIndicator}>
              <Text style={styles.scanningText}>Scanning for injuries...</Text>
            </View>
          )}
        </View>
      </View>

      {/* Top Controls */}
      <View style={styles.topControls}>
        <TouchableOpacity style={styles.controlButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="flash-outline" size={28} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Bottom Information Panel */}
      <View style={styles.bottomPanel}>
        <Text style={styles.panelTitle}>AR Assistant Active</Text>
        <Text style={styles.panelDesc}>Point your camera at the injured area to receive real-time first aid instructions.</Text>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => setIsScanning(!isScanning)}
        >
          <Ionicons name={isScanning ? "pause" : "play"} size={20} color={colors.black} style={{marginRight: 8}} />
          <Text style={styles.actionButtonText}>
            {isScanning ? "Pause Scanning" : "Resume Scanning"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  cameraView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  viewfinderFrame: {
    width: 250, height: 250, position: 'relative', justifyContent: 'center', alignItems: 'center'
  },
  corner: { position: 'absolute', width: 40, height: 40, borderColor: colors.primary },
  topLeft: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4 },
  topRight: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4 },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4 },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4 },
  
  scanningIndicator: {
    backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20
  },
  scanningText: { color: colors.primary, fontWeight: 'bold' },

  topControls: {
    position: 'absolute', top: 50, left: 20, right: 20,
    flexDirection: 'row', justifyContent: 'space-between'
  },
  controlButton: {
    backgroundColor: 'rgba(0,0,0,0.5)', width: 44, height: 44, 
    borderRadius: 22, justifyContent: 'center', alignItems: 'center'
  },

  bottomPanel: {
    backgroundColor: colors.white, borderTopLeftRadius: 30, borderTopRightRadius: 30,
    padding: 30, paddingBottom: 50
  },
  panelTitle: { fontSize: 20, fontWeight: 'bold', color: colors.black, marginBottom: 8 },
  panelDesc: { fontSize: 16, color: colors.darkGray, lineHeight: 24, marginBottom: 20 },
  
  actionButton: {
    backgroundColor: colors.primary, flexDirection: 'row', padding: 16, 
    borderRadius: globalStyles.buttonRadius, justifyContent: 'center', alignItems: 'center'
  },
  actionButtonText: { fontSize: 16, fontWeight: 'bold', color: colors.black }
});

export default ArFirstAidCamera;
