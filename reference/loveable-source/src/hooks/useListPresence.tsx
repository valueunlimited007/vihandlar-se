import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { detectDeviceType, getDeviceNotificationText, type DeviceType } from '@/utils/deviceDetection';

interface PresenceState {
  user_id: string;
  online_at: string;
  device_type: DeviceType;
}

export const useListPresence = (listId: string | undefined) => {
  const [presenceCount, setPresenceCount] = useState(1);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!listId) return;

    const roomChannel = supabase.channel(`list_${listId}`, {
      config: {
        presence: {
          key: Math.random().toString(36).substring(7), // Generate unique key for this session
        },
      },
    });

    roomChannel
      .on('presence', { event: 'sync' }, () => {
        const state = roomChannel.presenceState();
        const count = Object.keys(state).length;
        setPresenceCount(Math.max(count, 1)); // At least 1 person (current user)
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('Someone joined the list', newPresences);
        // Show notification when someone joins (but not for the first user)
        const currentCount = Object.keys(roomChannel.presenceState()).length;
        if (currentCount > 1 && newPresences.length > 0) {
          // Get device type from the first new presence
          const deviceType = newPresences[0]?.device_type || 'Unknown';
          const notificationText = getDeviceNotificationText(deviceType);
          
          toast({
            title: notificationText.title,
            description: notificationText.description,
            duration: 3000,
          });
        }
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('Someone left the list', leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // Track current user's presence with device info
          await roomChannel.track({
            user_id: 'anonymous_' + Math.random().toString(36).substring(7),
            online_at: new Date().toISOString(),
            device_type: detectDeviceType(),
          });
        }
      });

    setChannel(roomChannel);

    return () => {
      if (roomChannel) {
        supabase.removeChannel(roomChannel);
      }
    };
  }, [listId]);

  return { presenceCount };
};