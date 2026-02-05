import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface TypingState {
  user_id: string;
  typing: boolean;
  timestamp: string;
}

export const useTypingIndicator = (listId: string | undefined) => {
  const [typingUsers, setTypingUsers] = useState<TypingState[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [currentUserId] = useState(() => 'user_' + Math.random().toString(36).substring(7));

  useEffect(() => {
    if (!listId) return;

    const typingChannel = supabase.channel(`typing_${listId}`, {
      config: {
        presence: {
          key: currentUserId,
        },
      },
    });

    typingChannel
      .on('presence', { event: 'sync' }, () => {
        const state = typingChannel.presenceState();
        const users: TypingState[] = [];
        
        Object.entries(state).forEach(([key, presences]) => {
          if (key !== currentUserId) {
            presences.forEach((presence: any) => {
              if (presence.typing) {
                users.push({
                  user_id: key,
                  typing: presence.typing,
                  timestamp: presence.timestamp
                });
              }
            });
          }
        });
        
        setTypingUsers(users);
      })
      .subscribe();

    setChannel(typingChannel);

    return () => {
      if (typingChannel) {
        supabase.removeChannel(typingChannel);
      }
    };
  }, [listId, currentUserId]);

  const setTyping = async (isTyping: boolean) => {
    if (!channel) return;

    await channel.track({
      typing: isTyping,
      timestamp: new Date().toISOString(),
    });
  };

  return { typingUsers, setTyping, currentUserId };
};