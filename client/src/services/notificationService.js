import { userService } from './userService';

export const notificationService = {
  /**
   * Pushes a new notification to the user's inAppNotifications array in the DB
   */
  async pushInAppNotification(user, updateUser, notificationData) {
    if (!user) return false;
    
    const newNotification = {
      id: Date.now().toString() + Math.random().toString(36).substring(7),
      title: notificationData.title,
      message: notificationData.message,
      time: notificationData.time || 'Just now',
      type: notificationData.type || 'system',
      read: false
    };

    const currentNotifications = user.inAppNotifications || [];
    const updatedNotifications = [newNotification, ...currentNotifications];

    try {
      const updatedUser = await userService.updateProfile({ 
        inAppNotifications: updatedNotifications 
      });
      if (updateUser) {
        await updateUser(updatedUser);
      }
      return true;
    } catch (error) {
      console.error('Failed to save in-app notification', error);
      return false;
    }
  },

  /**
   * Confirms medication updates
   */
  async scheduleMedicationReminders(user, updateUser, medications) {
    if (!medications || medications.length === 0) return;
    
    await this.pushInAppNotification(user, updateUser, {
      title: "Medication Schedule Updated",
      message: `You have successfully scheduled ${medications.length} medication(s).`,
      type: 'medical'
    });
  },

  /**
   * Called on app load to check if meds need taking today
   */
  async generateDailyMedicationAlerts(user, updateUser) {
    if (!user || !user.health || !user.health.medications) return;
    
    const today = new Date().toLocaleDateString();
    const hasMedNotificationToday = (user.inAppNotifications || []).some(
      n => n.type === 'medical' && n.title.includes('Daily Reminder') && n.time.includes(today)
    );

    if (!hasMedNotificationToday && user.health.medications.length > 0) {
      await this.pushInAppNotification(user, updateUser, {
        title: "Daily Reminder 💊",
        message: `Don't forget to take your scheduled medications today!`,
        time: today,
        type: 'medical'
      });
    }
  }
};
